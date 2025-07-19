"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Car, Zap, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Vulnerable login function - susceptible to SQL injection
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Intentionally vulnerable: Direct string concatenation for SQL injection demo
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Insecure session management - storing sensitive data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("token", data.token || "insecure-token-123")

        // Redirect based on role
        if (data.user.role === "admin") {
          router.push("/dashboard/admin")
        } else {
          router.push("/dashboard/cliente")
        }
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      setError("Connection error")
    } finally {
      setLoading(false)
    }
  }

  const goToLanding = () => {
    router.push("/landing")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back to Landing */}
        <Button variant="ghost" onClick={goToLanding} className="mb-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a MESLA
        </Button>

        {/* Warning Banner */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-medium">Educational Lab Environment</span>
            </div>
            <p className="text-xs text-red-600 mt-1">
              This system contains intentional vulnerabilities for learning purposes
            </p>
          </CardContent>
        </Card>

        {/* Main Login Card */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-2">
              <Car className="h-8 w-8 text-blue-600" />
              <Zap className="h-6 w-6 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">MESLA Portal</CardTitle>
            <CardDescription>Portal de Gestión de Vehículos Eléctricos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Credenciales de Prueba:</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div>
                  <strong>Admin:</strong> admin / admin
                </div>
                <div>
                  <strong>Cliente:</strong> cliente1 / test123
                </div>
                <div>
                  <strong>SQL Injection:</strong> admin' OR '1'='1' -- / cualquier
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
