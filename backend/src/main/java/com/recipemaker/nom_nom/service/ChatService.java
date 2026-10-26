package com.recipemaker.nom_nom.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient openAiChatClient;

    public ChatService(@Qualifier("openAiChatClient") ChatClient openAiChatClient) {
        this.openAiChatClient = openAiChatClient;
    }

    public String getChatResponse(String message) {
        return openAiChatClient
                .prompt()
                .user(message)
                .call()
                .content();
    }


}
