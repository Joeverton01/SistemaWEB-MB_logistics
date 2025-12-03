import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request,
  })

  // Verificar se existe sessão via cookie
  const sessionCookie = request.cookies.get("mainbridge_session")

  // Proteger rotas de dashboard
  const isDashboardRoute =
    request.nextUrl.pathname.startsWith("/acesso/fornecedor/dashboard") ||
    request.nextUrl.pathname.startsWith("/acesso/entregador/dashboard")

  if (isDashboardRoute && !sessionCookie) {
    // Sem sessão, redirecionar para login
    const url = request.nextUrl.clone()
    url.pathname = "/acesso"
    console.log("[v0] Middleware: Sem sessão, redirecionando para /acesso")
    return NextResponse.redirect(url)
  }

  // Verificar se usuário logado está tentando acessar dashboard do tipo errado
  if (sessionCookie && isDashboardRoute) {
    try {
      const session = JSON.parse(sessionCookie.value)
      const isEntregadorDashboard = request.nextUrl.pathname.startsWith("/acesso/entregador/dashboard")
      const isFornecedorDashboard = request.nextUrl.pathname.startsWith("/acesso/fornecedor/dashboard")

      if (isEntregadorDashboard && session.tipo_usuario !== "entregador") {
        const url = request.nextUrl.clone()
        url.pathname = "/acesso/fornecedor/dashboard"
        return NextResponse.redirect(url)
      }

      if (isFornecedorDashboard && session.tipo_usuario !== "fornecedor") {
        const url = request.nextUrl.clone()
        url.pathname = "/acesso/entregador/dashboard"
        return NextResponse.redirect(url)
      }
    } catch (error) {
      console.error("[v0] Middleware: Erro ao verificar sessão:", error)
    }
  }

  return response
}
