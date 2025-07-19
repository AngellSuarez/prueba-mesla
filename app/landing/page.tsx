"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Zap, Battery, MapPin, Shield, Users, ArrowRight, AlertTriangle, Star, Gauge, Leaf } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState(0)

  const models = [
    {
      name: "MESLA Model S",
      price: "$75,000",
      image: "/images/mesla-model-s.png",
      specs: {
        range: "650 km",
        acceleration: "0-100 km/h en 3.2s",
        topSpeed: "250 km/h",
        charging: "Carga rápida 15 min",
      },
      features: ["Piloto automático", "Interior premium", 'Pantalla 17"', "Sonido premium"],
    },
    {
      name: "MESLA Model 3",
      price: "$45,000",
      image: "/images/mesla-model-3.png",
      specs: {
        range: "500 km",
        acceleration: "0-100 km/h en 4.8s",
        topSpeed: "225 km/h",
        charging: "Carga rápida 20 min",
      },
      features: ["Diseño minimalista", "Eficiencia energética", "Conectividad total", "Seguridad 5 estrellas"],
    },
    {
      name: "MESLA Model X",
      price: "$95,000",
      image: "/images/mesla-model-x.png",
      specs: {
        range: "580 km",
        acceleration: "0-100 km/h en 3.8s",
        topSpeed: "240 km/h",
        charging: "Carga rápida 18 min",
      },
      features: ["Puertas Falcon Wing", "7 asientos", "Remolque 2.3 ton", "Filtro HEPA"],
    },
    {
      name: "MESLA Model Y",
      price: "$55,000",
      image: "/images/mesla-model-y.png",
      specs: {
        range: "480 km",
        acceleration: "0-100 km/h en 5.2s",
        topSpeed: "217 km/h",
        charging: "Carga rápida 25 min",
      },
      features: ["Versatilidad familiar", "Techo panorámico", "Espacio de carga", "Tracción integral"],
    },
  ]

  const goToLogin = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Warning Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm">
        <div className="flex items-center justify-center space-x-2">
          <AlertTriangle className="h-4 w-4" />
          <span>⚠️ SISTEMA VULNERABLE - SOLO PROPÓSITOS EDUCATIVOS - NO USAR EN PRODUCCIÓN ⚠️</span>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-400" />
                <Zap className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MESLA</h1>
                <p className="text-sm text-blue-200">Vehículos Eléctricos del Futuro</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="destructive" className="hidden md:flex items-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>Lab Ciberseguridad</span>
              </Badge>
              <Button onClick={goToLogin} className="bg-blue-600 hover:bg-blue-700">
                Portal Cliente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              El Futuro es
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                {" "}
                Eléctrico
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Descubre la nueva generación de vehículos eléctricos MESLA. Tecnología avanzada, diseño revolucionario y
              sostenibilidad en cada kilómetro.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-green-400">
                <Leaf className="h-5 w-5" />
                <span>100% Eléctrico</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Gauge className="h-5 w-5" />
                <span>Máximo Rendimiento</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Star className="h-5 w-5" />
                <span>Tecnología Premium</span>
              </div>
            </div>
          </div>

          {/* Featured Car Display */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src={models[selectedModel].image || "/placeholder.svg"}
                  alt={models[selectedModel].name}
                  className="w-full h-80 object-cover rounded-xl shadow-2xl"
                />
              </div>
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-2">{models[selectedModel].name}</h3>
                <p className="text-2xl text-green-400 font-semibold mb-6">{models[selectedModel].price}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/30 rounded-lg p-4">
                    <Battery className="h-6 w-6 text-green-400 mb-2" />
                    <p className="text-sm text-gray-300">Autonomía</p>
                    <p className="font-semibold">{models[selectedModel].specs.range}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <Gauge className="h-6 w-6 text-blue-400 mb-2" />
                    <p className="text-sm text-gray-300">Aceleración</p>
                    <p className="font-semibold">{models[selectedModel].specs.acceleration}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <Zap className="h-6 w-6 text-yellow-400 mb-2" />
                    <p className="text-sm text-gray-300">Velocidad Máx</p>
                    <p className="font-semibold">{models[selectedModel].specs.topSpeed}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <MapPin className="h-6 w-6 text-purple-400 mb-2" />
                    <p className="text-sm text-gray-300">Carga</p>
                    <p className="font-semibold">{models[selectedModel].specs.charging}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Características Destacadas:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {models[selectedModel].features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={goToLogin}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Explorar en Portal Cliente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Nuestra Línea de Vehículos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {models.map((model, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedModel === index ? "ring-2 ring-blue-400 bg-blue-900/20" : "bg-white/10 hover:bg-white/20"
                } backdrop-blur-sm border-white/20`}
                onClick={() => setSelectedModel(index)}
              >
                <CardHeader className="pb-2">
                  <img
                    src={model.image || "/placeholder.svg"}
                    alt={model.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <CardTitle className="text-white text-lg">{model.name}</CardTitle>
                  <CardDescription className="text-green-400 font-semibold text-lg">{model.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Autonomía:</span>
                      <span className="text-white">{model.specs.range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>0-100 km/h:</span>
                      <span className="text-white">{model.specs.acceleration.split(" ")[3]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">500K+</div>
              <div className="text-gray-300">Vehículos Vendidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-gray-300">Países</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">1000+</div>
              <div className="text-gray-300">Estaciones de Carga</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">99%</div>
              <div className="text-gray-300">Satisfacción Cliente</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">¿Listo para el Futuro?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Únete a la revolución eléctrica. Accede a nuestro portal para explorar, configurar y gestionar tu próximo
            vehículo MESLA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={goToLogin}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Users className="mr-2 h-5 w-5" />
              Acceder al Portal
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              <MapPin className="mr-2 h-5 w-5" />
              Encontrar Concesionario
            </Button>
          </div>
        </div>
      </section>

      {/* Vulnerability Warning Footer */}
      <footer className="bg-red-900/50 border-t border-red-500/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="border-red-200 bg-red-50/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Aviso Importante - Sistema de Laboratorio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-red-200 space-y-2">
                <p className="font-medium">
                  Esta aplicación contiene vulnerabilidades intencionales para propósitos educativos
                </p>
                <p className="text-sm">
                  Diseñado para laboratorios de ciberseguridad • No usar con datos reales • Solo entornos controlados
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
                  <span>• SQL Injection</span>
                  <span>• IDOR</span>
                  <span>• APIs Inseguras</span>
                  <span>• Autenticación Débil</span>
                  <span>• Datos Expuestos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </footer>
    </div>
  )
}
