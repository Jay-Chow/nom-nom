package com.recipemaker.nom_nom.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Fixed-window, per-client rate limit on the suggestions endpoint so the
 * paid OpenAI key can't be drained by a single caller.
 * Note: behind a reverse proxy getRemoteAddr() is the proxy's IP.
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private static final String LIMITED_PATH = "/api/recipes/suggestions";
    private static final int MAX_REQUESTS_PER_WINDOW = 10;
    private static final long WINDOW_MILLIS = 60_000;
    private static final int MAX_TRACKED_CLIENTS = 10_000;

    private final Map<String, Window> windows = new ConcurrentHashMap<>();

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getRequestURI().startsWith(LIMITED_PATH);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        long now = System.currentTimeMillis();

        // Keep memory bounded by dropping expired windows once the map grows large
        if (windows.size() > MAX_TRACKED_CLIENTS) {
            windows.values().removeIf(window -> now - window.start >= WINDOW_MILLIS);
        }

        Window window = windows.compute(request.getRemoteAddr(), (client, existing) ->
                existing == null || now - existing.start >= WINDOW_MILLIS ? new Window(now) : existing);

        if (window.count.incrementAndGet() > MAX_REQUESTS_PER_WINDOW) {
            long retryAfterSeconds = Math.max(1, (window.start + WINDOW_MILLIS - now) / 1000);
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setHeader("Retry-After", String.valueOf(retryAfterSeconds));
            return;
        }

        chain.doFilter(request, response);
    }

    private static final class Window {
        private final long start;
        private final AtomicInteger count = new AtomicInteger();

        private Window(long start) {
            this.start = start;
        }
    }
}
