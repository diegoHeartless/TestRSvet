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
      width: 60,
    },
    {
      title: 'Изображение',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 80,
      render: (url: string) =>
        url ? <Image src={url} alt="" width={56} height={56} style={{ objectFit: 'cover' }} /> : '-',
    },
    {
      title: 'Продукт',
      key: 'product',
      render: (_: unknown, record: Product) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div><strong>Название:</strong> {record.name}</div>
          <div><strong>Описание:</strong> {record.description || '—'}</div>
          <div><strong>Цена:</strong> {record.price != null ? `${Number(record.price).toFixed(2)} ₽` : '—'}</div>
          <div><strong>Категория:</strong> {record.categoryName || '—'}</div>
          <div><strong>Статус:</strong> <Tag color={record.status ? 'green' : 'red'}>{record.status ? 'Активен' : 'Не активен'}</Tag></div>
          <div><strong>Дата создания:</strong> {record.createdAt ? new Date(record.createdAt).toLocaleString('ru-RU') : '—'}</div>
          {isAdmin && (
            <Space size="small" style={{ marginTop: 4 }}>
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                onClick={() => navigate(`/admin/products/${record.id}`)}
              >
                Редактировать
              </Button>
              <Button
                type="link"
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
              >
                Удалить
              </Button>
            </Space>
          )}
        </div>
      ),
    },
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
