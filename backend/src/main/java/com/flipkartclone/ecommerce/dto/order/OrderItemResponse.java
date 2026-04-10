package com.flipkartclone.ecommerce.dto.order;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderItemResponse {
    private Long productId;
    private String productName;
    private String thumbnail;
    private Integer quantity;
    private BigDecimal price;
}
