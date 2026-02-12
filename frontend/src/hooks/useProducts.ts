import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { productsApi } from '../api/products'
import { ProductSearchRequest, ProductCreateRequest, ProductUpdateRequest } from '../types/product'

/**
 * Хук для работы с продуктами
 */
export const useProducts = (searchParams?: ProductSearchRequest) => {
  return useQuery({
    queryKey: ['products', searchParams],
    queryFn: () => productsApi.search(searchParams || {}),
  })
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProductCreateRequest) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      message.success('Продукт успешно создан')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при создании продукта'
      message.error(errorMessage)
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductUpdateRequest }) =>
      productsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] })
      message.success('Продукт успешно обновлен')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при обновлении продукта'
      message.error(errorMessage)
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => productsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      message.success('Продукт успешно удален')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при удалении продукта'
      message.error(errorMessage)
    },
  })
}
