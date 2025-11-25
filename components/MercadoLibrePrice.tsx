'use client';

import { useEffect, useState } from 'react';

interface PriceData {
    price: number;
    currency: string;
    productId: string;
    lastUpdated: string;
    timestamp: number;
}

export default function MercadoLibrePrice() {
    const [priceData, setPriceData] = useState<PriceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPrice() {
            try {
                const response = await fetch('/.netlify/functions/get-price');

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();

                if (result.success && result.data) {
                    setPriceData(result.data);
                    setError(null);
                } else {
                    throw new Error(result.error || 'No se pudo obtener el precio');
                }
            } catch (err) {
                console.error('Error fetching price:', err);
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        }

        fetchPrice();
    }, []);

    if (loading) {
        return <span className="text-muted-foreground">Cargando precio...</span>;
    }

    if (error) {
        return <span className="text-destructive">Error al cargar precio</span>;
    }

    if (!priceData) {
        return <span className="text-muted-foreground">-</span>;
    }

    const formattedPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: priceData.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(priceData.price);

    return (
        <span className="font-bold text-primary" id="precio">
            {formattedPrice}
        </span>
    );
}
