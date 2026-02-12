import { Layout } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Header from './Header'

const { Content } = Layout

/**
 * Основной layout приложения
 */
const AppLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px', background: '#fff' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default AppLayout
