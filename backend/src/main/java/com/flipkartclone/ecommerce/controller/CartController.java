package com.flipkartclone.ecommerce.controller;

import com.flipkartclone.ecommerce.dto.cart.CartItemRequest;
import com.flipkartclone.ecommerce.dto.common.ApiResponse;
import com.flipkartclone.ecommerce.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getCart(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).data(cartService.getCart(authentication.getName())).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> addToCart(@Valid @RequestBody CartItemRequest request, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Item added to cart").data(cartService.addToCart(authentication.getName(), request)).build());
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<ApiResponse<?>> updateQuantity(@PathVariable Long itemId,
                                                         @RequestParam Integer quantity,
                                                         Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Cart updated").data(cartService.updateQuantity(authentication.getName(), itemId, quantity)).build());
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<ApiResponse<?>> removeItem(@PathVariable Long itemId, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Item removed").data(cartService.removeItem(authentication.getName(), itemId)).build());
    }
}
