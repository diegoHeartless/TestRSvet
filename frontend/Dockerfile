# Многостадийная сборка фронтенда
FROM node:18-alpine AS build
WORKDIR /app

# Аргументы для сборки
ARG VITE_API_URL=http://localhost:8080/api

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходный код и собираем приложение
COPY . .
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Финальный образ с nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Удаляем дефолтные файлы nginx
RUN rm -rf ./*

# Копируем собранные файлы
COPY --from=build /app/dist .

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
