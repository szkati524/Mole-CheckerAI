package com.example.MoleCheckerAI.repository;


import com.example.MoleCheckerAI.ScanHistory;
import com.example.MoleCheckerAI.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScanHistoryRepository extends JpaRepository<ScanHistory,Long> {

    List<ScanHistory> findByUserOrderByLocalDateTimeDesc(User user);
}
