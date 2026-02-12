# Многостадийная сборка из Git репозитория
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Установка Git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Аргументы для сборки
ARG GIT_REPO_URL
ARG GIT_COMMIT=HEAD
ARG GIT_BRANCH=main

# Клонируем репозиторий
RUN if [ -z "$GIT_REPO_URL" ]; then \
      echo "Error: GIT_REPO_URL must be provided" && exit 1; \
    fi && \
    echo "Cloning repository: $GIT_REPO_URL" && \
    git clone --depth 1 --branch ${GIT_BRANCH} ${GIT_REPO_URL} . || \
    git clone --depth 1 ${GIT_REPO_URL} . && \
    echo "Checking out commit: $GIT_COMMIT" && \
    git checkout ${GIT_COMMIT} && \
    echo "Commit hash: $(git rev-parse HEAD)"

# Переходим в директорию backend
WORKDIR /app/backend

# Копируем pom.xml и загружаем зависимости
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Копируем исходный код и собираем приложение
COPY src ./src
RUN mvn clean package -DskipTests

# Финальный образ
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Добавляем метаданные о коммите
ARG GIT_COMMIT=unknown
ARG GIT_REPO_URL=unknown
ARG BUILD_DATE=unknown
LABEL git.commit=$GIT_COMMIT
LABEL git.repo=$GIT_REPO_URL
LABEL build.date=$BUILD_DATE

# Копируем собранный JAR
COPY --from=build /app/backend/target/*.jar app.jar

# Открываем порт
EXPOSE 8080

# Запускаем приложение
ENTRYPOINT ["java", "-jar", "app.jar"]
