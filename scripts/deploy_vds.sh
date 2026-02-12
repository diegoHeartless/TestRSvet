#!/bin/bash
# Скрипт деплоя на VDS с поддержкой SSL

set -e

echo "🚀 Starting deployment..."

# Проверка переменных окружения
if [ -z "$GHCR_IMAGE_BACKEND" ] || [ -z "$GHCR_IMAGE_FRONTEND" ]; then
    echo "❌ Error: GHCR_IMAGE_BACKEND and GHCR_IMAGE_FRONTEND must be set"
    exit 1
fi

# Логин в GHCR если токен установлен
if [ -n "$GHCR_TOKEN" ]; then
    echo "🔐 Logging in to GitHub Container Registry..."
    echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GITHUB_ACTOR" --password-stdin || {
        echo "⚠️  Warning: Failed to login to GHCR. Trying to pull anyway..."
    }
fi

# Настройка SSL если включен
if [ "$SSL_ENABLED" = "true" ] && [ -n "$SSL_DOMAIN" ]; then
    echo "🔒 SSL is enabled for domain: $SSL_DOMAIN"
    
    # Создать директорию для SSL сертификатов
    mkdir -p "$SSL_CERT_PATH"
    
    # Проверка наличия certbot
    if ! command -v certbot &> /dev/null; then
        echo "📦 Installing certbot..."
        if command -v apt-get &> /dev/null; then
            sudo apt-get update
            sudo apt-get install -y certbot
        elif command -v yum &> /dev/null; then
            sudo yum install -y certbot
        fi
    fi
    
    # Получение сертификата если его нет
    if [ ! -f "$SSL_CERT_PATH/fullchain.pem" ] || [ ! -f "$SSL_CERT_PATH/privkey.pem" ]; then
        echo "📜 Obtaining SSL certificate..."
        if [ -n "$SSL_EMAIL" ]; then
            sudo certbot certonly --standalone -d "$SSL_DOMAIN" --email "$SSL_EMAIL" --agree-tos --non-interactive || {
                echo "⚠️  Warning: Failed to obtain SSL certificate. Continuing without SSL..."
                export SSL_ENABLED="false"
            }
        else
            echo "⚠️  Warning: SSL_EMAIL not set. Cannot obtain certificate automatically."
            export SSL_ENABLED="false"
        fi
        
        # Копируем сертификаты в нужную директорию
        if [ -f "/etc/letsencrypt/live/$SSL_DOMAIN/fullchain.pem" ]; then
            sudo cp /etc/letsencrypt/live/$SSL_DOMAIN/fullchain.pem "$SSL_CERT_PATH/"
            sudo cp /etc/letsencrypt/live/$SSL_DOMAIN/privkey.pem "$SSL_CERT_PATH/"
            sudo chown -R $USER:$USER "$SSL_CERT_PATH"
        fi
    else
        echo "✅ SSL certificates already exist"
    fi
else
    echo "ℹ️  SSL is disabled"
    export SSL_ENABLED="false"
fi

# Обновление образов
echo "📥 Pulling latest images..."
docker-compose -f docker-compose.prod.yml pull || docker compose -f docker-compose.prod.yml pull

# Запуск сервисов
echo "🚀 Starting services..."
docker-compose -f docker-compose.prod.yml up -d || docker compose -f docker-compose.prod.yml up -d

# Проверка статуса
echo "⏳ Waiting for services to start..."
sleep 5

echo "📊 Service status:"
docker-compose -f docker-compose.prod.yml ps || docker compose -f docker-compose.prod.yml ps

echo "✅ Deployment completed successfully!"
