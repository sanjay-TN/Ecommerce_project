package com.flipkartclone.ecommerce.service.impl;

import com.flipkartclone.ecommerce.dto.product.ProductRequest;
import com.flipkartclone.ecommerce.dto.product.ProductResponse;
import com.flipkartclone.ecommerce.dto.review.ReviewRequest;
import com.flipkartclone.ecommerce.entity.AppUser;
import com.flipkartclone.ecommerce.entity.Category;
import com.flipkartclone.ecommerce.entity.Product;
import com.flipkartclone.ecommerce.entity.ProductImage;
import com.flipkartclone.ecommerce.entity.Review;
import com.flipkartclone.ecommerce.exception.ResourceNotFoundException;
import com.flipkartclone.ecommerce.repository.CategoryRepository;
import com.flipkartclone.ecommerce.repository.ProductRepository;
import com.flipkartclone.ecommerce.repository.ReviewRepository;
import com.flipkartclone.ecommerce.repository.UserRepository;
import com.flipkartclone.ecommerce.service.ProductService;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final MapperService mapperService;

    @Value("${app.upload-dir}")
    private String uploadDir;

    @Override
    public Page<ProductResponse> getProducts(String search, Long categoryId, String sortBy, String direction,
                                             Integer page, Integer size, Double minPrice, Double maxPrice, Boolean featured) {
        Sort sort = Sort.by("desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC,
                StringUtils.hasText(sortBy) ? sortBy : "createdAt");

        return productRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.hasText(search)) {
                String like = "%" + search.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("brand")), like),
                        cb.like(cb.lower(root.get("description")), like)
                ));
            }
            if (categoryId != null) {
                predicates.add(cb.equal(root.get("category").get("id"), categoryId));
            }
            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), BigDecimal.valueOf(minPrice)));
            }
            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), BigDecimal.valueOf(maxPrice)));
            }
            if (featured != null) {
                predicates.add(cb.equal(root.get("featured"), featured));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        }, PageRequest.of(page == null ? 0 : page, size == null ? 12 : size, sort)).map(mapperService::toProductResponse);
    }

    @Override
    public ProductResponse getProductById(Long id) {
        return mapperService.toProductResponse(fetchProduct(id));
    }

    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product product = Product.builder()
                .name(request.getName())
                .sku(request.getSku())
                .description(request.getDescription())
                .price(request.getPrice())
                .originalPrice(request.getOriginalPrice())
                .stock(request.getStock())
                .brand(request.getBrand())
                .averageRating(0.0)
                .totalRatings(0)
                .featured(Boolean.TRUE.equals(request.getFeatured()))
                .thumbnail(request.getThumbnail())
                .category(category)
                .createdAt(LocalDateTime.now())
                .build();

        attachImages(product, request.getImageUrls());
        return mapperService.toProductResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = fetchProduct(id);
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setOriginalPrice(request.getOriginalPrice());
        product.setStock(request.getStock());
        product.setBrand(request.getBrand());
        product.setFeatured(Boolean.TRUE.equals(request.getFeatured()));
        product.setThumbnail(request.getThumbnail());
        product.setCategory(category);
        product.getImages().clear();
        attachImages(product, request.getImageUrls());

        return mapperService.toProductResponse(productRepository.save(product));
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.delete(fetchProduct(id));
    }

    @Override
    public ProductResponse addReview(Long productId, String email, ReviewRequest request) {
        Product product = fetchProduct(productId);
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Review review = reviewRepository.findByProductIdAndUserId(productId, user.getId())
                .orElse(Review.builder().product(product).user(user).createdAt(LocalDateTime.now()).build());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        reviewRepository.save(review);

        refreshRating(product);
        return mapperService.toProductResponse(productRepository.save(product));
    }

    @Override
    public String uploadImage(MultipartFile file) {
        try {
            String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
            Path target = Path.of(uploadDir).resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return "/api/uploads/" + filename;
        } catch (IOException ex) {
            throw new IllegalStateException("Unable to upload file");
        }
    }

    private Product fetchProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private void attachImages(Product product, List<String> imageUrls) {
        if (imageUrls == null) {
            return;
        }
        imageUrls.forEach(url -> product.getImages().add(ProductImage.builder()
                .imageUrl(url)
                .product(product)
                .build()));
    }

    private void refreshRating(Product product) {
        List<Review> reviews = reviewRepository.findByProductIdOrderByCreatedAtDesc(product.getId());
        double avg = reviews.stream().mapToInt(Review::getRating).average().orElse(0);
        product.setAverageRating(Math.round(avg * 10.0) / 10.0);
        product.setTotalRatings(reviews.size());
        product.setReviews(reviews);
    }
}
