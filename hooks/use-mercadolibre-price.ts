import { useState, useEffect } from 'react'

interface MercadoLibrePrice {
  price: number
  currency: string
  title: string
  available_quantity: number
  condition: string
  permalink: string
}

export function useMercadoLibrePrice(mercadoLibreUrl?: string) {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mercadoLibreUrl) {
      return
    }

    const fetchPrice = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/mercadolibre-price?url=${encodeURIComponent(mercadoLibreUrl)}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch price')
        }

        const data: MercadoLibrePrice = await response.json()
        setPrice(data.price)
      } catch (err) {
        // Silently fail and use fallback price - don't log to console
        setError('No se pudo obtener el precio')
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()
  }, [mercadoLibreUrl])

  return { price, loading, error }
}
