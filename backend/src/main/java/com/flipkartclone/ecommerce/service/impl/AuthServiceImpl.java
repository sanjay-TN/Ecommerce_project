package com.flipkartclone.ecommerce.service.impl;

import com.flipkartclone.ecommerce.dto.auth.AuthResponse;
import com.flipkartclone.ecommerce.dto.auth.LoginRequest;
import com.flipkartclone.ecommerce.dto.auth.RegisterRequest;
import com.flipkartclone.ecommerce.entity.AppUser;
import com.flipkartclone.ecommerce.entity.Cart;
import com.flipkartclone.ecommerce.entity.Role;
import com.flipkartclone.ecommerce.exception.BadRequestException;
import com.flipkartclone.ecommerce.repository.CartRepository;
import com.flipkartclone.ecommerce.repository.UserRepository;
import com.flipkartclone.ecommerce.security.JwtService;
import com.flipkartclone.ecommerce.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final MapperService mapperService;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        AppUser savedUser = userRepository.save(AppUser.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_CUSTOMER)
                .enabled(true)
                .createdAt(LocalDateTime.now())
                .build());

        cartRepository.save(Cart.builder().user(savedUser).build());

        User principal = new User(savedUser.getEmail(), savedUser.getPassword(),
                List.of(new SimpleGrantedAuthority(savedUser.getRole().name())));

        return AuthResponse.builder()
                .token(jwtService.generateToken(principal))
                .user(mapperService.toUserResponse(savedUser))
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        AppUser user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));
        User principal = new User(user.getEmail(), user.getPassword(),
                List.of(new SimpleGrantedAuthority(user.getRole().name())));

        return AuthResponse.builder()
                .token(jwtService.generateToken(principal))
                .user(mapperService.toUserResponse(user))
                .build();
    }
}
