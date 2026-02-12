package com.oek.catalog.controller;

import com.oek.catalog.dto.request.LoginRequest;
import com.oek.catalog.dto.response.AuthResponse;
import com.oek.catalog.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Контроллер для авторизации
 */
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "API для авторизации")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Авторизация пользователя", description = "Возвращает JWT токен для авторизованного пользователя")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
