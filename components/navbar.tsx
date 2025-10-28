"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCart } from "@/lib/cart-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { items } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    // { href: "/catalogo", label: "Catálogo" }, // MVP: Hidden temporarily
    { href: "/merch", label: "Merch", disabled: true }, // MVP: Disabled until products ready
    { href: "/faqs", label: "FAQs" },
    { href: "/contacto", label: "Contacto" },
  ]

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm border-b-2 border-primary/20 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo-horizontal.png"
              alt="La Campaña"
              width={200}
              height={50}
              priority
              className="h-10 w-auto dark:brightness-0 dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <TooltipProvider>
              <div className="flex items-center gap-6">
                {navLinks.map((link) => {
                  if (link.disabled) {
                    return (
                      <Tooltip key={link.href}>
                        <TooltipTrigger asChild>
                          <span
                            className="text-sm font-medium text-muted-foreground cursor-not-allowed relative"
                          >
                            {link.label}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Próximamente</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium transition-colors hover:text-primary relative ${
                        pathname === link.href ? "text-primary navlink-active" : "text-foreground"
                      }`}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </TooltipProvider>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* MVP: Cart hidden temporarily */}
              {/* 
              <Link href="/carrito">
                <Button
                  size="icon"
                  className="relative rounded-md bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
              */}

              <Button
                asChild
                size="default"
                className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <a
                  href="https://www.mercadolibre.com.ar/la-campana--juego-de-mesa--estrategia/up/MLAU594279492?pdp_filters=item_id:MLA1888909180"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Comprar
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            {/* MVP: Cart hidden temporarily */}
            {/* 
            <Link href="/carrito">
              <Button
                size="icon"
                className="relative rounded-md bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t-2 border-primary/20 bg-background">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                if (link.disabled) {
                  return (
                    <span
                      key={link.href}
                      className="text-sm font-medium text-muted-foreground cursor-not-allowed flex items-center gap-2"
                    >
                      {link.label}
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Próximamente</span>
                    </span>
                  )
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === link.href ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Button
                asChild
                size="default"
                className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all mt-2"
              >
                <a
                  href="https://www.mercadolibre.com.ar/la-campana--juego-de-mesa--estrategia/up/MLAU594279492?pdp_filters=item_id:MLA1888909180"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ExternalLink className="h-4 w-4" />
                  Comprar Juego
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
