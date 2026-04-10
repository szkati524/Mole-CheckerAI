package com.example.MoleCheckerAI.controller;


import com.example.MoleCheckerAI.entity.User;
import com.example.MoleCheckerAI.service.EmailService;
import com.example.MoleCheckerAI.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;
    private final EmailService emailService;

    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String,String> request, Principal principal) {
        try {
            userService.updatePassword(
                    principal.getName(),
                    request.get("oldPassword"),
                    request.get("newPassword")
            );
            return ResponseEntity.ok(Map.of("message", "Password changed!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
        @PostMapping("/request-email-change")
                public ResponseEntity<?> requestEmailChange(@RequestBody Map<String,String> request,Principal principal){
            try{
                String newEmail = request.get("newEmail");
                User user = userService.findByUsername(principal.getName())
                        .orElseThrow(() -> new RuntimeException("User not found"));
                String token = userService.createEmailToken(user,newEmail);

                emailService.sendEmailChangeLink(newEmail,token);
                return ResponseEntity.ok(Map.of("message","Link send to " + newEmail));

        } catch (Exception e){
                return ResponseEntity.badRequest().body(Map.of("message",e.getMessage()));
            }
    }
    @PostMapping("/delete-account")
    public ResponseEntity<?> deleteAccount(@RequestBody Map<String,String> request,Principal principal){
        try{
            String password = request.get("password");
            String confirmPassword = request.get("confirmPassword");
            if (password == null || !password.equals(confirmPassword)) {
                return ResponseEntity.badRequest().body(Map.of("message","passwords is not the same"));
            }
            userService.deleteUserWithPasswordVerification(principal.getName(),password);
            return ResponseEntity.ok(Map.of("message", "Konto zostało usunięte. Żegnaj!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
        }
    }

