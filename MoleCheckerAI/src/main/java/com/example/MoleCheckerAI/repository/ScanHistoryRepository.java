package com.example.MoleCheckerAI.repository;


import com.example.MoleCheckerAI.entity.ScanHistory;
import com.example.MoleCheckerAI.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScanHistoryRepository extends JpaRepository<ScanHistory,Long> {

    List<ScanHistory> findByUserOrderByLocalDateTimeDesc(User user);
    @Modifying
    @Transactional
    void deleteByUser(User user);
}
