package com.oek.catalog.exception;

/**
 * Исключение при ошибке авторизации
 */
public class UnauthorizedException extends RuntimeException {
    
    public UnauthorizedException(String message) {
        super(message);
    }
}
