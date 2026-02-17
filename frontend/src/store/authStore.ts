import { User } from '../types/auth'

/**
 * Состояние пользователя (хранится в замыкании)
 */
let user: User | null = null

/**
 * Инициализация: восстанавливаем пользователя из localStorage
 */
const initializeUser = () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user = JSON.parse(storedUser)
    } catch (e) {
      console.error('Failed to parse user from localStorage', e)
      localStorage.removeItem('user')
    }
  }
}

// Инициализируем при загрузке модуля
initializeUser()

/**
 * Устанавливает пользователя в хранилище
 */
export const setUser = (newUser: User | null) => {
  user = newUser
  if (newUser) {
    localStorage.setItem('user', JSON.stringify(newUser))
  } else {
    localStorage.removeItem('user')
  }
}

/**
 * Получает текущего пользователя
 */
export const getUser = (): User | null => {
  return user
}

/**
 * Проверяет, авторизован ли пользователь
 */
export const isAuthenticated = (): boolean => {
  return user !== null && !!localStorage.getItem('token')
}

/**
 * Проверяет, является ли пользователь администратором
 */
export const isAdmin = (): boolean => {
  return user?.role === 'ADMIN'
}

/**
 * Выход из системы
 */
export const logout = () => {
  setUser(null)
  localStorage.removeItem('token')
}

/**
 * Объект с функциями для обратной совместимости
 */
export const authStore = {
  setUser,
  getUser,
  isAuthenticated,
  isAdmin,
  logout,
}
