"use client"

import { useState, useMemo } from "react"
import { SectionHeader } from "@/components/section-header"
import { CatalogFilters, type FilterState } from "@/components/catalog-filters"
import { products } from "@/lib/products"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MerchProductCard } from "@/components/merch-product-card"

const PRODUCTS_PER_PAGE = 6

export default function MerchClientPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    sortBy: "featured",
    inStock: null,
  })
  const [currentPage, setCurrentPage] = useState(1)

  const merchProducts = useMemo(() => {
    return products.filter((p) => p.category === "Merchandising" || p.category === "Accesorios")
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = [...merchProducts]

    if (filters.search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category)
    }

    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case "price-desc":
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return filtered
  }, [filters, merchProducts])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="bg-primary/5 border-y-2 border-primary/10">
      <div className="container mx-auto px-4 py-12">
        <SectionHeader label="Merchandising" title="Accesorios y Merch" align="center" />

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 h-fit">
            <CatalogFilters onFilterChange={handleFilterChange} merchOnly />
          </aside>

          <div>
            <div className="mb-6 text-muted-foreground flex items-center gap-2">
              <span className="h-1 w-8 bg-primary rounded-full" />
              Mostrando <span className="font-semibold text-primary">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "producto" : "productos"}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No se encontraron productos con estos filtros.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {paginatedProducts.map((product) => (
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

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="rounded-md"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1 flex-wrap justify-center">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="rounded-md min-w-[40px]"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-md"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
