const API_URL = "http://localhost:5000/api"

export interface Course {
  _id: string
  title: string
  description: string
  level: string
  price: number
  instructor: string
  image: string
  topics: string[]
  duration: number
  createdAt: string
}

// Función para obtener todos los cursos
export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`${API_URL}/courses`)
    if (!response.ok) {
      throw new Error("Error al obtener los cursos")
    }
    return await response.json()
  } catch (error) {
    console.error("Error en getCourses:", error)
    return []
  }
}

// Función para obtener un curso por ID
export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const response = await fetch(`${API_URL}/courses/${id}`)
    if (!response.ok) {
      throw new Error("Error al obtener el curso")
    }
    return await response.json()
  } catch (error) {
    console.error("Error en getCourseById:", error)
    return null
  }
}

// Función para crear un nuevo curso
export async function createCourse(courseData: Omit<Course, "_id" | "createdAt">): Promise<Course | null> {
  try {
    const response = await fetch(`${API_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
    if (!response.ok) {
      throw new Error("Error al crear el curso")
    }
    return await response.json()
  } catch (error) {
    console.error("Error en createCourse:", error)
    return null
  }
}
