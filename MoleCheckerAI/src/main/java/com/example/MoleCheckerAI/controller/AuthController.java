package com.example.MoleCheckerAI.controller;

import com.example.MoleCheckerAI.User;
import com.example.MoleCheckerAI.config.JwtUtils;
import com.example.MoleCheckerAI.service.UserService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private UserService userService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
        userService.registerUser(user.getUsername(),user.getPassword());
        return ResponseEntity.ok("User registered!");

    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        String token = jwtUtils.generateToken(user.getUsername());
        return ResponseEntity.ok(token);
    }
}
