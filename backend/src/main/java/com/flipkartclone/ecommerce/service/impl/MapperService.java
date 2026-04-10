package com.flipkartclone.ecommerce.service.impl;

import com.flipkartclone.ecommerce.dto.category.CategoryResponse;
import com.flipkartclone.ecommerce.dto.order.AddressRequest;
import com.flipkartclone.ecommerce.dto.order.OrderItemResponse;
import com.flipkartclone.ecommerce.dto.order.OrderResponse;
import com.flipkartclone.ecommerce.dto.product.ProductResponse;
import com.flipkartclone.ecommerce.dto.product.ReviewResponse;
import com.flipkartclone.ecommerce.dto.user.UserResponse;
import com.flipkartclone.ecommerce.entity.*;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class MapperService {

    public UserResponse toUserResponse(AppUser user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .enabled(user.isEnabled())
                .build();
    }

    public CategoryResponse toCategoryResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .productCount(category.getProducts() == null ? 0 : category.getProducts().size())
                .build();
    }

    public ProductResponse toProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .description(product.getDescription())
                .price(product.getPrice())
                .originalPrice(product.getOriginalPrice())
                .stock(product.getStock())
                .brand(product.getBrand())
                .averageRating(product.getAverageRating())
                .totalRatings(product.getTotalRatings())
                .featured(product.getFeatured())
                .thumbnail(product.getThumbnail())
                .categoryName(product.getCategory().getName())
                .createdAt(product.getCreatedAt())
                .images(product.getImages().stream().map(ProductImage::getImageUrl).toList())
                .reviews(product.getReviews().stream().map(review -> ReviewResponse.builder()
                        .id(review.getId())
                        .userName(review.getUser().getFullName())
                        .rating(review.getRating())
                        .comment(review.getComment())
                        .createdAt(review.getCreatedAt())
                        .build()).toList())
                .build();
    }

    public OrderResponse toOrderResponse(Order order) {
        ShippingAddress shippingAddress = order.getShippingAddress();
        AddressRequest address = new AddressRequest();
        address.setLabel(shippingAddress.getLabel());
        address.setLine1(shippingAddress.getLine1());
        address.setLine2(shippingAddress.getLine2());
        address.setCity(shippingAddress.getCity());
        address.setState(shippingAddress.getState());
        address.setPostalCode(shippingAddress.getPostalCode());
        address.setCountry(shippingAddress.getCountry());
        address.setPhoneNumber(shippingAddress.getPhoneNumber());

        List<OrderItemResponse> items = order.getItems().stream()
                .map(item -> OrderItemResponse.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .thumbnail(item.getProduct().getThumbnail())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .build())
                .toList();

        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .customerName(order.getUser().getFullName())
                .customerEmail(order.getUser().getEmail())
                .orderStatus(order.getOrderStatus())
                .paymentStatus(order.getPaymentStatus())
                .subtotal(order.getSubtotal())
                .shippingCharge(order.getShippingCharge())
                .totalAmount(order.getTotalAmount())
                .paymentMethod(order.getPaymentInfo().getPaymentMethod())
                .paymentReference(order.getPaymentInfo().getPaymentReference())
                .shippingAddress(address)
                .createdAt(order.getCreatedAt())
                .items(items)
                .build();
    }

    public BigDecimal calculateShipping(BigDecimal subtotal) {
        return subtotal.compareTo(new BigDecimal("499")) >= 0 ? BigDecimal.ZERO : new BigDecimal("49");
    }
}
