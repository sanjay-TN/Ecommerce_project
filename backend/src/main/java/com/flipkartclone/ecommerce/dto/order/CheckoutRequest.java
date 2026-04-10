package com.flipkartclone.ecommerce.dto.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CheckoutRequest {
    @Valid
    @NotNull
    private AddressRequest shippingAddress;
    @NotBlank
    private String paymentMethod;
}
