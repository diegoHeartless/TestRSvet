/**
 * Типы для работы с категориями
 */

export interface Category {
  id: number
  name: string
  description?: string
  createdAt: string
}

export interface CategoryCreateRequest {
  name: string
  description?: string
}

export interface CategoryUpdateRequest {
  name?: string
  description?: string
}
