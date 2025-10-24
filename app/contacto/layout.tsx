import type React from "react"

// <CHANGE> Added metadata for SEO
export const metadata = {
  title: "Contacto - La Campaña | Comunicate con Nosotros",
  description:
    "Contacta con La Campaña para consultas sobre nuestros juegos de mesa. Estamos en Buenos Aires, Argentina. Teléfono: +54 11 3785-0259",
  openGraph: {
    title: "Contacto - La Campaña",
    description: "Comunicate con nosotros para consultas sobre nuestros juegos de mesa",
    type: "website",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
