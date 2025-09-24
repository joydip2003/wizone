package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.model.WiFiSchemeRequest;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.repository.WiFiSchemeRepo;
import com.examly.springapp.repository.WiFiSchemeRequestRepo;
import com.examly.springapp.exceptions.WiFiSchemeRequestException;
import com.examly.springapp.exceptions.WiFiSchemeDeletionException;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WiFiSchemeRequestServiceImpl implements WiFiSchemeRequestService {

    private final WiFiSchemeRequestRepo requestRepo;
    private final UserRepo userRepo;
    private final WiFiSchemeRepo wiFiSchemeRepo;

    public WiFiSchemeRequestServiceImpl(
        WiFiSchemeRequestRepo requestRepo,
        UserRepo userRepo,
        WiFiSchemeRepo wiFiSchemeRepo
    ) {
        this.requestRepo = requestRepo;
        this.userRepo = userRepo;
        this.wiFiSchemeRepo = wiFiSchemeRepo;
    }

    @Override
    public WiFiSchemeRequest addWiFiSchemeRequest(Long userId, Long wifiSchemeId, WiFiSchemeRequest request) {
        if (request == null) {
            throw new WiFiSchemeRequestException("Invalid WiFi Scheme Request or User");
        }
        User user = userRepo.findById(userId).orElse(null);
        WiFiScheme scheme = wiFiSchemeRepo.findById(wifiSchemeId).orElse(null);
        request.setUser(user);
        request.setWifiScheme(scheme);
        return requestRepo.save(request);
    }

    @Override
    public WiFiSchemeRequest getWiFiSchemeRequestById(Long id) {
        return requestRepo.findById(id)
                .orElseThrow(() -> new WiFiSchemeRequestException("WiFi Scheme Request not found with ID: " + id));
    }

    @Override
    public List<WiFiSchemeRequest> getAllWiFiSchemeRequests() {
        List<WiFiSchemeRequest> list = requestRepo.findAll();
        if (list.isEmpty()) {
            throw new WiFiSchemeRequestException("No WiFi Scheme Requests found");
        }
        return list;
    }

    @Override
    public WiFiSchemeRequest updateWiFiSchemeRequest(Long id, WiFiSchemeRequest request) {
        if (!requestRepo.existsById(id)) {
            throw new WiFiSchemeRequestException("WiFi Scheme Request not found for update with ID: " + id);
        }
        request.setWifiSchemeRequestId(id);
        return requestRepo.save(request);
    }

    @Override
    public void deleteWiFiSchemeRequest(Long id) {
        if (!requestRepo.existsById(id)) {
            throw new WiFiSchemeDeletionException("WiFi Scheme Request not found for deletion with ID: " + id);
        }
        requestRepo.deleteById(id);
    }

    @Override
    public List<WiFiSchemeRequest> getWiFiSchemeRequestsByUserId(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new WiFiSchemeRequestException("User not found with ID: " + userId));
        List<WiFiSchemeRequest> list = requestRepo.findByUser(user);
        if (list.isEmpty()) {
            throw new WiFiSchemeRequestException("No WiFi Scheme Requests found for user ID: " + userId);
        }
        return list;
    }
}
