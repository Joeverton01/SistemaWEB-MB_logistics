import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Package, Warehouse, RefreshCw, MapPin, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ServicosPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">Nossos Serviços</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Soluções completas de logística para impulsionar seu negócio
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Transporte Rodoviário</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Transporte seguro e eficiente para todo o território nacional, com frota moderna e rastreamento em
                  tempo real.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Cargas fracionadas e completas</li>
                  <li>• Transporte refrigerado</li>
                  <li>• Cargas especiais</li>
                  <li>• Rastreamento 24/7</li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 2 */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="bg-accent/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Warehouse className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="text-2xl">Armazenagem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Centros de distribuição estrategicamente localizados com gestão inteligente de estoque e segurança
                  total.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Armazéns climatizados</li>
                  <li>• Gestão de inventário</li>
                  <li>• Cross-docking</li>
                  <li>• Picking e packing</li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 3 */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Distribuição Urbana</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Entregas rápidas e eficientes em áreas urbanas, com rotas otimizadas e janelas de entrega flexíveis.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Last mile delivery</li>
                  <li>• Entregas agendadas</li>
                  <li>• Rotas otimizadas</li>
                  <li>• Prova de entrega digital</li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 4 */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="bg-accent/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <RefreshCw className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="text-2xl">Logística Reversa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Gestão completa de devoluções e trocas, com processos sustentáveis e rastreamento detalhado.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Coleta de devoluções</li>
                  <li>• Triagem e inspeção</li>
                  <li>• Reprocessamento</li>
                  <li>• Descarte sustentável</li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 5 */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">E-commerce Fulfillment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Solução completa para lojas virtuais, desde o recebimento até a entrega final ao consumidor.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Integração com plataformas</li>
                  <li>• Gestão de pedidos</li>
                  <li>• Embalagem personalizada</li>
                  <li>• Entregas expressas</li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 6 */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="bg-accent/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="text-2xl">Consultoria Logística</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Análise e otimização de processos logísticos para reduzir custos e aumentar a eficiência operacional.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Análise de processos</li>
                  <li>• Otimização de rotas</li>
                  <li>• Redução de custos</li>
                  <li>• Implementação de tecnologia</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <img
                src="/logistics-technology-dashboard-with-tracking-and-a.jpg"
                alt="Tecnologia Mainbridge"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Tecnologia de Ponta</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Utilizamos as mais avançadas tecnologias para garantir eficiência, transparência e controle total sobre
                suas operações logísticas.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Rastreamento em Tempo Real</div>
                    <div className="text-sm text-muted-foreground">Acompanhe suas cargas a qualquer momento</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-accent/10 p-1 rounded">
                    <BarChart3 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Relatórios Inteligentes</div>
                    <div className="text-sm text-muted-foreground">Análises detalhadas para tomada de decisão</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Roteirização Inteligente</div>
                    <div className="text-sm text-muted-foreground">Otimização automática de rotas e entregas</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Pronto para começar?</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Entre em contato e descubra como nossos serviços podem transformar sua logística
          </p>
          <Link href="/acesso">
            <Button size="lg" className="gap-2">
              Acessar Portal <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
