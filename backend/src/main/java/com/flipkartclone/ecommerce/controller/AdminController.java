package com.flipkartclone.ecommerce.controller;

import com.flipkartclone.ecommerce.dto.common.ApiResponse;
import com.flipkartclone.ecommerce.repository.CategoryRepository;
import com.flipkartclone.ecommerce.repository.OrderRepository;
import com.flipkartclone.ecommerce.repository.ProductRepository;
import com.flipkartclone.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<?>> getDashboard() {
        Map<String, Object> metrics = Map.of(
                "products", productRepository.count(),
                "categories", categoryRepository.count(),
                "orders", orderRepository.count(),
                "users", userRepository.count()
        );
        return ResponseEntity.ok(ApiResponse.builder().success(true).data(metrics).build());
    }
}
