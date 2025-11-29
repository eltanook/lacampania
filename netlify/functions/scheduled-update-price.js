const { getStore } = require('@netlify/blobs');

/**
 * Scheduled Netlify Function - Runs daily
 * Fetches MercadoLibre price and stores it in Netlify Blobs
 */
exports.handler = async (event, context) => {
  const PRODUCT_ID = 'MLA1888909180';
  const ML_API_URL = `https://api.mercadolibre.com/items/${PRODUCT_ID}`;
  const DEFAULT_PRICE = 42000;

  console.log('🤖 Scheduled function triggered - Fetching MercadoLibre price...');

  try {
    // Fetch from MercadoLibre with proper headers
    const response = await fetch(ML_API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'es-AR,es;q=0.9',
      }
    });
    
    if (!response.ok) {
      console.warn(`⚠️ MercadoLibre API returned ${response.status}, using default price`);
      throw new Error('API error');
    }
    
    const productData = await response.json();
    const price = productData.price || DEFAULT_PRICE;
    
    console.log(`✅ Price fetched from ML: $${price} ${productData.currency_id}`);
    
    // Save to Netlify Blobs
    const store = getStore('mercadolibre-prices');
    const priceData = {
      price: price,
      currency: productData.currency_id || 'ARS',
      productId: PRODUCT_ID,
      productTitle: productData.title || 'La Campaña - Juego De Mesa',
      lastUpdated: new Date().toISOString(),
      timestamp: Date.now(),
      source: 'mercadolibre-api'
    };
    
    await store.set('current-price', JSON.stringify(priceData));
    
    console.log(`💾 Price saved to Netlify Blobs successfully`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Price updated successfully',
        data: priceData
      })
    };
    
  } catch (error) {
    console.error('❌ Error fetching from MercadoLibre:', error.message);
    
    // Save default price if API fails
    const store = getStore('mercadolibre-prices');
    const fallbackData = {
      price: DEFAULT_PRICE,
      currency: 'ARS',
      productId: PRODUCT_ID,
      lastUpdated: new Date().toISOString(),
      timestamp: Date.now(),
      source: 'fallback',
      error: error.message
    };
    
    await store.set('current-price', JSON.stringify(fallbackData));
    
    console.log(`💾 Fallback price ($${DEFAULT_PRICE}) saved to Blobs`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Saved fallback price',
        data: fallbackData
      })
    };
  }
};
