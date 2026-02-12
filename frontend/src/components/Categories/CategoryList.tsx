import { Table, Card, Button, Space, Tag } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useCategories, useDeleteCategory } from '../../hooks/useCategories'
import { Category } from '../../types/category'
import { useAuth } from '../../hooks/useAuth'

/**
 * Компонент списка категорий
 */
const CategoryList = () => {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const { data: categories, isLoading } = useCategories()
  const deleteCategory = useDeleteCategory()

  const handleDelete = (id: number) => {
    deleteCategory.mutate(id)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string) => new Date(date).toLocaleString('ru-RU'),
    },
    ...(isAdmin
      ? [
          {
            title: 'Действия',
            key: 'actions',
            width: 120,
            render: (_: any, record: Category) => (
              <Space>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/admin/categories/${record.id}`)}
                >
                  Редактировать
                </Button>
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record.id)}
                >
                  Удалить
                </Button>
              </Space>
            ),
          },
        ]
      : []),
  ]

  return (
    <Card
      title="Список категорий"
      extra={
        isAdmin ? (
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/categories/new')}>
            Добавить категорию
          </Button>
        ) : null
      }
    >
      <Table
        columns={columns}
        dataSource={categories}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
  )
}

export default CategoryList
