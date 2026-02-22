package com.example.MoleCheckerAI.controller;

import com.example.MoleCheckerAI.service.AiAnalyzerService;
import com.example.MoleCheckerAI.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/scan")
public class MoleController {

    private final AiAnalyzerService aiAnalyzerService;
    private final UserService userService;

    public MoleController(AiAnalyzerService aiAnalyzerService, UserService userService) {
        this.aiAnalyzerService = aiAnalyzerService;
        this.userService = userService;
    }
    @PostMapping
    public ResponseEntity<String> scanMole(@RequestParam("file") MultipartFile file, Principal principal){
        if (file.isEmpty()){
            return ResponseEntity.badRequest().body("Please send a image");
        }
        try {
            String result = aiAnalyzerService.analyzeSkinImage(file.getResource());
            String username = principal.getName();
            userService.addScanToHistory(username,result);
            return ResponseEntity.ok(result);

        } catch (Exception e){
            return ResponseEntity.status(500).body("Error during analyzing image " + e.getMessage() );
        }

    }
}
