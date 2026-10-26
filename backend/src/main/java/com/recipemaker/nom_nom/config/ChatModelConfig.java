package com.recipemaker.nom_nom.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatModelConfig {

    @Bean
    ChatClient openAiChatClient (OpenAiChatModel openAiChatModel){
        return ChatClient.builder(openAiChatModel)
                .defaultSystem("You're a helpful assistant that provides recipe suggestions based on user input. Your name is non-nom!")
                .build();
    }
}
