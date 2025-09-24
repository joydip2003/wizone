package com.examly.springapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private static final String ROLE_ADMIN = "Admin";
    private static final String ROLE_USER = "User";

    private static final String WIFI_SCHEME_ID = "/api/wifiScheme/{wifiSchemeId}";
    private static final String WIFI_SCHEME_REQUEST_ID = "/api/wifiSchemeRequest/{wifiSchemeRequestId}";

    public SecurityConfig(
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/api/login",
                                "/api/register")
                        .permitAll()
                                .requestMatchers(
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html"
                    ).permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/wifiScheme").hasRole(ROLE_ADMIN)
                        .requestMatchers(HttpMethod.GET, WIFI_SCHEME_ID).hasAnyRole(ROLE_ADMIN, ROLE_USER)
                        .requestMatchers(HttpMethod.GET, "/api/wifiScheme").permitAll()
                        .requestMatchers(HttpMethod.PUT, WIFI_SCHEME_ID).hasRole(ROLE_ADMIN)
                        .requestMatchers(HttpMethod.DELETE, WIFI_SCHEME_ID).hasRole(ROLE_ADMIN)
                        .requestMatchers(HttpMethod.POST, "/api/wifiSchemeRequest/{userId}/{wifiSchemeId}")
                        .hasRole("User")
                        .requestMatchers(HttpMethod.GET, WIFI_SCHEME_REQUEST_ID).hasAnyRole(ROLE_ADMIN, ROLE_USER)
                        .requestMatchers(HttpMethod.GET, "/api/wifiSchemeRequest/user/{userId}").hasRole("User")
                        .requestMatchers(HttpMethod.GET, "/api/wifiSchemeRequest").hasRole(ROLE_ADMIN)
                        .requestMatchers(HttpMethod.PUT, WIFI_SCHEME_REQUEST_ID).hasRole(ROLE_ADMIN)
                        .requestMatchers(HttpMethod.DELETE, WIFI_SCHEME_REQUEST_ID).hasRole(ROLE_USER)
                        .requestMatchers(HttpMethod.POST, "/api/feedback/{userId}/{wifiSchemeId}").hasRole("User")
                        .requestMatchers(HttpMethod.GET, "/api/feedback/{feedbackId}").hasAnyRole(ROLE_ADMIN, "User")
                        .requestMatchers(HttpMethod.GET, "/api/feedback").hasRole(ROLE_ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/feedback/user/{userId}").hasRole("User")
                        .requestMatchers(HttpMethod.DELETE, "/api/feedback/{feedbackId}").hasRole("User")
                        .anyRequest().authenticated())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
