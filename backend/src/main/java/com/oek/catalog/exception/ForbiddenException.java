package com.oek.catalog.exception;

/**
 * Исключение при отсутствии доступа
 */
public class ForbiddenException extends RuntimeException {
    
    public ForbiddenException(String message) {
        super(message);
    }
}
