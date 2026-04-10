package com.flipkartclone.ecommerce.service.impl;

import com.flipkartclone.ecommerce.dto.product.ProductResponse;
import com.flipkartclone.ecommerce.entity.AppUser;
import com.flipkartclone.ecommerce.entity.Product;
import com.flipkartclone.ecommerce.entity.WishlistItem;
import com.flipkartclone.ecommerce.exception.ResourceNotFoundException;
import com.flipkartclone.ecommerce.repository.ProductRepository;
import com.flipkartclone.ecommerce.repository.UserRepository;
import com.flipkartclone.ecommerce.repository.WishlistRepository;
import com.flipkartclone.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final MapperService mapperService;

    @Override
    public List<ProductResponse> getWishlist(String email) {
        AppUser user = fetchUser(email);
        return wishlistRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(WishlistItem::getProduct)
                .map(mapperService::toProductResponse)
                .toList();
    }

    @Override
    public List<ProductResponse> addItem(String email, Long productId) {
        AppUser user = fetchUser(email);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        wishlistRepository.findByUserIdAndProductId(user.getId(), productId)
                .orElseGet(() -> wishlistRepository.save(WishlistItem.builder()
                        .user(user)
                        .product(product)
                        .createdAt(LocalDateTime.now())
                        .build()));
        return getWishlist(email);
    }

    @Override
    public List<ProductResponse> removeItem(String email, Long productId) {
        AppUser user = fetchUser(email);
        wishlistRepository.findByUserIdAndProductId(user.getId(), productId)
                .ifPresent(wishlistRepository::delete);
        return getWishlist(email);
    }

    private AppUser fetchUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
