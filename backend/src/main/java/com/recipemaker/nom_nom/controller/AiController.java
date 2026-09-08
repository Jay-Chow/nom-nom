package com.recipemaker.nom_nom.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiController {

    private final ChatClient chatClient;

    public AiController(@Qualifier("openAiChatModel") ChatModel chatModel) {
        this.chatClient = ChatClient.builder(chatModel).build();
    }

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to Nom-Nom!");
    }

    @GetMapping("/ai/chat")
    public String chat(
            @RequestParam String message) {

        return chatClient
                .prompt()
                .user(message)
                .call()
                .content();
    }


}
