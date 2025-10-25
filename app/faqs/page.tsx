import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "Preguntas Frecuentes - La Campaña | FAQs sobre el Juego",
  description:
    "Encuentra respuestas a las preguntas más comunes sobre La Campaña: jugadores, duración, reglas, envíos y más.",
  keywords: "faqs la campaña, preguntas frecuentes juego de mesa, como jugar la campaña, envíos argentina",
  openGraph: {
    title: "Preguntas Frecuentes - La Campaña",
    description: "Encuentra todas las respuestas sobre La Campaña",
    type: "website",
  },
}

export default function FAQsPage() {
  const faqs = [
    {
      question: "¿Cuántos jugadores pueden jugar La Campaña?",
      answer:
        "La Campaña está diseñado para 2 a 5 jugadores, a partir de los 10 años. En partidas de 4 jugadores se juega en parejas, formando alianzas estratégicas para derrotar a los oponentes.",
    },
    {
      question: "¿Cuánto dura una partida?",
      answer:
        "Una partida típica de La Campaña dura entre 30 y 60 minutos. El juego se divide en batallas, y el jugador o equipo que gane 2 de 3 batallas se consagra campeón de La Campaña.",
    },
    {
      question: "¿Cómo funciona el sistema de combate?",
      answer:
        "Cada guerrero tiene 10 vidas y utiliza recursos específicos (pociones para magos, espadas para caballeros, flechas para arqueros). El daño puede ser puro (completo) o impuro (mitad del valor). Los magos tienen ventaja sobre caballeros, los caballeros sobre arqueros, y los arqueros sobre magos.",
    },
    {
      question: "¿Qué es el castillo y cómo se construye?",
      answer:
        "El castillo es una de las formas de ganar una batalla. Se construye comenzando con una Reliquia (carta de 1) y sumando cartas de oro en turnos siguientes. Se necesitan 25 monedas de oro en partidas de 2-3-5 jugadores, o 30 monedas en partidas de 4 jugadores.",
    },
    {
      question: "¿Qué son las cartas especiales?",
      answer:
        "Las cartas especiales incluyen: Poderes (curación, escudo, tiro certero), Asedio (destruir parte del castillo enemigo), Ladrón (robar carta al azar), Espía (ver cartas del mazo o de un oponente), y el Dragón (súper guerrero que ataca con cualquier recurso pero solo recibe daño impuro).",
    },
    {
      question: "¿Cuál es el límite de cartas en mano?",
      answer:
        "El máximo es de 7 cartas en mano. Si superas este límite, debes perder el 50% de tus cartas al azar. Puedes comprar cartas con oro (2 monedas = 1 carta) o por trueque (3 cartas de recursos = 1 carta).",
    },
    {
      question: "¿Realizan envíos a todo el país?",
      answer:
        "Sí, realizamos envíos a toda Argentina. Los tiempos de entrega varían según la ubicación. Puedes contactarnos por WhatsApp para coordinar tu pedido y conocer los costos de envío.",
    },
    {
      question: "¿Organizan torneos o eventos?",
      answer:
        "Sí, organizamos torneos y eventos regularmente. Seguinos en Instagram (@lacampaniajuego) para estar al tanto de los próximos eventos y novedades de la comunidad.",
    },
  ]

  return (
    <div>
      <section className="relative h-[200px] md:h-[300px] flex items-center justify-center">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banner-01.png-FYDGGKH4GkOaJFKO7mCRwyeS6EB2es.jpeg)",
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg md:text-xl text-white/90">Encuentra todas las respuestas que necesitas</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-4 md:px-6 bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="text-sm md:text-base font-semibold text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-4 border-b border-border">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-base md:text-lg mb-6 opacity-90">Contáctanos y te responderemos a la brevedad</p>
          <a
            href="https://wa.me/5491137850259?text=Hola!%20Tengo%20una%20consulta%20sobre%20La%20Campaña"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground text-primary rounded-md font-semibold hover:opacity-90 transition-opacity text-base"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
