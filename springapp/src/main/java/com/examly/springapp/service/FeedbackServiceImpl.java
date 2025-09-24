package com.examly.springapp.service;

import com.examly.springapp.exceptions.BadRequestException;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.repository.WiFiSchemeRepo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepo feedbackRepo;
    private final WiFiSchemeRepo wiFiSchemeRepo;
    private final UserRepo userRepo;

    public FeedbackServiceImpl(FeedbackRepo feedbackRepo, WiFiSchemeRepo wiFiSchemeRepo, UserRepo userRepo) {
        this.feedbackRepo = feedbackRepo;
        this.wiFiSchemeRepo = wiFiSchemeRepo;
        this.userRepo = userRepo;
    }

    @Override
    public Feedback createFeedback(Long userId, Long wifiSchemeId, Feedback feedback) {
        if (!"Service".equalsIgnoreCase(feedback.getCategory()) &&
            !"Pricing".equalsIgnoreCase(feedback.getCategory())) {
            throw new BadRequestException("Invalid feedback category");
        }

        WiFiScheme wiFiScheme = wiFiSchemeRepo.findById(wifiSchemeId).orElse(null);
        User user = userRepo.findById(userId).orElse(null);
        feedback.setWifiScheme(wiFiScheme);
        feedback.setUser(user);

        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback getFeedbackById(Long feedbackId) {
        return feedbackRepo.findById(feedbackId).orElse(null);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    @Override
    public void deleteFeedback(Long feedbackId) {
        feedbackRepo.deleteById(feedbackId);
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        return feedbackRepo.findByUserUserId(userId);
    }
}
