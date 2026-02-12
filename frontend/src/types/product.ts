/**
 * Типы для работы с продуктами
 */

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  imageUrl?: string
  categoryId: number
  categoryName?: string
  createdAt: string
  status: boolean
}

export interface ProductCreateRequest {
  name: string
  description?: string
  price: number
  imageUrl?: string
  categoryId: number
}

export interface ProductUpdateRequest {
  name?: string
  description?: string
  price?: number
  imageUrl?: string
  categoryId?: number
  status?: boolean
}

export interface ProductSearchRequest {
  categoryId?: number
  name?: string
  minPrice?: number
  maxPrice?: number
}
