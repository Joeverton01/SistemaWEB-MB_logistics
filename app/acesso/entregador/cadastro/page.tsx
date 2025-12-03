"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signUpEntregadorAction } from "@/app/actions/auth"

export default function EntregadorCadastroPage() {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Step 1 - Dados Pessoais
  const [cpf, setCpf] = useState("")
  const [nomeCompleto, setNomeCompleto] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [genero, setGenero] = useState("")
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState("")
  const [numero, setNumero] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")
  const [telefone, setTelefone] = useState("")
  const [celular, setCelular] = useState("")

  // Step 2 - Dados Profissionais
  const [cnh, setCnh] = useState("")
  const [categoriaCnh, setCategoriaCnh] = useState("")
  const [validadeCnh, setValidadeCnh] = useState("")
  const [tipoVeiculo, setTipoVeiculo] = useState("")
  const [placaVeiculo, setPlacaVeiculo] = useState("")
  const [possuiSmartphone, setPossuiSmartphone] = useState("")
  const [experienciaEntregas, setExperienciaEntregas] = useState("")

  // Step 3 - Criar Senha
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [aceitaTermos, setAceitaTermos] = useState(false)

  const validateStep1 = () => {
    if (
      !cpf ||
      !nomeCompleto ||
      !dataNascimento ||
      !genero ||
      !cep ||
      !endereco ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado ||
      !telefone ||
      !celular
    ) {
      setError("Todos os campos obrigatórios devem ser preenchidos")
      return false
    }
    // Validar CPF (formato básico)
    const cpfNumeros = cpf.replace(/\D/g, "")
    if (cpfNumeros.length !== 11) {
      setError("CPF inválido. Deve conter 11 dígitos")
      return false
    }
    // Validar CEP
    const cepNumeros = cep.replace(/\D/g, "")
    if (cepNumeros.length !== 8) {
      setError("CEP inválido. Deve conter 8 dígitos")
      return false
    }
    // Validar idade mínima (18 anos)
    const hoje = new Date()
    const nascimento = new Date(dataNascimento)
    const idade = hoje.getFullYear() - nascimento.getFullYear()
    if (idade < 18) {
      setError("É necessário ter no mínimo 18 anos")
      return false
    }
    setError("")
    return true
  }

  const validateStep2 = () => {
    if (
      !cnh ||
      !categoriaCnh ||
      !validadeCnh ||
      !tipoVeiculo ||
      !placaVeiculo ||
      !possuiSmartphone ||
      !experienciaEntregas
    ) {
      setError("Todos os campos obrigatórios devem ser preenchidos")
      return false
    }
    // Validar validade da CNH
    const hoje = new Date()
    const validade = new Date(validadeCnh)
    if (validade < hoje) {
      setError("CNH vencida. Atualize sua CNH antes de se cadastrar")
      return false
    }
    setError("")
    return true
  }

  const validateStep3 = () => {
    if (!email || !senha || !confirmarSenha) {
      setError("Todos os campos devem ser preenchidos")
      return false
    }
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Email inválido")
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

    console.log("[v0] Iniciando cadastro de entregador")

    try {
      const result = await signUpEntregadorAction({
        cpf,
        nome: nomeCompleto,
        cep,
        dataNascimento,
        telefone: celular,
        email,
        senha,
      })

      if (result.success) {
        console.log("[v0] Cadastro bem-sucedido")
        alert("Cadastro realizado com sucesso! Faça login para acessar o portal.")
        router.push("/acesso/entregador")
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
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Cadastro de Entregador</h1>

                {/* Stepper */}
                <div className="flex items-center justify-between mb-12">
                  {[
                    { num: 1, label: "Dados Pessoais" },
                    { num: 2, label: "Dados Profissionais" },
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

              {/* Step 1 - Dados Pessoais */}
              {step === 1 && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cpf" className="font-semibold">
                        CPF
                      </Label>
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nomeCompleto" className="font-semibold">
                        Nome Completo
                      </Label>
                      <Input
                        id="nomeCompleto"
                        placeholder="Digite aqui..."
                        value={nomeCompleto}
                        onChange={(e) => setNomeCompleto(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genero" className="font-semibold">
                        Gênero
                      </Label>
                      <Select value={genero} onValueChange={setGenero}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione aqui..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                          <SelectItem value="nao-informar">Prefiro não informar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataNascimento" className="font-semibold">
                        Data de Nascimento
                      </Label>
                      <Input
                        id="dataNascimento"
                        type="date"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cep" className="font-semibold">
                        CEP da Residência
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="cep"
                          placeholder="00000-000"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="button" variant="outline" size="icon" onClick={searchCep}>
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

                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="font-semibold">
                        Telefone
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

              {/* Step 2 - Dados Profissionais */}
              {step === 2 && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cnh" className="font-semibold">
                        Número da CNH
                      </Label>
                      <Input
                        id="cnh"
                        placeholder="Digite aqui..."
                        value={cnh}
                        onChange={(e) => setCnh(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="categoriaCnh" className="font-semibold">
                        Categoria da CNH
                      </Label>
                      <Select value={categoriaCnh} onValueChange={setCategoriaCnh}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione aqui..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A - Motocicleta</SelectItem>
                          <SelectItem value="B">B - Carro</SelectItem>
                          <SelectItem value="AB">AB - Carro e Moto</SelectItem>
                          <SelectItem value="C">C - Caminhão</SelectItem>
                          <SelectItem value="D">D - Ônibus</SelectItem>
                          <SelectItem value="E">E - Carreta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="validadeCnh" className="font-semibold">
                        Validade da CNH
                      </Label>
                      <Input
                        id="validadeCnh"
                        type="date"
                        value={validadeCnh}
                        onChange={(e) => setValidadeCnh(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipoVeiculo" className="font-semibold">
                        Tipo de Veículo
                      </Label>
                      <Select value={tipoVeiculo} onValueChange={setTipoVeiculo}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione aqui..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="moto">Motocicleta</SelectItem>
                          <SelectItem value="carro">Carro</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="caminhao">Caminhão</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="placaVeiculo" className="font-semibold">
                        Placa do Veículo
                      </Label>
                      <Input
                        id="placaVeiculo"
                        placeholder="ABC-1234"
                        value={placaVeiculo}
                        onChange={(e) => setPlacaVeiculo(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-semibold">Possui Smartphone?</Label>
                      <RadioGroup value={possuiSmartphone} onValueChange={setPossuiSmartphone}>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id="smartphone-sim" />
                            <Label htmlFor="smartphone-sim" className="font-normal cursor-pointer">
                              Sim
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id="smartphone-nao" />
                            <Label htmlFor="smartphone-nao" className="font-normal cursor-pointer">
                              Não
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="experienciaEntregas" className="font-semibold">
                        Experiência com Entregas
                      </Label>
                      <Select value={experienciaEntregas} onValueChange={setExperienciaEntregas}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione aqui..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nenhuma">Nenhuma experiência</SelectItem>
                          <SelectItem value="menos-1">Menos de 1 ano</SelectItem>
                          <SelectItem value="1-3">1 a 3 anos</SelectItem>
                          <SelectItem value="3-5">3 a 5 anos</SelectItem>
                          <SelectItem value="mais-5">Mais de 5 anos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 3 - Criar Senha */}
              {step === 3 && (
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email" className="font-semibold">
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

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
                    <h3 className="font-semibold text-lg">Dados Pessoais</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">CPF:</span> <span className="font-medium">{cpf}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Nome:</span> <span className="font-medium">{nomeCompleto}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Data de Nascimento:</span>{" "}
                        <span className="font-medium">{dataNascimento}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Endereço:</span>{" "}
                        <span className="font-medium">
                          {endereco}, {numero} - {bairro}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Celular:</span> <span className="font-medium">{celular}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h3 className="font-semibold text-lg">Dados Profissionais</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">CNH:</span> <span className="font-medium">{cnh}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Categoria:</span>{" "}
                        <span className="font-medium">{categoriaCnh}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Veículo:</span>{" "}
                        <span className="font-medium">{tipoVeiculo}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Placa:</span>{" "}
                        <span className="font-medium">{placaVeiculo}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">E-mail:</span> <span className="font-medium">{email}</span>
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
                <Link href="/acesso/entregador" className="text-sm text-gray-600 hover:text-gray-900">
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
