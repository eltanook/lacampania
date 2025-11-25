'use client';

import { useEffect, useState } from 'react';

const DEFAULT_PRICE = 42000;

export function useMercadoLibrePrice(mercadoLibreUrl?: string) {
  const [price, setPrice] = useState<number>(DEFAULT_PRICE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si no hay URL de MercadoLibre, usar precio por defecto
    if (!mercadoLibreUrl || !mercadoLibreUrl.includes('MLA1888909180')) {
      setPrice(DEFAULT_PRICE);
      setLoading(false);
      return;
    }

    async function fetchPrice() {
      try {
        const response = await fetch('/.netlify/functions/get-price');

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.price) {
            setPrice(result.data.price);
          }
        }
      } catch (error) {
        console.warn('Error fetching price from Netlify function, using default:', error);
        // Mantener el precio por defecto
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
  }, [mercadoLibreUrl]);

  return { price, loading };
}
