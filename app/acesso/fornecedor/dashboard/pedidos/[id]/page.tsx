import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Package,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  Truck,
  CheckCircle2,
  Clock,
  FileText,
  Download,
} from "lucide-react"
import Link from "next/link"

export default async function DetalhesPedidoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Mock data - em produção, buscar do banco de dados
  const pedido = {
    id: id,
    status: "Em Transporte",
    statusColor: "bg-blue-500",
    dataCriacao: "15/01/2024",
    dataColeta: "16/01/2024",
    previsaoEntrega: "18/01/2024",

    destinatario: {
      nome: "João Silva Santos",
      cpfCnpj: "123.456.789-00",
      telefone: "(11) 98765-4321",
      email: "joao.silva@email.com",
    },

    endereco: {
      rua: "Rua das Flores",
      numero: "123",
      complemento: "Apto 45",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",
    },

    carga: {
      descricao: "Equipamentos eletrônicos - notebooks e acessórios",
      peso: "15.5",
      dimensoes: "50 x 40 x 30",
      valor: "R$ 8.500,00",
      tipoServico: "Expresso",
    },

    observacoes: "Entregar apenas em horário comercial. Necessário agendamento prévio.",

    rastreamento: [
      { data: "15/01/2024 14:30", status: "Pedido criado", local: "São Paulo, SP" },
      { data: "16/01/2024 09:15", status: "Coletado", local: "São Paulo, SP" },
      { data: "16/01/2024 15:45", status: "Em trânsito", local: "Centro de Distribuição - SP" },
      { data: "17/01/2024 08:20", status: "Em transporte", local: "A caminho de Rio de Janeiro, RJ" },
    ],

    valorFrete: "R$ 245,00",
    valorTotal: "R$ 245,00",
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/acesso/fornecedor/dashboard">
              <Button variant="ghost" size="sm" className="text-[#002855] mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>

            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-[#002855]">Pedido {pedido.id}</h1>
              <Badge className={`${pedido.statusColor} text-white border-0 text-base px-4 py-1`}>{pedido.status}</Badge>
            </div>
            <p className="text-gray-600 mt-1">Criado em {pedido.dataCriacao}</p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-[#009DDC] text-[#009DDC] hover:bg-[#009DDC] hover:text-white bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar Comprovante
            </Button>
            <Button className="bg-[#009DDC] hover:bg-[#0056A3] text-white">
              <FileText className="h-4 w-4 mr-2" />
              Gerar Etiqueta
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rastreamento */}
            <Card className="border-2 border-[#009DDC]">
              <CardHeader className="bg-[#009DDC]/5">
                <CardTitle className="text-[#002855] flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#009DDC]" />
                  Rastreamento
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="relative">
                  {/* Linha vertical */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />

                  <div className="space-y-6">
                    {pedido.rastreamento.map((evento, index) => (
                      <div key={index} className="relative flex gap-4">
                        <div
                          className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                            index === pedido.rastreamento.length - 1 ? "bg-[#009DDC]" : "bg-[#8BC34A]"
                          }`}
                        >
                          {index === pedido.rastreamento.length - 1 ? (
                            <Clock className="h-4 w-4 text-white" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          )}
                        </div>

                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-[#002855]">{evento.status}</h4>
                            <span className="text-sm text-gray-500">{evento.data}</span>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {evento.local}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Destinatário */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#002855] flex items-center gap-2">
                  <User className="h-5 w-5 text-[#009DDC]" />
                  Destinatário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Nome Completo</span>
                    <p className="text-[#002855]">{pedido.destinatario.nome}</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-semibold text-gray-600">CPF/CNPJ</span>
                      <p className="text-[#002855]">{pedido.destinatario.cpfCnpj}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        Telefone
                      </span>
                      <p className="text-[#002855]">{pedido.destinatario.telefone}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      E-mail
                    </span>
                    <p className="text-[#002855]">{pedido.destinatario.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Endereço de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#002855] flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#009DDC]" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-[#002855] font-medium">
                    {pedido.endereco.rua}, {pedido.endereco.numero}
                    {pedido.endereco.complemento && ` - ${pedido.endereco.complemento}`}
                  </p>
                  <p className="text-[#002855]">{pedido.endereco.bairro}</p>
                  <p className="text-[#002855]">
                    {pedido.endereco.cidade} - {pedido.endereco.estado}
                  </p>
                  <p className="text-[#002855] font-semibold">CEP: {pedido.endereco.cep}</p>
                </div>
              </CardContent>
            </Card>

            {/* Dados da Carga */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#002855] flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#009DDC]" />
                  Dados da Carga
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Descrição</span>
                    <p className="text-[#002855]">{pedido.carga.descricao}</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Peso</span>
                      <p className="text-[#002855]">{pedido.carga.peso} kg</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Dimensões (cm)</span>
                      <p className="text-[#002855]">{pedido.carga.dimensoes}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-600">Valor Declarado</span>
                      <p className="text-[#002855] font-semibold">{pedido.carga.valor}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-sm font-semibold text-gray-600">Tipo de Serviço</span>
                    <p className="text-[#002855]">{pedido.carga.tipoServico}</p>
                  </div>

                  {pedido.observacoes && (
                    <>
                      <Separator />
                      <div>
                        <span className="text-sm font-semibold text-gray-600">Observações</span>
                        <p className="text-[#002855]">{pedido.observacoes}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Resumo */}
            <Card className="border-2 border-[#009DDC]">
              <CardHeader className="bg-[#009DDC]/5">
                <CardTitle className="text-[#002855]">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Valor do Frete</span>
                    <span className="font-semibold text-[#002855]">{pedido.valorFrete}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#002855]">Total</span>
                    <span className="font-bold text-xl text-[#009DDC]">{pedido.valorTotal}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Datas Importantes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#002855] flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#009DDC]" />
                  Datas Importantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Criação do Pedido</span>
                    <p className="text-[#002855]">{pedido.dataCriacao}</p>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-sm font-semibold text-gray-600">Data de Coleta</span>
                    <p className="text-[#002855]">{pedido.dataColeta}</p>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-sm font-semibold text-gray-600">Previsão de Entrega</span>
                    <p className="text-[#002855] font-semibold">{pedido.previsaoEntrega}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ações */}
            <Card className="bg-[#002855] text-white">
              <CardHeader>
                <CardTitle>Precisa de Ajuda?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/80 mb-4">
                  Entre em contato com nosso suporte para qualquer dúvida sobre este pedido.
                </p>
                <Button className="w-full bg-[#009DDC] hover:bg-[#0056A3] text-white">Falar com Suporte</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
