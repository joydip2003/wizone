package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.User;
import com.examly.springapp.model.WiFiSchemeRequest;
import java.util.List;

@Repository
public interface WiFiSchemeRequestRepo extends JpaRepository<WiFiSchemeRequest,Long> {

    List<WiFiSchemeRequest> findByUser(User user);

}
