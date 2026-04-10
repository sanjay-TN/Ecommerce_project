package com.flipkartclone.ecommerce.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingAddress {
    private String label;
    private String line1;
    private String line2;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String phoneNumber;
}
