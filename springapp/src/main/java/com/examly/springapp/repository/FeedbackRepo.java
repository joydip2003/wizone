package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.model.WiFiScheme;

public interface FeedbackRepo extends JpaRepository<Feedback, Long> {
    List<Feedback> findByUserAndWifiScheme(User user, WiFiScheme wifiScheme);
    List<Feedback> findByUserUserId(Long userId);
    List<Feedback> findByWifiScheme_WifiSchemeId(Long wifiSchemeId);
}

