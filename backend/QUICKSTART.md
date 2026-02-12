# Быстрый старт Backend

## Шаг 1: Проверка установки JDK

Убедитесь, что JDK 17 установлен и настроен:

```cmd
java -version
javac -version
```

Должны отображаться версии Java 17 и компилятора.

## Шаг 2: Настройка JAVA_HOME (если не настроено)

Если `javac` не найден, установите JAVA_HOME:

```cmd
set JAVA_HOME=C:\Users\user\.jdks\corretto-17.0.7
set PATH=%JAVA_HOME%\bin;%PATH%
```

## Шаг 3: Запуск PostgreSQL

```cmd
cd backend
docker-compose up -d
```

Проверка, что PostgreSQL запущен:
```cmd
docker ps
```

## Шаг 4: Сборка проекта

```cmd
cd backend
build.bat
```

Или напрямую через Maven:

```cmd
E:\apache-maven-3.9.12-bin\apache-maven-3.9.12\bin\mvn.cmd clean package
```

## Шаг 5: Запуск приложения

### Вариант 1: Через Maven (рекомендуется для разработки)

```cmd
cd backend
run.bat
```

Или напрямую:

```cmd
E:\apache-maven-3.9.12-bin\apache-maven-3.9.12\bin\mvn.cmd spring-boot:run
```

### Вариант 2: Через собранный JAR

После успешной сборки:

```cmd
cd backend
java -jar target\catalog-1.0.0.jar
```

## Шаг 6: Проверка работы

1. Откройте Swagger UI: http://localhost:8080/swagger-ui.html
2. Авторизуйтесь через `/api/auth/login`:
   - Username: `admin`
   - Password: `admin`
3. Скопируйте полученный токен
4. Нажмите кнопку "Authorize" в Swagger UI и вставьте токен (без слова "Bearer")

## Тестовые пользователи

- **Admin**: `admin` / `admin` (полный доступ)
- **User**: `user` / `user` (только просмотр)

## Остановка приложения

Нажмите `Ctrl+C` в терминале, где запущено приложение.

## Остановка PostgreSQL

```cmd
cd backend
docker-compose down
```

Для удаления данных:
```cmd
docker-compose down -v
```

## Решение проблем

### Ошибка: "Could not find or load main class CatalogApplication"

**Причина:** Проект не собран или запуск выполняется не из правильной директории.

**Решение:**
1. Убедитесь, что вы находитесь в директории `backend`
2. Сначала выполните сборку: `build.bat` или `mvn clean package`
3. Запускайте через Maven: `mvn spring-boot:run` или через JAR: `java -jar target\catalog-1.0.0.jar`

### Ошибка: "No compiler is provided"

**Решение:** Установите JAVA_HOME на путь к JDK 17 (см. Шаг 2)

### Ошибка подключения к базе данных

**Решение:** Убедитесь, что PostgreSQL запущен через `docker-compose up -d`
