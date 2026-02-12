package com.oek.catalog.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO для создания категории
 */
@Data
public class CategoryCreateRequest {
    
    @NotBlank(message = "Category name is required")
    private String name;
    
    private String description;
}
