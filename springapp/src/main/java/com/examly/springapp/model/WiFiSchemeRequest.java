package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class WiFiSchemeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long wifiSchemeRequestId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "wifiSchemeId", nullable = false)
    private WiFiScheme wifiScheme;

    @NotNull(message = "Request date is required")
    @PastOrPresent(message = "Request date cannot be in the future")
    private LocalDate requestDate;

    @NotBlank(message = "Status is required")
    private String status;

    @Size(max = 500, message = "Comments must be less than 500 characters")
    private String comments;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    @NotBlank(message = "Proof document is required")
    private String proof;

    @NotBlank(message = "Street name is required")
    @Size(max = 100, message = "Street name must be less than 100 characters")
    private String streetName;

    @NotBlank(message = "Landmark is required")
    @Size(max = 100, message = "Landmark must be less than 100 characters")
    private String landmark;

    @NotBlank(message = "City is required")
    @Size(max = 50, message = "City must be less than 50 characters")
    private String city;

    @NotBlank(message = "State is required")
    @Size(max = 50, message = "State must be less than 50 characters")
    private String state;

    @NotBlank(message = "Zip code is required")
    @Pattern(regexp = "\\d{5,6}", message = "Zip code must be 5 or 6 digits")
    private String zipCode;

    @NotNull(message = "Preferred setup date is required")
    @FutureOrPresent(message = "Preferred setup date must be today or in the future")
    private LocalDate preferredSetupDate;

    @NotBlank(message = "Time slot is required")
    @Size(max = 50, message = "Time slot must be less than 50 characters")
    private String timeSlot;

    public WiFiSchemeRequest() {
    }

    public WiFiSchemeRequest(Long wifiSchemeRequestId, User user, WiFiScheme wifiScheme,
            @NotNull(message = "Request date is required") @PastOrPresent(message = "Request date cannot be in the future") LocalDate requestDate,
            @NotBlank(message = "Status is required") String status,
            @Size(max = 500, message = "Comments must be less than 500 characters") String comments,
            @NotBlank(message = "Proof document is required") String proof,
            @NotBlank(message = "Street name is required") @Size(max = 100, message = "Street name must be less than 100 characters") String streetName,
            @NotBlank(message = "Landmark is required") @Size(max = 100, message = "Landmark must be less than 100 characters") String landmark,
            @NotBlank(message = "City is required") @Size(max = 50, message = "City must be less than 50 characters") String city,
            @NotBlank(message = "State is required") @Size(max = 50, message = "State must be less than 50 characters") String state,
            @NotBlank(message = "Zip code is required") @Pattern(regexp = "\\d{5,6}", message = "Zip code must be 5 or 6 digits") String zipCode,
            @NotNull(message = "Preferred setup date is required") @FutureOrPresent(message = "Preferred setup date must be today or in the future") LocalDate preferredSetupDate,
            @NotBlank(message = "Time slot is required") @Size(max = 50, message = "Time slot must be less than 50 characters") String timeSlot) {
        this.wifiSchemeRequestId = wifiSchemeRequestId;
        this.user = user;
        this.wifiScheme = wifiScheme;
        this.requestDate = requestDate;
        this.status = status;
        this.comments = comments;
        this.proof = proof;
        this.streetName = streetName;
        this.landmark = landmark;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.preferredSetupDate = preferredSetupDate;
        this.timeSlot = timeSlot;
    }

    public Long getWifiSchemeRequestId() {
        return wifiSchemeRequestId;
    }

    public void setWifiSchemeRequestId(Long wifiSchemeRequestId) {
        this.wifiSchemeRequestId = wifiSchemeRequestId;
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

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getProof() {
        return proof;
    }

    public void setProof(String proof) {
        this.proof = proof;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getLandmark() {
        return landmark;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public LocalDate getPreferredSetupDate() {
        return preferredSetupDate;
    }

    public void setPreferredSetupDate(LocalDate preferredSetupDate) {
        this.preferredSetupDate = preferredSetupDate;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

}
