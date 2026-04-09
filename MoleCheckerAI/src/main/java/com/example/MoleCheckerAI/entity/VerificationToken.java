package com.example.MoleCheckerAI.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;
    private String newEmail;
    private LocalDateTime expiryDate;
@OneToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "user_id",nullable = false)
    private User user;


    public VerificationToken(){

    }

    public VerificationToken(String token, User user, String newEmail) {
        this.token = token;
        this.user = user;
        this.newEmail = newEmail;
        this.expiryDate = LocalDateTime.now().plusHours(24);
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewEmail() {
        return newEmail;
    }

    public void setNewEmail(String newEmail) {
        this.newEmail = newEmail;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setLocalDateTime(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "VerificationToken{" +
                "id=" + id +
                ", token='" + token + '\'' +
                ", newEmail='" + newEmail + '\'' +
                ", localDateTime=" + expiryDate +
                ", user=" + user +
                '}';
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VerificationToken that = (VerificationToken) o;
        return Objects.equals(id, that.id) && Objects.equals(token, that.token) && Objects.equals(newEmail, that.newEmail) && Objects.equals(expiryDate, that.expiryDate) && Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, token, newEmail, expiryDate, user);
    }
}
