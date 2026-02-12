import { Form, Input, InputNumber, Select, Button, Row, Col, Card } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ProductSearchRequest } from '../../types/product'
import { Category } from '../../types/category'

interface ProductFiltersProps {
  filters: ProductSearchRequest
  onFiltersChange: (filters: ProductSearchRequest) => void
  categories: Category[]
}

/**
 * Компонент фильтров для поиска продуктов
 */
const ProductFilters = ({ filters, onFiltersChange, categories }: ProductFiltersProps) => {
  const [form] = Form.useForm()

  const handleSearch = (values: ProductSearchRequest) => {
    onFiltersChange(values)
  }

  const handleReset = () => {
    form.resetFields()
    onFiltersChange({})
  }

  return (
    <Card size="small" style={{ marginBottom: '16px' }}>
      <Form
        form={form}
        layout="inline"
        onFinish={handleSearch}
        initialValues={filters}
        style={{ width: '100%' }}
      >
        <Row gutter={16} style={{ width: '100%' }}>
          <Col span={6}>
            <Form.Item name="categoryId" label="Категория">
              <Select
                placeholder="Выберите категорию"
                allowClear
                style={{ width: '100%' }}
              >
                {categories.map((cat) => (
                  <Select.Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="name" label="Название">
              <Input placeholder="Поиск по названию" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="minPrice" label="Цена от">
              <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="maxPrice" label="Цена до">
              <InputNumber placeholder="∞" min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                Поиск
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="link" onClick={handleReset}>
              Сбросить фильтры
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default ProductFilters
