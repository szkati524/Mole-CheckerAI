package com.example.MoleCheckerAI.controller;

import com.example.MoleCheckerAI.ScanHistory;
import com.example.MoleCheckerAI.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/history")
public class ScanHistoryController {
    private final UserService userService;

    public ScanHistoryController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<ScanHistory>> getMyHistory(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();

        }
        List<ScanHistory> history = userService.getUserHistory(principal.getName());
        return ResponseEntity.ok(history);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScan(@PathVariable Long id) {
        userService.deleteScanFromHistory(id);
        return ResponseEntity.noContent().build();
    }
}






