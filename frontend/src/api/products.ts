import apiClient from './client'
import { Product, ProductCreateRequest, ProductUpdateRequest, ProductSearchRequest } from '../types/product'

/**
 * API функции для работы с продуктами
 */
export const productsApi = {
  /**
   * Поиск продуктов с фильтрами
   */
  search: async (params: ProductSearchRequest): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products/search', { params })
    return response.data
  },

  /**
   * Получить продукт по ID
   */
  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`)
    return response.data
  },

  /**
   * Создать продукт
   */
  create: async (data: ProductCreateRequest): Promise<Product> => {
    const response = await apiClient.post<Product>('/products', data)
    return response.data
  },

  /**
   * Обновить продукт
   */
  update: async (id: number, data: ProductUpdateRequest): Promise<Product> => {
    const response = await apiClient.put<Product>(`/products/${id}`, data)
    return response.data
  },

  /**
   * Удалить продукт
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`)
  },
}
