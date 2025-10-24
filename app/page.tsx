import type { Metadata } from "next"
import HomePageClient from "./home-page-client"
import Script from "next/script"

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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'La Campaña',
  description: 'Juego de mesa de estrategia argentino para 2-5 jugadores',
  brand: {
    '@type': 'Brand',
    name: 'La Campaña',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'ARS',
    url: 'https://www.mercadolibre.com.ar/la-campania-juego-base',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
  },
}

export default function HomePage() {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      <HomePageClient />
    </>
  )
}
