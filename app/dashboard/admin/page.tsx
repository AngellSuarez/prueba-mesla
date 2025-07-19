"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Users, MapPin, Settings, LogOut, Shield, AlertTriangle } from "lucide-react"

interface User {
  id: number
  username: string
  role: string
  name: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [autos, setAutos] = useState([])
  const [clientes, setClientes] = useState([])
  const [gpsData, setGpsData] = useState([])
  const router = useRouter()

  // Mapeo de modelos a imágenes
  const modelImages: { [key: string]: string } = {
    "Model S": "/images/mesla-model-s.png",
    "Model 3": "/images/mesla-model-3.png",
    "Model X": "/images/mesla-model-x.png",
    "Model Y": "/images/mesla-model-y.png",
    "MESLA S": "/images/mesla-model-s.png",
    "MESLA 3": "/images/mesla-model-3.png",
    "MESLA X": "/images/mesla-model-x.png",
    "MESLA Y": "/images/mesla-model-y.png",
  }

  const getCarImage = (modelo: string) => {
    return modelImages[modelo] || "/images/mesla-model-3.png"
  }

  useEffect(() => {
    // Insecure authentication check
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Vulnerable: No proper role verification on client side
    if (parsedUser.role !== "admin") {
      // This check can be bypassed by modifying localStorage
      alert("Acceso denegado - Solo administradores")
      router.push("/")
      return
    }

    loadData()
  }, [router])

  const loadData = async () => {
    try {
      // Insecure API calls without proper authentication
      const [autosRes, clientesRes, gpsRes] = await Promise.all([
        fetch("/api/autos"),
        fetch("/api/clientes"),
        fetch("/api/gps"),
      ])

      setAutos(await autosRes.json())
      setClientes(await clientesRes.json())
      setGpsData(await gpsRes.json())
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const handleLogout = () => {
    localStorage.clear() // Insecure logout
    router.push("/")
  }

  if (!user) return <div>Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">MESLA Admin</h1>
                <p className="text-sm text-gray-500">Panel de Administración</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="destructive" className="flex items-center space-x-1">
                <AlertTriangle className="h-3 w-3" />
                <span>Sistema Vulnerable</span>
              </Badge>
              <span className="text-sm text-gray-600">Bienvenido, {user.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Autos</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{autos.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GPS Activos</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gpsData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prototipos</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Autos */}
          <Card>
            <CardHeader>
              <CardTitle>Vehículos Registrados</CardTitle>
              <CardDescription>Lista de todos los vehículos eléctricos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {autos.map((auto: any) => (
                  <div key={auto.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={getCarImage(auto.modelo) || "/placeholder.svg"}
                      alt={auto.modelo}
                      className="w-16 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{auto.modelo}</p>
                      <p className="text-sm text-gray-500">
                        ID: {auto.id} | Cliente: {auto.cliente_id}
                      </p>
                    </div>
                    <Badge variant={auto.estado === "activo" ? "default" : "secondary"}>{auto.estado}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* GPS Data */}
          <Card>
            <CardHeader>
              <CardTitle>Datos GPS en Tiempo Real</CardTitle>
              <CardDescription>Ubicaciones actuales de vehículos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gpsData.map((gps: any) => (
                  <div key={gps.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src="/images/electric-car-dashboard.png"
                      alt="GPS Dashboard"
                      className="w-16 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Auto ID: {gps.auto_id}</p>
                      <p className="text-sm text-gray-500">
                        Lat: {gps.latitud}, Lng: {gps.longitud}
                      </p>
                    </div>
                    <Badge variant="outline">{gps.velocidad} km/h</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clientes Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Clientes Registrados</CardTitle>
            <CardDescription>Información de clientes y sus datos sensibles (VULNERABLE)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clientes.map((cliente: any) => (
                <div key={cliente.id} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{cliente.nombre}</h3>
                      <p className="text-sm text-gray-500">{cliente.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Teléfono:</span> {cliente.telefono}
                    </p>
                    <p>
                      <span className="font-medium">Dirección:</span> {cliente.direccion}
                    </p>
                    <p className="text-red-600">
                      <span className="font-medium">Tarjeta:</span> {cliente.tarjeta_credito}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vulnerability Indicators */}
        <Card className="mt-6 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Vulnerabilidades Detectadas (Propósito Educativo)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-red-700 mb-2">Autenticación:</h4>
                <ul className="space-y-1 text-red-600">
                  <li>• Tokens predecibles</li>
                  <li>• Sin verificación de sesión</li>
                  <li>• Datos en localStorage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-700 mb-2">APIs:</h4>
                <ul className="space-y-1 text-red-600">
                  <li>• Sin autenticación</li>
                  <li>• Datos sensibles expuestos</li>
                  <li>• Sin rate limiting</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
