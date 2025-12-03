import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import EntregadorDashboardClient from "./dashboard-client"

export default async function EntregadorDashboard() {
  const session = await getSession()

  if (!session || session.tipo_usuario !== "entregador") {
    redirect("/acesso")
  }

  const supabase = await createClient()

  // Buscar estatísticas reais do banco
  const { data: stats } = await supabase
    .from("estatisticas_entregador")
    .select("*")
    .eq("entregador_id", session.usuario_id)
    .single()

  // Buscar entregas disponíveis
  const { data: entregasDisponiveis } = await supabase
    .from("entregas_disponiveis")
    .select(`
      *,
      pedidos:pedido_id (*)
    `)
    .eq("status", "disponivel")
    .order("created_at", { ascending: false })
    .limit(10)

  // Buscar entregas em andamento (pedidos com este entregador)
  const { data: entregasEmAndamento } = await supabase
    .from("pedidos")
    .select("*")
    .eq("entregador_id", session.usuario_id)
    .in("status", ["Coletado", "Em Transporte", "Saiu para Entrega"])
    .order("created_at", { ascending: false })

  // Buscar entregas concluídas
  const { data: entregasConcluidas } = await supabase
    .from("pedidos")
    .select("*")
    .eq("entregador_id", session.usuario_id)
    .eq("status", "Entregue")
    .order("data_entrega", { ascending: false })
    .limit(5)

  return (
    <EntregadorDashboardClient
      entregadorId={session.usuario_id}
      stats={
        stats || {
          entregas_hoje: 0,
          entregas_semana: 0,
          ganhos_hoje: 0,
          ganhos_semana: 0,
        }
      }
      entregasDisponiveis={entregasDisponiveis || []}
      entregasEmAndamento={entregasEmAndamento || []}
      entregasConcluidas={entregasConcluidas || []}
    />
  )
}
