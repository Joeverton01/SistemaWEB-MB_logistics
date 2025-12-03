import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, MapPin, Building } from "lucide-react"
import Link from "next/link"

export default async function PerfilFornecedorPage() {
  const session = await getSession()

  if (!session || session.tipo_usuario !== "fornecedor") {
    redirect("/acesso")
  }

  const supabase = await createClient()

  // Buscar dados do fornecedor
  const { data: fornecedor } = await supabase.from("fornecedor").select("*").eq("id", session.usuario_id).single()

  if (!fornecedor) {
    redirect("/acesso")
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <Link href="/acesso/fornecedor/dashboard">
          <Button variant="ghost" size="sm" className="text-[#002855] mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-[#002855]">Meu Perfil</h1>
        <p className="text-gray-600 mt-1">Visualize e gerencie suas informações</p>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <Card>
          <CardHeader className="bg-[#002855] text-white">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#009DDC] flex items-center justify-center text-3xl font-bold">
                {fornecedor.nome_razao.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-2xl">{fornecedor.nome_razao}</CardTitle>
                <p className="text-white/80 mt-1">Fornecedor</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#002855] mb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-[#009DDC] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">CNPJ</p>
                      <p className="text-[#002855] font-medium">{fornecedor.cnpj}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#009DDC] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">E-mail</p>
                      <p className="text-[#002855] font-medium">{fornecedor.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#009DDC] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Telefone</p>
                      <p className="text-[#002855] font-medium">{fornecedor.telefone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#009DDC] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">CEP</p>
                      <p className="text-[#002855] font-medium">{fornecedor.cep}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-[#002855] mb-2">Conta Criada</h3>
                <p className="text-gray-600">
                  {new Date(fornecedor.created_at).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex gap-4 pt-6">
                <Button className="bg-[#009DDC] hover:bg-[#0056A3] text-white">Editar Perfil</Button>
                <Button
                  variant="outline"
                  className="border-[#009DDC] text-[#009DDC] hover:bg-[#009DDC] hover:text-white bg-transparent"
                >
                  Alterar Senha
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
