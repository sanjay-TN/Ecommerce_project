package com.flipkartclone.ecommerce.service.impl;

import com.flipkartclone.ecommerce.dto.cart.CartItemRequest;
import com.flipkartclone.ecommerce.dto.cart.CartItemResponse;
import com.flipkartclone.ecommerce.dto.cart.CartResponse;
import com.flipkartclone.ecommerce.entity.AppUser;
import com.flipkartclone.ecommerce.entity.Cart;
import com.flipkartclone.ecommerce.entity.CartItem;
import com.flipkartclone.ecommerce.entity.Product;
import com.flipkartclone.ecommerce.exception.ResourceNotFoundException;
import com.flipkartclone.ecommerce.repository.CartRepository;
import com.flipkartclone.ecommerce.repository.ProductRepository;
import com.flipkartclone.ecommerce.repository.UserRepository;
import com.flipkartclone.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final MapperService mapperService;

    @Override
    public CartResponse getCart(String email) {
        return mapCart(getOrCreateCart(fetchUser(email)));
    }

    @Override
    public CartResponse addToCart(String email, CartItemRequest request) {
        Cart cart = getOrCreateCart(fetchUser(email));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        CartItem item = cart.getItems().stream()
                .filter(existing -> existing.getProduct().getId().equals(product.getId()))
                .findFirst()
                .orElse(null);
        if (item == null) {
            cart.getItems().add(CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build());
        } else {
            item.setQuantity(item.getQuantity() + request.getQuantity());
        }
        return mapCart(cartRepository.save(cart));
    }

    @Override
    public CartResponse updateQuantity(String email, Long itemId, Integer quantity) {
        Cart cart = getOrCreateCart(fetchUser(email));
        CartItem item = cart.getItems().stream()
                .filter(existing -> existing.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        item.setQuantity(quantity);
        return mapCart(cartRepository.save(cart));
    }

    @Override
    public CartResponse removeItem(String email, Long itemId) {
        Cart cart = getOrCreateCart(fetchUser(email));
        cart.getItems().removeIf(item -> item.getId().equals(itemId));
        return mapCart(cartRepository.save(cart));
    }

    @Override
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private AppUser fetchUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Cart getOrCreateCart(AppUser user) {
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
    }

    private CartResponse mapCart(Cart cart) {
        List<CartItemResponse> items = cart.getItems().stream()
                .map(item -> CartItemResponse.builder()
                        .id(item.getId())
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .thumbnail(item.getProduct().getThumbnail())
                        .quantity(item.getQuantity())
                        .price(item.getProduct().getPrice())
                        .total(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                        .build())
                .toList();

        BigDecimal subtotal = items.stream()
                .map(CartItemResponse::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal shipping = mapperService.calculateShipping(subtotal);

        return CartResponse.builder()
                .id(cart.getId())
                .items(items)
                .subtotal(subtotal)
                .shipping(shipping)
                .grandTotal(subtotal.add(shipping))
                .build();
    }
}
