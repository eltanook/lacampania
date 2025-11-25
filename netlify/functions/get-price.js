/**
 * Netlify Function - Obtiene precio de MercadoLibre
 * Si falla, devuelve precio por defecto de $42,000
 */
exports.handler = async (event, context) => {
    const PRODUCT_ID = 'MLA1888909180';
    const ML_API_URL = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;
    const DEFAULT_PRICE = 42000;

    try {
        console.log('Fetching price from MercadoLibre API...');

        const response = await fetch(ML_API_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.warn(`MercadoLibre API returned ${response.status}, using default price`);
            throw new Error('API error');
        }

        const productData = await response.json();
        const price = productData.price || DEFAULT_PRICE;

        console.log(`✓ Price fetched: ${price} ARS`);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            body: JSON.stringify({
                success: true,
                data: {
                    price: price,
                    currency: productData.currency_id || 'ARS',
                    productId: PRODUCT_ID,
                    lastUpdated: new Date().toISOString()
                }
            })
        };

    } catch (error) {
        console.warn('Error fetching from MercadoLibre, returning default price:', error.message);

        // Devolver precio por defecto en caso de error
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=600'
            },
            body: JSON.stringify({
                success: true,
                data: {
                    price: DEFAULT_PRICE,
                    currency: 'ARS',
                    productId: PRODUCT_ID,
                    lastUpdated: new Date().toISOString(),
                    fallback: true
                }
            })
        };
    }
};
