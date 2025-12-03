"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Package, MapPin, Truck, FileText, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { criarPedido } from "@/app/actions/pedidos"
import { useToast } from "@/hooks/use-toast"

export default function NovoPedidoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Dados do Destinatário
    nomeDestinatario: "",
    cpfCnpjDestinatario: "",
    telefoneDestinatario: "",
    emailDestinatario: "",

    // Endereço de Entrega
    cepEntrega: "",
    enderecoEntrega: "",
    numeroEntrega: "",
    complementoEntrega: "",
    bairroEntrega: "",
    cidadeEntrega: "",
    estadoEntrega: "",

    // Dados da Carga
    descricaoCarga: "",
    pesoCarga: "",
    alturaCarga: "",
    larguraCarga: "",
    profundidadeCarga: "",
    valorCarga: "",

    // Serviço
    tipoServico: "",
    dataColeta: "",
    observacoes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const buscarCEP = async (cep: string) => {
    if (cep.length === 8) {
      // Simulação de busca de CEP
      setFormData((prev) => ({
        ...prev,
        enderecoEntrega: "Rua Exemplo",
        bairroEntrega: "Centro",
        cidadeEntrega: "São Paulo",
        estadoEntrega: "SP",
      }))
    }
  }

  const canAdvance = () => {
    if (step === 1) {
      return formData.nomeDestinatario && formData.cpfCnpjDestinatario && formData.telefoneDestinatario
    } else if (step === 2) {
      return (
        formData.cepEntrega &&
        formData.enderecoEntrega &&
        formData.numeroEntrega &&
        formData.bairroEntrega &&
        formData.cidadeEntrega &&
        formData.estadoEntrega
      )
    } else if (step === 3) {
      return (
        formData.descricaoCarga &&
        formData.pesoCarga &&
        formData.valorCarga &&
        formData.tipoServico &&
        formData.dataColeta
      )
    }
    return true
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Obter fornecedor_id do cookie de sessão
      const response = await fetch("/api/session")
      const session = await response.json()

      if (!session.usuario_id) {
        toast({
          title: "Erro",
          description: "Sessão inválida. Faça login novamente.",
          variant: "destructive",
        })
        router.push("/acesso/fornecedor")
        return
      }

      const result = await criarPedido({
        fornecedor_id: session.usuario_id,
        destinatario_nome: formData.nomeDestinatario,
        destinatario_cpf_cnpj: formData.cpfCnpjDestinatario,
        destinatario_telefone: formData.telefoneDestinatario,
        destinatario_email: formData.emailDestinatario,
        endereco_cep: formData.cepEntrega,
        endereco_rua: formData.enderecoEntrega,
        endereco_numero: formData.numeroEntrega,
        endereco_complemento: formData.complementoEntrega,
        endereco_bairro: formData.bairroEntrega,
        endereco_cidade: formData.cidadeEntrega,
        endereco_estado: formData.estadoEntrega,
        carga_descricao: formData.descricaoCarga,
        carga_peso: Number.parseFloat(formData.pesoCarga),
        carga_altura: formData.alturaCarga ? Number.parseFloat(formData.alturaCarga) : undefined,
        carga_largura: formData.larguraCarga ? Number.parseFloat(formData.larguraCarga) : undefined,
        carga_profundidade: formData.profundidadeCarga ? Number.parseFloat(formData.profundidadeCarga) : undefined,
        carga_valor: Number.parseFloat(formData.valorCarga),
        tipo_servico: formData.tipoServico,
        data_coleta: formData.dataColeta,
        observacoes: formData.observacoes,
      })

      if (result.success) {
        toast({
          title: "Sucesso!",
          description: "Pedido criado com sucesso!",
        })
        router.push("/acesso/fornecedor/dashboard")
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro ao criar pedido",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Erro ao criar pedido:", error)
      toast({
        title: "Erro",
        description: "Erro ao criar pedido. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: "Destinatário" },
    { number: 2, title: "Endereço de Entrega" },
    { number: 3, title: "Dados da Carga" },
    { number: 4, title: "Revisão" },
  ]

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/acesso/fornecedor/dashboard">
            <Button variant="ghost" size="sm" className="text-[#002855]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#002855]">Criar Novo Pedido</h1>
        <p className="text-gray-600 mt-1">Preencha as informações para criar um novo pedido de entrega</p>
      </div>

      <div className="max-w-5xl mx-auto p-8">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Linha de conexão */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300 -z-10" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-[#009DDC] -z-10 transition-all duration-300"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    step >= s.number ? "bg-[#009DDC] text-white" : "bg-white border-2 border-gray-300 text-gray-400"
                  }`}
                >
                  {s.number}
                </div>
                <span className={`text-sm mt-2 font-medium ${step >= s.number ? "text-[#002855]" : "text-gray-400"}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário */}
        <Card>
          <CardContent className="p-8">
            {/* Etapa 1: Destinatário */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="h-6 w-6 text-[#009DDC]" />
                  <h2 className="text-2xl font-bold text-[#002855]">Dados do Destinatário</h2>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Label htmlFor="nomeDestinatario" className="text-[#002855] font-semibold">
                      Nome Completo *
                    </Label>
                    <Input
                      id="nomeDestinatario"
                      placeholder="Digite o nome completo"
                      value={formData.nomeDestinatario}
                      onChange={(e) => handleInputChange("nomeDestinatario", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cpfCnpjDestinatario" className="text-[#002855] font-semibold">
                      CPF/CNPJ *
                    </Label>
                    <Input
                      id="cpfCnpjDestinatario"
                      placeholder="000.000.000-00"
                      value={formData.cpfCnpjDestinatario}
                      onChange={(e) => handleInputChange("cpfCnpjDestinatario", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefoneDestinatario" className="text-[#002855] font-semibold">
                      Telefone *
                    </Label>
                    <Input
                      id="telefoneDestinatario"
                      placeholder="(00) 00000-0000"
                      value={formData.telefoneDestinatario}
                      onChange={(e) => handleInputChange("telefoneDestinatario", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="emailDestinatario" className="text-[#002855] font-semibold">
                      E-mail
                    </Label>
                    <Input
                      id="emailDestinatario"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={formData.emailDestinatario}
                      onChange={(e) => handleInputChange("emailDestinatario", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 2: Endereço de Entrega */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-6 w-6 text-[#009DDC]" />
                  <h2 className="text-2xl font-bold text-[#002855]">Endereço de Entrega</h2>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="cepEntrega" className="text-[#002855] font-semibold">
                      CEP *
                    </Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="cepEntrega"
                        placeholder="00000-000"
                        value={formData.cepEntrega}
                        onChange={(e) => handleInputChange("cepEntrega", e.target.value)}
                        maxLength={9}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => buscarCEP(formData.cepEntrega)}
                        className="border-[#009DDC] text-[#009DDC] hover:bg-[#009DDC] hover:text-white"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="estadoEntrega" className="text-[#002855] font-semibold">
                      Estado *
                    </Label>
                    <Input
                      id="estadoEntrega"
                      placeholder="UF"
                      value={formData.estadoEntrega}
                      onChange={(e) => handleInputChange("estadoEntrega", e.target.value)}
                      className="mt-2"
                      maxLength={2}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="enderecoEntrega" className="text-[#002855] font-semibold">
                      Endereço *
                    </Label>
                    <Input
                      id="enderecoEntrega"
                      placeholder="Rua, Avenida, etc."
                      value={formData.enderecoEntrega}
                      onChange={(e) => handleInputChange("enderecoEntrega", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="numeroEntrega" className="text-[#002855] font-semibold">
                      Número *
                    </Label>
                    <Input
                      id="numeroEntrega"
                      placeholder="Nº"
                      value={formData.numeroEntrega}
                      onChange={(e) => handleInputChange("numeroEntrega", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="complementoEntrega" className="text-[#002855] font-semibold">
                      Complemento
                    </Label>
                    <Input
                      id="complementoEntrega"
                      placeholder="Apto, Bloco, etc."
                      value={formData.complementoEntrega}
                      onChange={(e) => handleInputChange("complementoEntrega", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bairroEntrega" className="text-[#002855] font-semibold">
                      Bairro *
                    </Label>
                    <Input
                      id="bairroEntrega"
                      placeholder="Bairro"
                      value={formData.bairroEntrega}
                      onChange={(e) => handleInputChange("bairroEntrega", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cidadeEntrega" className="text-[#002855] font-semibold">
                      Cidade *
                    </Label>
                    <Input
                      id="cidadeEntrega"
                      placeholder="Cidade"
                      value={formData.cidadeEntrega}
                      onChange={(e) => handleInputChange("cidadeEntrega", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 3: Dados da Carga */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <Truck className="h-6 w-6 text-[#009DDC]" />
                  <h2 className="text-2xl font-bold text-[#002855]">Dados da Carga</h2>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Label htmlFor="descricaoCarga" className="text-[#002855] font-semibold">
                      Descrição da Carga *
                    </Label>
                    <Textarea
                      id="descricaoCarga"
                      placeholder="Descreva o conteúdo da carga"
                      value={formData.descricaoCarga}
                      onChange={(e) => handleInputChange("descricaoCarga", e.target.value)}
                      className="mt-2 min-h-24"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pesoCarga" className="text-[#002855] font-semibold">
                      Peso (kg) *
                    </Label>
                    <Input
                      id="pesoCarga"
                      type="number"
                      placeholder="0.00"
                      value={formData.pesoCarga}
                      onChange={(e) => handleInputChange("pesoCarga", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="valorCarga" className="text-[#002855] font-semibold">
                      Valor da Carga (R$) *
                    </Label>
                    <Input
                      id="valorCarga"
                      type="number"
                      placeholder="0.00"
                      value={formData.valorCarga}
                      onChange={(e) => handleInputChange("valorCarga", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label className="text-[#002855] font-semibold mb-2 block">Dimensões (cm)</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Input
                          placeholder="Altura"
                          type="number"
                          value={formData.alturaCarga}
                          onChange={(e) => handleInputChange("alturaCarga", e.target.value)}
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Largura"
                          type="number"
                          value={formData.larguraCarga}
                          onChange={(e) => handleInputChange("larguraCarga", e.target.value)}
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Profundidade"
                          type="number"
                          value={formData.profundidadeCarga}
                          onChange={(e) => handleInputChange("profundidadeCarga", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tipoServico" className="text-[#002855] font-semibold">
                      Tipo de Serviço *
                    </Label>
                    <Select
                      value={formData.tipoServico}
                      onValueChange={(value) => handleInputChange("tipoServico", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expresso">Expresso (1-2 dias)</SelectItem>
                        <SelectItem value="normal">Normal (3-5 dias)</SelectItem>
                        <SelectItem value="economico">Econômico (7-10 dias)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dataColeta" className="text-[#002855] font-semibold">
                      Data de Coleta Desejada *
                    </Label>
                    <Input
                      id="dataColeta"
                      type="date"
                      value={formData.dataColeta}
                      onChange={(e) => handleInputChange("dataColeta", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="observacoes" className="text-[#002855] font-semibold">
                      Observações Adicionais
                    </Label>
                    <Textarea
                      id="observacoes"
                      placeholder="Informações adicionais sobre a entrega"
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange("observacoes", e.target.value)}
                      className="mt-2 min-h-24"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Etapa 4: Revisão */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="h-6 w-6 text-[#009DDC]" />
                  <h2 className="text-2xl font-bold text-[#002855]">Revisão do Pedido</h2>
                </div>

                <div className="space-y-6">
                  {/* Destinatário */}
                  <Card className="border-2 border-[#009DDC]/20">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-600">Nome:</span>
                          <p className="text-[#002855]">{formData.nomeDestinatario}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">CPF/CNPJ:</span>
                          <p className="text-[#002855]">{formData.cpfCnpjDestinatario}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Telefone:</span>
                          <p className="text-[#002855]">{formData.telefoneDestinatario}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">E-mail:</span>
                          <p className="text-[#002855]">{formData.emailDestinatario || "Não informado"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Endereço */}
                  <Card className="border-2 border-[#009DDC]/20">
                    <CardContent className="pt-4">
                      <p className="text-[#002855]">
                        {formData.enderecoEntrega}, {formData.numeroEntrega}
                        {formData.complementoEntrega && ` - ${formData.complementoEntrega}`}
                      </p>
                      <p className="text-[#002855]">
                        {formData.bairroEntrega} - {formData.cidadeEntrega}/{formData.estadoEntrega}
                      </p>
                      <p className="text-[#002855]">CEP: {formData.cepEntrega}</p>
                    </CardContent>
                  </Card>

                  {/* Carga */}
                  <Card className="border-2 border-[#009DDC]/20">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="col-span-2">
                          <span className="font-semibold text-gray-600">Descrição:</span>
                          <p className="text-[#002855]">{formData.descricaoCarga}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Peso:</span>
                          <p className="text-[#002855]">{formData.pesoCarga} kg</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Valor:</span>
                          <p className="text-[#002855]">R$ {formData.valorCarga}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Dimensões:</span>
                          <p className="text-[#002855]">
                            {formData.alturaCarga} x {formData.larguraCarga} x {formData.profundidadeCarga} cm
                          </p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Tipo de Serviço:</span>
                          <p className="text-[#002855] capitalize">{formData.tipoServico}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-600">Data de Coleta:</span>
                          <p className="text-[#002855]">{formData.dataColeta}</p>
                        </div>
                        {formData.observacoes && (
                          <div className="col-span-2">
                            <span className="font-semibold text-gray-600">Observações:</span>
                            <p className="text-[#002855]">{formData.observacoes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Botões de Navegação */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={loading}
                  className="border-[#009DDC] text-[#009DDC] hover:bg-[#009DDC] hover:text-white"
                >
                  Voltar
                </Button>
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canAdvance() || loading}
                  className="ml-auto bg-[#009DDC] hover:bg-[#0056A3] text-white"
                >
                  Avançar
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="ml-auto bg-[#8BC34A] hover:bg-green-600 text-white"
                >
                  {loading ? "Criando Pedido..." : "Confirmar e Criar Pedido"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
