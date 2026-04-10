package com.flipkartclone.ecommerce.dto.product;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private String sku;
    private String description;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer stock;
    private String brand;
    private Double averageRating;
    private Integer totalRatings;
    private Boolean featured;
    private String thumbnail;
    private String categoryName;
    private LocalDateTime createdAt;
    private List<String> images;
    private List<ReviewResponse> reviews;
}
