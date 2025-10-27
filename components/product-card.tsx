"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import toast, { Toaster } from "react-hot-toast"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  description?: string
}

export function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id,
      name,
      price,
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
      <div className="group rounded-lg border-2 border-primary/20 bg-card overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300">
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
              <Link href={`/producto/${id}`}>Ver Detalles</Link>
            </Button>
            <Button
              onClick={handleAddToCart}
              size="lg"
              variant="outline"
              className="rounded-md border-2 border-white text-white hover:bg-white hover:text-primary transition-all w-full bg-transparent"
            >
              Agregar al Carrito
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
          {description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${price.toLocaleString('es-AR')}</span>
          </div>
        </div>
      </div>
    </>
  )
}
