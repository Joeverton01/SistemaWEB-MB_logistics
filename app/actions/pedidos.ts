"use server"

import { createClient } from "@/lib/supabase/server"

export async function criarPedido(data: {
  fornecedor_id: string
  destinatario_nome: string
  destinatario_cpf_cnpj: string
  destinatario_telefone: string
  destinatario_email?: string
  endereco_cep: string
  endereco_rua: string
  endereco_numero: string
  endereco_complemento?: string
  endereco_bairro: string
  endereco_cidade: string
  endereco_estado: string
  carga_descricao: string
  carga_peso: number
  carga_altura?: number
  carga_largura?: number
  carga_profundidade?: number
  carga_valor: number
  tipo_servico: string
  data_coleta: string
  observacoes?: string
}) {
  try {
    const supabase = await createClient()

    // Calcular valor do frete baseado no tipo de serviço e peso
    let valor_frete = 0
    const peso = data.carga_peso

    if (data.tipo_servico === "expresso") {
      valor_frete = Math.max(50, peso * 15)
    } else if (data.tipo_servico === "normal") {
      valor_frete = Math.max(30, peso * 10)
    } else {
      valor_frete = Math.max(20, peso * 7)
    }

    // Calcular previsão de entrega
    const dataColeta = new Date(data.data_coleta)
    let diasEntrega = 7
    if (data.tipo_servico === "expresso") diasEntrega = 2
    else if (data.tipo_servico === "normal") diasEntrega = 5

    const previsao_entrega = new Date(dataColeta)
    previsao_entrega.setDate(previsao_entrega.getDate() + diasEntrega)

    // Criar pedido
    const { data: pedido, error } = await supabase
      .from("pedidos")
      .insert({
        fornecedor_id: data.fornecedor_id,
        destinatario_nome: data.destinatario_nome,
        destinatario_cpf_cnpj: data.destinatario_cpf_cnpj,
        destinatario_telefone: data.destinatario_telefone,
        destinatario_email: data.destinatario_email,
        endereco_cep: data.endereco_cep,
        endereco_rua: data.endereco_rua,
        endereco_numero: data.endereco_numero,
        endereco_complemento: data.endereco_complemento,
        endereco_bairro: data.endereco_bairro,
        endereco_cidade: data.endereco_cidade,
        endereco_estado: data.endereco_estado,
        carga_descricao: data.carga_descricao,
        carga_peso: data.carga_peso,
        carga_altura: data.carga_altura,
        carga_largura: data.carga_largura,
        carga_profundidade: data.carga_profundidade,
        carga_valor: data.carga_valor,
        tipo_servico: data.tipo_servico,
        data_coleta: data.data_coleta,
        observacoes: data.observacoes,
        valor_frete: valor_frete,
        valor_total: valor_frete,
        previsao_entrega: previsao_entrega.toISOString().split("T")[0],
        status: "Aguardando Coleta",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Erro ao criar pedido:", error)
      return { success: false, error: "Erro ao criar pedido" }
    }

    // Criar registro de rastreamento inicial
    await supabase.from("rastreamento").insert({
      pedido_id: pedido.id,
      status: "Pedido criado",
      local: `${data.endereco_cidade}, ${data.endereco_estado}`,
      observacao: "Pedido registrado no sistema",
    })

    // Criar entrega disponível para entregadores
    await supabase.from("entregas_disponiveis").insert({
      pedido_id: pedido.id,
      origem_cidade: data.endereco_cidade,
      origem_estado: data.endereco_estado,
      destino_cidade: data.endereco_cidade,
      destino_estado: data.endereco_estado,
      distancia_km: 0,
      valor_entrega: valor_frete * 0.7, // 70% do frete vai para o entregador
      data_coleta_prevista: data.data_coleta,
      prazo_entrega: previsao_entrega.toISOString(),
      status: "disponivel",
    })

    return { success: true, pedido }
  } catch (error) {
    console.error("[v0] Erro no servidor:", error)
    return { success: false, error: "Erro interno do servidor" }
  }
}

export async function aceitarEntrega(entrega_id: string, entregador_id: string, pedido_id: string) {
  try {
    const supabase = await createClient()

    // Atualizar entrega como aceita
    const { error: entregaError } = await supabase
      .from("entregas_disponiveis")
      .update({ status: "aceita" })
      .eq("id", entrega_id)

    if (entregaError) {
      console.error("[v0] Erro ao aceitar entrega:", entregaError)
      return { success: false, error: "Erro ao aceitar entrega" }
    }

    // Atualizar pedido com entregador
    const { error: pedidoError } = await supabase
      .from("pedidos")
      .update({
        entregador_id: entregador_id,
        status: "Coletado",
      })
      .eq("id", pedido_id)

    if (pedidoError) {
      console.error("[v0] Erro ao atualizar pedido:", pedidoError)
      return { success: false, error: "Erro ao atualizar pedido" }
    }

    // Adicionar rastreamento
    await supabase.from("rastreamento").insert({
      pedido_id: pedido_id,
      status: "Coletado por entregador",
      local: "Em rota",
      observacao: "Entrega aceita pelo entregador",
    })

    return { success: true }
  } catch (error) {
    console.error("[v0] Erro no servidor:", error)
    return { success: false, error: "Erro interno do servidor" }
  }
}

export async function confirmarEntrega(pedido_id: string, entregador_id: string) {
  try {
    const supabase = await createClient()

    // Buscar dados do pedido
    const { data: pedido } = await supabase.from("pedidos").select("valor_frete").eq("id", pedido_id).single()

    if (!pedido) {
      return { success: false, error: "Pedido não encontrado" }
    }

    // Atualizar status do pedido
    const { error: pedidoError } = await supabase
      .from("pedidos")
      .update({
        status: "Entregue",
        data_entrega: new Date().toISOString(),
      })
      .eq("id", pedido_id)

    if (pedidoError) {
      console.error("[v0] Erro ao confirmar entrega:", pedidoError)
      return { success: false, error: "Erro ao confirmar entrega" }
    }

    // Registrar ganho do entregador
    const valor_ganho = pedido.valor_frete * 0.7 // 70% do frete
    await supabase.from("ganhos_entregador").insert({
      entregador_id: entregador_id,
      pedido_id: pedido_id,
      valor: valor_ganho,
      status: "pendente",
    })

    // Atualizar estatísticas do entregador
    const hoje = new Date().toISOString().split("T")[0]
    const inicioSemana = new Date()
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay())

    const { data: ganhoHoje } = await supabase
      .from("ganhos_entregador")
      .select("valor")
      .eq("entregador_id", entregador_id)
      .gte("data_entrega", hoje)
      .eq("status", "pendente")

    const { data: ganhoSemana } = await supabase
      .from("ganhos_entregador")
      .select("valor")
      .eq("entregador_id", entregador_id)
      .gte("data_entrega", inicioSemana.toISOString().split("T")[0])
      .eq("status", "pendente")

    const totalHoje = ganhoHoje?.reduce((sum, g) => sum + Number.parseFloat(g.valor.toString()), 0) || 0
    const totalSemana = ganhoSemana?.reduce((sum, g) => sum + Number.parseFloat(g.valor.toString()), 0) || 0

    await supabase
      .from("estatisticas_entregador")
      .update({
        ganhos_hoje: totalHoje,
        ganhos_semana: totalSemana,
        updated_at: new Date().toISOString(),
      })
      .eq("entregador_id", entregador_id)

    // Adicionar rastreamento
    await supabase.from("rastreamento").insert({
      pedido_id: pedido_id,
      status: "Entregue",
      local: "Destino final",
      observacao: "Entrega confirmada pelo entregador",
    })

    return { success: true }
  } catch (error) {
    console.error("[v0] Erro no servidor:", error)
    return { success: false, error: "Erro interno do servidor" }
  }
}
