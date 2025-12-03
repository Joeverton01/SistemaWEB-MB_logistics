import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download } from "lucide-react"
import Link from "next/link"

export default async function GanhosPage() {
  const session = await getSession()

  if (!session || session.tipo_usuario !== "entregador") {
    redirect("/acesso")
  }

  const supabase = await createClient()

  // Buscar estatísticas de ganhos
  const { data: stats } = await supabase
    .from("estatisticas_entregador")
    .select("*")
    .eq("entregador_id", session.usuario_id)
    .single()

  // Buscar histórico de ganhos
  const { data: ganhos } = await supabase
    .from("ganhos_entregador")
    .select(`
      *,
      pedidos:pedido_id (numero_pedido, endereco_cidade, endereco_estado)
    `)
    .eq("entregador_id", session.usuario_id)
    .order("data_entrega", { ascending: false })
    .limit(20)

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <Link href="/acesso/entregador/dashboard">
          <Button variant="ghost" size="sm" className="text-[#002855] mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-[#002855]">Meus Ganhos</h1>
        <p className="text-gray-600 mt-1">Visualize seu histórico de pagamentos e estatísticas</p>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-[#009DDC]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hoje</p>
                  <p className="text-2xl font-bold text-[#002855] mt-1">
                    R$ {Number.parseFloat(stats?.ganhos_hoje?.toString() || "0").toFixed(2)}
                  </p>
                </div>
                <div className="bg-[#009DDC]/10 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-[#009DDC]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#8BC34A]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Esta Semana</p>
                  <p className="text-2xl font-bold text-[#002855] mt-1">
                    R$ {Number.parseFloat(stats?.ganhos_semana?.toString() || "0").toFixed(2)}
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
                  <p className="text-sm text-gray-600">Este Mês</p>
                  <p className="text-2xl font-bold text-[#002855] mt-1">
                    R$ {Number.parseFloat(stats?.ganhos_mes?.toString() || "0").toFixed(2)}
                  </p>
                </div>
                <div className="bg-[#0056A3]/10 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-[#0056A3]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-[#002855] mt-1">
                    R$ {Number.parseFloat(stats?.ganhos_total?.toString() || "0").toFixed(2)}
                  </p>
                </div>
                <div className="bg-orange-500/10 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[#002855]">Histórico de Ganhos</CardTitle>
            <Button className="bg-[#009DDC] hover:bg-[#0056A3] text-white">
              <Download className="h-4 w-4 mr-2" />
              Exportar Extrato
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#002855]">Data</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#002855]">Pedido</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#002855]">Destino</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#002855]">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-[#002855]">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {ganhos?.map((ganho: any) => (
                    <tr key={ganho.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(ganho.data_entrega).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-3 px-4 text-sm text-[#002855] font-medium">{ganho.pedidos?.numero_pedido}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {ganho.pedidos?.endereco_cidade}, {ganho.pedidos?.endereco_estado}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            ganho.status === "pago"
                              ? "bg-[#8BC34A]/10 text-[#8BC34A]"
                              : "bg-yellow-500/10 text-yellow-600"
                          }`}
                        >
                          {ganho.status === "pago" ? "Pago" : "Pendente"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-semibold text-[#002855]">
                        R$ {Number.parseFloat(ganho.valor).toFixed(2)}
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
