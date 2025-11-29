/**
 * Simple Netlify Function - Get MercadoLibre price
 * No Blobs, no complexity, just works
 */
exports.handler = async (event, context) => {
    const PRODUCT_ID = 'MLA1888909180';
    const ML_API_URL = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;
    const DEFAULT_PRICE = 42000;

    try {
        console.log('Fetching from MercadoLibre API...');

        const response = await fetch(ML_API_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Accept-Language': 'es-AR,es;q=0.9'
            }
        });

        if (!response.ok) {
            console.warn(`ML API returned ${response.status}`);
            throw new Error('API error');
        }

        const productData = await response.json();
        const price = productData.price || DEFAULT_PRICE;

        console.log(`✅ Got price: $${price}`);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600' // 1 hour cache
            },
            body: JSON.stringify({
                success: true,
                data: {
                    price: price,
                    currency: productData.currency_id || 'ARS',
                    productId: PRODUCT_ID,
                    productTitle: productData.title,
                    lastUpdated: new Date().toISOString(),
                    source: 'mercadolibre-live'
                }
            })
        };

    } catch (error) {
        console.error('Error, using default:', error.message);

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
                    source: 'fallback'
                }
            })
        };
    }
};
