import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    // Extract item ID from MercadoLibre URL
    const itemIdMatch = url.match(/item_id:([A-Z0-9]+)/)
    if (!itemIdMatch) {
      return NextResponse.json({ error: 'Invalid MercadoLibre URL' }, { status: 400 })
    }

    const itemId = itemIdMatch[1]
    
    // Use MercadoLibre API to get item details
    const apiUrl = `https://api.mercadolibre.com/items/${itemId}`
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error('Failed to fetch from MercadoLibre API')
    }

    const data = await response.json()
    
    return NextResponse.json({
      price: data.price,
      currency: data.currency_id,
      title: data.title,
      available_quantity: data.available_quantity,
      condition: data.condition,
      permalink: data.permalink,
    })
  } catch (error) {
    console.error('Error fetching MercadoLibre price:', error)
    return NextResponse.json(
      { error: 'Failed to fetch price from MercadoLibre' },
      { status: 500 }
    )
  }
}
