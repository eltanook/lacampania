"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Head from "next/head"

const slides = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banner-01.png-FYDGGKH4GkOaJFKO7mCRwyeS6EB2es.jpeg",
    title: "La Campaña",
    subtitle: "Juego de estrategia argentino nominado a mejor juego de mesa 2025",
    alt: "La Campaña - Juego de mesa argentino de estrategia nominado a Premios Lúdicos 2025",
  },
  {
    image: "/evento-torneo-nacional.png",
    title: "Estrategia y Diversión",
    subtitle: "Desafía a tus amigos en partidas épicas de estrategia",
    alt: "Torneo Nacional de La Campaña - Jugadores compitiendo en evento de juegos de mesa",
  },
  {
    image: "/evento-talleres-educativos.png",
    title: "Hecho en Argentina",
    subtitle: "Diseñado y producido con pasión por el juego",
    alt: "Talleres educativos de La Campaña - Enseñanza de estrategia en escuelas argentinas",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden w-full shadow-xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
            role="img"
            aria-label={slide.title}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-balance font-[family-name:var(--font-playfair)]">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-pretty">{slide.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <a
                  href="https://www.mercadolibre.com.ar/la-campana--juego-de-mesa--estrategia/up/MLAU594279492?pdp_filters=item_id:MLA1888909180"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Comprar Ahora
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md bg-accent/20 text-white border-2 border-accent hover:bg-accent hover:text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/nosotros">Conocer Más</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-primary/30 hover:bg-primary text-white p-1.5 sm:p-2 rounded-md transition-all shadow-md hover:shadow-lg backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-primary/30 hover:bg-primary text-white p-1.5 sm:p-2 rounded-md transition-all shadow-md hover:shadow-lg backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary shadow-md" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
