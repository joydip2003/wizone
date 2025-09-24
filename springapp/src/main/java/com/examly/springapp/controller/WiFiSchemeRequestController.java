package com.examly.springapp.controller;

import com.examly.springapp.model.WiFiSchemeRequest;
import com.examly.springapp.service.WiFiSchemeRequestService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wifiSchemeRequest")
public class WiFiSchemeRequestController {

    private final WiFiSchemeRequestService service;

    public WiFiSchemeRequestController(WiFiSchemeRequestService service) {
        this.service = service;
    }

    @PostMapping("/{userId}/{wifiSchemeId}")
    public ResponseEntity<WiFiSchemeRequest> add(
            @PathVariable Long userId,
            @PathVariable Long wifiSchemeId,
            @Valid @RequestBody WiFiSchemeRequest request) {
        WiFiSchemeRequest created = service.addWiFiSchemeRequest(userId, wifiSchemeId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WiFiSchemeRequest> getById(@PathVariable Long id) {
        WiFiSchemeRequest request = service.getWiFiSchemeRequestById(id);
        return ResponseEntity.ok(request);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WiFiSchemeRequest>> getByUser(@PathVariable Long userId) {
        List<WiFiSchemeRequest> list = service.getWiFiSchemeRequestsByUserId(userId);
        return ResponseEntity.ok(list);
    }

    @GetMapping
    public ResponseEntity<List<WiFiSchemeRequest>> getAll() {
        List<WiFiSchemeRequest> list = service.getAllWiFiSchemeRequests();
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WiFiSchemeRequest> update(@PathVariable Long id, @RequestBody WiFiSchemeRequest request) {
        WiFiSchemeRequest updated = service.updateWiFiSchemeRequest(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteWiFiSchemeRequest(id);
        return ResponseEntity.noContent().build();
    }
}
