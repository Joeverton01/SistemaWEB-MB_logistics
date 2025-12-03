import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AcessoPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">Portal de Acesso</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Escolha o portal adequado para acessar sua área
          </p>
        </div>
      </section>

      {/* Access Options */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Entregador Portal */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-3xl mb-2">Portal do Entregador</CardTitle>
                <CardDescription className="text-base">Acesse suas rotas, entregas e histórico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/10 p-1 rounded mt-0.5">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Visualize suas rotas e entregas do dia</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/10 p-1 rounded mt-0.5">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Atualize status de entregas em tempo real</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/10 p-1 rounded mt-0.5">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Acesse comprovantes e histórico</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/10 p-1 rounded mt-0.5">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Comunique-se com a central</span>
                  </div>
                </div>
                <Link href="/acesso/entregador" className="block">
                  <Button size="lg" className="w-full gap-2">
                    Acessar Portal do Entregador
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Fornecedor Portal */}
            <Card className="border-2 hover:border-accent transition-all hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-3xl mb-2">Portal do Fornecedor</CardTitle>
                <CardDescription className="text-base">Gerencie pedidos, coletas e relatórios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="bg-accent/10 p-1 rounded mt-0.5">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                    <span>Gerencie pedidos e agendamentos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-accent/10 p-1 rounded mt-0.5">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                    <span>Acompanhe entregas em tempo real</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-accent/10 p-1 rounded mt-0.5">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                    <span>Acesse relatórios e dashboards</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-accent/10 p-1 rounded mt-0.5">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                    <span>Integração via API disponível</span>
                  </div>
                </div>
                <Link href="/acesso/fornecedor" className="block">
                  <Button size="lg" className="w-full gap-2" variant="default">
                    Acessar Portal do Fornecedor
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Precisa de ajuda para acessar?</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Entre em contato com nosso suporte técnico disponível 24/7
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/sobre">
              <Button size="lg" variant="outline">
                Suporte Técnico
              </Button>
            </Link>
            <Link href="/faq">
              <Button size="lg" variant="outline">
                Ver FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
