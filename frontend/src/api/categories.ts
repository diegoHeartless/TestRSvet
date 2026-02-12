import apiClient from './client'
import { Category, CategoryCreateRequest, CategoryUpdateRequest } from '../types/category'

/**
 * API функции для работы с категориями
 */
export const categoriesApi = {
  /**
   * Получить список всех категорий
   */
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories')
    return response.data
  },

  /**
   * Получить категорию по ID
   */
  getById: async (id: number): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/${id}`)
    return response.data
  },

  /**
   * Создать категорию
   */
  create: async (data: CategoryCreateRequest): Promise<Category> => {
    const response = await apiClient.post<Category>('/categories', data)
    return response.data
  },

  /**
   * Обновить категорию
   */
  update: async (id: number, data: CategoryUpdateRequest): Promise<Category> => {
    const response = await apiClient.put<Category>(`/categories/${id}`, data)
    return response.data
  },

  /**
   * Удалить категорию
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/categories/${id}`)
  },
}
