"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { loginAction } from "@/app/actions/auth"

export default function FornecedorLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showRecuperarSenha, setShowRecuperarSenha] = useState(false)
  const [emailRecuperacao, setEmailRecuperacao] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    console.log("[v0] Tentativa de login fornecedor:", { email })

    try {
      const result = await loginAction({
        email,
        senha: password,
        tipoUsuario: "fornecedor",
      })

      if (result.success) {
        console.log("[v0] Login bem-sucedido, redirecionando...")
        // Usar window.location para forçar refresh e carregar sessão
        window.location.href = "/acesso/fornecedor/dashboard"
      } else {
        setError(result.error || "Credenciais inválidas")
        setIsLoading(false)
      }
    } catch (err) {
      console.error("[v0] Erro no login:", err)
      setError("Erro ao tentar fazer login. Tente novamente.")
      setIsLoading(false)
    }
  }

  const handleRecuperarSenha = async () => {
    if (!emailRecuperacao) {
      setError("Digite seu email para recuperar a senha")
      return
    }
    setIsLoading(true)
    // TODO: Implementar envio de email real
    setTimeout(() => {
      setIsLoading(false)
      setShowRecuperarSenha(false)
      alert("Instruções de recuperação enviadas para seu email!")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-md mx-auto">
          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-3xl">Portal do Fornecedor</CardTitle>
              <CardDescription className="text-base">Acesse sua conta para gerenciar pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              {showRecuperarSenha ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Recuperar Senha</h3>
                  <p className="text-sm text-muted-foreground">
                    Digite seu email para receber instruções de recuperação de senha.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="email-recuperacao">E-mail</Label>
                    <Input
                      id="email-recuperacao"
                      type="email"
                      placeholder="contato@empresa.com"
                      value={emailRecuperacao}
                      onChange={(e) => setEmailRecuperacao(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowRecuperarSenha(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button type="button" onClick={handleRecuperarSenha} disabled={isLoading} className="flex-1">
                      {isLoading ? "Enviando..." : "Enviar"}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail Corporativo</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="contato@empresa.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-muted-foreground">Lembrar-me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowRecuperarSenha(true)
                        setError("")
                      }}
                      className="text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              )}

              {!showRecuperarSenha && (
                <>
                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    <p>
                      Ainda não é parceiro?{" "}
                      <Link href="/acesso/fornecedor/cadastro" className="text-primary hover:underline font-medium">
                        Solicite acesso
                      </Link>
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border text-center">
                    <Link href="/acesso" className="text-sm text-muted-foreground hover:text-foreground">
                      ← Voltar para seleção de portal
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Suporte comercial disponível 24/7</p>
            <p className="mt-1">
              <a href="mailto:comercial@mainbridge.com" className="text-primary hover:underline">
                comercial@mainbridge.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
