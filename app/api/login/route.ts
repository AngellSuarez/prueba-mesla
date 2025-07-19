import { type NextRequest, NextResponse } from "next/server"

// Simulated database - In real vulnerable app, this would be actual DB
const users = [
  { id: 1, username: "admin", password: "admin", role: "admin", name: "Administrador" },
  { id: 2, username: "cliente1", password: "test123", role: "cliente", name: "Juan Pérez" },
  { id: 3, username: "cliente2", password: "password", role: "cliente", name: "María García" },
  { id: 4, username: "test", password: "123456", role: "cliente", name: "Usuario Test" },
]

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Vulnerable SQL injection simulation
    // In a real app, this would be: SELECT * FROM users WHERE username = '${username}' AND password = '${password}'

    // Check for SQL injection patterns
    if (username.includes("' OR '1'='1'") || username.includes("' OR 1=1") || username.includes("admin'")) {
      // Simulate successful SQL injection
      const adminUser = users.find((u) => u.role === "admin")
      return NextResponse.json({
        success: true,
        user: adminUser,
        token: "hijacked-admin-token-" + Date.now(),
        message: "SQL Injection successful - Admin access granted",
      })
    }

    // Normal authentication (still vulnerable - plain text passwords)
    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          name: user.name,
        },
        token: `insecure-token-${user.id}-${Date.now()}`, // Predictable token
        message: "Login successful",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Usuario o contraseña incorrectos",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error del servidor",
      },
      { status: 500 },
    )
  }
}
