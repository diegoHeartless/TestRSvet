package com.oek.catalog.config;

import com.oek.catalog.entity.User;
import com.oek.catalog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Инициализация начальных данных при запуске приложения
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initializeUsers();
    }

    private void initializeUsers() {
        // Создание пользователя ADMIN
        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("Created default admin user: admin/admin");
        }

        // Создание пользователя USER
        if (!userRepository.existsByUsername("user")) {
            User user = User.builder()
                    .username("user")
                    .password(passwordEncoder.encode("user"))
                    .role(User.Role.USER)
                    .build();
            userRepository.save(user);
            log.info("Created default user: user/user");
        }
    }
}
