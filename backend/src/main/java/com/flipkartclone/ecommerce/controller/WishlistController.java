package com.flipkartclone.ecommerce.controller;

import com.flipkartclone.ecommerce.dto.common.ApiResponse;
import com.flipkartclone.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getWishlist(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).data(wishlistService.getWishlist(authentication.getName())).build());
    }

    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse<?>> addItem(@PathVariable Long productId, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Wishlist updated").data(wishlistService.addItem(authentication.getName(), productId)).build());
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<?>> removeItem(@PathVariable Long productId, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Wishlist updated").data(wishlistService.removeItem(authentication.getName(), productId)).build());
    }
}
