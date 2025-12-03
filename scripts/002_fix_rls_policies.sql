-- Remover políticas antigas
DROP POLICY IF EXISTS "entregador_select_own" ON public.entregador;
DROP POLICY IF EXISTS "entregador_update_own" ON public.entregador;
DROP POLICY IF EXISTS "entregador_insert_public" ON public.entregador;
DROP POLICY IF EXISTS "fornecedor_select_own" ON public.fornecedor;
DROP POLICY IF EXISTS "fornecedor_update_own" ON public.fornecedor;
DROP POLICY IF EXISTS "fornecedor_insert_public" ON public.fornecedor;
DROP POLICY IF EXISTS "usuarios_login_select_own" ON public.usuarios_login;
DROP POLICY IF EXISTS "usuarios_login_insert_public" ON public.usuarios_login;
DROP POLICY IF EXISTS "usuarios_login_update_own" ON public.usuarios_login;

-- Políticas RLS para ENTREGADOR
-- Permitir INSERT público para cadastro
CREATE POLICY "entregador_insert_public" 
  ON public.entregador 
  FOR INSERT 
  WITH CHECK (true);

-- Permitir SELECT público para login/verificação
CREATE POLICY "entregador_select_public" 
  ON public.entregador 
  FOR SELECT 
  USING (true);

-- Permitir UPDATE apenas para registros específicos (será controlado pela aplicação)
CREATE POLICY "entregador_update_public" 
  ON public.entregador 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

-- Políticas RLS para FORNECEDOR
-- Permitir INSERT público para cadastro
CREATE POLICY "fornecedor_insert_public" 
  ON public.fornecedor 
  FOR INSERT 
  WITH CHECK (true);

-- Permitir SELECT público para login/verificação
CREATE POLICY "fornecedor_select_public" 
  ON public.fornecedor 
  FOR SELECT 
  USING (true);

-- Permitir UPDATE apenas para registros específicos (será controlado pela aplicação)
CREATE POLICY "fornecedor_update_public" 
  ON public.fornecedor 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

-- Políticas RLS para USUARIOS_LOGIN
-- Permitir INSERT público para cadastro
CREATE POLICY "usuarios_login_insert_public" 
  ON public.usuarios_login 
  FOR INSERT 
  WITH CHECK (true);

-- Permitir SELECT público para login/verificação
CREATE POLICY "usuarios_login_select_public" 
  ON public.usuarios_login 
  FOR SELECT 
  USING (true);

-- Permitir UPDATE para atualizar last_login
CREATE POLICY "usuarios_login_update_public" 
  ON public.usuarios_login 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);
