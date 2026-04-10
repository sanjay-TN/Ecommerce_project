package com.flipkartclone.ecommerce.service.impl;

import com.flipkartclone.ecommerce.dto.order.CheckoutRequest;
import com.flipkartclone.ecommerce.dto.order.OrderResponse;
import com.flipkartclone.ecommerce.entity.*;
import com.flipkartclone.ecommerce.exception.BadRequestException;
import com.flipkartclone.ecommerce.exception.ResourceNotFoundException;
import com.flipkartclone.ecommerce.repository.OrderRepository;
import com.flipkartclone.ecommerce.repository.ProductRepository;
import com.flipkartclone.ecommerce.repository.UserRepository;
import com.flipkartclone.ecommerce.service.CartService;
import com.flipkartclone.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final MapperService mapperService;

    @Override
    public OrderResponse checkout(String email, CheckoutRequest request) {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        var cart = cartService.getCart(email);
        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        ShippingAddress address = ShippingAddress.builder()
                .label(request.getShippingAddress().getLabel())
                .line1(request.getShippingAddress().getLine1())
                .line2(request.getShippingAddress().getLine2())
                .city(request.getShippingAddress().getCity())
                .state(request.getShippingAddress().getState())
                .postalCode(request.getShippingAddress().getPostalCode())
                .country(request.getShippingAddress().getCountry())
                .phoneNumber(request.getShippingAddress().getPhoneNumber())
                .build();

        Order order = Order.builder()
                .orderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .user(user)
                .orderStatus(OrderStatus.CONFIRMED)
                .paymentStatus(PaymentStatus.SUCCESS)
                .subtotal(cart.getSubtotal())
                .shippingCharge(cart.getShipping())
                .totalAmount(cart.getGrandTotal())
                .paymentInfo(PaymentInfo.builder()
                        .paymentMethod(request.getPaymentMethod())
                        .paymentReference("PAY-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase())
                        .build())
                .shippingAddress(address)
                .createdAt(LocalDateTime.now())
                .build();

        cart.getItems().forEach(item -> {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            if (product.getStock() < item.getQuantity()) {
                throw new BadRequestException("Insufficient stock for " + product.getName());
            }
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
            order.getItems().add(OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(item.getQuantity())
                    .price(item.getPrice())
                    .build());
        });

        Order savedOrder = orderRepository.save(order);
        cartService.clearCart(user.getId());
        return mapperService.toOrderResponse(savedOrder);
    }

    @Override
    public List<OrderResponse> getUserOrders(String email) {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(mapperService::toOrderResponse)
                .toList();
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .map(mapperService::toOrderResponse)
                .toList();
    }

    @Override
    public OrderResponse updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setOrderStatus(status);
        return mapperService.toOrderResponse(orderRepository.save(order));
    }

    @Override
    public OrderResponse cancelOrder(String email, Long orderId) {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("You can only cancel your own orders");
        }
        if (order.getOrderStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Order is already cancelled");
        }
        if (order.getOrderStatus() == OrderStatus.SHIPPED
                || order.getOrderStatus() == OrderStatus.OUT_FOR_DELIVERY
                || order.getOrderStatus() == OrderStatus.DELIVERED) {
            throw new BadRequestException("This order can no longer be cancelled");
        }

        order.getItems().forEach(item -> {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
            productRepository.save(product);
        });

        order.setOrderStatus(OrderStatus.CANCELLED);
        return mapperService.toOrderResponse(orderRepository.save(order));
    }
}
