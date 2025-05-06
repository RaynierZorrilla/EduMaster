const API_URL = "http://localhost:5000/api/users"

export interface User {
  _id: string
  name: string
  email: string
  role: "student" | "instructor" | "admin"
  avatar: string
  token: string
}

// Función para registrar un nuevo usuario
export async function registerUser(name: string, email: string, password: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Error al registrar usuario")
    }

    // Guardar el token en localStorage
    localStorage.setItem("userToken", data.token)
    localStorage.setItem("userData", JSON.stringify(data))

    return data
  } catch (error: any) {
    console.error("Error en registerUser:", error)
    throw new Error(error.message || "Error al registrar usuario")
  }
}

// Función para iniciar sesión
export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión")
    }

    // Guardar el token en localStorage
    localStorage.setItem("userToken", data.token)
    localStorage.setItem("userData", JSON.stringify(data))

    return data
  } catch (error: any) {
    console.error("Error en loginUser:", error)
    throw new Error(error.message || "Error al iniciar sesión")
  }
}

// Función para cerrar sesión
export function logoutUser(): void {
  localStorage.removeItem("userToken")
  localStorage.removeItem("userData")
}

// Función para obtener el usuario actual
export function getCurrentUser(): User | null {
  const userData = localStorage.getItem("userData")
  return userData ? JSON.parse(userData) : null
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("userToken")
}

// Función para obtener el token de autenticación
export function getAuthToken(): string | null {
  return localStorage.getItem("userToken")
}
