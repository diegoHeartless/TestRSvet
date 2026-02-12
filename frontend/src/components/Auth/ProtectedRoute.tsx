import { Navigate } from 'react-router-dom'
import { authStore } from '../../store/authStore'
import { UserRole } from '../../types/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
}

/**
 * Компонент для защиты маршрутов
 */
const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const isAuthenticated = authStore.isAuthenticated()
  const user = authStore.getUser()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/products" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
