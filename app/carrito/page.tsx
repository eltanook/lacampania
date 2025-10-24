import type { Metadata } from "next"
import CartClientPage from "./cart-client"

export const metadata: Metadata = {
  title: "Carrito de Compras - La Campaña",
  description: "Revisa tu carrito de compras y finaliza tu pedido de juegos de mesa La Campaña.",
  openGraph: {
    title: "Carrito de Compras - La Campaña",
    description: "Finaliza tu pedido de juegos de mesa",
    type: "website",
  },
}

export default function CartPage() {
  return <CartClientPage />
}
