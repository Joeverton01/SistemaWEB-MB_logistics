import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Award, Users } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">Sobre a Mainbridge</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conectando negócios através de soluções logísticas inovadoras e sustentáveis desde 2010
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Nossa História</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A Mainbridge nasceu da visão de transformar a logística brasileira, tornando-a mais eficiente,
                  tecnológica e acessível para empresas de todos os portes.
                </p>
                <p>
                  Com mais de uma década de experiência, crescemos de uma pequena operação local para uma das principais
                  empresas de logística do país, atendendo centenas de clientes e realizando milhares de entregas
                  mensalmente.
                </p>
                <p>
                  Nossa jornada é marcada pela constante busca por inovação, investimento em tecnologia e,
                  principalmente, pelo compromisso com a satisfação de nossos clientes e parceiros.
                </p>
              </div>
            </div>
            <div className="relative h-[400px]">
              <img
                src="/professional-logistics-team-meeting.jpg"
                alt="Equipe Mainbridge"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conectar negócios através de soluções logísticas eficientes, confiáveis e sustentáveis, contribuindo
                  para o crescimento de nossos clientes e o desenvolvimento da economia brasileira.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconhecida como a empresa de logística mais inovadora e confiável do Brasil, referência em
                  tecnologia, sustentabilidade e excelência no atendimento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nossos Valores</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam nossas ações e decisões diariamente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excelência</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Buscamos a perfeição em cada entrega, superando expectativas constantemente
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Parceria</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Construímos relacionamentos duradouros baseados em confiança e transparência
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Inovação</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Investimos em tecnologia para oferecer as melhores soluções do mercado
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Nossa Equipe</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Profissionais qualificados e apaixonados por logística, trabalhando juntos para entregar os melhores
            resultados
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Colaboradores</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">150+</div>
              <div className="text-muted-foreground">Entregadores</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
