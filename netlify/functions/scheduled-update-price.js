const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const PRODUCT_ID = 'MLA1888909180';
  const ML_API_URL = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;
  const DEFAULT_PRICE = 42000;

  console.log('🤖 Scheduled function triggered');

  try {
    // Fetch from MercadoLibre
    const response = await fetch(ML_API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('API error');
    }

    const productData = await response.json();
    const price = productData.price || DEFAULT_PRICE;

    console.log(`✅ Price: $${price}`);

    // Use Netlify's automatic context
    const store = getStore({
      name: 'mercadolibre-prices',
      siteID: context.site?.id || process.env.SITE_ID,
      token: context.env?.NETLIFY_TOKEN || process.env.NETLIFY_TOKEN
    });

    const priceData = {
      price: price,
      currency: productData.currency_id || 'ARS',
      productId: PRODUCT_ID,
      lastUpdated: new Date().toISOString(),
      timestamp: Date.now()
    };

    await store.set('current-price', JSON.stringify(priceData));

    console.log(`💾 Saved to Blobs`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: priceData
      })
    };

  } catch (error) {
    console.error('❌ Error:', error.message);

    // Return fallback
    return {
      statusCode: 200,
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
