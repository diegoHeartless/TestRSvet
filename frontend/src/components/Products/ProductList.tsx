import { useState } from 'react'
import { Table, Card, Button, Space, Tag, Image } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useProducts, useDeleteProduct } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import ProductFilters from './ProductFilters'
import { Product } from '../../types/product'
import { useAuth } from '../../hooks/useAuth'
import { ProductSearchRequest } from '../../types/product'

/**
 * Компонент списка продуктов
 */
const ProductList = () => {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [filters, setFilters] = useState<ProductSearchRequest>({})
  const { data: products, isLoading } = useProducts(filters)
  const { data: categories } = useCategories()
  const deleteProduct = useDeleteProduct()

  const handleDelete = (id: number) => {
    deleteProduct.mutate(id)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Изображение',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 100,
      render: (url: string) =>
        url ? <Image src={url} alt="" width={60} height={60} style={{ objectFit: 'cover' }} /> : '-',
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
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: number) => `${price.toFixed(2)} ₽`,
    },
    {
      title: 'Категория',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 150,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: boolean) => (
        <Tag color={status ? 'green' : 'red'}>{status ? 'Активен' : 'Не активен'}</Tag>
      ),
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
            render: (_: any, record: Product) => (
              <Space>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/admin/products/${record.id}`)}
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
      title="Список продуктов"
      extra={
        isAdmin ? (
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/products/new')}>
            Добавить продукт
          </Button>
        ) : null
      }
    >
      <ProductFilters filters={filters} onFiltersChange={setFilters} categories={categories || []} />
      <Table
        columns={columns}
        dataSource={products}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
  )
}

export default ProductList
