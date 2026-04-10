package com.flipkartclone.ecommerce.service.impl;

import com.flipkartclone.ecommerce.dto.user.UserResponse;
import com.flipkartclone.ecommerce.exception.ResourceNotFoundException;
import com.flipkartclone.ecommerce.repository.UserRepository;
import com.flipkartclone.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final MapperService mapperService;

    @Override
    public UserResponse getCurrentUser(String email) {
        return userRepository.findByEmail(email)
                .map(mapperService::toUserResponse)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(mapperService::toUserResponse)
                .toList();
    }
}
