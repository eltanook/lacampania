"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useMercadoLibrePrice } from "@/hooks/use-mercadolibre-price"

interface CatalogProductCardProps {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  mercadoLibreUrl: string
  description?: string
  labels?: string[]
  detailPageUrl?: string
}

export function CatalogProductCard({
  id,
  name,
  price,
  image,
  images,
  mercadoLibreUrl,
  description,
  labels,
  detailPageUrl,
}: CatalogProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Fetch live price from MercadoLibre for the main product
  const { price: livePrice, loading: priceLoading } = useMercadoLibrePrice(
    id === "la-campania-base" ? mercadoLibreUrl : undefined
  )
  
  const displayPrice = livePrice || price
  const isInternalLink = !!detailPageUrl
  const href = isInternalLink ? detailPageUrl : mercadoLibreUrl
  const buttonText = isInternalLink ? "Ver más detalles" : "Ver en MercadoLibre"
  const ButtonIcon = isInternalLink ? ChevronRight : ExternalLink

  const WrapperComponent = isInternalLink ? Link : "a"
  const wrapperProps = isInternalLink ? { href } : { href, target: "_blank", rel: "noopener noreferrer" }
  
  // Carousel logic only for products without detailPageUrl (going to MercadoLibre directly)
  const shouldShowCarousel = !isInternalLink && images && images.length > 1
  
  useEffect(() => {
    if (!shouldShowCarousel) return
    
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        setIsTransitioning(false)
      }, 300)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [shouldShowCarousel, images])
  
  const currentImage = shouldShowCarousel ? images[currentImageIndex] : image

  return (
    <WrapperComponent
      {...wrapperProps}
      className="group rounded-lg border-2 border-primary/20 bg-card overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 block flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={currentImage || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover group-hover:scale-105 transition-all duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />
        {labels && labels.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {labels.map((label, index) => (
              <Badge
                key={index}
                variant={label === "Más Vendido" ? "default" : "secondary"}
                className={`${
                  label === "Más Vendido" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                } font-semibold shadow-md`}
              >
                {label}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-foreground mb-2">{name}</h3>
        {description && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold text-primary">
            {priceLoading ? (
              <span className="text-xl">Cargando...</span>
            ) : (
              `$${displayPrice.toLocaleString('es-AR')}`
            )}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold shadow-md group-hover:shadow-lg transition-all mt-auto">
          <ButtonIcon className="h-5 w-5" />
          {buttonText}
        </div>
      </div>
    </WrapperComponent>
  )
}
