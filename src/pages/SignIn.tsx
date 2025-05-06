import { AuthForm } from "../components/auth/auth-form"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { isAuthenticated } from "../services/auth"

export function SignInPage() {
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
          <p className="mt-2 text-sm text-gray-600">Accede a tu cuenta para continuar aprendiendo</p>
        </div>
        <AuthForm type="signin" />
      </div>
    </div>
  )
}
