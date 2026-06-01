import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (!token) {
    return <Navigate to="/login" />
  }

  if (isAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
