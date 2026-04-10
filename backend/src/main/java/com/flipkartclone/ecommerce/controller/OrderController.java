package com.flipkartclone.ecommerce.controller;

import com.flipkartclone.ecommerce.dto.common.ApiResponse;
import com.flipkartclone.ecommerce.dto.order.CheckoutRequest;
import com.flipkartclone.ecommerce.entity.OrderStatus;
import com.flipkartclone.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<?>> checkout(@Valid @RequestBody CheckoutRequest request, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Order placed successfully").data(orderService.checkout(authentication.getName(), request)).build());
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<?>> myOrders(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).data(orderService.getUserOrders(authentication.getName())).build());
    }

    @PatchMapping("/{orderId}/cancel")
    public ResponseEntity<ApiResponse<?>> cancelOrder(@PathVariable Long orderId, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Order cancelled successfully")
                .data(orderService.cancelOrder(authentication.getName(), orderId))
                .build());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> allOrders() {
        return ResponseEntity.ok(ApiResponse.builder().success(true).data(orderService.getAllOrders()).build());
    }

    @PatchMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> updateStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Order status updated").data(orderService.updateStatus(orderId, status)).build());
    }
}
