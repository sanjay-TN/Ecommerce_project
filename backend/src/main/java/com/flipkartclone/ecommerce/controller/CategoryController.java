package com.flipkartclone.ecommerce.controller;

import com.flipkartclone.ecommerce.dto.category.CategoryRequest;
import com.flipkartclone.ecommerce.dto.common.ApiResponse;
import com.flipkartclone.ecommerce.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getCategories() {
        return ResponseEntity.ok(ApiResponse.builder().success(true).data(categoryService.getAllCategories()).build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> createCategory(@Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Category created").data(categoryService.create(request)).build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Category updated").data(categoryService.update(id, request)).build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> deleteCategory(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).message("Category deleted").build());
    }
}
