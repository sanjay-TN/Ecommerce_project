package com.flipkartclone.ecommerce.controller;

import com.flipkartclone.ecommerce.dto.common.ApiResponse;
import com.flipkartclone.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<?>> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).data(userService.getCurrentUser(authentication.getName())).build());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.builder().success(true).data(userService.getAllUsers()).build());
    }
}
