import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Package, Clock, Shield, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Logística que conecta seu negócio
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Soluções completas de transporte e distribuição para empresas que buscam eficiência, confiabilidade e
                crescimento sustentável.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/acesso">
                  <Button size="lg" className="gap-2">
                    Acessar Portal <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/servicos">
                  <Button size="lg" variant="outline">
                    Nossos Serviços
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <img
                src="/modern-logistics-warehouse-with-trucks-and-distrib.jpg"
                alt="Logística Mainbridge"
                className="rounded-lg shadow-2xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Clientes Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-primary-foreground/80">Entregas/Mês</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-foreground/80">Satisfação</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-foreground/80">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Por que escolher a Mainbridge?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos soluções completas para todas as suas necessidades logísticas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Frota Moderna</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Veículos equipados com tecnologia de rastreamento em tempo real
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Entregas Rápidas</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Prazos otimizados e rotas inteligentes para máxima eficiência
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Segurança Total</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seguro completo e monitoramento 24/7 de todas as cargas
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gestão Completa</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Plataforma integrada para controle total de suas operações
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Soluções personalizadas para seu negócio</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Da coleta à entrega final, oferecemos serviços completos de logística adaptados às necessidades
                específicas de cada cliente.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Transporte rodoviário nacional e regional</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Armazenagem e gestão de estoque</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Distribuição urbana e last mile</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Logística reversa e sustentável</span>
                </li>
              </ul>
              <Link href="/servicos">
                <Button size="lg" variant="default" className="gap-2">
                  Ver Todos os Serviços <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px]">
              <img
                src="/logistics-distribution-center-operations-with-pack.jpg"
                alt="Serviços Mainbridge"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Pronto para otimizar sua logística?</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/acesso">
              <Button size="lg" className="gap-2">
                Acessar Portal <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sobre">
              <Button size="lg" variant="outline">
                Conheça a Mainbridge
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
