const { getStore } = require('@netlify/blobs');

/**
 * Netlify Function - Get current price
 * Reads price from Netlify Blobs storage
 */
exports.handler = async (event, context) => {
    const DEFAULT_PRICE = 42000;

    try {
        // Read from Netlify Blobs
        const store = getStore('mercadolibre-prices');
        const priceDataString = await store.get('current-price');

        if (!priceDataString) {
            console.log('⚠️ No price found in Blobs, returning default');

            // Return default price if nothing is stored yet
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
                        price: DEFAULT_PRICE,
                        currency: 'ARS',
                        productId: 'MLA1888909180',
                        lastUpdated: new Date().toISOString(),
                        source: 'default'
                    }
                })
            };
        }

        const priceData = JSON.parse(priceDataString);

        console.log(`✅ Price retrieved from Blobs: $${priceData.price}`);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            body: JSON.stringify({
                success: true,
                data: priceData
            })
        };

    } catch (error) {
        console.error('❌ Error reading from Blobs:', error.message);

        // Return default price on error
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
                    productId: 'MLA1888909180',
                    lastUpdated: new Date().toISOString(),
                    source: 'error-fallback',
                    error: error.message
                }
            })
        };
    }
};
