import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Download, TrendingUp, Package } from "lucide-react"
import Link from "next/link"

export default async function RelatoriosPage() {
  const session = await getSession()

  if (!session || session.tipo_usuario !== "fornecedor") {
    redirect("/acesso")
  }

  const supabase = await createClient()

  // Buscar estatísticas
  const { data: stats } = await supabase
    .from("estatisticas_fornecedor")
    .select("*")
    .eq("fornecedor_id", session.usuario_id)
    .single()

  // Buscar pedidos recentes
  const { data: pedidosRecentes } = await supabase
    .from("pedidos")
    .select("*")
    .eq("fornecedor_id", session.usuario_id)
    .order("created_at", { ascending: false })
    .limit(10)

  const totalPedidos = (stats?.pedidos_concluidos || 0) + (stats?.pedidos_ativos || 0)

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <Link href="/acesso/fornecedor/dashboard">
          <Button variant="ghost" size="sm" className="text-[#002855] mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-[#002855]">Relatórios</h1>
        <p className="text-gray-600 mt-1">Visualize o desempenho e estatísticas dos seus pedidos</p>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-[#009DDC]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Pedidos</p>
                  <p className="text-3xl font-bold text-[#002855] mt-1">{totalPedidos}</p>
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
                  <p className="text-sm text-gray-600">Taxa de Conclusão</p>
                  <p className="text-3xl font-bold text-[#002855] mt-1">
                    {totalPedidos > 0 ? Math.round(((stats?.pedidos_concluidos || 0) / totalPedidos) * 100) : 0}%
                  </p>
                </div>
                <div className="bg-[#8BC34A]/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-[#8BC34A]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#0056A3]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pedidos Ativos</p>
                  <p className="text-3xl font-bold text-[#002855] mt-1">{stats?.pedidos_ativos || 0}</p>
                </div>
                <div className="bg-[#0056A3]/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-[#0056A3]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[#002855]">Pedidos Recentes</CardTitle>
            <Button className="bg-[#009DDC] hover:bg-[#0056A3] text-white">
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#002855]">Número</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#002855]">Destino</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#002855]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#002855]">Data</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-[#002855]">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosRecentes?.map((pedido) => (
                    <tr key={pedido.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-[#002855]">{pedido.numero_pedido}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {pedido.endereco_cidade}, {pedido.endereco_estado}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            pedido.status === "Entregue"
                              ? "bg-[#8BC34A]/10 text-[#8BC34A]"
                              : pedido.status === "Em Transporte"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-yellow-500/10 text-yellow-600"
                          }`}
                        >
                          {pedido.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(pedido.created_at).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-semibold text-[#002855]">
                        R$ {Number.parseFloat(pedido.valor_total).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
