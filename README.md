# 🎲 Sistema Automático de Precios MercadoLibre

Sistema serverless que obtiene automáticamente el precio del producto "La Campaña - Juego De Mesa" (MLA1888909180) de MercadoLibre una vez al día y lo sirve a tu frontend.

## ✨ Características

- 🤖 **Actualización automática diaria** a las 9:00 AM UTC (6:00 AM Argentina)
- ⚡ **Serverless** - Sin backend tradicional, solo funciones Netlify
- 💾 **Almacenamiento confiable** con Netlify Blobs
- 🎨 **Componentes listos para usar** en React/Next.js
- 🆓 **100% Gratuito** en el tier free de Netlify
- 🚀 **Deploy simple** - Git push y listo

## 🏗️ Arquitectura

```
┌─────────────────┐
│  Netlify Cron   │  ← Ejecuta diariamente a las 9:00 AM UTC
└────────┬────────┘
         │
         ▼
┌──────────────────────┐
│  update-price.js     │  ← Consulta API de MercadoLibre
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Netlify Blobs      │  ← Almacena el precio
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   get-price.js       │  ← API endpoint para el frontend
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Frontend React     │  ← Muestra el precio al usuario
└──────────────────────┘
```

## 📁 Estructura de Archivos

```
campania_web/
├── 📄 netlify.toml                    # Configuración Netlify + cron job
├── 📄 package.json                    # Dependencias
├── 📁 netlify/functions/
│   ├── update-price.js               # 🤖 Función scheduled (cron)
│   └── get-price.js                  # 🌐 API endpoint
├── 📁 components/
│   └── MercadoLibrePrice.tsx         # ⚛️ Componente React
├── 📁 public/
│   └── precio-demo.html              # 🎨 Página demo
└── 📄 DEPLOYMENT.md                   # 📖 Guía de despliegue
```

## 🚀 Quick Start

### 1. Instalar dependencias

```bash
npm install
```

### 2. Deploy en Netlify

**Opción A: Desde la web**
1. Sube el código a GitHub
2. Conecta el repo en [netlify.com](https://netlify.com)
3. Deploy automático

**Opción B: Desde CLI**
```bash
netlify login
netlify init
netlify deploy --prod
```

### 3. Primera ejecución

Ejecuta manualmente la función para obtener el precio inicial:

```bash
curl https://TU-SITIO.netlify.app/.netlify/functions/update-price
```

### 4. Integra en tu frontend

```tsx
import MercadoLibrePrice from '@/components/MercadoLibrePrice';

<p>Precio: <MercadoLibrePrice /></p>
```

¡Listo! El precio se actualizará automáticamente cada día.

## 🔌 API Endpoints

### `GET /.netlify/functions/get-price`

Devuelve el precio actual almacenado.

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "price": 38889,
    "currency": "ARS",
    "productId": "MLA1888909180",
    "lastUpdated": "2025-11-25T09:00:00.000Z",
    "timestamp": 1732527600000
  }
}
```

### `GET /.netlify/functions/update-price`

Actualiza el precio manualmente (también se ejecuta automáticamente vía cron).

## 🎨 Uso del Componente React

### Ejemplo básico

```tsx
import MercadoLibrePrice from '@/components/MercadoLibrePrice';

export default function ProductCard() {
  return (
    <div className="product-card">
      <h2>La Campaña - Juego De Mesa</h2>
      <div className="price">
        <MercadoLibrePrice />
      </div>
    </div>
  );
}
```

### Ejemplo con fetch personalizado

```javascript
async function mostrarPrecio() {
  const res = await fetch('/.netlify/functions/get-price');
  const { data } = await res.json();
  
  const precio = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: data.currency
  }).format(data.price);
  
  document.getElementById('precio').textContent = precio;
}
```

## ⏰ Cron Job

La función `update-price` se ejecuta automáticamente:
- **Frecuencia**: Diaria
- **Hora**: 9:00 AM UTC (6:00 AM Argentina)
- **Configuración**: `netlify.toml`

```toml
[[functions]]
  path = "/.netlify/functions/update-price"
  schedule = "0 9 * * *"
```

## 🔧 Configuración

### Cambiar el horario del cron

Edita `netlify.toml`:

```toml
schedule = "0 9 * * *"  # Formato: minuto hora día mes día-semana
```

Ejemplos:
- `0 9 * * *` - Diario a las 9:00 AM UTC
- `0 */6 * * *` - Cada 6 horas
- `0 0 * * 0` - Domingos a medianoche

### Cambiar el producto

Edita `netlify/functions/update-price.js`:

```javascript
const PRODUCT_ID = 'TU_NUEVO_ID';  // Cambia esto
```

## 📊 Monitoreo

### Ver logs en Netlify

1. Dashboard → Functions → update-price → Logs
2. Revisa ejecuciones, errores y timestamps

### Verificar última actualización

```bash
curl https://TU-SITIO.netlify.app/.netlify/functions/get-price | jq '.data.lastUpdated'
```

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Precio no aparece | Ejecuta manualmente `update-price` la primera vez |
| Cron no funciona | Debe estar en producción, no en preview |
| Error 404 | Verifica que las rutas sean `/.netlify/functions/...` |
| CORS error | Ya está configurado `Access-Control-Allow-Origin: *` |

## 📚 Documentación

- [Guía de Despliegue Completa](./DEPLOYMENT.md)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Netlify Blobs Docs](https://docs.netlify.com/blobs/overview/)
- [API MercadoLibre](https://developers.mercadolibre.com.ar/)

## 💎 Características Técnicas

- ✅ TypeScript support en componente React
- ✅ Error handling robusto
- ✅ Cache de 1 hora en respuestas
- ✅ Formato automático de precios en ARS
- ✅ Fecha de última actualización
- ✅ CORS configurado para acceso público
- ✅ Logging para debugging

## 🤝 Contribuir

Este sistema es simple y directo. Para mejoras:
1. Fork el repo
2. Crea una rama para tu feature
3. Submit un PR

## 📝 Licencia

MIT

---

**Desarrollado para La Campaña - Juego De Mesa** 🎲

¿Preguntas? Revisa [DEPLOYMENT.md](./DEPLOYMENT.md) para más detalles.
