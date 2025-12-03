-- Tabela de Pedidos (Orders)
CREATE TABLE IF NOT EXISTS pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_pedido TEXT UNIQUE NOT NULL,
  fornecedor_id UUID NOT NULL REFERENCES fornecedor(id) ON DELETE CASCADE,
  entregador_id UUID REFERENCES entregador(id) ON DELETE SET NULL,
  
  -- Dados do Destinatário
  destinatario_nome TEXT NOT NULL,
  destinatario_cpf_cnpj TEXT NOT NULL,
  destinatario_telefone TEXT NOT NULL,
  destinatario_email TEXT,
  
  -- Endereço de Entrega
  endereco_cep TEXT NOT NULL,
  endereco_rua TEXT NOT NULL,
  endereco_numero TEXT NOT NULL,
  endereco_complemento TEXT,
  endereco_bairro TEXT NOT NULL,
  endereco_cidade TEXT NOT NULL,
  endereco_estado TEXT NOT NULL,
  
  -- Dados da Carga
  carga_descricao TEXT NOT NULL,
  carga_peso DECIMAL(10, 2) NOT NULL,
  carga_altura DECIMAL(10, 2),
  carga_largura DECIMAL(10, 2),
  carga_profundidade DECIMAL(10, 2),
  carga_valor DECIMAL(10, 2) NOT NULL,
  
  -- Serviço
  tipo_servico TEXT NOT NULL, -- expresso, normal, economico
  data_coleta DATE NOT NULL,
  observacoes TEXT,
  
  -- Valores
  valor_frete DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  valor_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  
  -- Status e Datas
  status TEXT NOT NULL DEFAULT 'Aguardando Coleta', -- Aguardando Coleta, Em Separação, Coletado, Em Transporte, Saiu para Entrega, Entregue, Cancelado
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_coleta_realizada TIMESTAMP WITH TIME ZONE,
  data_entrega TIMESTAMP WITH TIME ZONE,
  previsao_entrega DATE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para otimização
