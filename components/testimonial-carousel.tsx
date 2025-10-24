"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    image: "/evento-torneo-nacional.png",
    title: "Torneo Nacional 2024",
    description:
      "Más de 100 jugadores participaron en nuestro primer torneo nacional celebrado en el Centro de Convenciones de Buenos Aires. Fue un evento inolvidable donde la comunidad de La Campaña se reunió para competir en partidas épicas que duraron todo el fin de semana. Los ganadores recibieron premios exclusivos incluyendo ediciones limitadas del juego, trofeos personalizados y la oportunidad única de participar en el diseño de nuevas cartas para futuras expansiones. El ambiente fue increíble, con jugadores de todas las edades demostrando sus habilidades estratégicas.",
    date: "Diciembre 2024",
  },
  {
    image: "/evento-convencion-ba.png",
    title: "Convención de Juegos BA",
    description:
      "Presentamos La Campaña en la mayor convención de juegos de Argentina, un evento que reunió a más de 10,000 asistentes. Nuestro stand fue visitado por miles de entusiastas del juego de mesa durante los tres días del evento. Realizamos demostraciones en vivo cada hora, torneos relámpago con premios instantáneos, y los asistentes pudieron conocer personalmente a Eloy y Lucas, los creadores del juego. La respuesta del público superó todas nuestras expectativas, con colas de más de una hora para probar el juego. Muchos medios especializados nos entrevistaron y destacaron La Campaña como uno de los lanzamientos más prometedores del año.",
    date: "Noviembre 2024",
  },
  {
    image: "/evento-premios-ludicos.png",
    title: "Nominación Premios Lúdicos",
    description:
      "Orgullosos de ser nominados a mejor juego de mesa del año en los prestigiosos Premios Lúdicos 2025, considerados los Oscar de la industria del juego en Argentina. Esta nominación representa el reconocimiento de la industria a nuestro trabajo, dedicación y pasión por crear experiencias de juego memorables. Competimos junto a los mejores juegos del mercado argentino e internacional, incluyendo títulos de editoriales establecidas con décadas de experiencia. La ceremonia de premiación será en marzo de 2025, y estamos emocionados por el futuro de La Campaña y las nuevas expansiones que estamos desarrollando.",
    date: "Enero 2025",
  },
  {
    image: "/evento-encuentro-comunidad.png",
    title: "Encuentro de Comunidad",
    description:
      "Organizamos nuestro primer encuentro oficial de la comunidad de La Campaña en un café temático de juegos de mesa en Palermo. Más de 50 jugadores se reunieron para compartir estrategias, intercambiar experiencias y jugar partidas amistosas. Fue emocionante ver cómo los jugadores han desarrollado sus propias variantes de reglas y modos de juego. Algunos incluso trajeron sus propias cartas personalizadas que diseñaron. El evento incluyó un torneo informal, sesión de preguntas y respuestas con los creadores, y sorteos de merchandising exclusivo. La energía y pasión de la comunidad nos inspira a seguir mejorando el juego.",
    date: "Octubre 2024",
  },
  {
    image: "/evento-talleres-educativos.png",
    title: "Talleres Educativos",
    description:
      "Lanzamos nuestro programa de talleres educativos llevando La Campaña a escuelas y centros culturales. Hemos visitado más de 15 instituciones enseñando a estudiantes sobre pensamiento estratégico, toma de decisiones y trabajo en equipo a través del juego. Los docentes destacaron cómo La Campaña ayuda a desarrollar habilidades cognitivas y sociales en los estudiantes. Cada taller incluye una sesión teórica sobre diseño de juegos, una partida guiada y una actividad donde los estudiantes crean sus propias cartas. El programa ha sido tan exitoso que estamos expandiéndolo a más provincias y desarrollando material educativo específico para diferentes niveles.",
    date: "Septiembre 2024",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full border-2 border-primary bg-background/95 hover:bg-primary hover:text-primary-foreground shadow-lg -translate-x-1/2 hidden md:flex"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full border-2 border-primary bg-background/95 hover:bg-primary hover:text-primary-foreground shadow-lg translate-x-1/2 hidden md:flex"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((item, index) => (
            <div key={index} className="min-w-full">
              <div className="grid md:grid-cols-2 gap-0 bg-card rounded-lg overflow-hidden min-h-[400px]">
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <p className="text-base text-primary font-semibold mb-2">{item.date}</p>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${index === current ? "w-8 bg-primary" : "w-2 bg-border"}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
