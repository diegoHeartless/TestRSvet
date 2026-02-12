/**
 * Типы для работы с авторизацией
 */

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  type: string
  username: string
  role: string
}

export interface User {
  username: string
  role: 'USER' | 'ADMIN'
}

export type UserRole = 'USER' | 'ADMIN'
