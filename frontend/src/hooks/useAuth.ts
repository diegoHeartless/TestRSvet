import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/auth'
import { authStore } from '../store/authStore'
import { LoginRequest } from '../types/auth'

/**
 * Хук для работы с авторизацией
 */
export const useAuth = () => {
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      authStore.setUser({
        username: data.username,
        role: data.role as 'USER' | 'ADMIN',
      })
      message.success('Успешная авторизация')
      navigate('/products')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Ошибка авторизации'
      message.error(errorMessage)
    },
  })

  const logout = () => {
    authStore.logout()
    navigate('/login')
    message.info('Вы вышли из системы')
  }

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    logout,
    isAuthenticated: authStore.isAuthenticated(),
    user: authStore.getUser(),
    isAdmin: authStore.isAdmin(),
  }
}
