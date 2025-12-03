"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary/95 z-50 border-b border-primary/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-mainbridge.png"
              alt="Mainbridge Logo"
              width={280}
              height={70}
              className="h-16 w-auto object-contain"
              priority
              style={{
                filter: "brightness(1.2) contrast(1.3) saturate(1.2)",
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/sobre" className="text-white hover:text-accent transition-colors">
              Sobre Nós
            </Link>
            <Link href="/servicos" className="text-white hover:text-accent transition-colors">
              Serviços
            </Link>
            <Link href="/faq" className="text-white hover:text-accent transition-colors">
              FAQ
            </Link>
            <Link href="/acesso">
              <Button className="bg-accent hover:bg-accent/90 text-white">Acesso</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/"
              className="block text-white hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/sobre"
              className="block text-white hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              href="/servicos"
              className="block text-white hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Serviços
            </Link>
            <Link
              href="/faq"
              className="block text-white hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link href="/acesso" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-accent hover:bg-accent/90 text-white">Acesso</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
