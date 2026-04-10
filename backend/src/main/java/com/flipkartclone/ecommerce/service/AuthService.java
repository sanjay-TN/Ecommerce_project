package com.flipkartclone.ecommerce.service;

import com.flipkartclone.ecommerce.dto.auth.AuthResponse;
import com.flipkartclone.ecommerce.dto.auth.LoginRequest;
import com.flipkartclone.ecommerce.dto.auth.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
