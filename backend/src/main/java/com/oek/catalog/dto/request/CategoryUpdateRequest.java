package com.oek.catalog.dto.request;

import lombok.Data;

/**
 * DTO для обновления категории
 */
@Data
public class CategoryUpdateRequest {
    
    private String name;
    
    private String description;
}
