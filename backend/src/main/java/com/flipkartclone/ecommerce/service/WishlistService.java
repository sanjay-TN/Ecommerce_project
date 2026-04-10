package com.flipkartclone.ecommerce.service;

import com.flipkartclone.ecommerce.dto.product.ProductResponse;

import java.util.List;

public interface WishlistService {
    List<ProductResponse> getWishlist(String email);
    List<ProductResponse> addItem(String email, Long productId);
    List<ProductResponse> removeItem(String email, Long productId);
}
