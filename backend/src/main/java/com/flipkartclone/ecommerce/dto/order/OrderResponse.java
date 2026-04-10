package com.flipkartclone.ecommerce.dto.order;

import com.flipkartclone.ecommerce.entity.OrderStatus;
import com.flipkartclone.ecommerce.entity.PaymentStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderResponse {
    private Long id;
    private String orderNumber;
    private String customerName;
    private String customerEmail;
    private OrderStatus orderStatus;
    private PaymentStatus paymentStatus;
    private BigDecimal subtotal;
    private BigDecimal shippingCharge;
    private BigDecimal totalAmount;
    private String paymentMethod;
    private String paymentReference;
    private AddressRequest shippingAddress;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;
}
