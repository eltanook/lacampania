"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface CatalogFiltersProps {
  onFilterChange: (filters: FilterState) => void
  merchOnly?: boolean
}

export interface FilterState {
  search: string
  category: string
  sortBy: string
  inStock: boolean | null
}

export function CatalogFilters({ onFilterChange, merchOnly = false }: CatalogFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    sortBy: "featured",
    inStock: null,
  })

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="sticky top-24 bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-2 text-foreground font-semibold">
        <SlidersHorizontal className="h-5 w-5" />
        <h3 className="text-base">Filtros</h3>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm">
          Buscar
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Buscar productos..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-9 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-sm">Categoría</Label>
        <RadioGroup value={filters.category} onValueChange={(value) => updateFilters({ category: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="font-normal cursor-pointer text-sm">
              Todos
            </Label>
          </div>
          {!merchOnly && (
            <>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Juego Base" id="base" />
                <Label htmlFor="base" className="font-normal cursor-pointer text-sm">
                  Juego Base
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Expansión" id="expansion" />
                <Label htmlFor="expansion" className="font-normal cursor-pointer text-sm">
                  Expansiones
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Bundle" id="bundle" />
                <Label htmlFor="bundle" className="font-normal cursor-pointer text-sm">
                  Bundles
                </Label>
              </div>
            </>
          )}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Accesorios" id="accessories" />
            <Label htmlFor="accessories" className="font-normal cursor-pointer text-sm">
              Accesorios
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Merchandising" id="merch" />
            <Label htmlFor="merch" className="font-normal cursor-pointer text-sm">
              Merchandising
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
