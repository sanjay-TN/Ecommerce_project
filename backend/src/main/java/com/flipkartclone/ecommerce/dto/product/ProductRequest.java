package com.flipkartclone.ecommerce.dto.product;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String sku;
    private String description;
    @NotNull
    @DecimalMin("0.0")
    private BigDecimal price;
    @NotNull
    @DecimalMin("0.0")
    private BigDecimal originalPrice;
    @NotNull
    @Min(0)
    private Integer stock;
    private String brand;
    private Boolean featured;
    @NotNull
    private Long categoryId;
    private String thumbnail;
    private List<String> imageUrls;
}
