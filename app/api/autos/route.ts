import { type NextRequest, NextResponse } from "next/server"

// Simulated database
const autos = [
  { id: 1, modelo: "MESLA Model S", vin: "MESLA001", año: 2023, cliente_id: 2, estado: "activo", bateria: 85 },
  { id: 2, modelo: "MESLA Model 3", vin: "MESLA002", año: 2023, cliente_id: 2, estado: "activo", bateria: 92 },
  { id: 3, modelo: "MESLA Model X", vin: "MESLA003", año: 2022, cliente_id: 3, estado: "mantenimiento", bateria: 67 },
  { id: 4, modelo: "MESLA Model Y", vin: "MESLA004", año: 2023, cliente_id: 4, estado: "activo", bateria: 78 },
  { id: 5, modelo: "MESLA Cybertruck", vin: "MESLA005", año: 2024, cliente_id: 1, estado: "prototipo", bateria: 95 },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const clienteId = searchParams.get("cliente_id")

  // Vulnerable: No authentication check
  // Vulnerable: Direct parameter usage without validation (IDOR)

  if (clienteId) {
    // IDOR vulnerability - client can access any user's data by changing cliente_id
    const clienteAutos = autos.filter((auto) => auto.cliente_id === Number.parseInt(clienteId))
    return NextResponse.json(clienteAutos)
  }

  // Return all autos (should require admin privileges)
  return NextResponse.json(autos)
}

export async function POST(request: NextRequest) {
  // Vulnerable: No authentication or authorization
  const body = await request.json()

  const newAuto = {
    id: autos.length + 1,
    ...body,
    estado: "activo",
  }

  autos.push(newAuto)

  return NextResponse.json({ success: true, auto: newAuto })
}
