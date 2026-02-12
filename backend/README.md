# Product Catalog API

REST API для управления каталогом продуктов с авторизацией и ролями пользователей.

## Технологии

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA / Hibernate
- PostgreSQL 15
- Spring Security (JWT)
- Swagger/OpenAPI
- Flyway (миграции БД)
- Maven

## Требования

- JDK 17+
- Maven 3.6+
- Docker и Docker Compose (для запуска PostgreSQL)

## Быстрый старт

### 1. Запуск PostgreSQL через Docker Compose

```bash
cd backend
docker-compose up -d
```

### 2. Настройка переменных окружения (опционально)

Создайте файл `.env` или установите переменные окружения:

```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=catalog_db
export DB_USER=catalog_user
export DB_PASSWORD=catalog_password
export JWT_SECRET=your-secret-key-change-in-production-min-256-bits
export JWT_EXPIRATION=86400000
export SERVER_PORT=8080
```

### 3. Запуск приложения

```bash
mvn spring-boot:run
```

Или соберите и запустите JAR:

```bash
mvn clean package
java -jar target/catalog-1.0.0.jar
```

## API Документация

После запуска приложения Swagger UI доступен по адресу:
- http://localhost:8080/swagger-ui.html

## Тестовые пользователи

После запуска миграций создаются следующие пользователи:

- **Admin**: username: `admin`, password: `admin`
- **User**: username: `user`, password: `user`

## API Endpoints

### Авторизация
- `POST /api/auth/login` - Авторизация (публичный)

### Категории
- `GET /api/categories` - Список категорий (USER, ADMIN)
- `GET /api/categories/{id}` - Детали категории (USER, ADMIN)
- `POST /api/categories` - Создать категорию (ADMIN)
- `PUT /api/categories/{id}` - Обновить категорию (ADMIN)
- `DELETE /api/categories/{id}` - Удалить категорию (ADMIN)

### Продукты
- `GET /api/products/search` - Поиск продуктов с фильтрами (USER, ADMIN)
- `GET /api/products/{id}` - Детали продукта (USER, ADMIN)
- `POST /api/products` - Создать продукт (ADMIN)
- `PUT /api/products/{id}` - Обновить продукт (ADMIN)
- `DELETE /api/products/{id}` - Удалить продукт (ADMIN)

## Использование JWT токена

После авторизации используйте полученный токен в заголовке запросов:

```
Authorization: Bearer <your-token>
```

## Структура проекта

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/oek/catalog/
│   │   │   ├── config/          # Конфигурация (Security, Swagger)
│   │   │   ├── controller/      # REST контроллеры
│   │   │   ├── dto/             # DTO классы
│   │   │   ├── entity/         # JPA сущности
│   │   │   ├── exception/      # Обработка исключений
│   │   │   ├── repository/     # Репозитории
│   │   │   ├── security/       # JWT и Security компоненты
│   │   │   └── service/        # Бизнес-логика
│   │   └── resources/
│   │       ├── application.yml
│   │       └── db/migration/   # Flyway миграции
│   └── test/
└── pom.xml
```

## Docker

### Сборка образа

```bash
docker build -t catalog-api .
```

### Запуск контейнера

```bash
docker run -p 8080:8080 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_NAME=catalog_db \
  -e DB_USER=catalog_user \
  -e DB_PASSWORD=catalog_password \
  catalog-api
```

## Лицензия

Проект создан для тестового задания ОЭК.
