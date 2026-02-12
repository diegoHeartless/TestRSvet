import { Form, Input, Button, Card } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useCategory, useCreateCategory, useUpdateCategory } from '../../hooks/useCategories'
import { CategoryCreateRequest, CategoryUpdateRequest } from '../../types/category'

/**
 * Форма создания/редактирования категории
 */
const CategoryForm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const [form] = Form.useForm()

  const { data: category, isLoading: isLoadingCategory } = useCategory(Number(id))
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()

  useEffect(() => {
    if (category && isEdit) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
      })
    }
  }, [category, isEdit, form])

  const onFinish = (values: CategoryCreateRequest | CategoryUpdateRequest) => {
    if (isEdit) {
      updateCategory.mutate(
        { id: Number(id), data: values },
        {
          onSuccess: () => {
            navigate('/admin/categories')
          },
        }
      )
    } else {
      createCategory.mutate(values as CategoryCreateRequest, {
        onSuccess: () => {
          navigate('/admin/categories')
        },
      })
    }
  }

  return (
    <Card title={isEdit ? 'Редактирование категории' : 'Создание категории'}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        loading={isLoadingCategory}
      >
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: 'Введите название категории' }]}
        >
          <Input placeholder="Название категории" />
        </Form.Item>

        <Form.Item name="description" label="Описание">
          <Input.TextArea rows={4} placeholder="Краткое описание категории" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={createCategory.isPending || updateCategory.isPending}>
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/categories')}>
            Отмена
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CategoryForm
