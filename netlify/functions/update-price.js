const { getStore } = require('@netlify/blobs');

/**
 * Scheduled Netlify Function
 * Runs daily at 9:00 AM UTC (6:00 AM Argentina) to fetch MercadoLibre price
 */
exports.handler = async (event, context) => {
    const PRODUCT_ID = 'MLA1888909180';
    const ML_API_URL = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;

    try {
        console.log('Fetching price from MercadoLibre API...');

        // Fetch product data from MercadoLibre with proper headers
        const response = await fetch(ML_API_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`MercadoLibre API error: ${response.status} - ${errorText}`);
            throw new Error(`MercadoLibre API error: ${response.status} ${response.statusText}`);
        }

        const productData = await response.json();
        const price = productData.price;

        if (typeof price !== 'number') {
            console.error('Invalid price data:', productData);
            throw new Error('Invalid price data received from API');
        }

        // Store price in Netlify Blobs
        const store = getStore('mercadolibre-prices');
        const priceData = {
            price: price,
            currency: productData.currency_id || 'ARS',
            productId: PRODUCT_ID,
            productTitle: productData.title || 'La Campaña - Juego De Mesa',
            lastUpdated: new Date().toISOString(),
            timestamp: Date.now()
        };

        await store.set('current-price', JSON.stringify(priceData));

        console.log(`✓ Price updated successfully: ${price} ${priceData.currency}`);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                message: 'Price updated successfully',
                data: priceData
            })
        };

    } catch (error) {
        console.error('Error updating price:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: false,
                error: error.message,
                details: error.stack,
                timestamp: new Date().toISOString()
            })
        };
    }
};
