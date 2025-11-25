'use client';

import { useEffect, useState } from 'react';

interface PriceData {
    price: number;
    currency: string;
    productId: string;
    lastUpdated: string;
    fallback?: boolean;
}

export default function MercadoLibrePrice() {
    const DEFAULT_PRICE = 42000;
    const [priceData, setPriceData] = useState<PriceData>({
        price: DEFAULT_PRICE,
        currency: 'ARS',
        productId: 'MLA1888909180',
        lastUpdated: new Date().toISOString()
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPrice() {
            try {
                const response = await fetch('/.netlify/functions/get-price');

                if (response.ok) {
                    const result = await response.json();
                    if (result.success && result.data) {
                        setPriceData(result.data);
                    }
                }
            } catch (err) {
                console.warn('Error fetching price, using default:', err);
                // Mantener el precio por defecto que ya está en el estado
            } finally {
                setLoading(false);
            }
        }

        fetchPrice();
    }, []);

    const formattedPrice = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: priceData.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(priceData.price);

    if (loading) {
        return <span className="text-muted-foreground">Cargando...</span>;
    }

    return (
        <span className="font-bold text-primary" id="precio">
            {formattedPrice}
        </span>
    );
}
