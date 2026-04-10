package com.flipkartclone.ecommerce.dto.cart;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CartItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private String thumbnail;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal total;
}
