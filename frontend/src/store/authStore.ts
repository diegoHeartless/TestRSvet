import { User } from '../types/auth'

/**
 * Простое хранилище состояния авторизации
 */
class AuthStore {
  private user: User | null = null

  constructor() {
    // Восстанавливаем пользователя из localStorage при инициализации
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser)
      } catch (e) {
        console.error('Failed to parse user from localStorage', e)
        localStorage.removeItem('user')
      }
    }
  }

  setUser(user: User | null) {
    this.user = user
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }

  getUser(): User | null {
    return this.user
  }

  isAuthenticated(): boolean {
    return this.user !== null && !!localStorage.getItem('token')
  }

  isAdmin(): boolean {
    return this.user?.role === 'ADMIN'
  }

  logout() {
    this.setUser(null)
    localStorage.removeItem('token')
  }
}

export const authStore = new AuthStore()
