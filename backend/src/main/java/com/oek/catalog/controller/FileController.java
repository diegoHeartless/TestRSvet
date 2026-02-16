package com.oek.catalog.controller;

import com.oek.catalog.service.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

/**
 * Контроллер для работы с файлами (загрузка и получение изображений)
 */
@RestController
@RequestMapping("/api/files")
@Tag(name = "Files", description = "API для загрузки и получения файлов")
@RequiredArgsConstructor
public class FileController {

    private final FileStorageService fileStorageService;

    @PostMapping("/products/upload")
    @Operation(summary = "Загрузить изображение продукта", description = "Доступно только для ADMIN. Максимальный размер: 5MB. Форматы: JPEG, PNG, GIF, WEBP")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<UploadResponse> uploadProductImage(@RequestParam("file") MultipartFile file) {
        String imageUrl = fileStorageService.saveProductImage(file);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new UploadResponse(imageUrl));
    }

    @GetMapping("/products/{filename:.+}")
    @Operation(summary = "Получить изображение продукта", description = "Публичный доступ")
    public ResponseEntity<Resource> getProductImage(@PathVariable String filename) {
        try {
            // Поддержка и полного пути, и только имени файла
            Path filePath = fileStorageService.getFilePath("/api/files/products/" + filename);
            if (filePath == null || !java.nio.file.Files.exists(filePath)) {
                filePath = fileStorageService.getFilePath(filename);
            }
            if (filePath == null || !java.nio.file.Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = determineContentType(filename);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String determineContentType(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        return switch (extension) {
            case "jpg", "jpeg" -> "image/jpeg";
            case "png" -> "image/png";
            case "gif" -> "image/gif";
            case "webp" -> "image/webp";
            default -> "application/octet-stream";
        };
    }

    /**
     * DTO для ответа при загрузке файла
     */
    public record UploadResponse(String imageUrl) {
    }
}
