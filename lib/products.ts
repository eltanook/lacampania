export interface Product {
  id: string
  sku: string
  name: string
  description: string
  shortDescription: string
  price: number
  salePrice?: number
  labels?: string[]
  stock?: "limited" | "normal" | "out"
  mercadoLibreUrl?: string
  colorOptions?: string[]
  iconOptions?: string[]
  category: string
  images: string[]
  dimensions: string
  featured: boolean
}

export const products: Product[] = [
  {
    id: "la-campania-base",
    sku: "LC-BASE-001",
    name: "La Campaña - Juego de Mesa - Estrategia",
    shortDescription: "Un emocionante juego de estrategia argentino para 2-6 jugadores.",
    description:
      "La Campaña es un juego de mesa de estrategia argentino para 2-6 jugadores donde cada decisión cuenta. Incluye 120 cartas únicas, tablero de juego, fichas de recursos y manual de reglas completo. Perfecto para noches de juego con amigos y familia.",
    price: 40635,
    labels: ["Más Vendido", "Stock Limitado"],
    category: "Juego Base",
    images: [
      "/la-campania-box-with-cards.webp",
      "/producto2.webp",
      "/producto3.webp",
      "/producto4.webp",
      "/producto5.webp",
    ],
    dimensions: "30cm x 30cm x 8cm",
    featured: true,
    mercadoLibreUrl:
      "https://www.mercadolibre.com.ar/la-campana--juego-de-mesa--estrategia/up/MLAU594279492?pdp_filters=item_id:MLA1888909180",
  },
  {
    id: "expansion-estrategas",
    sku: "LC-EXP-001",
    name: "Expansión: Los Estrategas",
    shortDescription: "Nuevas cartas y mecánicas para expandir tu experiencia de juego.",
    description:
      "Añade 60 cartas nuevas con mecánicas avanzadas, 3 nuevos personajes estrategas y reglas opcionales para partidas más complejas. Requiere el juego base para jugar.",
    price: 8000,
    labels: ["Stock Limitado"],
    category: "Expansión",
    images: [
      "/board-game-expansion-cards.jpg",
      "/expansion-pack-cards-with-new-characters.jpg",
      "/strategic-board-game-expansion-cards-spread-on-tab.jpg",
    ],
    dimensions: "20cm x 15cm x 4cm",
    featured: false,
    mercadoLibreUrl: "https://www.mercadolibre.com.ar/la-campania-expansion-estrategas",
  },
  {
    id: "bundle-completo",
    sku: "LC-BUN-001",
    name: "Bundle Completo",
    shortDescription: "Juego base + expansión + accesorios premium.",
    description:
      "El pack definitivo para los verdaderos estrategas. Incluye el juego base, la expansión Los Estrategas, sleeves premium, playmat deluxe y dados personalizados. Ahorra 20% comprando el bundle completo.",
    price: 28000,
    category: "Bundle",
    images: [
      "/complete-board-game-bundle-package-with-all-access.jpg",
      "/board-game-collection-spread-showing-all-component.jpg",
    ],
    dimensions: "35cm x 35cm x 12cm",
    featured: false,
    mercadoLibreUrl: "https://www.mercadolibre.com.ar/la-campania-bundle-completo",
  },
  {
    id: "sleeves-premium",
    sku: "LC-ACC-001",
    name: "Sleeves Premium",
    shortDescription: "Protege tus cartas con fundas de alta calidad.",
    description:
      "Pack de 150 fundas premium de alta calidad para proteger todas las cartas de tu juego base. Material resistente y transparente que no afecta la jugabilidad.",
    price: 3500,
    salePrice: 3000,
    labels: ["Oferta"],
    stock: "normal",
    category: "Accesorios",
    images: ["/card-game-sleeves-protectors.jpg", "/card-game-sleeves-protectors.jpg"],
    dimensions: "10cm x 15cm x 2cm",
    featured: false,
  },
  {
    id: "playmat-deluxe",
    sku: "LC-ACC-002",
    name: "Playmat Deluxe",
    shortDescription: "Tapete de juego con diseño exclusivo de La Campaña.",
    description:
      "Tapete de neopreno de alta calidad con el mapa del mundo de La Campaña. Base antideslizante y superficie suave para proteger tus cartas y mejorar la experiencia de juego.",
    price: 5500,
    stock: "limited",
    labels: ["Stock Limitado"],
    category: "Accesorios",
    images: ["/gaming-playmat-with-strategic-map-design.jpg", "/board-game-playmat-detail-with-medieval-map.jpg"],
    dimensions: "60cm x 35cm x 0.3cm",
    featured: false,
  },
  {
    id: "dados-personalizados",
    sku: "LC-ACC-003",
    name: "Dados Personalizados",
    shortDescription: "Set de dados con símbolos exclusivos de La Campaña.",
    description:
      "Pack de 6 dados de 6 caras con símbolos personalizados del juego. Material de resina de alta calidad con grabado profundo.",
    price: 2500,
    stock: "normal",
    category: "Accesorios",
    images: ["/custom-dice-set-with-unique-symbols.jpg", "/close-up-of-engraved-gaming-dice.jpg"],
    dimensions: "8cm x 8cm x 3cm",
    featured: false,
  },
  {
    id: "organizador-madera",
    sku: "LC-ACC-004",
    name: "Organizador de Madera",
    shortDescription: "Organizador artesanal de madera para todas las piezas del juego.",
    description:
      "Organizador hecho a mano en madera de pino con compartimentos diseñados específicamente para cada componente de La Campaña. Mantén todo ordenado y listo para jugar.",
    price: 7000,
    stock: "normal",
    category: "Accesorios",
    images: [
      "/wooden-board-game-organizer-box-with-compartments.jpg",
      "/handcrafted-wood-organizer-for-card-game-component.jpg",
    ],
    dimensions: "28cm x 28cm x 6cm",
    featured: false,
  },
  {
    id: "camiseta-estratega",
    sku: "LC-MER-001",
    name: "Camiseta Estratega",
    shortDescription: "Camiseta oficial con diseño exclusivo de La Campaña.",
    description:
      "Camiseta 100% algodón con estampado de alta calidad del logo de La Campaña. Disponible en tallas S, M, L, XL y XXL.",
    price: 4500,
    salePrice: 4000,
    labels: ["Oferta", "Nuevo"],
    stock: "normal",
    colorOptions: ["Negro", "Blanco", "Verde"],
    iconOptions: ["Logo Clásico", "Estratega", "Mapa"],
    category: "Merchandising",
    images: ["/black-t-shirt-with-board-game-logo-design.jpg", "/gaming-t-shirt-design-detail-close-up.jpg"],
    dimensions: "Tallas: S-XXL",
    featured: true,
  },
  {
    id: "llavero-estratega",
    sku: "LC-MER-002",
    name: "Llavero Estratega",
    shortDescription: "Llavero metálico con el logo de La Campaña.",
    description:
      "Llavero de metal de alta calidad con el logo de La Campaña grabado. Perfecto para llevar tu pasión por el juego a todas partes.",
    price: 1500,
    stock: "normal",
    colorOptions: ["Plateado", "Dorado", "Negro"],
    iconOptions: ["Logo", "Dado", "Carta"],
    category: "Merchandising",
    images: ["/metal-keychain-with-game-logo.jpg"],
    dimensions: "5cm x 3cm",
    featured: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
