import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-[#002855] mb-2">FAQ</h1>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white border-0 rounded-lg shadow-sm px-6 py-2">
              <AccordionTrigger className="text-base font-bold hover:no-underline text-foreground">
                A formação é realizada por qual instituição?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                O processo é simples: entre em contato através do nosso portal, informe suas necessidades logísticas, e
                nossa equipe comercial entrará em contato para elaborar uma proposta personalizada. Após aprovação,
                iniciamos a operação em até 48 horas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white border-0 rounded-lg shadow-sm px-6 py-2">
              <AccordionTrigger className="text-base font-bold hover:no-underline text-foreground">
                Quais regiões vocês atendem?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Atendemos todo o território nacional, com centros de distribuição estrategicamente localizados nas
                principais capitais e regiões metropolitanas. Para entregas internacionais, trabalhamos com parceiros
                certificados.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white border-0 rounded-lg shadow-sm px-6 py-2">
              <AccordionTrigger className="text-base font-bold hover:no-underline text-foreground">
                Como funciona o rastreamento de cargas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Todas as cargas são rastreadas em tempo real através do nosso sistema. Você pode acompanhar a
                localização, status e previsão de entrega através do portal do cliente ou aplicativo móvel. Notificações
                automáticas são enviadas em cada etapa do processo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white border-0 rounded-lg shadow-sm px-6 py-2">
              <AccordionTrigger className="text-base font-bold hover:no-underline text-foreground">
                Vocês oferecem seguro para as cargas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Sim, todas as cargas transportadas pela Mainbridge são cobertas por seguro completo. O valor da
                cobertura é definido de acordo com a declaração de valor da mercadoria. Também oferecemos opções de
                seguro adicional para cargas de alto valor.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white border-0 rounded-lg shadow-sm px-6 py-2">
              <AccordionTrigger className="text-base font-bold hover:no-underline text-foreground">
                Como funciona o portal do fornecedor?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                O portal do fornecedor oferece acesso completo ao gerenciamento de pedidos, agendamento de coletas,
                emissão de notas fiscais, acompanhamento de entregas e relatórios financeiros. É possível integrar o
                sistema com seu ERP através de API.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white border-0 rounded-lg shadow-sm px-6 py-2">
              <AccordionTrigger className="text-base font-bold hover:no-underline text-foreground">
                Como funciona o portal do entregador?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                O portal do entregador permite acesso a rotas, coletas agendadas, comprovantes de entrega digitais e
                histórico de entregas. Também é possível atualizar status em tempo real e comunicar-se diretamente com a
                central de operações.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white border-0 rounded-lg shadow-sm px-6 py-2">
              <AccordionTrigger className="text-base font-bold hover:no-underline text-foreground">
                Como entrar em contato com o suporte?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                Nosso suporte está disponível 24/7 através do telefone (11) 9999-9999, e-mail contato@mainbridge.com,
                chat no portal do cliente ou WhatsApp. O tempo médio de resposta é de 15 minutos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Não encontrou sua resposta?</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Nossa equipe está pronta para ajudar você com qualquer dúvida
          </p>
          <Link href="/sobre">
            <Button size="lg" className="gap-2">
              <Mail className="h-5 w-5" />
              Entrar em Contato
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
