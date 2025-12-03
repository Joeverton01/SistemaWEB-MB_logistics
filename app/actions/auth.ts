"use server"

import { createClient as createServerClient } from "@/lib/supabase/server"
import { createSession, destroySession } from "@/lib/session"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export interface LoginData {
  email: string
  senha: string
  tipoUsuario: "entregador" | "fornecedor"
}

export interface SignUpEntregadorData {
  cpf: string
  nome: string
  cep: string
  dataNascimento: string
  telefone: string
  email: string
  senha: string
}

export interface SignUpFornecedorData {
  cnpj: string
  nomeRazao: string
  cep: string
  telefone: string
  email: string
  senha: string
}

export async function loginAction(data: LoginData) {
  const supabase = await createServerClient()

  try {
    console.log("[v0] Server: Tentando login para", data.email)

    // Buscar usuário no banco de dados
    const { data: usuario, error: usuarioError } = await supabase
      .from("usuarios_login")
      .select("*")
      .eq("email", data.email)
      .eq("tipo_usuario", data.tipoUsuario)
      .single()

    if (usuarioError || !usuario) {
      console.log("[v0] Server: Usuário não encontrado")
      return { success: false, error: "Credenciais inválidas" }
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(data.senha, usuario.senha_hash)

    if (!senhaValida) {
      console.log("[v0] Server: Senha inválida")
      return { success: false, error: "Credenciais inválidas" }
    }

    // Buscar dados completos do usuário
    let userData
    if (data.tipoUsuario === "entregador") {
      const { data: entregador } = await supabase.from("entregador").select("*").eq("id", usuario.usuario_id).single()
      userData = entregador
    } else {
      const { data: fornecedor } = await supabase.from("fornecedor").select("*").eq("id", usuario.usuario_id).single()
      userData = fornecedor
    }

    if (!userData) {
      return { success: false, error: "Erro ao carregar dados do usuário" }
    }

    // Criar sessão com cookie
    await createSession({
      usuario_id: usuario.usuario_id,
      email: usuario.email,
      tipo_usuario: usuario.tipo_usuario,
      nome: userData.nome || userData.nome_razao,
    })

    // Atualizar last_login
    await supabase.from("usuarios_login").update({ last_login: new Date().toISOString() }).eq("id", usuario.id)

    console.log("[v0] Server: Login bem-sucedido, sessão criada")
    return { success: true }
  } catch (error) {
    console.error("[v0] Server: Erro no login:", error)
    return { success: false, error: "Erro ao fazer login" }
  }
}

export async function logoutAction() {
  await destroySession()
  redirect("/acesso")
}

export async function signUpEntregadorAction(data: SignUpEntregadorData) {
  const supabase = await createServerClient()

  try {
    console.log("[v0] Server: Cadastrando entregador")

    const { data: emailExists } = await supabase
      .from("usuarios_login")
      .select("email")
      .eq("email", data.email)
      .maybeSingle()

    if (emailExists) {
      return { success: false, error: "Este email já está cadastrado" }
    }

    const { data: cpfExists } = await supabase.from("entregador").select("cpf").eq("cpf", data.cpf).maybeSingle()

    if (cpfExists) {
      return { success: false, error: "Este CPF já está cadastrado" }
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(data.senha, 10)

    // Inserir entregador
    const { data: entregadorData, error: entregadorError } = await supabase
      .from("entregador")
      .insert({
        cpf: data.cpf,
        nome: data.nome,
        cep: data.cep,
        data_nascimento: data.dataNascimento,
        telefone: data.telefone,
        email: data.email,
        senha: senhaHash,
      })
      .select()
      .single()

    if (entregadorError) throw entregadorError

    // Inserir em usuarios_login
    const { error: loginError } = await supabase.from("usuarios_login").insert({
      email: data.email,
      senha_hash: senhaHash,
      tipo_usuario: "entregador",
      usuario_id: entregadorData.id,
    })

    if (loginError) throw loginError

    await createSession({
      usuario_id: entregadorData.id,
      email: entregadorData.email,
      tipo_usuario: "entregador",
      nome: entregadorData.nome,
    })

    console.log("[v0] Server: Cadastro bem-sucedido e sessão criada")
    return { success: true }
  } catch (error) {
    console.error("[v0] Server: Erro no cadastro de entregador:", error)
    return { success: false, error: error instanceof Error ? error.message : "Erro ao cadastrar" }
  }
}

export async function signUpFornecedorAction(data: SignUpFornecedorData) {
  const supabase = await createServerClient()

  try {
    console.log("[v0] Server: Cadastrando fornecedor")

    const { data: emailExists } = await supabase
      .from("usuarios_login")
      .select("email")
      .eq("email", data.email)
      .maybeSingle()

    if (emailExists) {
      return { success: false, error: "Este email já está cadastrado" }
    }

    const { data: cnpjExists } = await supabase.from("fornecedor").select("cnpj").eq("cnpj", data.cnpj).maybeSingle()

    if (cnpjExists) {
      return { success: false, error: "Este CNPJ já está cadastrado" }
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(data.senha, 10)

    // Inserir fornecedor
    const { data: fornecedorData, error: fornecedorError } = await supabase
      .from("fornecedor")
      .insert({
        cnpj: data.cnpj,
        nome_razao: data.nomeRazao,
        cep: data.cep,
        telefone: data.telefone,
        email: data.email,
        senha: senhaHash,
      })
      .select()
      .single()

    if (fornecedorError) throw fornecedorError

    // Inserir em usuarios_login
    const { error: loginError } = await supabase.from("usuarios_login").insert({
      email: data.email,
      senha_hash: senhaHash,
      tipo_usuario: "fornecedor",
      usuario_id: fornecedorData.id,
    })

    if (loginError) throw loginError

    await createSession({
      usuario_id: fornecedorData.id,
      email: fornecedorData.email,
      tipo_usuario: "fornecedor",
      nome: fornecedorData.nome_razao,
    })

    console.log("[v0] Server: Cadastro bem-sucedido e sessão criada")
    return { success: true }
  } catch (error) {
    console.error("[v0] Server: Erro no cadastro de fornecedor:", error)
    return { success: false, error: error instanceof Error ? error.message : "Erro ao cadastrar" }
  }
}
