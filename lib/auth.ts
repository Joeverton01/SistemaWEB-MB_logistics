import { createClient as createBrowserClient } from "@/lib/supabase/client"
import bcrypt from "bcryptjs"

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

export interface LoginData {
  email: string
  senha: string
  tipoUsuario: "entregador" | "fornecedor"
}

// Cadastro de Entregador
export async function signUpEntregador(data: SignUpEntregadorData) {
  const supabase = createBrowserClient()

  try {
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

    return { success: true, data: entregadorData }
  } catch (error) {
    console.error("[v0] Erro no cadastro de entregador:", error)
    return { success: false, error: error instanceof Error ? error.message : "Erro ao cadastrar" }
  }
}

// Cadastro de Fornecedor
export async function signUpFornecedor(data: SignUpFornecedorData) {
  const supabase = createBrowserClient()

  try {
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

    return { success: true, data: fornecedorData }
  } catch (error) {
    console.error("[v0] Erro no cadastro de fornecedor:", error)
    return { success: false, error: error instanceof Error ? error.message : "Erro ao cadastrar" }
  }
}

// Login
export async function login(data: LoginData) {
  const supabase = createBrowserClient()

  try {
    // Buscar usuário no banco de dados
    const { data: usuario, error: usuarioError } = await supabase
      .from("usuarios_login")
      .select("*")
      .eq("email", data.email)
      .eq("tipo_usuario", data.tipoUsuario)
      .single()

    if (usuarioError || !usuario) {
      return { success: false, error: "Credenciais inválidas" }
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(data.senha, usuario.senha_hash)

    if (!senhaValida) {
      return { success: false, error: "Credenciais inválidas" }
    }

    // Atualizar last_login
    await supabase.from("usuarios_login").update({ last_login: new Date().toISOString() }).eq("id", usuario.id)

    // Buscar dados completos do usuário
    let userData
    if (data.tipoUsuario === "entregador") {
      const { data: entregador } = await supabase.from("entregador").select("*").eq("id", usuario.usuario_id).single()
      userData = entregador
    } else {
      const { data: fornecedor } = await supabase.from("fornecedor").select("*").eq("id", usuario.usuario_id).single()
      userData = fornecedor
    }

    return { success: true, data: { ...usuario, userData } }
  } catch (error) {
    console.error("[v0] Erro no login:", error)
    return { success: false, error: "Erro ao fazer login" }
  }
}

// Recuperar senha (placeholder - precisa de implementação de email)
export async function recuperarSenha(email: string) {
  // TODO: Implementar envio de email para recuperação de senha
  console.log("[v0] Recuperação de senha solicitada para:", email)
  return { success: true, message: "Email de recuperação enviado" }
}
