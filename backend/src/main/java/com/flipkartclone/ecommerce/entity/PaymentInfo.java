package com.flipkartclone.ecommerce.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentInfo {
    private String paymentMethod;
    private String paymentReference;
}
