const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
    const DEFAULT_PRICE = 42000;

    try {
        // Use Netlify's automatic context
        const store = getStore({
            name: 'mercadolibre-prices',
            siteID: context.site?.id || process.env.SITE_ID,
            token: context.env?.NETLIFY_TOKEN || process.env.NETLIFY_TOKEN
        });

        const priceDataString = await store.get('current-price');

        if (!priceDataString) {
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
        console.error('Error:', error.message);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: true,
                data: {
                    price: DEFAULT_PRICE,
                    currency: 'ARS',
                    productId: 'MLA1888909180',
                    lastUpdated: new Date().toISOString(),
                    source: 'fallback'
                }
            })
        };
    }
};
