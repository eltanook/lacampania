import type { Metadata } from "next"
import MerchClientPage from "./merch-client"

export const metadata: Metadata = {
  title: "Merchandising - La Campaña | Accesorios y Merch",
  description:
    "Explora nuestro merchandising y accesorios: camisetas, llaveros, sleeves, playmats y más. La Campaña, el juego de estrategia argentino.",
  keywords: "merchandising, accesorios, la campaña, camisetas, llaveros, sleeves",
  openGraph: {
    title: "Merchandising - La Campaña",
    description: "Explora nuestro merchandising y accesorios",
    type: "website",
  },
}

export default function MerchPage() {
  return <MerchClientPage />
}
