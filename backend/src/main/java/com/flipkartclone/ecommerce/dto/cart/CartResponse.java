package com.flipkartclone.ecommerce.dto.cart;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CartResponse {
    private Long id;
    private List<CartItemResponse> items;
    private BigDecimal subtotal;
    private BigDecimal shipping;
    private BigDecimal grandTotal;
}
