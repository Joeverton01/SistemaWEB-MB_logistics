import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo-mainbridge.png"
                alt="Mainbridge Logo"
                width={160}
                height={45}
                className="h-11 w-auto object-contain brightness-0 invert contrast-125"
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Conectando negócios através de soluções logísticas eficientes e confiáveis.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Acesso</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/acesso/entregador"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Portal do Entregador
                </Link>
              </li>
              <li>
                <Link
                  href="/acesso/fornecedor"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Portal do Fornecedor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                contato@mainbridge.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                +55 (11) 9999-9999
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                São Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Mainbridge. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
