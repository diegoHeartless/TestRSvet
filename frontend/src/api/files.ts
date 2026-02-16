import apiClient from './client'

/**
 * API функции для работы с файлами
 */
export const filesApi = {
  /**
   * Загрузить изображение продукта
   */
  uploadProductImage: async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await apiClient.post<{ imageUrl: string }>('files/products/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.imageUrl
  },
}
