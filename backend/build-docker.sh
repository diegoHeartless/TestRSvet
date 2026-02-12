#!/bin/bash
# Скрипт для сборки Docker образа бекенда из Git репозитория

# Получаем URL репозитория
GIT_REPO_URL=${1:-$(git config --get remote.origin.url)}
GIT_COMMIT=${2:-HEAD}
GIT_BRANCH=${3:-main}

if [ -z "$GIT_REPO_URL" ]; then
    echo "Error: Git repository URL not found. Please provide it as first argument."
    echo "Usage: $0 [GIT_REPO_URL] [COMMIT_HASH] [BRANCH]"
    exit 1
fi

# Получаем короткий хеш коммита
GIT_SHORT_COMMIT=$(git rev-parse --short $GIT_COMMIT 2>/dev/null || echo $GIT_COMMIT)

echo "Building Docker image from Git repository"
echo "Repository: $GIT_REPO_URL"
echo "Branch: $GIT_BRANCH"
echo "Commit: $GIT_COMMIT ($GIT_SHORT_COMMIT)"

# Собираем образ с тегом, включающим короткий хеш коммита
docker build \
  --build-arg GIT_REPO_URL=$GIT_REPO_URL \
  --build-arg GIT_COMMIT=$GIT_COMMIT \
  --build-arg GIT_BRANCH=$GIT_BRANCH \
  -t catalog-backend:latest \
  -t catalog-backend:$GIT_SHORT_COMMIT \
  -t catalog-backend:$(date +%Y%m%d-%H%M%S) \
  .

if [ $? -eq 0 ]; then
    echo ""
    echo "Image built successfully!"
    echo "Tags: catalog-backend:latest, catalog-backend:$GIT_SHORT_COMMIT"
else
    echo ""
    echo "Build failed!"
    exit 1
fi
