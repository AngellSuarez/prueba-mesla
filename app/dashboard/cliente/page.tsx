"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, MapPin, LogOut, AlertTriangle, User } from "lucide-react"

interface ClientUser {
  id: number
  username: string
  role: string
  name: string
}

export default function ClienteDashboard() {
  const [user, setUser] = useState<ClientUser | null>(null)
  const [misAutos, setMisAutos] = useState([])
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
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    loadMyData(parsedUser.id)
  }, [router])

  const loadMyData = async (userId: number) => {
    try {
      const [autosRes, gpsRes] = await Promise.all([
        fetch(`/api/autos?cliente_id=${userId}`),
        fetch(`/api/gps?cliente_id=${userId}`),
      ])

      setMisAutos(await autosRes.json())
      setGpsData(await gpsRes.json())
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const accessAdminPanel = () => {
    router.push("/dashboard/admin")
  }

  if (!user) return <div>Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">MESLA Cliente</h1>
                <p className="text-sm text-gray-500">Portal del Cliente</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="destructive" className="flex items-center space-x-1">
                <AlertTriangle className="h-3 w-3" />
                <span>Vulnerable</span>
              </Badge>
              <span className="text-sm text-gray-600">Hola, {user.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mis Vehículos</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{misAutos.length}</div>
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
              <CardTitle className="text-sm font-medium">Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Activo</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Mis Vehículos Eléctricos</CardTitle>
            <CardDescription>Vehículos registrados a tu nombre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {misAutos.map((auto: any) => (
                <div key={auto.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={getCarImage(auto.modelo) || "/placeholder.svg"}
                    alt={auto.modelo}
                    className="w-24 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{auto.modelo}</h3>
                    <p className="text-sm text-gray-500">VIN: {auto.vin}</p>
                    <p className="text-sm text-gray-500">Año: {auto.año}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={auto.estado === "activo" ? "default" : "secondary"}>{auto.estado}</Badge>
                    <p className="text-sm text-gray-500 mt-1">Batería: {auto.bateria}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ubicación GPS</CardTitle>
            <CardDescription>Ubicación actual de tus vehículos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gpsData.map((gps: any) => (
                <div key={gps.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src="/images/electric-car-dashboard.png"
                      alt="GPS Dashboard"
                      className="w-16 h-12 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-medium">Auto ID: {gps.auto_id}</h3>
                      <p className="text-sm text-gray-500">
                        Coordenadas: {gps.latitud}, {gps.longitud}
                      </p>
                      <p className="text-sm text-gray-500">Última actualización: {gps.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{gps.velocidad} km/h</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-700 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Acciones de Prueba (Vulnerabilidades)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" onClick={accessAdminPanel} className="w-full justify-start bg-transparent">
                🔓 Intentar acceso a panel admin (Escalación de privilegios)
              </Button>
              <Button variant="outline" onClick={() => loadMyData(1)} className="w-full justify-start">
                🔍 Ver datos de otro usuario (IDOR - cliente_id=1)
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open("/api/autos", "_blank")}
                className="w-full justify-start"
              >
                📡 API sin autenticación (/api/autos)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
