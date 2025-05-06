import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUser, loginUser } from "../../services/auth"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Label } from "../ui/Label"
import { Input } from "../ui/input"
import Button from "../ui/Button"
import { useForm } from "react-hook-form"

// Esquema de validación para registro
const signUpSchema = z
    .object({
        name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
        email: z.string().email({ message: "Email inválido" }),
        password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })

// Esquema de validación para inicio de sesión
const signInSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(1, { message: "La contraseña es requerida" }),
})

type SignUpFormValues = z.infer<typeof signUpSchema>
type SignInFormValues = z.infer<typeof signInSchema>

interface AuthFormProps {
    type: "signin" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const isSignIn = type === "signin"
    const schema = isSignIn ? signInSchema : signUpSchema

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormValues | SignInFormValues>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: SignUpFormValues | SignInFormValues) => {
        setIsLoading(true)
        setError(null)

        try {
            if (isSignIn) {
                const { email, password } = data as SignInFormValues
                await loginUser(email, password)
            } else {
                const { name, email, password } = data as SignUpFormValues
                await registerUser(name, email, password)
            }

            // Redirigir al dashboard después de autenticación exitosa
            navigate("/dashboard")
        } catch (err: any) {
            setError(err.message || "Ocurrió un error durante la autenticación")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{isSignIn ? "Iniciar Sesión" : "Crear Cuenta"}</CardTitle>
                <CardDescription>
                    {isSignIn
                        ? "Ingresa tus credenciales para acceder a tu cuenta"
                        : "Completa el formulario para crear una nueva cuenta"}
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    {!isSignIn && (
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" {...register("name")} />
                            {"name" in errors && (
                                <p className="text-sm text-red-500">{errors.name?.message}</p>
                            )}
                        </div>
                    )}


                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" {...register("password")} />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    {!isSignIn && (
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                            <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                            {"confirmPassword" in errors && errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    )}

                    {error && <p className="text-sm text-red-500">{error}</p>}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Procesando..." : isSignIn ? "Iniciar Sesión" : "Registrarse"}
                    </Button>
                    <p className="text-sm text-center text-gray-500">
                        {isSignIn ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
                        <a href={isSignIn ? "/signup" : "/signin"} className="text-primary-600 hover:underline">
                            {isSignIn ? "Regístrate" : "Inicia sesión"}
                        </a>
                    </p>
                </CardFooter>
            </form>
        </Card>
    )
}
