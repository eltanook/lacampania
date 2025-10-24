import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Suspense } from "react"

const geistSans = GeistSans

export const metadata: Metadata = {
  metadataBase: new URL("https://lacampania.com.ar"),
  title: {
    default: "La Campaña - Juego de Estrategia Argentino | Nominado Premios Lúdicos 2025",
    template: "%s | La Campaña",
  },
  description:
    "La Campaña es un juego de mesa de estrategia argentino para 2-6 jugadores, nominado a mejor juego en los Premios Lúdicos 2025. Combina gestión de recursos, combate táctico y alianzas temporales. Compra online con envíos a todo el país.",
  keywords: [
    "juego de mesa argentino",
    "la campaña",
    "juego de estrategia",
    "juegos de cartas",
    "board game argentina",
    "premios lúdicos 2025",
    "juego de mesa 2-6 jugadores",
    "juegos de mesa buenos aires",
    "estrategia táctica",
    "juego de mesa nominado",
  ],
  authors: [{ name: "Eloy y Lucas - La Campaña" }],
  creator: "La Campaña",
  publisher: "La Campaña",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://lacampania.com.ar",
    siteName: "La Campaña",
    title: "La Campaña - Juego de Mesa Argentino",
    description:
      "Juego de mesa de estrategia argentino para 2-6 jugadores. Nominado a los Premios Lúdicos 2025. Combina gestión de recursos, combate táctico y alianzas.",
    images: [
      {
        url: "/board-game-box-la-campania.jpg",
        width: 1200,
        height: 630,
        alt: "La Campaña - Juego de Mesa Argentino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Campaña - Juego de Estrategia Argentino",
    description: "Juego de mesa argentino nominado a los Premios Lúdicos 2025. Para 2-6 jugadores.",
    images: ["/board-game-box-la-campania.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "La Campaña",
    description: "Juego de mesa de estrategia argentino",
    url: "https://lacampania.com.ar",
    logo: "https://lacampania.com.ar/images/logo-horizontal.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+54-11-3785-0259",
      contactType: "customer service",
      areaServed: "AR",
      availableLanguage: "Spanish",
    },
    sameAs: ["https://facebook.com/lacampania", "https://instagram.com/lacampania", "https://twitter.com/lacampania"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`font-sans ${geistSans.variable} antialiased`}>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1108142878114570');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1108142878114570&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End of Meta Pixel tracking code */}
        <ThemeProvider defaultTheme="light">
          <CartProvider>
            <Suspense fallback={null}>
              <Navbar />
              <main className="min-h-screen pt-20">{children}</main>
              <Footer />
              <WhatsAppFloat />
            </Suspense>
            <Analytics />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
