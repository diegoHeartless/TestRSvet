import apiClient from './client'
import { LoginRequest, AuthResponse } from '../types/auth'

/**
 * API функции для авторизации
 */
export const authApi = {
  /**
   * Авторизация пользователя
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },
}
