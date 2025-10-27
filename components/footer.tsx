"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-background border-t-4 border-t-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Column 1: Logo and Slogan */}
          <div>
            <Image
              src="/images/logo-horizontal.png"
              alt="La Campaña"
              width={200}
              height={50}
              className="h-10 w-auto mb-4 dark:brightness-0 dark:invert"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Juego de estrategia argentino con cartas, nominado a mejor juego de mesa en los Premios Lúdicos 2025.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-primary mb-4 text-base">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-semibold text-primary mb-4 text-base">Datos de Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+54 11 3785-0259</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">lucas.cafiero@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="font-semibold text-primary mb-4 text-base">Redes Sociales</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/lacampaniajuego/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-md bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all shadow-sm hover:shadow-md"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <a
                href="https://www.mercadolibre.com.ar/la-campana--juego-de-mesa--estrategia/up/MLAU594279492?pdp_filters=item_id:MLA1888909180"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Comprá tu Juego
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t-2 border-primary/20 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} La Campaña. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Desarrollado por{" "}
            <a
              href="https://zevetix.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Zevetix
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
