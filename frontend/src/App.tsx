import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { authStore } from './store/authStore'
import AppLayout from './components/Layout/AppLayout'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import LoginForm from './components/Auth/LoginForm'
import ProductList from './components/Products/ProductList'
import ProductForm from './components/Products/ProductForm'
import CategoryList from './components/Categories/CategoryList'
import CategoryForm from './components/Categories/CategoryForm'

/**
 * Главный компонент приложения
 */
function App() {
  const isAuthenticated = authStore.isAuthenticated()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/products" replace /> : <LoginForm />} />
        
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/products" element={<ProductList />} />
          <Route path="/categories" element={<CategoryList />} />
        </Route>

        <Route
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/new" element={<ProductForm />} />
          <Route path="/admin/products/:id" element={<ProductForm />} />
          <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/categories/new" element={<CategoryForm />} />
          <Route path="/admin/categories/:id" element={<CategoryForm />} />
        </Route>

        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
