package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity

public class WiFiScheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wifiSchemeId;

    @NotBlank(message = "Scheme name is required")
    @Size(max = 100, message = "Scheme name must be less than 100 characters")
    private String schemeName;

    @NotBlank(message = "Description is required")
    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @NotBlank(message = "Region is required")
    private String region;

    @NotBlank(message = "Speed is required")
    private String speed;

    @NotBlank(message = "Data limit is required")
    private String dataLimit;

    @NotNull(message = "Fee is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Fee must be non-negative")
    private Double fee;

    @NotBlank(message = "Availability status is required")
    private String availabilityStatus;

    public WiFiScheme() {
    }

    public WiFiScheme(Long wifiSchemeId,
            @NotBlank(message = "Scheme name is required") @Size(max = 100, message = "Scheme name must be less than 100 characters") String schemeName,
            @NotBlank(message = "Description is required") @Size(max = 500, message = "Description must be less than 500 characters") String description,
            @NotBlank(message = "Region is required") String region,
            @NotBlank(message = "Speed is required") String speed,
            @NotBlank(message = "Data limit is required") String dataLimit,
            @NotNull(message = "Fee is required") @DecimalMin(value = "0.0", inclusive = true, message = "Fee must be non-negative") Double fee,
            @NotBlank(message = "Availability status is required") String availabilityStatus) {
        this.wifiSchemeId = wifiSchemeId;
        this.schemeName = schemeName;
        this.description = description;
        this.region = region;
        this.speed = speed;
        this.dataLimit = dataLimit;
        this.fee = fee;
        this.availabilityStatus = availabilityStatus;
    }

    public Long getWifiSchemeId() {
        return wifiSchemeId;
    }

    public void setWifiSchemeId(Long wifiSchemeId) {
        this.wifiSchemeId = wifiSchemeId;
    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    public String getDataLimit() {
        return dataLimit;
    }

    public void setDataLimit(String dataLimit) {
        this.dataLimit = dataLimit;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }

    public String getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

}
