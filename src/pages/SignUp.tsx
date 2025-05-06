import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthForm } from "../components/auth/auth-form"
import { isAuthenticated } from "../services/auth"

export function SignUpPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard")
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Crear Cuenta</h2>
          <p className="mt-2 text-sm text-gray-600">Regístrate para comenzar tu viaje de aprendizaje</p>
        </div>
        <AuthForm type="signup" />
      </div>
    </div>
  )
}
