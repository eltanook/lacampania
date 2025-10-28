"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const pressNotes = [
  {
    title: "Estrategia, velocidad y diversión",
    outlet: "Locos x los Juegos",
    date: "2024",
    excerpt: "Un juego de cartas estratégico argentino que busca recuperar el contacto cara a cara.",
    url: "https://locosxlosjuegos.com/la-campana-el-juego-de-mesa-argentino-que-mezcla-estrategia-velocidad-y-diversion/",
    image: "/evento-convencion-ba.png",
  },
  {
    title: "Juego que devuelve el cara a cara",
    outlet: "Radio Nacional",
    date: "2024",
    excerpt: "Entrevista con los creadores sobre cómo fomentar la interacción social y estratégica.",
    url: "https://www.radionacional.com.ar/la-campana-un-juego-estrategico-que-devuelve-el-cara-a-cara/",
    image: "/evento-encuentro-comunidad.png",
  },
  {
    title: "Guerra a las pantallas",
    outlet: "iProfesional",
    date: "2024",
    excerpt: "La historia del juego que busca recuperar el tiempo de calidad entre amigos.",
    url: "https://www.iprofesional.com/negocios/438876-es-argentino-y-creo-adictivo-juego-cartas-para-hacerle-guerra-a-pantallas",
    image: "/evento-premios-ludicos.png",
  },
  {
    title: "Juegos en los recreos",
    outlet: "Perfil",
    date: "2024",
    excerpt: "La Campaña forma parte de una iniciativa para promover juegos de mesa en escuelas.",
    url: "https://www.perfil.com/noticias/sociedad/entregan-kits-de-juegos-tradicionales-para-que-los-chicos-usen-en-los-recreos.phtml",
    image: "/evento-torneo-nacional.png",
  },
  {
    title: "Entrevista con Cosa Nona",
    outlet: "Futuro CK",
    date: "2025",
    excerpt: "Charlamos sobre el proceso creativo y nuestra visión para La Campaña.",
    url: "https://www.instagram.com/p/DPzoUgCAUsk/?igsh=MXBsajFiZjN1bHV2aA%3D%3D&img_index=1",
    image: "/Captura de pantalla 2025-10-27 204559.png",
  },
]

export function PressCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-7xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {pressNotes.map((note, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
            <div className="group bg-card rounded-lg border-2 border-primary/20 hover:border-primary overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={note.image || "/placeholder.svg"}
                  alt={note.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 md:p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] md:text-xs font-semibold text-primary">{note.outlet}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">{note.date}</span>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground mb-1.5 md:mb-2 line-clamp-2">
                  {note.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 md:mb-3 line-clamp-2">{note.excerpt}</p>
                <a
                  href={note.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
                >
                  Leer más
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  )
}
