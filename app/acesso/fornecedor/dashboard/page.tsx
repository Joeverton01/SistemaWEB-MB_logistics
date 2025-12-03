import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import FornecedorDashboardClient from "./dashboard-client"

export default async function FornecedorDashboard() {
  const session = await getSession()

  if (!session || session.tipo_usuario !== "fornecedor") {
    redirect("/acesso")
  }

  const supabase = await createClient()

  const { data: stats } = await supabase
    .from("estatisticas_fornecedor")
    .select("*")
    .eq("fornecedor_id", session.usuario_id)
    .single()

  const { data: pedidosAtivos } = await supabase
    .from("pedidos")
    .select("*")
    .eq("fornecedor_id", session.usuario_id)
    .not("status", "in", '("Entregue","Cancelado")')
    .order("created_at", { ascending: false })

  const { data: pedidosConcluidos } = await supabase
    .from("pedidos")
    .select("*")
    .eq("fornecedor_id", session.usuario_id)
    .eq("status", "Entregue")
    .order("data_entrega", { ascending: false })
    .limit(5)

  return (
    <FornecedorDashboardClient
      stats={
        stats || {
          pedidos_ativos: 0,
          pedidos_concluidos: 0,
          pedidos_em_transporte: 0,
          pedidos_aguardando: 0,
        }
      }
      pedidosAtivos={pedidosAtivos || []}
      pedidosConcluidos={pedidosConcluidos || []}
    />
  )
}
