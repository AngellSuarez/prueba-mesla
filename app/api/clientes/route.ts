import { type NextRequest, NextResponse } from "next/server"

// Simulated customer database with sensitive information
const clientes = [
  {
    id: 1,
    nombre: "Administrador Sistema",
    email: "admin@mesla.com",
    telefono: "+54-11-1234-5678",
    direccion: "Av. Santa Fe 1234, CABA",
    dni: "12345678",
    tarjeta_credito: "4532-1234-5678-9012", // Sensitive data in plain text
    fecha_registro: "2023-01-15",
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    email: "juan.perez@email.com",
    telefono: "+54-11-2345-6789",
    direccion: "Corrientes 5678, CABA",
    dni: "23456789",
    tarjeta_credito: "5555-4444-3333-2222",
    fecha_registro: "2023-03-20",
  },
  {
    id: 3,
    nombre: "María García",
    email: "maria.garcia@email.com",
    telefono: "+54-11-3456-7890",
    direccion: "Rivadavia 9012, CABA",
    dni: "34567890",
    tarjeta_credito: "4111-1111-1111-1111",
    fecha_registro: "2023-05-10",
  },
  {
    id: 4,
    nombre: "Usuario Test",
    email: "test@test.com",
    telefono: "+54-11-4567-8901",
    direccion: "Test Street 123",
    dni: "45678901",
    tarjeta_credito: "4000-0000-0000-0002",
    fecha_registro: "2023-12-01",
  },
]

export async function GET(request: NextRequest) {
  // Vulnerable: No authentication required
  // Vulnerable: Sensitive customer data exposed (credit cards, DNI, etc.)
  // Vulnerable: No data filtering or access control

  return NextResponse.json(clientes)
}

export async function POST(request: NextRequest) {
  // Vulnerable: No input validation
  // Vulnerable: No authentication
  const body = await request.json()

  const newCliente = {
    id: clientes.length + 1,
    ...body,
    fecha_registro: new Date().toISOString().split("T")[0],
  }

  clientes.push(newCliente)

  return NextResponse.json({ success: true, cliente: newCliente })
}
