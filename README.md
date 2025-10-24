# La Campaña - Sitio Web Oficial

Sitio web oficial del juego de mesa argentino "La Campaña", nominado a los Premios Lúdicos 2025.

## 🚀 Deploy en Netlify

### Pasos para Deploy:

1. **Conectar Repositorio:**
   - Ve a [Netlify](https://app.netlify.com)
   - Click en "Add new site" → "Import an existing project"
   - Conecta con GitHub y selecciona el repositorio: `eltanook/lacampania`

2. **Configuración de Build:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** `20`

3. **Variables de Entorno:**
   ```
   NPM_FLAGS=--legacy-peer-deps
   NODE_VERSION=20
   ```

4. **Plugin de Next.js:**
   - Netlify detectará automáticamente que es un proyecto Next.js
   - Instalará el plugin `@netlify/plugin-nextjs` automáticamente

### Configuración Incluida:

El archivo `netlify.toml` ya está configurado con:
- ✅ Build command optimizado
- ✅ Headers de seguridad (X-Frame-Options, CSP)
- ✅ Cache para assets estáticos (imágenes, JS, CSS)
- ✅ Redirects para SPA
- ✅ Soporte para React 19 con `--legacy-peer-deps`

## 🛠️ Tech Stack

- **Framework:** Next.js 14.2.25 (App Router)
- **React:** 19
- **TypeScript:** 5
- **Styling:** Tailwind CSS 4.1.9
- **UI Components:** shadcn/ui + Radix UI
- **Fonts:** Geist Sans
- **Analytics:** Vercel Analytics

## 📦 Instalación Local

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm start
```

## 🎨 Características

- ✅ E-commerce con carrito (localStorage)
- ✅ Catálogo de productos
- ✅ Modo oscuro/claro
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ SEO optimizado con JSON-LD
- ✅ Imágenes optimizadas con lazy loading
- ✅ Integración con WhatsApp
- ✅ Meta Pixel tracking
- ✅ Performance optimizado

## 📄 Páginas

- `/` - Home
- `/nosotros` - Sobre los creadores
- `/catalogo` - Catálogo de productos
- `/merch` - Merchandising
- `/faqs` - Preguntas frecuentes
- `/contacto` - Contacto

## 🎨 Colores de Marca

- **Primary (Verde):** `#3a6b60`
- **Accent (Marrón):** `#753835`
- **Background (Claro):** `#f8eee4`

## 📝 Notas

- Usa `npm install --legacy-peer-deps` por compatibilidad con React 19
- El carrito usa localStorage (no requiere backend)
- Las imágenes están optimizadas con Next.js Image
- SEO mejorado con metadata estructurada

## 🔗 Links

- **Sitio Web:** https://lacampania.netlify.app (después del deploy)
- **Instagram:** [@lacampania.juego](https://www.instagram.com/lacampania.juego/)
- **MercadoLibre:** [Comprar Juego](https://www.mercadolibre.com.ar/la-campana--juego-de-mesa--estrategia/up/MLAU594279492)

## 👥 Desarrollado por

[Zevetix](https://zevetix.online/)

---

© 2025 La Campaña. Todos los derechos reservados.
