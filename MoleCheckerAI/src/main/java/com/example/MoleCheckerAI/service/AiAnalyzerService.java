package com.example.MoleCheckerAI.service;

import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.content.Media;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeTypeUtils;


import java.util.List;
@Service
public class AiAnalyzerService {

    private final ChatModel chatModel;

    public AiAnalyzerService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }
    public String analyzeSkinImage(Resource imageResource){
String instruction = "Analyze this skin mole. Describe if it looks suspicious based on ABCDE rules (asymmetry, borders, color). Keep it professional and educational.";
      var media = new Media(MimeTypeUtils.IMAGE_JPEG,imageResource);
       var userMessage=  new UserMessage(instruction);
       userMessage.getMedia().add(media);


        ChatResponse chatResponse = chatModel.call(new Prompt(userMessage));
return chatResponse.getResult().getOutput().getText();
    }
}
