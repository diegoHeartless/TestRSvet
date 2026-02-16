package com.oek.catalog.service;

import com.oek.catalog.exception.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * Сервис для работы с файлами (загрузка, хранение изображений)
 */
@Service
@Slf4j
public class FileStorageService {

    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList(
            "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"
    );
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Value("${app.upload.url-prefix:/api/files}")
    private String urlPrefix;

    /**
     * Сохранить изображение продукта
     *
     * @param file файл изображения
     * @return URL для доступа к файлу
     */
    public String saveProductImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ValidationException("File is required");
        }

        // Проверка типа файла
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new ValidationException(
                    "Invalid file type. Allowed types: JPEG, PNG, GIF, WEBP"
            );
        }

        // Проверка размера файла
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new ValidationException(
                    "File size exceeds maximum allowed size of 5MB"
            );
        }

        try {
            // Создать директорию если не существует
            Path uploadPath = Paths.get(uploadDir, "products");
            Files.createDirectories(uploadPath);

            // Генерировать уникальное имя файла
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = UUID.randomUUID().toString() + extension;
            Path filePath = uploadPath.resolve(filename);

            // Сохранить файл
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Вернуть URL для доступа
            String url = urlPrefix + "/products/" + filename;
            log.info("File saved: {} -> {}", filePath, url);
            return url;

        } catch (IOException e) {
            log.error("Failed to save file", e);
            throw new RuntimeException("Failed to save file: " + e.getMessage(), e);
        }
    }

    /**
     * Удалить файл изображения
     *
     * @param imageUrl URL изображения
     */
    public void deleteProductImage(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return;
        }

        try {
            // Извлечь имя файла из URL
            String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            Path filePath = Paths.get(uploadDir, "products", filename);

            if (Files.exists(filePath)) {
                Files.delete(filePath);
                log.info("File deleted: {}", filePath);
            }
        } catch (IOException e) {
            log.warn("Failed to delete file: {}", imageUrl, e);
        }
    }

    /**
     * Получить путь к файлу по URL
     *
     * @param imageUrl URL изображения
     * @return путь к файлу
     */
    public Path getFilePath(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return null;
        }

        String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        return Paths.get(uploadDir, "products", filename);
    }
}
