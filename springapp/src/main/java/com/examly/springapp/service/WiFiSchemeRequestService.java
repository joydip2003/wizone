package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.WiFiSchemeRequest;


@Service
public interface WiFiSchemeRequestService {

    WiFiSchemeRequest addWiFiSchemeRequest(Long userId,Long wifiSchemeId,WiFiSchemeRequest request);
    List<WiFiSchemeRequest> getWiFiSchemeRequestsByUserId(Long userId);
    List<WiFiSchemeRequest> getAllWiFiSchemeRequests();
    WiFiSchemeRequest updateWiFiSchemeRequest(Long id, WiFiSchemeRequest request);
    void deleteWiFiSchemeRequest(Long id);
    WiFiSchemeRequest getWiFiSchemeRequestById(Long id);

}
