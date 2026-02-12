package com.oek.catalog.service;

import com.oek.catalog.dto.request.CategoryCreateRequest;
import com.oek.catalog.dto.request.CategoryUpdateRequest;
import com.oek.catalog.dto.response.CategoryResponse;
import com.oek.catalog.entity.Category;
import com.oek.catalog.entity.Product;
import com.oek.catalog.exception.ResourceNotFoundException;
import com.oek.catalog.exception.ValidationException;
import com.oek.catalog.repository.CategoryRepository;
import com.oek.catalog.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Сервис для работы с категориями
 */
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> findAll() {
        return categoryRepository.findAllByOrderByNameAsc().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CategoryResponse findById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));
        return mapToResponse(category);
    }

    @Transactional
    public CategoryResponse create(CategoryCreateRequest request) {
        if (categoryRepository.findByName(request.getName()).isPresent()) {
            throw new ValidationException("Category with name '" + request.getName() + "' already exists");
        }

        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        category = categoryRepository.save(category);
        return mapToResponse(category);
    }

    @Transactional
    public CategoryResponse update(Long id, CategoryUpdateRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));

        if (request.getName() != null && !request.getName().isBlank()) {
            categoryRepository.findByName(request.getName())
                    .ifPresent(existing -> {
                        if (!existing.getId().equals(id)) {
                            throw new ValidationException("Category with name '" + request.getName() + "' already exists");
                        }
                    });
            category.setName(request.getName());
        }

        if (request.getDescription() != null) {
            category.setDescription(request.getDescription());
        }

        category = categoryRepository.save(category);
        return mapToResponse(category);
    }

    @Transactional
    public void delete(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));

        // Устанавливаем статус "не активен" для всех продуктов категории
        List<Product> products = productRepository.findByCategoryIdAndStatus(id, true);
        products.forEach(product -> product.setStatus(false));
        productRepository.saveAll(products);

        categoryRepository.delete(category);
    }

    private CategoryResponse mapToResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .createdAt(category.getCreatedAt())
                .build();
    }
}
