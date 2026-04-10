package com.example.MoleCheckerAI.controller;

import com.example.MoleCheckerAI.dto.LoginRequest;
import com.example.MoleCheckerAI.dto.RegisterRequest;
import com.example.MoleCheckerAI.entity.User;
import com.example.MoleCheckerAI.config.JwtUtils;
import com.example.MoleCheckerAI.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){
        if (request.username() == null || request.password() == null){
            ResponseEntity.badRequest().body("Error username and password cannot be null!!");
        }
        try {
            userService.registerUser(request.username(),request.password(),request.email());
            return ResponseEntity.ok("User registered!");
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }



    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
            String token = jwtUtils.generateToken(authentication.getName());
            String role = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst()
                    .orElse("ROLE_USER")
                    .replace("ROLE_","");
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role",role);
            return ResponseEntity.ok(response);
        }catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        }
    }
    @GetMapping("/confirm-email")
    public ResponseEntity<?>  confirmEmail(@RequestParam("token") String token){
        try {
            userService.confirmEmailChange(token);
            return ResponseEntity.ok(Map.of("message", "Email zaktualizowany!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
