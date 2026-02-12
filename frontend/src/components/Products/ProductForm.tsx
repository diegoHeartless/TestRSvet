import { Form, Input, InputNumber, Select, Button, Card, Switch, Spin } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useProduct, useCreateProduct, useUpdateProduct } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { ProductCreateRequest, ProductUpdateRequest } from '../../types/product'

/**
 * Форма создания/редактирования продукта
 */
const ProductForm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const [form] = Form.useForm()

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
    }
  }, [product, isEdit, form])

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

        <Form.Item name="imageUrl" label="URL изображения">
          <Input placeholder="https://example.com/image.jpg" />
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
