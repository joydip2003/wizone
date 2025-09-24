package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateWiFiSchemeException;
import com.examly.springapp.exceptions.WiFiSchemeDeletionException;
import com.examly.springapp.exceptions.WiFiSchemeException;
import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.WiFiSchemeRepo;

@Service
public class WiFiSchemeServiceImpl implements WiFiSchemeService {

    private final WiFiSchemeRepo wiFiSchemeRepo;
    private final FeedbackRepo feedbackRepo;
    public WiFiSchemeServiceImpl(WiFiSchemeRepo wiFiSchemeRepo, FeedbackRepo feedbackRepo) {
        this.wiFiSchemeRepo = wiFiSchemeRepo;
        this.feedbackRepo = feedbackRepo;
    }    
    @Override
    public WiFiScheme addWiFiScheme(WiFiScheme wifiScheme) {
        if (wiFiSchemeRepo.findBySchemeName(wifiScheme.getSchemeName()) != null) {
            throw new DuplicateWiFiSchemeException("WiFiScheme Already Exists!");
        }
        return wiFiSchemeRepo.save(wifiScheme);
    }

    @Override
    public WiFiScheme getWiFiSchemeById(Long wifiSchemeId) {
        return wiFiSchemeRepo.findById(wifiSchemeId)
                .orElseThrow(() -> new WiFiSchemeException("WiFiScheme Not Found with Id " + wifiSchemeId));
    }

    @Override
    public List<WiFiScheme> getAllWiFiSchemes() {
        return wiFiSchemeRepo.findAll();
    }

    @Override
    public WiFiScheme updateWiFiScheme(Long wifiSchemeId, WiFiScheme wifiScheme) {
        if (!wiFiSchemeRepo.existsById(wifiSchemeId)) {
            throw new WiFiSchemeException("WiFiScheme Not Found with Id " + wifiSchemeId);
        }
        wifiScheme.setWifiSchemeId(wifiSchemeId);
        return wiFiSchemeRepo.save(wifiScheme);
    }

    @Override
    public WiFiScheme deleteWiFiScheme(Long wifiSchemeId) {
        WiFiScheme wiFiScheme = wiFiSchemeRepo.findById(wifiSchemeId)
                .orElseThrow(() -> new WiFiSchemeDeletionException("No WiFiScheme Found to Delete"));
        feedbackRepo.deleteAll(feedbackRepo.findByWifiScheme_WifiSchemeId(wifiSchemeId));
        wiFiSchemeRepo.deleteById(wifiSchemeId);
        return wiFiScheme;
    }
}
