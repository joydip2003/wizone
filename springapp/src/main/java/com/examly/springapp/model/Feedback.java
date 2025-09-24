package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity

public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long feedbackId;

    @NotBlank(message = "Feedback text must not be blank")
    @Size(max = 1000, message = "Feedback text must not exceed 1000 characters")
    private String feedbackText;

    @NotNull(message = "Date must not be null")
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "wifiSchemeId", nullable = false)
    private WiFiScheme wifiScheme;

    @NotBlank(message = "Category must not be blank")
    @Size(max = 100, message = "Category must not exceed 100 characters")
    private String category;

    public Feedback() {
    }

    public Feedback(Long feedbackId,
            @NotBlank(message = "Feedback text must not be blank") @Size(max = 1000, message = "Feedback text must not exceed 1000 characters") String feedbackText,
            @NotNull(message = "Date must not be null") LocalDate date, User user, WiFiScheme wifiScheme,
            @NotBlank(message = "Category must not be blank") @Size(max = 100, message = "Category must not exceed 100 characters") String category) {
        this.feedbackId = feedbackId;
        this.feedbackText = feedbackText;
        this.date = date;
        this.user = user;
        this.wifiScheme = wifiScheme;
        this.category = category;
    }

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getFeedbackText() {
        return feedbackText;
    }

    public void setFeedbackText(String feedbackText) {
        this.feedbackText = feedbackText;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public WiFiScheme getWifiScheme() {
        return wifiScheme;
    }

    public void setWifiScheme(WiFiScheme wifiScheme) {
        this.wifiScheme = wifiScheme;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
