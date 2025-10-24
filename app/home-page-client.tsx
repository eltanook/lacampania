"use client"

import type React from "react"

import { HeroSlider } from "@/components/hero-slider"
import { SectionHeader } from "@/components/section-header"
import { FeatureCard } from "@/components/feature-card"
import { CatalogProductCard } from "@/components/catalog-product-card"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { RulesModal } from "@/components/rules-modal"
import { AnimatedCounter } from "@/components/animated-counter"
import { Brain, Users, Trophy, Target, Swords, Shield, Zap, Download, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { getFeaturedProducts } from "@/lib/products"
import Image from "next/image"

export default function HomePageClient() {
  const features = [
    {
      icon: Brain,
      title: "Más Estratégico que Risk",
      description:
        "No dependes de la suerte de los dados. Cada carta que juegas es una decisión táctica que define tu victoria.",
    },
    {
      icon: Users,
      title: "Más Dinámico que Catan",
      description:
        "Sin esperar turnos eternos. Las alianzas temporales y traiciones mantienen a todos en tensión constante.",
    },
    {
      icon: Trophy,
      title: "Más Profundo que Monopoly",
      description: "Estrategia real, no solo tirar dados y comprar. Cada partida es única con 120 cartas diferentes.",
    },
    {
      icon: Target,
      title: "Más Accesible que Twilight Imperium",
      description:
        "Toda la profundidad estratégica en 30-60 minutos. No necesitas un día entero para una partida épica.",
    },
  ]

  const featuredProducts = getFeaturedProducts()

  const [isVisible, setIsVisible] = useState({
    game: false,
    products: false,
    features: false,
    about: false,
    events: false,
  })

  const [isAboutHovered, setIsAboutHovered] = useState(false)

  const gameRef = useRef<HTMLElement>(null)
  const productsRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const eventsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const createObserver = (ref: React.RefObject<HTMLElement>, key: keyof typeof isVisible) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }))
            }
          },
          { threshold: 0.1 },
        )
        observer.observe(ref.current)
        observers.push(observer)
      }
    }

    createObserver(gameRef, "game")
    createObserver(productsRef, "products")
    createObserver(featuresRef, "features")
    createObserver(aboutRef, "about")
    createObserver(eventsRef, "events")

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <div>
      <HeroSlider />

      <section
        ref={gameRef}
        className={`bg-primary/5 py-12 md:py-16 border-y-2 border-primary/10 transition-all duration-1000 ${
          isVisible.game ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <SectionHeader label="El Juego" title="Conviértete en el Estratega Definitivo" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Left: Video */}
            <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-primary/20 shadow-xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/IL3b05TNUMg?si=l7xN8D3VhfK68g7H"
                title="La Campaña - Video del Juego"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Right: Title, Text, Features, and Modal Button */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Un Juego de Estrategia Auténtico</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                La Campaña es un juego de cartas estratégico donde prepararás un ejército compuesto por guerreros para atacar y defenderte de tus contrincantes. Administra tus recursos, forma alianzas y conquista territorios en batallas épicas donde cada decisión cuenta.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6">
                <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                  <div className="inline-flex p-1.5 rounded-lg bg-primary/20 text-primary">
                    <Swords className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-foreground">Combate Táctico</h4>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                  <div className="inline-flex p-1.5 rounded-lg bg-primary/20 text-primary">
                    <Shield className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-foreground">Defensa Estratégica</h4>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                  <div className="inline-flex p-1.5 rounded-lg bg-primary/20 text-primary">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-foreground">Acción Rápida</h4>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                  <div className="inline-flex p-1.5 rounded-lg bg-primary/20 text-primary">
                    <Target className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-foreground">Objetivos Estratégicos</h4>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-start w-full sm:w-auto">
                <RulesModal />
                <Button
                  asChild
                  size="lg"
                  className="rounded-md bg-transparent text-accent dark:text-white border-2 border-accent hover:bg-accent/10 font-semibold shadow-lg hover:shadow-xl transition-all h-10 w-full sm:w-auto"
                >
                  <a
                    href="https://drive.google.com/uc?export=download&id=1qR8Y-JjPJzlO_jZM5P5FRt9bcOIxE5HQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Descargar Reglas PDF</span>
                    <span className="sm:hidden">Descargar PDF</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={productsRef}
        className={`py-12 md:py-16 transition-all duration-1000 ${
          isVisible.products ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <SectionHeader label="Productos" title="Productos Destacados" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredProducts.map((product) => {
              // MVP: Only show main game, overlay "Próximamente" on merch products
              const isMerch = product.category === "Merchandising" || product.category === "Accesorios"
              
              return (
                <div key={product.id} className="relative">
                  <CatalogProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    mercadoLibreUrl={product.mercadoLibreUrl || "#"}
                    description={product.shortDescription}
                    labels={product.labels}
                    detailPageUrl={
                      product.category === "Merchandising" || product.category === "Accesorios"
                        ? `/merch/${product.id}`
                        : undefined
                    }
                  />
                  {/* MVP: Overlay for merch products */}
                  {isMerch && (
                    <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px] rounded-lg flex items-center justify-center z-10 cursor-not-allowed">
                      <div className="text-center px-4 pointer-events-none">
                        <p className="text-2xl font-bold text-primary-foreground mb-2">Próximamente</p>
                        <p className="text-sm text-primary-foreground/80">Estamos preparando estos productos</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="text-center mt-6 md:mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              <Link href="/catalogo">Ver Catálogo Completo</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        ref={featuresRef}
        className={`bg-primary/5 py-12 md:py-16 border-y-2 border-primary/10 transition-all duration-1000 ${
          isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <SectionHeader label="Características" title="¿Por qué elegir La Campaña?" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={aboutRef}
        className={`py-12 md:py-16 transition-all duration-1000 ${
          isVisible.about ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <SectionHeader label="Nosotros" title="Los Creadores" align="center" />

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Text and CTAs - Left side */}
              <div className="space-y-4 order-2 md:order-1">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">La historia detrás de La Campaña</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Somos Eloy y Lucas, dos amigos de la infancia que se reencontraron para crear La Campaña. Lo que
                  comenzó como conversaciones nostálgicas sobre los juegos de nuestra juventud, se transformó en un
                  proyecto que combina estrategia, diseño y pasión por el entretenimiento.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/nosotros">Conocer Más</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all bg-transparent"
                  >
                    <Link href="/catalogo">Ver Catálogo</Link>
                  </Button>
                </div>
              </div>

              {/* Image with hover overlay - Right side */}
              <div
                className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300 cursor-pointer order-1 md:order-2"
                onMouseEnter={() => setIsAboutHovered(true)}
                onMouseLeave={() => setIsAboutHovered(false)}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2339-k87IshITAsxzLRiQfauesfVga9ukmU.jpg"
                  alt="Eloy y Lucas"
                  fill
                  className="object-cover"
                />
                {/* Hover overlay with creators info and social media */}
                <div
                  className={`absolute inset-0 bg-primary/95 transition-opacity duration-300 flex items-center justify-center p-6 ${isAboutHovered ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="text-primary-foreground space-y-6 text-center">
                    <div>
                      <h4 className="font-bold text-xl mb-2">Eloy & Lucas</h4>
                      <p className="text-sm opacity-90 mb-4">Los Creadores de La Campaña</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold">Seguinos en redes:</p>
                      <div className="flex gap-4 justify-center">
                        <a
                          href="https://www.instagram.com/lacampania.juego/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Instagram className="h-6 w-6" />
                        </a>
                        <a
                          href="https://www.linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="h-6 w-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MVP: EVENTOS CAROUSEL HIDDEN - Only showing Instagram CTA ========== */}
      {/* 
      <section
        ref={eventsRef}
        className={`container mx-auto px-4 py-12 md:py-16 transition-all duration-1000 ${
          isVisible.events ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <SectionHeader label="Eventos" title="Nuestros Momentos Destacados" align="center" />
        <TestimonialCarousel />
      </section>
      */}

      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Enterate de los Futuros Eventos</h2>
          <p className="text-base md:text-lg mb-6 opacity-90">
            Seguinos en Instagram para estar al tanto de todos los eventos de la comunidad
          </p>
          <a
            href="https://www.instagram.com/lacampania.juego/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-foreground text-primary rounded-md font-semibold hover:opacity-90 transition-opacity text-base"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Seguir en Instagram
          </a>
        </div>
      </section>
      {/* ========== END MVP: EVENTOS SECTION ========== */}
    </div>
  )
}
