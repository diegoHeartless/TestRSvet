package com.oek.catalog.exception;

/**
 * Исключение при ошибке валидации
 */
public class ValidationException extends RuntimeException {
    
    public ValidationException(String message) {
        super(message);
    }
}
