# 🎲 La Campaña - Sitio Web Oficial

Sitio web oficial del juego de mesa argentino **La Campaña**, nominado a los Premios Lúdicos 2025. Una aplicación Next.js moderna que ofrece información del juego, catálogo de productos, carrito de compras y gestión automática de precios via MercadoLibre.

## 📋 Descripción del Proyecto

Este proyecto es el sitio web oficial de **La Campaña**, un juego de mesa de estrategia argentino para 2-5 jugadores. El sitio permite a los usuarios explorar el juego, ver productos relacionados, consultar preguntas frecuentes y comprar directamente a través de MercadoLibre.

### Características Principales

- ✨ **Diseño Moderno y Responsive** - Interfaz elegante con soporte dark/light mode
- 🛒 **Carrito de Compras** - Sistema de carrito con persistencia en localStorage
- 💰 **Precios Automáticos** - Integración con API de MercadoLibre para precios actualizados
- 🤖 **Actualización Programada** - Cron job diario para actualizar precios automáticamente
- 📱 **WhatsApp Integration** - Botón flotante para contacto directo
- 🎨 **Sistema de Temas** - Tema claro/oscuro con transiciones suaves
- 🚀 **Optimización SEO** - Metadata completa, sitemap y robots.txt
- ⚡ **Serverless** - Funciones Netlify para operaciones backend

> **📌 Nota Importante**: Algunas funcionalidades y componentes presentes en el código están preparados para futuras implementaciones que se activarán cuando se tenga el material y contenido pertinente. Estas no están obsoletas, sino que son parte de la planificación a futuro del proyecto.

## 🏗️ Arquitectura del Proyecto

```
la-campania/
├── app/                          # Páginas y rutas de Next.js
│   ├── carrito/                  # Página del carrito de compras
│   ├── catalogo/                 # Catálogo de productos
│   ├── contacto/                 # Formulario de contacto
│   ├── faqs/                     # Preguntas frecuentes
│   ├── merch/                    # Página de merchandising
│   ├── nosotros/                 # Información sobre el juego
│   ├── producto/                 # Detalles de productos
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal con metadata SEO
│   ├── page.tsx                  # Página de inicio
│   └── home-page-client.tsx      # Componente cliente de la home
├── components/                   # Componentes React reutilizables
│   ├── ui/                       # Componentes UI base (shadcn/ui)
│   ├── navbar.tsx                # Barra de navegación
│   ├── footer.tsx                # Pie de página
│   ├── hero-slider.tsx           # Slider del hero
│   ├── product-card.tsx          # Tarjeta de producto
│   ├── whatsapp-float.tsx        # Botón flotante de WhatsApp
│   └── ...                       # Otros componentes
├── lib/                          # Utilidades y contextos
│   ├── cart-context.tsx          # Contexto del carrito de compras
│   ├── products.ts               # Definición de productos
│   └── utils.ts                  # Funciones utilitarias
├── netlify/functions/            # Funciones serverless
│   ├── update-price.js           # Cron job para actualizar precios
│   └── get-price.js              # API endpoint para obtener precios
├── public/                       # Archivos estáticos
│   ├── images/                   # Imágenes del sitio
│   └── ...                       # Otros recursos
├── netlify.toml                  # Configuración Netlify + cron job
└── package.json                  # Dependencias del proyecto
```

## 🛠️ Tecnologías Utilizadas

### Core
- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework CSS utility-first

### UI Components
- **shadcn/ui** - Componentes accesibles basados en Radix UI
- **Lucide React** - Iconos modernos
- **Embla Carousel** - Carruseles responsivos

### Backend & Servicios
- **Netlify Functions** - Funciones serverless
- **Netlify Blobs** - Almacenamiento de datos
- **Netlify Cron Jobs** - Tareas programadas
- **MercadoLibre API** - Integración de precios

### Herramientas
- **Next Themes** - Sistema de temas
- **Geist Font** - Tipografía moderna
- **Vercel Analytics** - Analíticas de rendimiento

## 📦 Instalación

### Prerequisitos

- Node.js 18+ 
- npm o pnpm
- Cuenta de Netlify (para deployment)

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd campania_web
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🚀 Scripts Disponibles

```bash
npm run dev       # Inicia servidor de desarrollo
npm run build     # Genera build de producción
npm run start     # Inicia servidor de producción
npm run lint      # Ejecuta linter
```

## 🌐 Deployment

Este proyecto está optimizado para deployment en **Netlify**.

### Deploy Automático

