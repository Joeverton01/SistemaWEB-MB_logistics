import { cookies } from "next/headers"

export interface SessionData {
  usuario_id: string
  email: string
  tipo_usuario: "entregador" | "fornecedor"
  nome: string
}

export async function createSession(data: SessionData) {
  const cookieStore = await cookies()
  const sessionData = JSON.stringify(data)

  // Cookie expira em 7 dias
  cookieStore.set("mainbridge_session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  })
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("mainbridge_session")

  if (!sessionCookie) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("mainbridge_session")
}
