package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.service.WiFiSchemeService;

@RestController
@RequestMapping("/api/wifiScheme")
public class WiFiSchemeController {

    private final WiFiSchemeService wiFiSchemeService;

    public WiFiSchemeController(WiFiSchemeService wiFiSchemeService) {
        this.wiFiSchemeService = wiFiSchemeService;
    }

    @PostMapping
    public ResponseEntity<WiFiScheme> add(@RequestBody WiFiScheme scheme) {
        WiFiScheme wiFiScheme = wiFiSchemeService.addWiFiScheme(scheme);
        return wiFiScheme != null
            ? new ResponseEntity<>(wiFiScheme, HttpStatus.CREATED)
            : new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @GetMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> getById(@PathVariable Long wifiSchemeId) {
        WiFiScheme wiFiScheme = wiFiSchemeService.getWiFiSchemeById(wifiSchemeId);
        return wiFiScheme != null
            ? new ResponseEntity<>(wiFiScheme, HttpStatus.OK)
            : new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @GetMapping
    public ResponseEntity<List<WiFiScheme>> getAll() {
        List<WiFiScheme> wifiSchemes = wiFiSchemeService.getAllWiFiSchemes();
        return !wifiSchemes.isEmpty()
            ? new ResponseEntity<>(wifiSchemes, HttpStatus.OK)
            : new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PutMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> update(@PathVariable Long wifiSchemeId, @RequestBody WiFiScheme scheme) {
        WiFiScheme wiFiScheme = wiFiSchemeService.updateWiFiScheme(wifiSchemeId, scheme);
        return wiFiScheme != null
            ? new ResponseEntity<>(wiFiScheme, HttpStatus.OK)
            : new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @DeleteMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> delete(@PathVariable Long wifiSchemeId) {
        WiFiScheme wiFiScheme = wiFiSchemeService.deleteWiFiScheme(wifiSchemeId);
        return wiFiScheme != null
            ? new ResponseEntity<>(wiFiScheme, HttpStatus.OK)
            : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
