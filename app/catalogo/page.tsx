import type { Metadata } from "next"
import { SectionHeader } from "@/components/section-header"
import { getProductById } from "@/lib/products"
import { CatalogProductCard } from "@/components/catalog-product-card"

export const metadata: Metadata = {
  title: "Catálogo - La Campaña | Productos Principales",
  description:
    "Descubre nuestros productos principales: juego base, expansiones y bundles. La Campaña, el juego de estrategia argentino nominado a los Premios Lúdicos 2025.",
  keywords: "catálogo, la campaña, juego base, expansiones, bundles",
  openGraph: {
    title: "Catálogo - La Campaña",
    description: "Descubre nuestros productos principales",
    type: "website",
  },
}

export default function CatalogPage() {
  const mainProduct = getProductById("la-campania-base")
  const expansion = getProductById("expansion-heroes-ciudades")

  return (
    <div className="bg-primary/5 border-y-2 border-primary/10 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <SectionHeader label="Catálogo" title="Nuestros Productos Principales" align="center" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mainProduct && (
            <CatalogProductCard
              key={mainProduct.id}
              id={mainProduct.id}
              name={mainProduct.name}
              price={mainProduct.price}
              image={mainProduct.images[0]}
              images={mainProduct.images}
              mercadoLibreUrl={mainProduct.mercadoLibreUrl || "#"}
              description={mainProduct.shortDescription}
              labels={mainProduct.labels}
            />
          )}
          {expansion && (
            <CatalogProductCard
              key={expansion.id}
              id={expansion.id}
              name={expansion.name}
              price={expansion.price}
              image={expansion.images[0]}
              images={expansion.images}
              mercadoLibreUrl={expansion.mercadoLibreUrl || "#"}
              description={expansion.shortDescription}
              labels={expansion.labels}
              accentColor={expansion.accentColor}
            />
          )}
        </div>
      </div>
    </div>
  )
}
