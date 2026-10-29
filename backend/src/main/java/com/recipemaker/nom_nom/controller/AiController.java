package com.recipemaker.nom_nom.controller;

import com.recipemaker.nom_nom.data.RecipeRequest;
import com.recipemaker.nom_nom.data.RecipeResponse;
import com.recipemaker.nom_nom.service.SuggestionsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/recipes")
public class AiController {

    static final int MAX_INGREDIENTS = 20;
    static final int MAX_INGREDIENT_LENGTH = 50;
    // Letters (any language), digits, spaces and common food punctuation; no newlines, markup or control chars
    private static final Pattern INGREDIENT_PATTERN = Pattern.compile("[\\p{L}\\p{M}\\p{N} '\\-,.&()/%]+");

    SuggestionsService suggestionsService;

    public AiController(SuggestionsService suggestionsService) {
        this.suggestionsService = suggestionsService;
    }

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to Nom-Nom!");
    }

    @PostMapping("/suggestions")
    public ResponseEntity<RecipeResponse> getSuggestions(@RequestBody RecipeRequest recipeRequest){
        List<String> ingredients = sanitizeIngredients(recipeRequest.getIngredients());
        return ResponseEntity.ok(suggestionsService.getRecipeSuggestions(new RecipeRequest(ingredients)));
    }

    private List<String> sanitizeIngredients(List<String> ingredients) {
        if (ingredients == null || ingredients.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "At least one ingredient is required");
        }
        if (ingredients.size() > MAX_INGREDIENTS) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Too many ingredients (max " + MAX_INGREDIENTS + ")");
        }

        Set<String> cleaned = new LinkedHashSet<>();
        for (String ingredient : ingredients) {
            String trimmed = ingredient == null ? "" : ingredient.trim();
            if (trimmed.isEmpty()
                    || trimmed.length() > MAX_INGREDIENT_LENGTH
                    || !INGREDIENT_PATTERN.matcher(trimmed).matches()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid ingredient");
            }
            cleaned.add(trimmed);
        }
        return List.copyOf(cleaned);
    }
}
