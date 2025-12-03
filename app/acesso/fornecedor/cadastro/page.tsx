"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signUpFornecedorAction } from "@/app/actions/auth"

export default function FornecedorCadastroPage() {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Step 1 - Dados da Empresa
  const [cnpj, setCnpj] = useState("")
  const [razaoSocial, setRazaoSocial] = useState("")
  const [nomeFantasia, setNomeFantasia] = useState("")
  const [inscricaoEstadual, setInscricaoEstadual] = useState("")
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")

  // Step 2 - Dados de Contato
  const [nomeResponsavel, setNomeResponsavel] = useState("")
  const [cpfResponsavel, setCpfResponsavel] = useState("")
  const [emailCorporativo, setEmailCorporativo] = useState("")
  const [telefone, setTelefone] = useState("")
  const [celular, setCelular] = useState("")
  const [cargoResponsavel, setCargoResponsavel] = useState("")

  // Step 3 - Criar Senha
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [aceitaTermos, setAceitaTermos] = useState(false)

  const validateStep1 = () => {
    if (
      !cnpj ||
      !razaoSocial ||
      !nomeFantasia ||
      !inscricaoEstadual ||
      !cep ||
      !endereco ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado
    ) {
      setError("Todos os campos obrigatórios devem ser preenchidos")
      return false
    }
    // Validar CNPJ (formato básico)
    const cnpjNumeros = cnpj.replace(/\D/g, "")
    if (cnpjNumeros.length !== 14) {
      setError("CNPJ inválido. Deve conter 14 dígitos")
      return false
    }
    // Validar CEP
    const cepNumeros = cep.replace(/\D/g, "")
    if (cepNumeros.length !== 8) {
      setError("CEP inválido. Deve conter 8 dígitos")
      return false
    }
    setError("")
    return true
  }

  const validateStep2 = () => {
    if (!nomeResponsavel || !cpfResponsavel || !emailCorporativo || !telefone || !celular || !cargoResponsavel) {
      setError("Todos os campos obrigatórios devem ser preenchidos")
      return false
    }
    // Validar CPF (formato básico)
    const cpfNumeros = cpfResponsavel.replace(/\D/g, "")
    if (cpfNumeros.length !== 11) {
      setError("CPF inválido. Deve conter 11 dígitos")
      return false
    }
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailCorporativo)) {
      setError("Email inválido")
      return false
    }
    setError("")
    return true
  }

  const validateStep3 = () => {
    if (!senha || !confirmarSenha) {
      setError("Todos os campos de senha devem ser preenchidos")
      return false
    }
    if (senha.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres")
      return false
    }
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem")
      return false
    }
    if (!aceitaTermos) {
      setError("Você deve aceitar os termos de uso")
      return false
    }
    setError("")
    return true
  }

  const handleNext = () => {
    setError("")

    if (step === 1 && !validateStep1()) {
      return
    }
    if (step === 2 && !validateStep2()) {
      return
    }
    if (step === 3 && !validateStep3()) {
      return
    }

    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    setError("")
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    console.log("[v0] Iniciando cadastro de fornecedor")

    try {
      const result = await signUpFornecedorAction({
        cnpj,
        nomeRazao: razaoSocial,
        cep,
        telefone,
        email: emailCorporativo,
        senha,
      })

      if (result.success) {
        console.log("[v0] Cadastro bem-sucedido")
        alert("Cadastro realizado com sucesso! Faça login para acessar o portal.")
        router.push("/acesso/fornecedor")
      } else {
        setError(result.error || "Erro ao realizar cadastro")
      }
    } catch (err) {
      console.error("[v0] Erro no cadastro:", err)
      setError("Erro ao realizar cadastro. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const searchCep = async () => {
    const cepNumeros = cep.replace(/\D/g, "")
    if (cepNumeros.length !== 8) {
      setError("CEP inválido")
      return
    }

    console.log("[v0] Buscando CEP:", cepNumeros)
    setIsLoading(true)

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumeros}/json/`)
      const data = await response.json()

      if (data.erro) {
        setError("CEP não encontrado")
      } else {
        setEndereco(data.logradouro || "")
        setBairro(data.bairro || "")
        setCidade(data.localidade || "")
        setEstado(data.uf || "")
        setError("")
      }
    } catch (err) {
      console.error("[v0] Erro ao buscar CEP:", err)
      setError("Erro ao buscar CEP")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Card className="border shadow-sm">
            <CardContent className="p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Cadastro de Fornecedor</h1>

                {/* Stepper */}
                <div className="flex items-center justify-between mb-12">
                  {[
                    { num: 1, label: "Dados da Empresa" },
                    { num: 2, label: "Dados de Contato" },
                    { num: 3, label: "Criar Senha" },
                    { num: 4, label: "Revisão" },
                  ].map((item, index) => (
                    <div key={item.num} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                            step >= item.num
                              ? "bg-[#002855] text-white"
                              : "bg-white border-2 border-gray-300 text-gray-500"
                          }`}
                        >
                          {item.num}
                        </div>
                        <span className="text-xs mt-2 text-gray-600 text-center">{item.label}</span>
                      </div>
                      {index < 3 && (
                        <div className={`flex-1 h-0.5 mx-4 ${step > item.num ? "bg-[#002855]" : "bg-gray-300"}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Step 1 - Dados da Empresa */}
              {step === 1 && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cnpj" className="font-semibold">
                        CNPJ
                      </Label>
                      <Input
                        id="cnpj"
                        placeholder="00.000.000/0000-00"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="razaoSocial" className="font-semibold">
                        Razão Social
                      </Label>
                      <Input
                        id="razaoSocial"
                        placeholder="Digite aqui..."
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nomeFantasia" className="font-semibold">
                        Nome Fantasia
                      </Label>
                      <Input
                        id="nomeFantasia"
                        placeholder="Digite aqui..."
                        value={nomeFantasia}
                        onChange={(e) => setNomeFantasia(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inscricaoEstadual" className="font-semibold">
                        Inscrição Estadual
                      </Label>
                      <Input
                        id="inscricaoEstadual"
                        placeholder="Digite aqui..."
                        value={inscricaoEstadual}
                        onChange={(e) => setInscricaoEstadual(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cep" className="font-semibold">
                        CEP
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="cep"
                          placeholder="00000-000"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="button" variant="outline" size="icon" onClick={searchCep} disabled={isLoading}>
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endereco" className="font-semibold">
                        Endereço
                      </Label>
                      <Input
                        id="endereco"
                        placeholder="Digite aqui..."
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="numero" className="font-semibold">
                        Número
                      </Label>
                      <Input
                        id="numero"
                        placeholder="Digite aqui..."
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complemento" className="font-semibold">
                        Complemento
                      </Label>
                      <Input
                        id="complemento"
                        placeholder="Digite aqui..."
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bairro" className="font-semibold">
                        Bairro
                      </Label>
                      <Input
                        id="bairro"
                        placeholder="Digite aqui..."
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cidade" className="font-semibold">
                        Município
                      </Label>
                      <Input
                        id="cidade"
                        placeholder="Digite aqui..."
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estado" className="font-semibold">
                        Estado
                      </Label>
                      <Input
                        id="estado"
                        placeholder="Digite aqui..."
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* Step 2 - Dados de Contato */}
              {step === 2 && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nomeResponsavel" className="font-semibold">
                        Nome do Responsável
                      </Label>
                      <Input
                        id="nomeResponsavel"
                        placeholder="Digite aqui..."
                        value={nomeResponsavel}
                        onChange={(e) => setNomeResponsavel(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpfResponsavel" className="font-semibold">
                        CPF do Responsável
                      </Label>
                      <Input
                        id="cpfResponsavel"
                        placeholder="000.000.000-00"
                        value={cpfResponsavel}
                        onChange={(e) => setCpfResponsavel(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cargoResponsavel" className="font-semibold">
                        Cargo
                      </Label>
                      <Input
                        id="cargoResponsavel"
                        placeholder="Digite aqui..."
                        value={cargoResponsavel}
                        onChange={(e) => setCargoResponsavel(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailCorporativo" className="font-semibold">
                        E-mail Corporativo
                      </Label>
                      <Input
                        id="emailCorporativo"
                        type="email"
                        placeholder="contato@empresa.com"
                        value={emailCorporativo}
                        onChange={(e) => setEmailCorporativo(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="font-semibold">
                        Telefone Comercial
                      </Label>
                      <Input
                        id="telefone"
                        placeholder="(00) 0000-0000"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="celular" className="font-semibold">
                        Celular
                      </Label>
                      <Input
                        id="celular"
                        placeholder="(00) 0 0000-0000"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* Step 3 - Criar Senha */}
              {step === 3 && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="senha" className="font-semibold">
                        Senha
                      </Label>
                      <Input
                        id="senha"
                        type="password"
                        placeholder="Digite sua senha..."
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                      />
                      <p className="text-xs text-gray-500">Mínimo 8 caracteres, incluindo letras e números</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmarSenha" className="font-semibold">
                        Confirmar Senha
                      </Label>
                      <Input
                        id="confirmarSenha"
                        type="password"
                        placeholder="Confirme sua senha..."
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-4">
                    <input
                      type="checkbox"
                      id="termos"
                      checked={aceitaTermos}
                      onChange={(e) => setAceitaTermos(e.target.checked)}
                      className="mt-1"
                    />
                    <Label htmlFor="termos" className="text-sm font-normal cursor-pointer">
                      Aceito os{" "}
                      <a href="#" className="text-[#002855] underline">
                        termos de uso
                      </a>{" "}
                      e{" "}
                      <a href="#" className="text-[#002855] underline">
                        política de privacidade
                      </a>
                    </Label>
                  </div>
                </form>
              )}

              {/* Step 4 - Revisão */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-semibold text-lg">Dados da Empresa</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">CNPJ:</span> <span className="font-medium">{cnpj}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Razão Social:</span>{" "}
                        <span className="font-medium">{razaoSocial}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Nome Fantasia:</span>{" "}
                        <span className="font-medium">{nomeFantasia}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Endereço:</span>{" "}
                        <span className="font-medium">
                          {endereco}, {numero} - {bairro}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-semibold text-lg">Dados de Contato</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Responsável:</span>{" "}
                        <span className="font-medium">{nomeResponsavel}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">E-mail:</span>{" "}
                        <span className="font-medium">{emailCorporativo}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Telefone:</span> <span className="font-medium">{telefone}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Celular:</span> <span className="font-medium">{celular}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button type="button" variant="outline" onClick={handlePrevious} disabled={step === 1 || isLoading}>
                  Voltar
                </Button>
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#4ade80] hover:bg-[#22c55e] text-white"
                    disabled={isLoading}
                  >
                    Avançar
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-[#4ade80] hover:bg-[#22c55e] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Finalizando..." : "Finalizar Cadastro"}
                  </Button>
                )}
              </div>

              <div className="mt-6 text-center">
                <Link href="/acesso/fornecedor" className="text-sm text-gray-600 hover:text-gray-900">
                  Já possui cadastro? Faça login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
