package com.example.MoleCheckerAI.service;

import com.example.MoleCheckerAI.ScanHistory;

import com.example.MoleCheckerAI.User;
import com.example.MoleCheckerAI.repository.ScanHistoryRepository;
import com.example.MoleCheckerAI.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ScanHistoryRepository scanHistoryRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, ScanHistoryRepository scanHistoryRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.scanHistoryRepository = scanHistoryRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public User registerUser(String username, String rawPassword) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(rawPassword));
        return userRepository.save(user);


    }
    @Transactional
    public void addScanToHistory(String username,String aiResult){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono użytkownika"));
        ScanHistory scanHistory = new ScanHistory(aiResult, LocalDateTime.now(),user);
        scanHistoryRepository.save(scanHistory);
    }
    public List<ScanHistory> getUserHistory(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono użytkownika"));
        return scanHistoryRepository.findByUserOrderByLocalDateTimeDesc(user);
    }
    public void deleteScanFromHistory(Long scanId){
        if (!scanHistoryRepository.existsById(scanId)){
            throw new EntityNotFoundException("Nie znaleziono zapytania!");
        }
        scanHistoryRepository.deleteById(scanId);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.example.MoleCheckerAI.User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}
