package com.flipkartclone.ecommerce.controller;

import com.flipkartclone.ecommerce.dto.common.ApiResponse;
import com.flipkartclone.ecommerce.dto.product.ProductRequest;
import com.flipkartclone.ecommerce.dto.review.ReviewRequest;
import com.flipkartclone.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String direction,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Boolean featured) {
        Page<?> products = productService.getProducts(search, categoryId, sortBy, direction, page, size, minPrice, maxPrice, featured);
        return ResponseEntity.ok(ApiResponse.builder().success(true).data(products).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).data(productService.getProductById(id)).build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> createProduct(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Product created").data(productService.createProduct(request)).build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Product updated").data(productService.updateProduct(id, request)).build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Product deleted").build());
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<ApiResponse<?>> addReview(@PathVariable Long id,
                                                    @Valid @RequestBody ReviewRequest request,
                                                    Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Review submitted")
                .data(productService.addReview(id, authentication.getName(), request))
                .build());
    }

    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> uploadImage(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Image uploaded")
                .data(productService.uploadImage(file))
                .build());
    }
}
