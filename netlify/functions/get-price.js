const { getStore } = require('@netlify/blobs');

/**
 * Netlify Function API Endpoint
 * Returns the latest MercadoLibre price stored in Netlify Blobs
 * Accessible at: /.netlify/functions/get-price
 */
exports.handler = async (event, context) => {
    try {
        // Retrieve price from Netlify Blobs
        const store = getStore('mercadolibre-prices');
        const priceDataString = await store.get('current-price');

        if (!priceDataString) {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Price data not found. The scheduled function may not have run yet.',
                    message: 'Please try again later or trigger the update manually.'
                })
            };
        }

        const priceData = JSON.parse(priceDataString);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
            },
            body: JSON.stringify({
                success: true,
                data: priceData
            })
        };

    } catch (error) {
        console.error('Error retrieving price:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: false,
                error: 'Failed to retrieve price data',
                message: error.message
            })
        };
    }
};
