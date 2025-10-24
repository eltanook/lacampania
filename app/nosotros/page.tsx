import { SectionHeader } from "@/components/section-header"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import Image from "next/image"
import { Award, Users, Target, Heart, ExternalLink } from "lucide-react"

export const metadata = {
  title: "Nosotros - La Campaña | Conoce a los Creadores Eloy y Lucas",
  description:
    "Conoce la historia detrás de La Campaña y a sus creadores Eloy y Lucas. Un juego de mesa argentino creado con pasión por la estrategia y el diseño.",
  keywords: "eloy y lucas, creadores la campaña, historia juego de mesa argentino, diseñadores juegos",
  openGraph: {
    title: "Nosotros - La Campaña",
    description: "Conoce la historia detrás de La Campaña y a sus creadores",
    type: "website",
  },
}

export default function AboutPage() {
  const awards = [
    {
      icon: Award,
      title: "Nominado Premios Lúdicos 2025",
      description: "Mejor Juego de Mesa del Año",
      year: "2025",
    },
    {
      icon: Award,
      title: "Mejor Diseño Gráfico",
      description: "Convención de Juegos BA",
      year: "2024",
    },
    {
      icon: Users,
      title: "Juego Favorito del Público",
      description: "Festival Lúdico Argentino",
      year: "2024",
    },
    {
      icon: Target,
      title: "Innovación en Mecánicas",
      description: "Asociación Argentina de Juegos",
      year: "2024",
    },
  ]

  const pressNotes = [
    {
      title: "La Campaña: el juego de mesa argentino que mezcla estrategia, velocidad y diversión",
      outlet: "Locos x los Juegos",
      date: "2024",
      excerpt: "Un juego de cartas estratégico desarrollado por dos amigos argentinos que busca recuperar el contacto cara a cara en la era digital.",
      url: "https://locosxlosjuegos.com/la-campana-el-juego-de-mesa-argentino-que-mezcla-estrategia-velocidad-y-diversion/",
      image: "/evento-convencion-ba.png",
    },
    {
      title: "La Campaña: un juego estratégico que devuelve el cara a cara",
      outlet: "Radio Nacional",
      date: "2024",
      excerpt: "Entrevista con los creadores sobre cómo surgió la idea de crear un juego que fomente la interacción social y el pensamiento estratégico.",
      url: "https://www.radionacional.com.ar/la-campana-un-juego-estrategico-que-devuelve-el-cara-a-cara/",
      image: "/evento-encuentro-comunidad.png",
    },
    {
      title: "Es argentino y creó adictivo juego de cartas para hacerle guerra a las pantallas",
      outlet: "iProfesional",
      date: "2024",
      excerpt: "La historia detrás de La Campaña, el juego que busca competir con las pantallas y recuperar el tiempo de calidad entre amigos y familia.",
      url: "https://www.iprofesional.com/negocios/438876-es-argentino-y-creo-adictivo-juego-cartas-para-hacerle-guerra-a-pantallas",
      image: "/evento-premios-ludicos.png",
    },
    {
      title: "Entregan kits de juegos tradicionales para que los chicos usen en los recreos",
      outlet: "Perfil",
      date: "2024",
      excerpt: "La Campaña forma parte de una iniciativa para promover juegos de mesa en escuelas y espacios recreativos.",
      url: "https://www.perfil.com/noticias/sociedad/entregan-kits-de-juegos-tradicionales-para-que-los-chicos-usen-en-los-recreos.phtml",
      image: "/evento-torneo-nacional.png",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[200px] md:h-[300px] flex items-center justify-center">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banner-01.png-FYDGGKH4GkOaJFKO7mCRwyeS6EB2es.jpeg)",
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Nuestra Historia
          </h1>
          <p className="text-lg md:text-xl text-white/90">La pasión por el juego nos reunió</p>
        </div>
      </section>

      {/* Press Notes Carousel Section - MVP: Moved before History */}
      <section className="bg-primary/5 py-12 md:py-16 border-y-2 border-primary/10">
        <div className="container mx-auto px-4">
          <SectionHeader label="Prensa" title="Notas de Prensa" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
            {pressNotes.map((note, index) => (
              <div
                key={index}
                className="group bg-card rounded-lg border-2 border-primary/20 hover:border-primary overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={note.image}
                    alt={note.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary">{note.outlet}</span>
                    <span className="text-xs text-muted-foreground">{note.date}</span>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-foreground mb-2 line-clamp-2">
                    {note.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{note.excerpt}</p>
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
                  >
                    Leer nota completa
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extended About Us */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeader label="Nosotros" title="La historia detrás de La Campaña" align="center" />

        <div className="space-y-4 md:space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed mb-8 md:mb-12 max-w-6xl mx-auto">
          <p className="md:text-lg">
            Somos Eloy y Lucas, dos amigos de la infancia que se reencontraron para crear La Campaña. Lo que comenzó
            como conversaciones nostálgicas sobre los juegos de nuestra juventud, se transformó en un proyecto que
            combina estrategia, diseño y pasión por el entretenimiento.
          </p>
          <p>
            Eloy, creador del juego y recibido en Administración de Empresas en la UBA, siempre tuvo una fascinación por
            los juegos de estrategia. Su formación académica le permitió estructurar mecánicas de juego complejas pero
            accesibles, creando un equilibrio perfecto entre profundidad estratégica y diversión inmediata.
          </p>
          <p>
            Lucas, diseñador de Imagen y Sonido de la UBA FADU, ilustrador y animador, actual docente en Diseño Gráfico
            FADU, dio vida visual al universo de La Campaña. Su experiencia en narrativa visual y diseño de experiencias
            transformó las ideas de Eloy en un producto tangible y estéticamente cautivador.
          </p>
          <p>
            Juntos, pasamos más de dos años desarrollando, testeando y refinando cada aspecto del juego. Organizamos
            sesiones de prueba con amigos, familia y comunidades de jugadores, incorporando feedback y mejorando
            constantemente la experiencia.
          </p>
        </div>

        {/* Team Cards */}
        <div className="bg-card rounded-lg border-2 border-primary/30 hover:border-primary overflow-hidden hover:shadow-xl transition-all duration-300 mb-12 md:mb-16 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-square md:aspect-auto">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2339-k87IshITAsxzLRiQfauesfVga9ukmU.jpg"
                alt="Eloy y Lucas"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Eloy & Lucas</h3>
              <p className="text-sm md:text-base text-primary font-semibold mb-4">Los Creadores</p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                Eloy, Administración de Empresas (UBA), especialista en diseño de mecánicas de juego y balance
                estratégico. Su visión empresarial y pasión por la estrategia dieron forma a las reglas y mecánicas del
                juego.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Lucas, Diseño de Imagen y Sonido (UBA FADU), ilustrador, animador y docente en Diseño Gráfico. Su
                talento artístico y experiencia en narrativa visual transformaron La Campaña en una obra de arte
                jugable.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-flex p-3 md:p-4 rounded-lg bg-primary/20 text-primary mb-3 shadow-md">
              <Heart className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-2">Pasión</h4>
            <p className="text-xs md:text-sm text-muted-foreground">Por el juego y la estrategia</p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 md:p-4 rounded-lg bg-accent/20 text-accent mb-3 shadow-md">
              <Users className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-2">Comunidad</h4>
            <p className="text-xs md:text-sm text-muted-foreground">Escuchamos a nuestros jugadores</p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 md:p-4 rounded-lg bg-primary/20 text-primary mb-3 shadow-md">
              <Target className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-2">Calidad</h4>
            <p className="text-xs md:text-sm text-muted-foreground">Excelencia en cada detalle</p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 md:p-4 rounded-lg bg-accent/20 text-accent mb-3 shadow-md">
              <Award className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-2">Innovación</h4>
            <p className="text-xs md:text-sm text-muted-foreground">Mecánicas únicas y frescas</p>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-primary/5 py-12 md:py-16 border-y-2 border-primary/10">
        <div className="container mx-auto px-4">
          <SectionHeader label="Reconocimientos" title="Premios y Nominaciones" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-card rounded-lg border-2 border-primary/20 hover:border-primary p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex p-3 md:p-4 rounded-lg bg-primary/20 text-primary mb-4 shadow-sm">
                  <award.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{award.year}</div>
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-2">{award.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MVP: EVENTOS SECTION HIDDEN - RESTORE WHEN CONTENT IS READY ========== */}
      {/* 
      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeader label="Eventos" title="Nuestros Momentos Destacados" align="center" />
        <TestimonialCarousel />
      </section>
      */}
      {/* ========== END MVP: EVENTOS SECTION ========== */}

      {/* Mission Statement */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 font-[family-name:var(--font-playfair)]">
            Nuestra Misión
          </h2>
          <p className="text-base md:text-lg leading-relaxed opacity-95">
            Crear experiencias de juego memorables que reúnan a las personas alrededor de la mesa. Queremos que cada
            partida de La Campaña sea una oportunidad para compartir risas, desafíos estratégicos y momentos
            inolvidables con amigos y familia.
          </p>
        </div>
      </section>
    </div>
  )
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}
