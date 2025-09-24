package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.WiFiScheme;

@Service
public interface WiFiSchemeService {

    WiFiScheme addWiFiScheme(WiFiScheme wifiScheme);

    WiFiScheme getWiFiSchemeById(Long wifiSchemeId);

    List<WiFiScheme> getAllWiFiSchemes();

    WiFiScheme updateWiFiScheme(Long wifiSchemeId, WiFiScheme wifiScheme);

    WiFiScheme deleteWiFiScheme(Long wifiSchemeId);

}
