package com.recipemaker.nom_nom.controller;

import com.recipemaker.nom_nom.data.RecipeRequest;
import com.recipemaker.nom_nom.data.RecipeResponse;
import com.recipemaker.nom_nom.service.ChatService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes")
public class AiController {

    ChatService chatService;

    public AiController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to Nom-Nom!");
    }

    @GetMapping("/ai/chat")
    public ResponseEntity<String> chat(@RequestParam String message) {

        return ResponseEntity.ok(chatService.getChatResponse(message));
    }

    @PostMapping("/suggestions")
    public ResponseEntity<RecipeResponse> getSuggestions(@RequestBody RecipeRequest recipeRequest){
        return ResponseEntity.ok(new RecipeResponse());
    }
}
