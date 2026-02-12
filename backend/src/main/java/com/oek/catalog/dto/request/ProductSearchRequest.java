package com.oek.catalog.dto.request;

import jakarta.validation.constraints.DecimalMin;
import lombok.Data;

import java.math.BigDecimal;

/**
 * DTO для поиска продуктов с фильтрами
 */
@Data
public class ProductSearchRequest {
    
    private Long categoryId;
    
    private String name;
    
    @DecimalMin(value = "0.0", inclusive = true, message = "Min price must be >= 0")
    private BigDecimal minPrice;
    
    @DecimalMin(value = "0.0", inclusive = true, message = "Max price must be >= 0")
    private BigDecimal maxPrice;
}
