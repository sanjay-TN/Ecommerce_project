package com.flipkartclone.ecommerce.controller;

import com.flipkartclone.ecommerce.dto.auth.LoginRequest;
import com.flipkartclone.ecommerce.dto.auth.RegisterRequest;
import com.flipkartclone.ecommerce.dto.common.ApiResponse;
import com.flipkartclone.ecommerce.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Registration successful")
                .data(authService.register(request))
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Login successful")
                .data(authService.login(request))
                .build());
    }
}
