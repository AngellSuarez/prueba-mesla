import { type NextRequest, NextResponse } from "next/server"

// Sensitive prototype information
const prototipos = [
  {
    id: 1,
    nombre: "MESLA Model Z",
    descripcion: "Prototipo de vehículo autónomo nivel 5",
    estado: "desarrollo",
    fecha_inicio: "2024-01-01",
    presupuesto: 50000000, // Sensitive financial data
    equipo_desarrollo: ["Dr. Tesla", "Ing. Rodriguez", "Dra. Martinez"],
    especificaciones_tecnicas: {
      autonomia: "800km",
      velocidad_maxima: "300km/h",
      tiempo_carga: "10min",
      tecnologia_secreta: "Batería de grafeno cuántico", // Trade secret
    },
    ubicacion_laboratorio: "Laboratorio Secreto - Nivel B3, Bunker 7",
    codigo_acceso: "7834-ALPHA-ZULU", // Security credential exposed
  },
  {
    id: 2,
    nombre: "MESLA Truck Pro",
    descripcion: "Camión eléctrico para carga pesada",
    estado: "pruebas",
    fecha_inicio: "2023-06-15",
    presupuesto: 25000000,
    equipo_desarrollo: ["Ing. Volkov", "Dr. Chen"],
    especificaciones_tecnicas: {
      carga_maxima: "40 toneladas",
      autonomia: "500km",
      tiempo_carga: "45min",
    },
    ubicacion_laboratorio: "Planta Norte - Sector C",
    codigo_acceso: "9921-BETA-XRAY",
  },
  {
    id: 3,
    nombre: "MESLA AeroVehicle",
    descripcion: "Vehículo volador eléctrico",
    estado: "conceptual",
    fecha_inicio: "2024-03-01",
    presupuesto: 100000000,
    equipo_desarrollo: ["Dr. Wright", "Ing. Santos", "Dr. Kim"],
    especificaciones_tecnicas: {
      altitud_maxima: "3000m",
      velocidad_crucero: "200km/h",
      pasajeros: "4 personas",
      tecnologia_secreta: "Propulsión electromagnética",
    },
    ubicacion_laboratorio: "Hangar Clasificado - Área 51B",
    codigo_acceso: "CLASSIFIED-OMEGA-7",
  },
]

export async function GET(request: NextRequest) {
  // Vulnerable: Highly sensitive prototype data exposed without authentication
  // Vulnerable: Trade secrets and classified information accessible
  // Vulnerable: Security codes and locations exposed

  return NextResponse.json(prototipos)
}
