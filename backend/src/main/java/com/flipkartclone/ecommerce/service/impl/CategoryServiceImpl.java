package com.flipkartclone.ecommerce.service.impl;

import com.flipkartclone.ecommerce.dto.category.CategoryRequest;
import com.flipkartclone.ecommerce.dto.category.CategoryResponse;
import com.flipkartclone.ecommerce.entity.Category;
import com.flipkartclone.ecommerce.exception.BadRequestException;
import com.flipkartclone.ecommerce.exception.ResourceNotFoundException;
import com.flipkartclone.ecommerce.repository.CategoryRepository;
import com.flipkartclone.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final MapperService mapperService;

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(mapperService::toCategoryResponse)
                .toList();
    }

    @Override
    public CategoryResponse create(CategoryRequest request) {
        categoryRepository.findByNameIgnoreCase(request.getName()).ifPresent(existing -> {
            throw new BadRequestException("Category already exists");
        });

        Category category = categoryRepository.save(Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build());
        return mapperService.toCategoryResponse(category);
    }

    @Override
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        return mapperService.toCategoryResponse(categoryRepository.save(category));
    }

    @Override
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found");
        }
        categoryRepository.deleteById(id);
    }
}
