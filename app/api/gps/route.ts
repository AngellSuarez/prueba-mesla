import { type NextRequest, NextResponse } from "next/server"

// Simulated GPS data - contains sensitive location information
const gpsData = [
  {
    id: 1,
    auto_id: 1,
    cliente_id: 2,
    latitud: -34.6037,
    longitud: -58.3816,
    velocidad: 45,
    timestamp: "2024-01-19 14:30:00",
    direccion: "Av. Corrientes 1234, Buenos Aires",
  },
  {
    id: 2,
    auto_id: 2,
    cliente_id: 2,
    latitud: -34.6118,
    longitud: -58.396,
    velocidad: 0,
    timestamp: "2024-01-19 14:32:00",
    direccion: "Puerto Madero, Buenos Aires",
  },
  {
    id: 3,
    auto_id: 3,
    cliente_id: 3,
    latitud: -34.5875,
    longitud: -58.3974,
    velocidad: 60,
    timestamp: "2024-01-19 14:28:00",
    direccion: "Palermo, Buenos Aires",
  },
  {
    id: 4,
    auto_id: 4,
    cliente_id: 4,
    latitud: -34.6092,
    longitud: -58.3842,
    velocidad: 25,
    timestamp: "2024-01-19 14:35:00",
    direccion: "Microcentro, Buenos Aires",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const clienteId = searchParams.get("cliente_id")

  // Vulnerable: No authentication
  // Vulnerable: Sensitive GPS data exposed without encryption
  // Vulnerable: IDOR - can access other users' location data

  if (clienteId) {
    const clienteGPS = gpsData.filter((gps) => gps.cliente_id === Number.parseInt(clienteId))
    return NextResponse.json(clienteGPS)
  }

  // Return all GPS data (major privacy violation)
  return NextResponse.json(gpsData)
}
