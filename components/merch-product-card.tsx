"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import toast, { Toaster } from "react-hot-toast"
import { Badge } from "@/components/ui/badge"

interface MerchProductCardProps {
  id: string
  name: string
  price: number
  salePrice?: number
  labels?: string[]
  stock?: "limited" | "normal" | "out"
  image: string
  description?: string
}

export function MerchProductCard({
  id,
  name,
  price,
  salePrice,
  labels,
  stock,
  image,
  description,
}: MerchProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (stock === "out") {
      toast.error("Producto sin stock", {
        duration: 3000,
        position: "top-center",
      })
      return
    }

    addItem({
      id,
      name,
      price: salePrice || price,
      image,
    })

    toast.success(`¡${name} agregado al carrito!`, {
      duration: 3000,
      position: "top-center",
      icon: "🛒",
    })
  }

  return (
    <>
      <Toaster />
      <div className="group rounded-lg border-2 border-primary/20 bg-card overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 relative">
        {labels && labels.length > 0 && (
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {labels.map((label) => (
              <Badge
                key={label}
                className={`${
                  label === "Oferta"
                    ? "bg-accent text-accent-foreground"
                    : label === "Stock Limitado"
                      ? "bg-primary text-primary-foreground"
                      : label === "Nuevo"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                } font-semibold shadow-md`}
              >
                {label}
              </Badge>
            ))}
          </div>
        )}

        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
            <Button
              asChild
              size="lg"
              className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all w-full"
            >
              <Link href={`/merch/${id}`}>Ver Detalles</Link>
            </Button>
            <Button
              onClick={handleAddToCart}
              size="lg"
              variant="outline"
              disabled={stock === "out"}
              className="rounded-md border-2 border-white text-white hover:bg-white hover:text-primary transition-all w-full bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {stock === "out" ? "Sin Stock" : "Agregar al Carrito"}
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
          {description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>}
          <div className="flex items-center gap-2">
            {salePrice ? (
              <>
                <span className="text-lg text-muted-foreground line-through">${price.toLocaleString('es-AR')}</span>
                <span className="text-2xl font-bold text-accent">${salePrice.toLocaleString('es-AR')}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary">${price.toLocaleString('es-AR')}</span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
