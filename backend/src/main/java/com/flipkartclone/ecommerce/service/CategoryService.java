package com.flipkartclone.ecommerce.service;

import com.flipkartclone.ecommerce.dto.category.CategoryRequest;
import com.flipkartclone.ecommerce.dto.category.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    CategoryResponse create(CategoryRequest request);
    CategoryResponse update(Long id, CategoryRequest request);
    void delete(Long id);
}
