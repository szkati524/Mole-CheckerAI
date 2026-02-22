package com.example.MoleCheckerAI;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ScanHistory> scanHistory;

    public User(){

    }

    public User(Long id, String username, String password, List<ScanHistory> scanHistory) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.scanHistory = scanHistory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<ScanHistory> getScanHistory() {
        return scanHistory;
    }

    public void setScanHistory(List<ScanHistory> scanHistory) {
        this.scanHistory = scanHistory;
    }
}
