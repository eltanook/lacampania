"use client"

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
  mercadoLibreUrl,
  description,
  labels,
  detailPageUrl,
}: CatalogProductCardProps) {
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

  return (
    <WrapperComponent
      {...wrapperProps}
      className="group rounded-lg border-2 border-primary/20 bg-card overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 block flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
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
              `$${displayPrice.toLocaleString()}`
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