CREATE INDEX IF NOT EXISTS idx_pedidos_fornecedor ON pedidos(fornecedor_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_entregador ON pedidos(entregador_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos(status);
CREATE INDEX IF NOT EXISTS idx_pedidos_numero ON pedidos(numero_pedido);

-- Função para gerar número de pedido automático
CREATE OR REPLACE FUNCTION gerar_numero_pedido()
RETURNS TRIGGER AS $$
BEGIN
  NEW.numero_pedido := 'PED-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('pedidos_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Sequência para números de pedido
CREATE SEQUENCE IF NOT EXISTS pedidos_seq START 1;

-- Trigger para gerar número de pedido
DROP TRIGGER IF EXISTS trigger_gerar_numero_pedido ON pedidos;
CREATE TRIGGER trigger_gerar_numero_pedido
  BEFORE INSERT ON pedidos
  FOR EACH ROW
  WHEN (NEW.numero_pedido IS NULL)
  EXECUTE FUNCTION gerar_numero_pedido();

-- Tabela de Rastreamento
CREATE TABLE IF NOT EXISTS rastreamento (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  local TEXT NOT NULL,
  data_hora TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  observacao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rastreamento_pedido ON rastreamento(pedido_id);

-- Tabela de Entregas Disponíveis (para entregadores aceitarem)
CREATE TABLE IF NOT EXISTS entregas_disponiveis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  origem_cidade TEXT NOT NULL,
  origem_estado TEXT NOT NULL,
  destino_cidade TEXT NOT NULL,
  destino_estado TEXT NOT NULL,
  distancia_km DECIMAL(10, 2) NOT NULL,
  valor_entrega DECIMAL(10, 2) NOT NULL,
  data_coleta_prevista TIMESTAMP WITH TIME ZONE NOT NULL,
  prazo_entrega TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'disponivel', -- disponivel, aceita, cancelada
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entregas_disponiveis_status ON entregas_disponiveis(status);
CREATE INDEX IF NOT EXISTS idx_entregas_disponiveis_pedido ON entregas_disponiveis(pedido_id);

-- Tabela de Estatísticas do Fornecedor
CREATE TABLE IF NOT EXISTS estatisticas_fornecedor (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fornecedor_id UUID NOT NULL UNIQUE REFERENCES fornecedor(id) ON DELETE CASCADE,
  pedidos_ativos INT DEFAULT 0,
  pedidos_concluidos INT DEFAULT 0,
  pedidos_em_transporte INT DEFAULT 0,
  pedidos_aguardando INT DEFAULT 0,
  total_gasto DECIMAL(10, 2) DEFAULT 0.00,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Estatísticas do Entregador
CREATE TABLE IF NOT EXISTS estatisticas_entregador (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entregador_id UUID NOT NULL UNIQUE REFERENCES entregador(id) ON DELETE CASCADE,
  entregas_hoje INT DEFAULT 0,
  entregas_semana INT DEFAULT 0,
  entregas_mes INT DEFAULT 0,
  entregas_total INT DEFAULT 0,
  ganhos_hoje DECIMAL(10, 2) DEFAULT 0.00,
  ganhos_semana DECIMAL(10, 2) DEFAULT 0.00,
  ganhos_mes DECIMAL(10, 2) DEFAULT 0.00,
  ganhos_total DECIMAL(10, 2) DEFAULT 0.00,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Ganhos do Entregador (histórico detalhado)
CREATE TABLE IF NOT EXISTS ganhos_entregador (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entregador_id UUID NOT NULL REFERENCES entregador(id) ON DELETE CASCADE,
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  valor DECIMAL(10, 2) NOT NULL,
  data_entrega TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'pendente', -- pendente, pago
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ganhos_entregador ON ganhos_entregador(entregador_id);
CREATE INDEX IF NOT EXISTS idx_ganhos_data ON ganhos_entregador(data_entrega);

-- ===========================
-- POLÍTICAS RLS (Row Level Security)
-- ===========================

-- Pedidos
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS pedidos_select_public ON pedidos;
CREATE POLICY pedidos_select_public ON pedidos FOR SELECT USING (true);

DROP POLICY IF EXISTS pedidos_insert_public ON pedidos;
CREATE POLICY pedidos_insert_public ON pedidos FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS pedidos_update_public ON pedidos;
CREATE POLICY pedidos_update_public ON pedidos FOR UPDATE USING (true);

-- Rastreamento
ALTER TABLE rastreamento ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS rastreamento_select_public ON rastreamento;
CREATE POLICY rastreamento_select_public ON rastreamento FOR SELECT USING (true);

DROP POLICY IF EXISTS rastreamento_insert_public ON rastreamento;
CREATE POLICY rastreamento_insert_public ON rastreamento FOR INSERT WITH CHECK (true);

-- Entregas Disponíveis
ALTER TABLE entregas_disponiveis ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS entregas_disponiveis_select_public ON entregas_disponiveis;
CREATE POLICY entregas_disponiveis_select_public ON entregas_disponiveis FOR SELECT USING (true);

DROP POLICY IF EXISTS entregas_disponiveis_insert_public ON entregas_disponiveis;
CREATE POLICY entregas_disponiveis_insert_public ON entregas_disponiveis FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS entregas_disponiveis_update_public ON entregas_disponiveis;
CREATE POLICY entregas_disponiveis_update_public ON entregas_disponiveis FOR UPDATE USING (true);

-- Estatísticas Fornecedor
ALTER TABLE estatisticas_fornecedor ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS estatisticas_fornecedor_select_public ON estatisticas_fornecedor;
CREATE POLICY estatisticas_fornecedor_select_public ON estatisticas_fornecedor FOR SELECT USING (true);

DROP POLICY IF EXISTS estatisticas_fornecedor_insert_public ON estatisticas_fornecedor;
CREATE POLICY estatisticas_fornecedor_insert_public ON estatisticas_fornecedor FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS estatisticas_fornecedor_update_public ON estatisticas_fornecedor;
CREATE POLICY estatisticas_fornecedor_update_public ON estatisticas_fornecedor FOR UPDATE USING (true);

-- Estatísticas Entregador
ALTER TABLE estatisticas_entregador ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS estatisticas_entregador_select_public ON estatisticas_entregador;
CREATE POLICY estatisticas_entregador_select_public ON estatisticas_entregador FOR SELECT USING (true);

DROP POLICY IF EXISTS estatisticas_entregador_insert_public ON estatisticas_entregador;
CREATE POLICY estatisticas_entregador_insert_public ON estatisticas_entregador FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS estatisticas_entregador_update_public ON estatisticas_entregador;
CREATE POLICY estatisticas_entregador_update_public ON estatisticas_entregador FOR UPDATE USING (true);

-- Ganhos Entregador
ALTER TABLE ganhos_entregador ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS ganhos_entregador_select_public ON ganhos_entregador;
CREATE POLICY ganhos_entregador_select_public ON ganhos_entregador FOR SELECT USING (true);

DROP POLICY IF EXISTS ganhos_entregador_insert_public ON ganhos_entregador;
CREATE POLICY ganhos_entregador_insert_public ON ganhos_entregador FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS ganhos_entregador_update_public ON ganhos_entregador;
CREATE POLICY ganhos_entregador_update_public ON ganhos_entregador FOR UPDATE USING (true);

-- ===========================
-- FUNÇÕES PARA ATUALIZAR ESTATÍSTICAS
-- ===========================

-- Função para inicializar estatísticas do fornecedor
CREATE OR REPLACE FUNCTION inicializar_estatisticas_fornecedor()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO estatisticas_fornecedor (fornecedor_id)
  VALUES (NEW.id)
  ON CONFLICT (fornecedor_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_inicializar_estatisticas_fornecedor ON fornecedor;
CREATE TRIGGER trigger_inicializar_estatisticas_fornecedor
  AFTER INSERT ON fornecedor
  FOR EACH ROW
  EXECUTE FUNCTION inicializar_estatisticas_fornecedor();

-- Função para inicializar estatísticas do entregador
CREATE OR REPLACE FUNCTION inicializar_estatisticas_entregador()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO estatisticas_entregador (entregador_id)
  VALUES (NEW.id)
  ON CONFLICT (entregador_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_inicializar_estatisticas_entregador ON entregador;
CREATE TRIGGER trigger_inicializar_estatisticas_entregador
  AFTER INSERT ON entregador
  FOR EACH ROW
  EXECUTE FUNCTION inicializar_estatisticas_entregador();

-- Função para atualizar estatísticas do fornecedor quando pedido muda
CREATE OR REPLACE FUNCTION atualizar_estatisticas_fornecedor()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE estatisticas_fornecedor
  SET 
    pedidos_ativos = (
      SELECT COUNT(*) FROM pedidos 
      WHERE fornecedor_id = NEW.fornecedor_id 
      AND status NOT IN ('Entregue', 'Cancelado')
    ),
    pedidos_concluidos = (
      SELECT COUNT(*) FROM pedidos 
      WHERE fornecedor_id = NEW.fornecedor_id 
      AND status = 'Entregue'
    ),
    pedidos_em_transporte = (
      SELECT COUNT(*) FROM pedidos 
      WHERE fornecedor_id = NEW.fornecedor_id 
      AND status = 'Em Transporte'
    ),
    pedidos_aguardando = (
      SELECT COUNT(*) FROM pedidos 
      WHERE fornecedor_id = NEW.fornecedor_id 
      AND status IN ('Aguardando Coleta', 'Em Separação')
    ),
    updated_at = NOW()
  WHERE fornecedor_id = NEW.fornecedor_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_atualizar_estatisticas_fornecedor ON pedidos;
CREATE TRIGGER trigger_atualizar_estatisticas_fornecedor
  AFTER INSERT OR UPDATE ON pedidos
  FOR EACH ROW
  EXECUTE FUNCTION atualizar_estatisticas_fornecedor();
