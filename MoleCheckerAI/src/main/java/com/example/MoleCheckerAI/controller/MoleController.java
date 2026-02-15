package com.example.MoleCheckerAI.controller;

import com.example.MoleCheckerAI.service.AiAnalyzerService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/scan")
public class MoleController {

    private final AiAnalyzerService aiAnalyzerService;

    public MoleController(AiAnalyzerService aiAnalyzerService) {
        this.aiAnalyzerService = aiAnalyzerService;
    }
    @PostMapping
    public ResponseEntity<String> scanMole(@RequestParam("file") MultipartFile file){
        if (file.isEmpty()){
            return ResponseEntity.badRequest().body("Please send a image");
        }
        try {
            var imageResource= new InputStreamResource(file.getInputStream());
            String result = aiAnalyzerService.analyzeSkinImage(imageResource);
            return ResponseEntity.ok(result);
        } catch (IOException e){
            return ResponseEntity.status(500).body("Error during analyzing image " + e.getMessage() );
        }
    }
}
