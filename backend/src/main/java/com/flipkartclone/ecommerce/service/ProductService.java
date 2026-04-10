package com.flipkartclone.ecommerce.service;

import com.flipkartclone.ecommerce.dto.product.ProductRequest;
import com.flipkartclone.ecommerce.dto.product.ProductResponse;
import com.flipkartclone.ecommerce.dto.review.ReviewRequest;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    Page<ProductResponse> getProducts(String search, Long categoryId, String sortBy, String direction,
                                      Integer page, Integer size, Double minPrice, Double maxPrice, Boolean featured);
    ProductResponse getProductById(Long id);
    ProductResponse createProduct(ProductRequest request);
    ProductResponse updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
    ProductResponse addReview(Long productId, String email, ReviewRequest request);
    String uploadImage(MultipartFile file);
}
