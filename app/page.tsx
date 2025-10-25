import type { Metadata } from "next"
import HomePageClient from "./home-page-client"

export const metadata: Metadata = {
  title: "La Campaña - Juego de Estrategia Argentino | Nominado Premios Lúdicos 2025",
  description:
    "La Campaña es un juego de mesa de estrategia argentino para 2-5 jugadores. Nominado a los Premios Lúdicos 2025. Combina gestión de recursos, combate táctico y alianzas estratégicas.",
  keywords: "juego de mesa argentino, juego de estrategia, La Campaña, board game, juego de cartas, premios lúdicos 2025",
  authors: [{ name: "La Campaña" }],
  openGraph: {
    title: "La Campaña - Juego de Estrategia Argentino",
    description: "Juego de mesa argentino nominado a los Premios Lúdicos 2025",
    type: "website",
    locale: "es_AR",
    siteName: "La Campaña",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Campaña - Juego de Estrategia Argentino",
    description: "Juego de mesa argentino nominado a los Premios Lúdicos 2025",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function HomePage() {
  return <HomePageClient />
}
