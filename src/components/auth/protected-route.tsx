import type React from "react"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "student" | "instructor" | "admin"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
  }

  // Si no está autenticado, redirigir a la página de inicio de sesión
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirigir a una página de acceso denegado
  if (requiredRole && user?.role !== requiredRole && user?.role !== "admin") {
    return <Navigate to="/access-denied" replace />
  }

  // Si está autenticado y tiene los permisos necesarios, mostrar el contenido protegido
  return <>{children}</>
}
