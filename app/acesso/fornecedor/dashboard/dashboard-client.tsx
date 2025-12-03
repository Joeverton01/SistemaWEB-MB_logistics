"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Truck,
  FileText,
  User,
  Plus,
  Search,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { logoutAction } from "@/app/actions/auth"

interface FornecedorDashboardClientProps {
  stats: {
    pedidos_ativos: number
    pedidos_concluidos: number
    pedidos_em_transporte: number
    pedidos_aguardando: number
  }
  pedidosAtivos: any[]
  pedidosConcluidos: any[]
}

export default function FornecedorDashboardClient({
  stats,
  pedidosAtivos,
  pedidosConcluidos,
}: FornecedorDashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = async () => {
    try {
      await logoutAction()
    } catch (error) {
      console.error("[v0] Erro ao fazer logout:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aguardando Coleta":
        return "bg-yellow-500"
      case "Em Transporte":
      case "Saiu para Entrega":
        return "bg-blue-500"
      case "Coletado":
        return "bg-purple-500"
      case "Em Separação":
        return "bg-orange-500"
      case "Entregue":
        return "bg-[#8BC34A]"
      default:
        return "bg-gray-500"
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

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex">
      {/* Barra Lateral */}
      <aside className="w-64 bg-[#002855] text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">MainBridge</h1>
          <p className="text-sm text-white/70 mt-1">Portal do Fornecedor</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/acesso/fornecedor/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0056A3] hover:bg-[#009DDC] transition-colors"
          >
            <Package className="h-5 w-5" />
            <span>Pedidos</span>
          </Link>

          <Link
            href="/acesso/fornecedor/dashboard/relatorios"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span>Relatórios</span>
          </Link>

          <Link
            href="/acesso/fornecedor/dashboard/perfil"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <User className="h-5 w-5" />
            <span>Perfil</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <Link href="/acesso/fornecedor/dashboard/pedidos/novo">
            <Button className="w-full bg-[#009DDC] hover:bg-[#0056A3] text-white">
              <Plus className="h-5 w-5 mr-2" />
              Novo Pedido
            </Button>
          </Link>

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
              <h2 className="text-3xl font-bold text-[#002855]">Painel de Controle</h2>
              <p className="text-gray-600 mt-1">Gerencie seus pedidos e entregas</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar pedidos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>

              <Link href="/acesso/fornecedor/dashboard/pedidos/novo">
                <Button className="bg-[#009DDC] hover:bg-[#0056A3] text-white">
                  <Plus className="h-5 w-5 mr-2" />
                  Criar Pedido
                </Button>
              </Link>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-l-4 border-l-[#009DDC]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pedidos Ativos</p>
                    <p className="text-3xl font-bold text-[#002855] mt-1">{stats.pedidos_ativos}</p>
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
                    <p className="text-sm text-gray-600">Concluídos</p>
                    <p className="text-3xl font-bold text-[#002855] mt-1">{stats.pedidos_concluidos}</p>
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
                    <p className="text-sm text-gray-600">Em Transporte</p>
                    <p className="text-3xl font-bold text-[#002855] mt-1">{stats.pedidos_em_transporte}</p>
                  </div>
                  <div className="bg-[#0056A3]/10 p-3 rounded-full">
                    <Truck className="h-6 w-6 text-[#0056A3]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Aguardando</p>
                    <p className="text-3xl font-bold text-[#002855] mt-1">{stats.pedidos_aguardando}</p>
                  </div>
                  <div className="bg-orange-500/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pedidos Ativos */}
        <div className="mb-8">
          <Card className="border-2 border-[#009DDC]">
            <CardHeader className="bg-white border-b border-gray-200">
              <CardTitle className="text-[#002855] flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[#009DDC]" />
                Pedidos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {pedidosAtivos.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Nenhum pedido ativo no momento</p>
              ) : (
                <div className="space-y-4">
                  {pedidosAtivos.map((pedido) => (
                    <div
                      key={pedido.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-[#002855]">{pedido.numero_pedido}</h3>
                            <Badge className={`${getStatusColor(pedido.status)} text-white border-0`}>
                              {pedido.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {pedido.endereco_cidade}, {pedido.endereco_estado}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(pedido.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 font-semibold">
                              <span>{formatCurrency(pedido.valor_total)}</span>
                            </div>
                          </div>
                        </div>

                        <Link href={`/acesso/fornecedor/dashboard/pedidos/${pedido.numero_pedido}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#009DDC] text-[#009DDC] hover:bg-[#009DDC] hover:text-white bg-transparent"
                          >
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pedidos Concluídos */}
        <div>
          <Card className="border-2 border-[#8BC34A]">
            <CardHeader className="bg-[#8BC34A]/10 border-b border-[#8BC34A]/20">
              <CardTitle className="text-[#002855] flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#8BC34A]" />
                Pedidos Concluídos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {pedidosConcluidos.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Nenhum pedido concluído ainda</p>
              ) : (
                <div className="space-y-4">
                  {pedidosConcluidos.map((pedido) => (
                    <div
                      key={pedido.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-[#002855]">{pedido.numero_pedido}</h3>
                            <Badge className="bg-[#8BC34A] text-white border-0">Entregue</Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {pedido.endereco_cidade}, {pedido.endereco_estado}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(pedido.data_entrega)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 font-semibold">
                              <span>{formatCurrency(pedido.valor_total)}</span>
                            </div>
                          </div>
                        </div>

                        <Link href={`/acesso/fornecedor/dashboard/pedidos/${pedido.numero_pedido}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#8BC34A] text-[#8BC34A] hover:bg-[#8BC34A] hover:text-white bg-transparent"
                          >
                            Ver Detalhes
                          </Button>
                        </Link>
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
