-- Criar tabela ENTREGADOR
CREATE TABLE IF NOT EXISTS public.entregador (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cpf TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  cep TEXT NOT NULL,
  data_nascimento DATE NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela FORNECEDOR
CREATE TABLE IF NOT EXISTS public.fornecedor (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cnpj TEXT UNIQUE NOT NULL,
  nome_razao TEXT NOT NULL,
  cep TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela USUARIOS_LOGIN para gerenciar autenticação centralizada
CREATE TABLE IF NOT EXISTS public.usuarios_login (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('entregador', 'fornecedor')),
  usuario_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Habilitar Row Level Security (RLS) nas tabelas
ALTER TABLE public.entregador ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fornecedor ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios_login ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para ENTREGADOR
-- Permitir que entregadores vejam apenas seus próprios dados
CREATE POLICY "entregador_select_own" 
  ON public.entregador FOR SELECT 
  USING (auth.uid()::text = id::text);

-- Permitir que entregadores atualizem apenas seus próprios dados
CREATE POLICY "entregador_update_own" 
  ON public.entregador FOR UPDATE 
  USING (auth.uid()::text = id::text);

-- Permitir inserção de novos entregadores (para cadastro público)
CREATE POLICY "entregador_insert_public" 
  ON public.entregador FOR INSERT 
  WITH CHECK (true);

-- Políticas RLS para FORNECEDOR
-- Permitir que fornecedores vejam apenas seus próprios dados
CREATE POLICY "fornecedor_select_own" 
  ON public.fornecedor FOR SELECT 
  USING (auth.uid()::text = id::text);

-- Permitir que fornecedores atualizem apenas seus próprios dados
CREATE POLICY "fornecedor_update_own" 
  ON public.fornecedor FOR UPDATE 
  USING (auth.uid()::text = id::text);

-- Permitir inserção de novos fornecedores (para cadastro público)
CREATE POLICY "fornecedor_insert_public" 
  ON public.fornecedor FOR INSERT 
  WITH CHECK (true);

-- Políticas RLS para USUARIOS_LOGIN
-- Usuários podem ver apenas seu próprio registro de login
CREATE POLICY "usuarios_login_select_own" 
  ON public.usuarios_login FOR SELECT 
  USING (auth.uid()::text = id::text OR email = current_setting('request.jwt.claims', true)::json->>'email');

-- Permitir inserção de novos usuários (para cadastro)
CREATE POLICY "usuarios_login_insert_public" 
  ON public.usuarios_login FOR INSERT 
  WITH CHECK (true);

-- Atualizar last_login
CREATE POLICY "usuarios_login_update_own" 
  ON public.usuarios_login FOR UPDATE 
  USING (auth.uid()::text = id::text OR email = current_setting('request.jwt.claims', true)::json->>'email');

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_entregador_email ON public.entregador(email);
CREATE INDEX IF NOT EXISTS idx_entregador_cpf ON public.entregador(cpf);
CREATE INDEX IF NOT EXISTS idx_fornecedor_email ON public.fornecedor(email);
CREATE INDEX IF NOT EXISTS idx_fornecedor_cnpj ON public.fornecedor(cnpj);
CREATE INDEX IF NOT EXISTS idx_usuarios_login_email ON public.usuarios_login(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_login_tipo ON public.usuarios_login(tipo_usuario);
