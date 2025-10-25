"use client"

import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { SectionHeader } from "@/components/section-header"

export default function CartClientPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return

    let message = "Hola! Me gustaría realizar el siguiente pedido:\n\n"

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Precio unitario: $${item.price.toLocaleString()}\n`
      message += `   Subtotal: $${(item.price * item.quantity).toLocaleString()}\n\n`
    })

    message += `*Total: $${total.toLocaleString()}*\n\n`
    message += "¿Podrían confirmar disponibilidad y coordinar el envío?"

    const phoneNumber = "5491137850259"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, "_blank")
  }

  if (items.length === 0) {
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
              Carrito
            </h1>
            <p className="text-lg md:text-xl text-white/90">Tu carrito de compras</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6 md:mb-8">
              <ShoppingBag className="h-16 md:h-24 w-16 md:w-24 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Tu carrito está vacío</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
                Parece que aún no has agregado productos a tu carrito. Explora nuestro catálogo y encuentra el juego
                perfecto para ti.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-md">
              <Link href="/catalogo">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Ir al Catálogo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Carrito
          </h1>
          <p className="text-lg md:text-xl text-white/90">Revisa tu pedido</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <SectionHeader label="Carrito" title="Tu Carrito de Compras" />

        <div className="grid lg:grid-cols-[1fr_400px] gap-6 md:gap-8">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-lg p-3 md:p-4 flex gap-3 md:gap-4">
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 truncate">{item.name}</h3>
                  <p className="text-base md:text-lg font-bold text-primary mb-2">${item.price.toLocaleString()}</p>

                  <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <div className="flex items-center border border-border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 md:px-3 py-1 hover:bg-muted transition-colors text-sm md:text-base"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                      <span className="px-3 md:px-4 py-1 border-x border-border min-w-[2.5rem] md:min-w-[3rem] text-center text-sm md:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 md:px-3 py-1 hover:bg-muted transition-colors text-sm md:text-base"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive/80 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Subtotal</p>
                  <p className="text-lg md:text-xl font-bold text-foreground">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
              <Button asChild variant="outline" className="rounded-md bg-transparent w-full sm:w-auto">
                <Link href="/catalogo">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Seguir Comprando
                </Link>
              </Button>

              <Button variant="destructive" onClick={clearCart} className="rounded-md w-full sm:w-auto">
                <Trash2 className="h-4 w-4 mr-2" />
                Vaciar Carrito
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-border rounded-lg p-4 md:p-6 space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Resumen del Pedido</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm md:text-base text-muted-foreground">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} productos)</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base text-muted-foreground">
                  <span>Envío</span>
                  <span>A coordinar</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg md:text-xl font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleCheckout} size="lg" className="w-full rounded-md">
                <FaWhatsapp className="h-5 w-5 mr-2" />
                Comprar por WhatsApp
              </Button>

              <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Al hacer clic, se abrirá WhatsApp con tu pedido pre-cargado</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Coordinaremos el pago y envío directamente</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Aceptamos transferencia, MercadoPago y efectivo</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
