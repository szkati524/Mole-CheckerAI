package com.example.MoleCheckerAI.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    @Async
    public void sendEmailChangeLink(String to,String token){
        String confirmationUrl = "http://localhost:3000/?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@molechecker.ai");
        message.setTo(to);
        message.setSubject("Potwierdzenie zmiany emailu");
        message.setText("Aby zatwierdzić nowy adres email w MoleCheckerAI, kliknij w poniższy link:\n\n"
                + confirmationUrl + "\n\nLink jest ważny przez 24 godziny.");
        mailSender.send(message);
    }
}
