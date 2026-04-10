package com.flipkartclone.ecommerce.service;

import com.flipkartclone.ecommerce.dto.user.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse getCurrentUser(String email);
    List<UserResponse> getAllUsers();
}
