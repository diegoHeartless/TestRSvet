import { Form, Input, InputNumber, Select, Button, Card, Switch, Spin, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProduct, useCreateProduct, useUpdateProduct } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { ProductCreateRequest, ProductUpdateRequest } from '../../types/product'
import { filesApi } from '../../api/files'
import type { UploadFile } from 'antd/es/upload/interface'

/**
 * Форма создания/редактирования продукта
 */
const ProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const [form] = Form.useForm()
  const [uploading, setUploading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const { data: product, isLoading: isLoadingProduct } = useProduct(Number(id))
  const { data: categories } = useCategories()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()

  useEffect(() => {
    if (product && isEdit) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
        status: product.status,
      })
      
      // Установить изображение в Upload если есть
      if (product.imageUrl) {
        setFileList([
          {
            uid: '-1',
            name: 'image',
            status: 'done',
            url: product.imageUrl,
          },
        ])
      }
    }
  }, [product, isEdit, form])

  const handleUpload = async (file: File): Promise<string> => {
    setUploading(true)
    try {
      const imageUrl = await filesApi.uploadProductImage(file)
      form.setFieldsValue({ imageUrl })
      message.success('Изображение загружено успешно')
      setUploading(false)
      return imageUrl
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Ошибка при загрузке изображения')
      setUploading(false)
      throw error
    }
  }

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('Можно загружать только изображения!')
      return false
    }
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('Изображение должно быть меньше 5MB!')
      return false
    }
    return true
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setUploading(true)
      return
    }
    if (info.file.status === 'done') {
      setFileList([info.file])
      setUploading(false)
    }
    if (info.file.status === 'error') {
      message.error('Ошибка при загрузке изображения')
      setUploading(false)
    }
  }

  const onFinish = (values: ProductCreateRequest | ProductUpdateRequest) => {
    if (isEdit) {
      updateProduct.mutate(
        { id: Number(id), data: values },
        {
          onSuccess: () => {
            navigate('/admin/products')
          },
        }
      )
    } else {
      createProduct.mutate(values as ProductCreateRequest, {
        onSuccess: () => {
          navigate('/admin/products')
        },
      })
    }
  }

  return (
    <Card title={isEdit ? 'Редактирование продукта' : 'Создание продукта'}>
      <Spin spinning={isLoadingProduct}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: 'Введите название продукта' }]}
        >
          <Input placeholder="Название продукта" />
        </Form.Item>

        <Form.Item name="description" label="Описание">
          <Input.TextArea rows={4} placeholder="Описание продукта" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Цена"
          rules={[
            { required: true, message: 'Введите цену' },
            { type: 'number', min: 0.01, message: 'Цена должна быть больше 0' },
          ]}
        >
          <InputNumber
            placeholder="Цена"
            min={0.01}
            step={0.01}
            style={{ width: '100%' }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          />
        </Form.Item>

        <Form.Item label="Изображение">
          <Upload
            name="file"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                const imageUrl = await handleUpload(file as File)
                onSuccess?.(imageUrl)
              } catch (error) {
                onError?.(error as Error)
              }
            }}
            onChange={handleChange}
            onRemove={() => {
              setFileList([])
              form.setFieldsValue({ imageUrl: null })
            }}
            maxCount={1}
            accept="image/*"
          >
            {fileList.length === 0 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Загрузить</div>
              </div>
            )}
          </Upload>
          <div style={{ marginTop: 8, color: '#999', fontSize: '12px' }}>
            Или введите URL вручную:
          </div>
          <Form.Item name="imageUrl" noStyle>
            <Input placeholder="https://example.com/image.jpg" style={{ marginTop: 8 }} />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="Категория"
          rules={[{ required: true, message: 'Выберите категорию' }]}
        >
          <Select placeholder="Выберите категорию" loading={!categories}>
            {categories?.map((cat) => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {isEdit && (
          <Form.Item name="status" label="Статус" valuePropName="checked">
            <Switch checkedChildren="Активен" unCheckedChildren="Не активен" />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={createProduct.isPending || updateProduct.isPending}>
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/products')}>
            Отмена
          </Button>
        </Form.Item>
      </Form>
      </Spin>
    </Card>
  )
}

export default ProductForm
