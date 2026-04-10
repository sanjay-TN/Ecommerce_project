package com.flipkartclone.ecommerce.service;

import com.flipkartclone.ecommerce.dto.cart.CartItemRequest;
import com.flipkartclone.ecommerce.dto.cart.CartResponse;

public interface CartService {
    CartResponse getCart(String email);
    CartResponse addToCart(String email, CartItemRequest request);
    CartResponse updateQuantity(String email, Long itemId, Integer quantity);
    CartResponse removeItem(String email, Long itemId);
    void clearCart(Long userId);
}
