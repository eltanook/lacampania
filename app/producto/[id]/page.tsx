"use client"

import { useState, useEffect } from "react"
import { getProductById, getFeaturedProducts } from "@/lib/products"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ArrowLeft, ShoppingCart, Ruler, Tag } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { SectionHeader } from "@/components/section-header"
import toast, { Toaster } from "react-hot-toast"

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const recommendedProducts = getFeaturedProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return <ProductDetailContent product={product} recommendedProducts={recommendedProducts} />
}

function ProductDetailContent({
  product,
  recommendedProducts,
}: {
  product: ReturnType<typeof getProductById>
  recommendedProducts: ReturnType<typeof getFeaturedProducts>
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      })
    }

    toast.success(`¡${quantity} ${quantity === 1 ? "producto agregado" : "productos agregados"} al carrito!`, {
      duration: 3000,
      position: "top-center",
      icon: "🛒",
    })
  }

  return (
    <div>
      <Toaster />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button asChild variant="ghost" className="rounded-md">
          <Link href="/catalogo">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Catálogo
          </Link>
        </Button>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-muted">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <p className="text-sm text-primary font-medium mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-primary">${product.price.toLocaleString('es-AR')}</span>
              <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Details */}
            <div className="bg-muted rounded-lg p-6 mb-6 space-y-3">
              <div className="flex items-start gap-3">
                <Ruler className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Dimensiones</p>
                  <p className="text-sm text-muted-foreground">{product.dimensions}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Categoría</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-muted transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-border">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
              <Button onClick={handleAddToCart} size="lg" className="flex-1 rounded-md">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Agregar al Carrito
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p>✓ Envíos a todo el país</p>
              <p>✓ Garantía de calidad</p>
              <p>✓ Soporte al cliente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <SectionHeader label="Recomendados" title="También te puede interesar" align="center" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0]}
                  description={product.shortDescription}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
