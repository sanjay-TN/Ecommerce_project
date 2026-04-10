package com.flipkartclone.ecommerce.service;

import com.flipkartclone.ecommerce.dto.order.CheckoutRequest;
import com.flipkartclone.ecommerce.dto.order.OrderResponse;
import com.flipkartclone.ecommerce.entity.OrderStatus;

import java.util.List;

public interface OrderService {
    OrderResponse checkout(String email, CheckoutRequest request);
    List<OrderResponse> getUserOrders(String email);
    List<OrderResponse> getAllOrders();
    OrderResponse updateStatus(Long orderId, OrderStatus status);
    OrderResponse cancelOrder(String email, Long orderId);
}