1. Conecta tu repositorio en [netlify.com](https://netlify.com)
2. Netlify detectará automáticamente Next.js
3. El deploy se ejecutará automáticamente en cada push

### Deploy Manual (CLI)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inicializar proyecto
netlify init

# Deploy a producción
netlify deploy --prod
```

### Configuración Importante

El archivo `netlify.toml` contiene:
- Configuración de build
- Cron job para actualizar precios diariamente (9:00 AM UTC)
- Redirects y headers

## 🤖 Sistema de Precios Automático

### Arquitectura

```
Netlify Cron (9:00 AM UTC)
    ↓
update-price.js → MercadoLibre API
    ↓
Netlify Blobs (almacenamiento)
    ↓
get-price.js → Frontend
```

### Endpoints

**GET** `/.netlify/functions/get-price`
- Devuelve el precio actual almacenado
- Respuesta: `{ success: true, data: { price, currency, productId, lastUpdated } }`

**GET** `/.netlify/functions/update-price`
- Actualiza el precio manualmente
- Se ejecuta automáticamente vía cron a las 9:00 AM UTC

### Primera Ejecución

Después del deploy, ejecuta manualmente para obtener el precio inicial:

```bash
curl https://TU-SITIO.netlify.app/.netlify/functions/update-price
```

## 📱 Componentes Principales

### `CartContext` (`lib/cart-context.tsx`)
Gestiona el estado global del carrito de compras con persistencia en localStorage.

**Métodos:**
- `addItem(item)` - Agregar producto al carrito
- `removeItem(id)` - Eliminar producto
- `updateQuantity(id, quantity)` - Actualizar cantidad
- `clearCart()` - Vaciar carrito

### `Navbar` (`components/navbar.tsx`)
Barra de navegación responsive con:
- Scroll spy para cambiar estilo al hacer scroll
- Menú móvil hamburguesa
- Indicador de items en carrito
- Toggle de tema claro/oscuro

### `MercadoLibrePrice` (`components/MercadoLibrePrice.tsx`)
Componente que muestra el precio actualizado desde la API.

## 🎨 Sistema de Temas

El proyecto usa `next-themes` con dos temas:
- **Light Mode** - Tema claro
- **Dark Mode** - Tema oscuro

Los usuarios pueden cambiar entre temas usando el toggle en la navbar.

## 📊 SEO y Metadata

### Configuración SEO

- **Metadata completa** en `app/layout.tsx`
- **Open Graph tags** para redes sociales
- **Twitter Cards** para compartir
- **Structured Data** (JSON-LD) para Google
- **Sitemap.xml** generado dinámicamente
- **Robots.txt** configurado

### Keywords Principales

- "la campaña juego de mesa"
- "juego de mesa argentino"
- "juego de estrategia"
- "premios lúdicos 2025"
- "juego mesa 2-5 jugadores"

## 📄 Páginas Principales

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con hero, features, testimonios |
| `/nosotros` | Información sobre el juego y creadores |
| `/catalogo` | Listado de productos disponibles |
| `/merch` | Merchandising oficial |
| `/carrito` | Carrito de compras |
| `/faqs` | Preguntas frecuentes |
| `/contacto` | Formulario de contacto |

## 🔧 Configuración

### Variables de Entorno

No se requieren variables de entorno para el proyecto base. Las funciones Netlify manejan todo internamente.

### Cambiar Producto de MercadoLibre

Edita `netlify/functions/update-price.js`:

```javascript
const PRODUCT_ID = 'TU_NUEVO_ID';  // Cambia esto
```

### Modificar Horario del Cron

Edita `netlify.toml`:

```toml
schedule = "0 9 * * *"  # Formato: minuto hora día mes día-semana
```

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Precio no aparece | Ejecuta manualmente `/update-price` la primera vez |
| Cron no funciona | Debe estar en producción, no funciona en preview |
| Error 404 en funciones | Verifica que las rutas sean `/.netlify/functions/...` |
| Carrito no persiste | Verifica que localStorage esté habilitado en el navegador |

## 📚 Recursos Adicionales

- [Guía de Deployment Completa](./DEPLOYMENT.md)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es propiedad de **La Campaña**. Todos los derechos reservados.

---

**Desarrollado para La Campaña - Juego De Mesa** 🎲

Creado por Eloy y Lucas | Web por [Zevetix](https://zevetix.online/)

Para más información, visita [lacampania.com.ar](https://lacampania.com.ar) o contáctanos en lacampaniajuego@gmail.com
