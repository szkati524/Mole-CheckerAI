package com.example.MoleCheckerAI.service;

import org.springframework.boot.tomcat.autoconfigure.TomcatServerProperties;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;

@Service
public class MoleAnalysisManager {

    private final AiAnalyzerService aiAnalyzerService;
    private  final UserService userService;

    public MoleAnalysisManager(AiAnalyzerService aiAnalyzerService, UserService userService) {
        this.aiAnalyzerService = aiAnalyzerService;
        this.userService = userService;
    }
    public String processAndSaveAnalysis(String username, Resource imageResource){
        String aiResult= aiAnalyzerService.analyzeSkinImage(imageResource);
        userService.addScanToHistory(username,aiResult);
        return aiResult;
    }
}
