import type { Metadata } from "next"
import HomePageClient from "./home-page-client"

export const metadata: Metadata = {
  title: "La Campaña - Juego de Estrategia Argentino | Nominado Premios Lúdicos 2025",
  description:
    "La Campaña es un juego de mesa de estrategia argentino para 2-6 jugadores. Nominado a los Premios Lúdicos 2025. Combina gestión de recursos, combate táctico y alianzas temporales.",
  openGraph: {
    title: "La Campaña - Juego de Estrategia Argentino",
    description: "Juego de mesa argentino nominado a los Premios Lúdicos 2025",
    type: "website",
  },
}

export default function HomePage() {
  return <HomePageClient />
}
