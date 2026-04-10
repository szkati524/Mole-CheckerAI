package com.example.MoleCheckerAI.service;

import com.example.MoleCheckerAI.entity.ScanHistory;

import com.example.MoleCheckerAI.entity.User;
import com.example.MoleCheckerAI.entity.VerificationToken;
import com.example.MoleCheckerAI.repository.ScanHistoryRepository;
import com.example.MoleCheckerAI.repository.UserRepository;

import com.example.MoleCheckerAI.repository.VerificationTokenRepository;
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
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ScanHistoryRepository scanHistoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenRepository tokenRepository;

    public UserService(UserRepository userRepository, ScanHistoryRepository scanHistoryRepository, PasswordEncoder passwordEncoder, VerificationTokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.scanHistoryRepository = scanHistoryRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
    }
    public User registerUser(String username, String rawPassword,String email) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("username exist");
        }
        if (userRepository.existsByEmail(email)){
            throw new RuntimeException("exist account with this email");
        }
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
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
        public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
            System.out.println("Logowanie dla: " + login);
            User user = userRepository.findByUsername(login)
                    .orElseGet(() -> userRepository.findByEmail(login)
                            .orElseThrow(() -> new UsernameNotFoundException("Nie znaleziono użytkownika: " + login)));

            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getUsername())
                    .password(user.getPassword())
                    .authorities("ROLE_" + user.getRole().name())
                    .build();
        }
    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }
    @Transactional
    public String createEmailToken(User user,String newEmail){
        tokenRepository.findByUser(user).ifPresent(tokenRepository::delete);
        String token = UUID.randomUUID().toString();
        VerificationToken vToken = new VerificationToken(token,user,newEmail);
        tokenRepository.save(vToken);
        return token;
    }

@Transactional
    public void confirmEmailChange(String token){
        VerificationToken vToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Incorrect or expired Token"));
        if (vToken.getExpiryDate().isBefore(LocalDateTime.now())){
            tokenRepository.delete(vToken);
            throw new RuntimeException("Token expired");
        }
        User user = vToken.getUser();
        user.setEmail(vToken.getNewEmail());
        userRepository.save(user);
        tokenRepository.delete(vToken);
}
@Transactional
    public void updatePassword(String username,String oldPassword,String newPassword){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        if (!passwordEncoder.matches(oldPassword,user.getPassword())){
            throw new RuntimeException("current password is incorrect");
        }
        if (oldPassword.equals(newPassword)){
            throw new RuntimeException("new password must be other than old password");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
}
@Transactional
    public void deleteUserWithPasswordVerification(String name, String rawPassword) {
        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new RuntimeException("Cannot find a user"));
        if (!passwordEncoder.matches(rawPassword,user.getPassword())){
            throw new RuntimeException("password is incorrect");
        }
        scanHistoryRepository.deleteByUser(user);
        userRepository.delete(user);
    }
}
