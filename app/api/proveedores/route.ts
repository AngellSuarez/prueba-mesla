import { type NextRequest, NextResponse } from "next/server"

// Supplier database with sensitive business information
const proveedores = [
  {
    id: 1,
    nombre: "BateriasTech SA",
    contacto: "Carlos Mendez",
    email: "carlos@bateriastech.com",
    telefono: "+54-11-5555-0001",
    direccion: "Zona Industrial Norte, Lote 45",
    tipo_suministro: "Baterías de litio",
    contrato_valor: 15000000, // Sensitive financial information
    descuento_especial: 15,
    condiciones_pago: "30 días",
    cuenta_bancaria: "0123456789012345", // Sensitive banking info
    cbu: "0170123456789012345678",
    cuit: "30-12345678-9",
    clasificacion: "Proveedor Estratégico",
    nivel_acceso: "ALTO - Acceso a especificaciones técnicas",
  },
  {
    id: 2,
    nombre: "ElectroMotores Corp",
    contacto: "Ana Rodriguez",
    email: "ana@electromotores.com",
    telefono: "+54-11-5555-0002",
    direccion: "Parque Industrial Sur, Nave 12",
    tipo_suministro: "Motores eléctricos",
    contrato_valor: 8500000,
    descuento_especial: 10,
    condiciones_pago: "45 días",
    cuenta_bancaria: "9876543210987654",
    cbu: "0170987654321098765432",
    cuit: "30-98765432-1",
    clasificacion: "Proveedor Premium",
    nivel_acceso: "MEDIO",
  },
  {
    id: 3,
    nombre: "ChasisPro Industries",
    contacto: "Roberto Silva",
    email: "roberto@chasispro.com",
    telefono: "+54-11-5555-0003",
    direccion: "Ruta 9 Km 45, Complejo Industrial",
    tipo_suministro: "Chasis y carrocería",
    contrato_valor: 12000000,
    descuento_especial: 8,
    condiciones_pago: "60 días",
    cuenta_bancaria: "1122334455667788",
    cbu: "0171122334455667788990",
    cuit: "30-11223344-5",
    clasificacion: "Proveedor Estándar",
    nivel_acceso: "BAJO",
  },
]

export async function GET(request: NextRequest) {
  // Vulnerable: Sensitive supplier information exposed
  // Vulnerable: Financial data, bank accounts, and business terms accessible
  // Vulnerable: No authentication or access control

  return NextResponse.json(proveedores)
}
