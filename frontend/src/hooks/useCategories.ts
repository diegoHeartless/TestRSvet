import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { categoriesApi } from '../api/categories'
import { CategoryCreateRequest, CategoryUpdateRequest } from '../types/category'

/**
 * Хук для работы с категориями
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll(),
  })
}

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CategoryCreateRequest) => categoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      message.success('Категория успешно создана')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при создании категории'
      message.error(errorMessage)
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryUpdateRequest }) =>
      categoriesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category', variables.id] })
      message.success('Категория успешно обновлена')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при обновлении категории'
      message.error(errorMessage)
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => categoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      message.success('Категория успешно удалена')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при удалении категории'
      message.error(errorMessage)
    },
  })
}
