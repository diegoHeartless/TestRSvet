import apiClient from './client'

/**
 * Получить полный URL для файла изображения продукта
 * @param imageUrl - URL изображения (может быть относительным или полным)
 * @returns Полный URL для доступа к файлу
 */
export const getProductImageUrl = (imageUrl?: string | null): string | undefined => {
  if (!imageUrl) {
    return undefined
  }

  // Если URL уже полный (начинается с http:// или https://), возвращаем как есть
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  const baseURL = apiClient.defaults.baseURL || ''
  
  // Если URL начинается с /api/files/products/, формируем полный URL
  if (imageUrl.startsWith('/api/files/products/')) {
    // Извлекаем базовый URL без /api
    const baseUrlWithoutApi = baseURL.replace(/\/api\/?$/, '')
    return `${baseUrlWithoutApi}${imageUrl}`
  }

  // Если URL начинается с /files/products/, добавляем базовый URL
  if (imageUrl.startsWith('/files/products/')) {
    const baseUrlWithoutApi = baseURL.replace(/\/api\/?$/, '')
    return `${baseUrlWithoutApi}/api${imageUrl}`
  }

  // Если URL содержит только имя файла или путь products/filename.jpg
  const filename = imageUrl.includes('/') ? imageUrl.split('/').pop() : imageUrl
  return `${baseURL}/files/products/${filename}`
}

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

  /**
   * Получить полный URL для изображения продукта
   */
  getProductImageUrl,
}
