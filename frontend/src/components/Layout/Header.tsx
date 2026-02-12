import { Layout, Menu, Button, Space, Typography } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from '../../hooks/useAuth'

const { Header: AntHeader } = Layout
const { Text } = Typography

/**
 * Компонент шапки приложения
 */
const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user, isAdmin } = useAuth()

  const menuItems = [
    {
      key: '/products',
      label: 'Продукты',
    },
    {
      key: '/categories',
      label: 'Категории',
    },
    ...(isAdmin
      ? [
          {
            key: '/admin/products',
            label: 'Управление продуктами',
          },
          {
            key: '/admin/categories',
            label: 'Управление категориями',
          },
        ]
      : []),
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <AntHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>Каталог продуктов</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
      </div>
      <Space>
        <Text style={{ color: '#fff' }}>
          <UserOutlined /> {user?.username} ({user?.role})
        </Text>
        <Button type="primary" icon={<LogoutOutlined />} onClick={logout}>
          Выход
        </Button>
      </Space>
    </AntHeader>
  )
}

export default Header
