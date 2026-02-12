import { Form, Input, Button, Card, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../../hooks/useAuth'
import { LoginRequest } from '../../types/auth'

const { Title } = Typography

/**
 * Форма авторизации
 */
const LoginForm = () => {
  const { login, isLoading } = useAuth()
  const [form] = Form.useForm()

  const onFinish = (values: LoginRequest) => {
    login(values)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5',
      }}
    >
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          Вход в систему
        </Title>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Введите имя пользователя' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Войти
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: '16px', textAlign: 'center', color: '#999' }}>
          <div>Тестовые пользователи:</div>
          <div>admin / admin (ADMIN)</div>
          <div>user / user (USER)</div>
        </div>
      </Card>
    </div>
  )
}

export default LoginForm
