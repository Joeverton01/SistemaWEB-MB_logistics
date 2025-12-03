"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Truck,
  DollarSign,
  User,
  Search,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Navigation,
  Phone,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { logoutAction } from "@/app/actions/auth"
import { aceitarEntrega, confirmarEntrega } from "@/app/actions/pedidos"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface EntregadorDashboardClientProps {
  entregadorId: string
  stats: {
    entregas_hoje: number
    entregas_semana: number
    ganhos_hoje: any
    ganhos_semana: any
  }
  entregasDisponiveis: any[]
  entregasEmAndamento: any[]
  entregasConcluidas: any[]
}

export default function EntregadorDashboardClient({
  entregadorId,
  stats,
  entregasDisponiveis,
  entregasEmAndamento,
  entregasConcluidas,
}: EntregadorDashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutAction()
    } catch (error) {
      console.error("[v0] Erro ao fazer logout:", error)
    }
  }

  const handleAceitarEntrega = async (entregaId: string, pedidoId: string) => {
    setLoading(entregaId)
    try {
      const result = await aceitarEntrega(entregaId, entregadorId, pedidoId)

      if (result.success) {
        toast({
          title: "Sucesso!",
          description: "Entrega aceita com sucesso!",
        })
        router.refresh()
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro ao aceitar entrega",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Erro ao aceitar entrega:", error)
      toast({
        title: "Erro",
        description: "Erro ao aceitar entrega. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  const handleConfirmarEntrega = async (pedidoId: string) => {
    setLoading(pedidoId)
    try {
      const result = await confirmarEntrega(pedidoId, entregadorId)

      if (result.success) {
        toast({
          title: "Sucesso!",
          description: "Entrega confirmada com sucesso!",
        })
        router.refresh()
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro ao confirmar entrega",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Erro ao confirmar entrega:", error)
      toast({
        title: "Erro",
        description: "Erro ao confirmar entrega. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number.parseFloat(value || 0))
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR")
  }

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("pt-BR")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Coletado":
        return "bg-purple-500"
      case "Em Transporte":
      case "Saiu para Entrega":
        return "bg-blue-500"
      case "Entregue":
        return "bg-[#8BC34A]"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex">
      {/* Barra Lateral */}
      <aside className="w-64 bg-[#002855] text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">MainBridge</h1>
          <p className="text-sm text-white/70 mt-1">Portal do Entregador</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/acesso/entregador/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0056A3] hover:bg-[#009DDC] transition-colors"
          >
            <Truck className="h-5 w-5" />
            <span>Entregas</span>
          </Link>

          <Link
            href="/acesso/entregador/dashboard/ganhos"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <DollarSign className="h-5 w-5" />
            <span>Ganhos</span>
          </Link>

          <Link
            href="/acesso/entregador/dashboard/perfil"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <User className="h-5 w-5" />
            <span>Perfil</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-[#009DDC]/20 rounded-lg p-4 text-sm mb-3">
            <p className="font-semibold mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90">Disponível</span>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#002855]">Painel do Entregador</h2>
              <p className="text-gray-600 mt-1">Gerencie suas entregas e ganhos</p>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar entregas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-300"
              />
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-l-4 border-l-[#009DDC]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Entregas Hoje</p>
                    <p className="text-3xl font-bold text-[#002855] mt-1">{stats.entregas_hoje}</p>
                  </div>
                  <div className="bg-[#009DDC]/10 p-3 rounded-full">
                    <Package className="h-6 w-6 text-[#009DDC]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#8BC34A]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Entregas na Semana</p>
                    <p className="text-3xl font-bold text-[#002855] mt-1">{stats.entregas_semana}</p>
                  </div>
                  <div className="bg-[#8BC34A]/10 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-[#8BC34A]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#0056A3]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ganhos Hoje</p>
                    <p className="text-2xl font-bold text-[#002855] mt-1">{formatCurrency(stats.ganhos_hoje)}</p>
                  </div>
                  <div className="bg-[#0056A3]/10 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-[#0056A3]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ganhos na Semana</p>
                    <p className="text-2xl font-bold text-[#002855] mt-1">{formatCurrency(stats.ganhos_semana)}</p>
                  </div>
                  <div className="bg-orange-500/10 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Entregas Disponíveis */}
        <div className="mb-8">
          <Card className="border-2 border-[#009DDC]">
            <CardHeader className="bg-white border-b border-gray-200">
              <CardTitle className="text-[#002855] flex items-center gap-2">
                <Package className="h-5 w-5 text-[#009DDC]" />
                Entregas Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {entregasDisponiveis.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Nenhuma entrega disponível no momento</p>
              ) : (
                <div className="space-y-4">
                  {entregasDisponiveis.map((entrega) => (
                    <div
                      key={entrega.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-[#002855]">{entrega.pedidos?.numero_pedido}</h3>
                            <Badge className="bg-green-500 text-white border-0">Disponível</Badge>
                            <span className="text-lg font-bold text-[#009DDC]">
                              {formatCurrency(entrega.valor_entrega)}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4 text-red-500" />
                              <span>
                                <strong>Origem:</strong> {entrega.origem_cidade}, {entrega.origem_estado}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4 text-green-500" />
                              <span>
                                <strong>Destino:</strong> {entrega.destino_cidade}, {entrega.destino_estado}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Navigation className="h-4 w-4" />
                              <span>
                                <strong>Distância:</strong> {entrega.distancia_km} km
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>
                                <strong>Prazo:</strong> {formatDateTime(entrega.prazo_entrega)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>
                              <strong>Coleta:</strong> {formatDateTime(entrega.data_coleta_prevista)}
                            </span>
                          </div>
                        </div>

                        <Button
                          className="bg-[#009DDC] hover:bg-[#0056A3] text-white"
                          onClick={() => handleAceitarEntrega(entrega.id, entrega.pedido_id)}
                          disabled={loading === entrega.id}
                        >
                          {loading === entrega.id ? "Aceitando..." : "Aceitar Entrega"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Entregas Em Andamento */}
        <div className="mb-8">
          <Card className="border-2 border-blue-500">
            <CardHeader className="bg-blue-50 border-b border-blue-200">
              <CardTitle className="text-[#002855] flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-500" />
                Entregas Em Andamento
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {entregasEmAndamento.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Nenhuma entrega em andamento</p>
              ) : (
                <div className="space-y-4">
                  {entregasEmAndamento.map((entrega) => (
                    <div
                      key={entrega.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-[#002855]">{entrega.numero_pedido}</h3>
                          <Badge className={`${getStatusColor(entrega.status)} text-white border-0`}>
                            {entrega.status}
                          </Badge>
                          <span className="text-lg font-bold text-[#009DDC]">
                            {formatCurrency(entrega.valor_total)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>
                            <strong>Origem:</strong> {entrega.endereco_cidade}, {entrega.endereco_estado}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 text-green-500" />
                          <span>
                            <strong>Destino:</strong> {entrega.endereco_cidade}, {entrega.endereco_estado}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>
                            <strong>Contato:</strong> {entrega.destinatario_telefone}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 mt-0.5" />
                        <span>
                          <strong>Endereço:</strong> {entrega.endereco_rua}, {entrega.endereco_numero} -{" "}
                          {entrega.endereco_bairro}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-[#009DDC] hover:bg-[#0056A3] text-white">
                          <Navigation className="h-4 w-4 mr-2" />
                          Abrir Navegação
                        </Button>
                        <Button
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => handleConfirmarEntrega(entrega.id)}
                          disabled={loading === entrega.id}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          {loading === entrega.id ? "Confirmando..." : "Confirmar Entrega"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Entregas Concluídas */}
        <div>
          <Card className="border-2 border-[#8BC34A]">
            <CardHeader className="bg-[#8BC34A]/10 border-b border-[#8BC34A]/20">
              <CardTitle className="text-[#002855] flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#8BC34A]" />
                Entregas Concluídas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {entregasConcluidas.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Nenhuma entrega concluída ainda</p>
              ) : (
                <div className="space-y-4">
                  {entregasConcluidas.map((entrega) => (
                    <div
                      key={entrega.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-[#002855]">{entrega.numero_pedido}</h3>
                            <Badge className="bg-[#8BC34A] text-white border-0">Concluída</Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {entrega.endereco_cidade}, {entrega.endereco_estado}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(entrega.data_entrega)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 font-semibold">
                              <DollarSign className="h-4 w-4" />
                              <span>{formatCurrency(entrega.valor_total * 0.7)}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#8BC34A] text-[#8BC34A] hover:bg-[#8BC34A] hover:text-white bg-transparent"
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
