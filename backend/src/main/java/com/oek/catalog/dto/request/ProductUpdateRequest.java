package com.oek.catalog.dto.request;

import jakarta.validation.constraints.DecimalMin;
import lombok.Data;

import java.math.BigDecimal;

/**
 * DTO для обновления продукта
 */
@Data
public class ProductUpdateRequest {
    
    private String name;
    
    private String description;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;
    
    private String imageUrl;
    
    private Long categoryId;
    
    private Boolean status;
}
