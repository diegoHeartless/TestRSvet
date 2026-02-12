# Frontend - Каталог продуктов

Frontend приложение для управления каталогом продуктов на React + TanStack Query + Ant Design.

## Технологии

- **React** 18+
- **TypeScript**
- **Vite** - сборщик
- **TanStack Query** (React Query) - управление состоянием сервера
- **Ant Design** 5.x - UI компоненты
- **React Router** - роутинг
- **Axios** - HTTP клиент

## Установка и запуск

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

### Сборка для production

```bash
npm run build
```

Собранные файлы будут в директории `dist/`

### Предпросмотр production сборки

```bash
npm run preview
```

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_URL=http://localhost:8080/api
```

## Структура проекта

```
frontend/
├── src/
│   ├── api/              # API клиенты
│   │   ├── client.ts     # Базовый axios клиент
│   │   ├── auth.ts       # API авторизации
│   │   ├── products.ts   # API продуктов
│   │   └── categories.ts # API категорий
│   ├── components/       # React компоненты
│   │   ├── Layout/       # Layout компоненты
│   │   ├── Auth/         # Компоненты авторизации
│   │   ├── Products/     # Компоненты продуктов
│   │   └── Categories/   # Компоненты категорий
│   ├── hooks/            # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   └── useCategories.ts
│   ├── store/            # Управление состоянием
│   │   └── authStore.ts
│   ├── types/            # TypeScript типы
│   │   ├── auth.ts
│   │   ├── product.ts
│   │   └── category.ts
│   ├── App.tsx          # Главный компонент
│   └── main.tsx         # Точка входа
├── public/              # Статические файлы
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Роутинг

- `/login` - страница авторизации
- `/products` - список продуктов (USER, ADMIN)
- `/categories` - список категорий (USER, ADMIN)
- `/admin/products` - управление продуктами (ADMIN)
- `/admin/products/new` - создание продукта (ADMIN)
- `/admin/products/:id` - редактирование продукта (ADMIN)
- `/admin/categories` - управление категориями (ADMIN)
- `/admin/categories/new` - создание категории (ADMIN)
- `/admin/categories/:id` - редактирование категории (ADMIN)

## Docker

### Сборка образа

```bash
docker build -t catalog-frontend .
```

### Запуск контейнера

```bash
docker run -p 80:80 catalog-frontend
```

## Лицензия

Проект создан для тестового задания ОЭК.
