"use client"

import { useState, useEffect } from "react"
import { getProductById, getFeaturedProducts } from "@/lib/products"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ArrowLeft, ShoppingCart, Ruler, Tag, X, ChevronLeft, ChevronRight } from "lucide-react"
import { MerchProductCard } from "@/components/merch-product-card"
import { SectionHeader } from "@/components/section-header"
import toast, { Toaster } from "react-hot-toast"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface MerchDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function MerchDetailPage({ params }: MerchDetailPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const recommendedProducts = getFeaturedProducts()
    .filter((p) => p.id !== product.id && (p.category === "Merchandising" || p.category === "Accesorios"))
    .slice(0, 4)

  return <MerchDetailContent product={product} recommendedProducts={recommendedProducts} />
}

function MerchDetailContent({
  product,
  recommendedProducts,
}: {
  product: ReturnType<typeof getProductById>
  recommendedProducts: ReturnType<typeof getFeaturedProducts>
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const { addItem } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (product?.colorOptions && product.colorOptions.length > 0) {
      setSelectedColor(product.colorOptions[0])
    }
    if (product?.iconOptions && product.iconOptions.length > 0) {
      setSelectedIcon(product.iconOptions[0])
    }
  }, [product])

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (product.colorOptions && !selectedColor) {
      toast.error("Por favor selecciona un color", {
        duration: 3000,
        position: "top-center",
      })
      return
    }

    if (product.iconOptions && !selectedIcon) {
      toast.error("Por favor selecciona un diseño", {
        duration: 3000,
        position: "top-center",
      })
      return
    }

    if (product.stock === "out") {
      toast.error("Producto sin stock", {
        duration: 3000,
        position: "top-center",
      })
      return
    }

    const itemName = `${product.name}${selectedColor ? ` - ${selectedColor}` : ""}${selectedIcon ? ` - ${selectedIcon}` : ""}`

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${selectedColor}-${selectedIcon}`,
        name: itemName,
        price: product.salePrice || product.price,
        image: product.images[0],
      })
    }

    toast.success(`¡${quantity} ${quantity === 1 ? "producto agregado" : "productos agregados"} al carrito!`, {
      duration: 3000,
      position: "top-center",
      icon: "🛒",
    })
  }

  const openModal = (index: number) => {
    setModalImageIndex(index)
    setIsModalOpen(true)
  }

  const nextImage = () => {
    setModalImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setModalImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div>
      <Toaster />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 bg-black/95 border-none">
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-12">
              <Image
                src={product.images[modalImageIndex] || "/placeholder.svg"}
                alt={`${product.name} ${modalImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setModalImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === modalImageIndex ? "bg-white w-8" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button asChild variant="ghost" className="rounded-md">
          <Link href="/merch">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Merch
          </Link>
        </Button>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div>
            <button
              onClick={() => openModal(selectedImage)}
              className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-muted w-full cursor-zoom-in hover:opacity-90 transition-opacity"
            >
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.labels && product.labels.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.labels.map((label) => (
                    <span
                      key={label}
                      className={`${
                        label === "Oferta"
                          ? "bg-accent text-accent-foreground"
                          : label === "Stock Limitado"
                            ? "bg-primary text-primary-foreground"
                            : label === "Nuevo"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                      } px-3 py-1 rounded-md font-semibold text-sm shadow-md`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </button>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openModal(index)}
                  onMouseEnter={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors cursor-pointer ${
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
              {product.salePrice ? (
                <>
                  <span className="text-2xl text-muted-foreground line-through">${product.price.toLocaleString()}</span>
                  <span className="text-4xl font-bold text-accent">${product.salePrice.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-4xl font-bold text-primary">${product.price.toLocaleString()}</span>
              )}
              <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {product.colorOptions && product.colorOptions.length > 0 && (
              <div className="mb-6">
                <Label className="text-base font-semibold mb-3 block">Color *</Label>
                <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                  <div className="flex flex-wrap gap-3">
                    {product.colorOptions.map((color) => (
                      <div key={color} className="flex items-center">
                        <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                        <Label
                          htmlFor={`color-${color}`}
                          className="px-4 py-2 rounded-md border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:border-primary/50"
                        >
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {product.iconOptions && product.iconOptions.length > 0 && (
              <div className="mb-6">
                <Label className="text-base font-semibold mb-3 block">Diseño *</Label>
                <RadioGroup value={selectedIcon} onValueChange={setSelectedIcon}>
                  <div className="flex flex-wrap gap-3">
                    {product.iconOptions.map((icon) => (
                      <div key={icon} className="flex items-center">
                        <RadioGroupItem value={icon} id={`icon-${icon}`} className="peer sr-only" />
                        <Label
                          htmlFor={`icon-${icon}`}
                          className="px-4 py-2 rounded-md border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:border-primary/50"
                        >
                          {icon}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

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
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 rounded-md"
                disabled={product.stock === "out"}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock === "out" ? "Sin Stock" : "Agregar al Carrito"}
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
                <MerchProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  salePrice={product.salePrice}
                  labels={product.labels}
                  stock={product.stock}
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
