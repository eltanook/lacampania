# 🚀 Guía de Despliegue - Sistema Automático de Precios MercadoLibre

Esta guía explica cómo deployar el sistema de actualización automática de precios de MercadoLibre en Netlify.

## 📋 Resumen del Sistema

El sistema consiste en:
- **Función programada** (`update-price.js`): Se ejecuta diariamente a las 9:00 AM UTC (6:00 AM Argentina)
- **API endpoint** (`get-price.js`): Sirve el precio al frontend
- **Almacenamiento**: Netlify Blobs para guardar el precio
- **Frontend**: Componente React para mostrar el precio

---

## 🔧 Instalación de Dependencias

### 1. Instalar paquetes necesarios

```bash
npm install
```

Esto instalará las dependencias de Netlify:
- `@netlify/blobs`: Para almacenamiento key-value
- `@netlify/functions`: Para funciones serverless

---

## 🌐 Despliegue en Netlify

### Opción A: Despliegue desde Interfaz Web de Netlify

1. **Crea una cuenta en Netlify** (si no tienes una)
   - Ve a [netlify.com](https://www.netlify.com/)
   - Regístrate o inicia sesión

2. **Conecta tu repositorio**
   - Asegúrate de que tu código esté en GitHub, GitLab o Bitbucket
   - En Netlify, haz clic en "Add new site" → "Import an existing project"
   - Conecta tu repositorio de Git
   - Netlify detectará automáticamente la configuración de `netlify.toml`

3. **Configura el build**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Netlify usará la configuración de `netlify.toml` automáticamente

4. **Deploy**
   - Haz clic en "Deploy site"
   - Espera a que termine el build (2-5 minutos)

### Opción B: Despliegue desde CLI

1. **Instala Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Autentícate**

```bash
netlify login
```

3. **Inicializa el sitio**

```bash
netlify init
```

Sigue las instrucciones y selecciona:
- Create & configure a new site
- Team: Tu equipo/cuenta personal
- Site name: Elige un nombre único

4. **Deploy manualmente**

```bash
# Deploy de prueba
netlify deploy

# Deploy a producción
netlify deploy --prod
```

---

## ⚙️ Verificación Post-Despliegue

### 1. Verifica la configuración del cron job

1. Ve al dashboard de Netlify → Tu sitio → Functions
2. Deberías ver dos funciones:
   - `update-price` (con ⏱️ icono de scheduled)
   - `get-price`

3. Verifica que `update-price` esté configurada para ejecutarse a las `0 9 * * *` (9:00 AM UTC diariamente)

### 2. Ejecuta manualmente la primera vez

Para probar y obtener el precio inicial:

```bash
# Usando curl (Windows PowerShell)
curl https://TU-SITIO.netlify.app/.netlify/functions/update-price

# O usando el navegador
# Ve a: https://TU-SITIO.netlify.app/.netlify/functions/update-price
```

Deberías recibir una respuesta como:
```json
{
  "success": true,
  "message": "Price updated successfully",
  "data": {
    "price": 38889,
    "currency": "ARS",
    "productId": "MLA1888909180",
    "lastUpdated": "2025-11-25T20:53:20.000Z",
    "timestamp": 1732567200000
  }
}
```

### 3. Verifica el endpoint de lectura

```bash
curl https://TU-SITIO.netlify.app/.netlify/functions/get-price
```

### 4. Prueba la página demo

Ve a: `https://TU-SITIO.netlify.app/precio-demo.html`

Deberías ver el precio formateado con el nombre del producto.

---

## 🎨 Integración en tu Frontend

### Opción 1: Usar el componente React (Next.js)

En cualquier página o componente de tu aplicación Next.js:

```tsx
import MercadoLibrePrice from '@/components/MercadoLibrePrice';

export default function HomePage() {
  return (
    <div>
      <h1>La Campaña - Juego De Mesa</h1>
      <p>Precio: <MercadoLibrePrice /></p>
    </div>
  );
}
```

### Opción 2: Fetch directo en JavaScript/React

```javascript
// En cualquier componente
async function fetchPrice() {
  const response = await fetch('/.netlify/functions/get-price');
  const result = await response.json();
  
  if (result.success) {
    const { price, currency } = result.data;
    document.getElementById('precio').textContent = 
      new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: currency
      }).format(price);
  }
}

fetchPrice();
```

### Opción 3: HTML estático simple

```html
<span id="precio">Cargando...</span>

<script>
  fetch('/.netlify/functions/get-price')
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        document.getElementById('precio').textContent = 
          '$' + result.data.price.toLocaleString('es-AR');
      }
    });
</script>
```

---

## 🔄 Actualización Manual del Precio

Si necesitas forzar una actualización del precio (sin esperar al cron diario):

1. **Desde el navegador**: Ve a `https://TU-SITIO.netlify.app/.netlify/functions/update-price`

2. **Desde la CLI**:
```bash
curl -X GET https://TU-SITIO.netlify.app/.netlify/functions/update-price
```

3. **Desde el dashboard de Netlify**:
   - Functions → update-price → "Trigger deploy" (esto re-ejecuta la función)

---

## 📊 Monitoreo y Logs

### Ver logs de las funciones

1. Dashboard de Netlify → Tu sitio → Functions
2. Haz clic en la función que quieres monitorear
3. Ve a la pestaña "Logs"

Aquí verás:
- Cuándo se ejecutó la función
- Si fue exitosa o falló
- Mensajes de console.log
- Errores si los hay

### Verificar ejecuciones del cron

El cron job se ejecuta automáticamente todos los días a las 9:00 AM UTC (6:00 AM Argentina).

Para verificar que está funcionando:
- Revisa los logs después de las 9:00 AM UTC
- Verifica que la fecha de "lastUpdated" en el endpoint se actualice diariamente

---

## 🐛 Troubleshooting

### El precio no se muestra

1. **Verifica que la función update-price se haya ejecutado al menos una vez**
   ```bash
   curl https://TU-SITIO.netlify.app/.netlify/functions/update-price
   ```

2. **Revisa los logs en Netlify** para ver errores

3. **Verifica CORS** - El endpoint `get-price` ya tiene configurado `Access-Control-Allow-Origin: *`

### El cron job no se ejecuta

1. Verifica en `netlify.toml` que la configuración esté correcta:
   ```toml
   [[functions]]
     path = "/.netlify/functions/update-price"
     schedule = "0 9 * * *"
   ```

2. Los scheduled functions requieren que el sitio esté en producción (no funcionan en deploys de preview)

3. Puede tomar hasta 24 horas para que el primer cron job se ejecute después del deploy inicial

### Error 404 en las funciones

- Asegúrate de que el sitio esté deployado en producción
- Las rutas de las funciones son: `/.netlify/functions/NOMBRE-FUNCION` (con el punto al inicio)

---

## 📝 Archivos Importantes

```
campania_web/
├── netlify.toml                          # Configuración de Netlify y cron jobs
├── package.json                          # Dependencias incluyendo @netlify/blobs
├── netlify/
│   └── functions/
│       ├── update-price.js              # Función scheduled (cron diario)
│       └── get-price.js                 # API endpoint para el frontend
├── components/
│   └── MercadoLibrePrice.tsx            # Componente React para Next.js
└── public/
    └── precio-demo.html                 # Página demo standalone
```

---

## 🎯 Próximos Pasos

1. ✅ Deploy el sitio en Netlify
2. ✅ Ejecuta manualmente `update-price` la primera vez
3. ✅ Verifica que `get-price` devuelva el precio
4. ✅ Integra el componente en tu página de inicio
5. ✅ Espera 24 horas y verifica que el cron job funcione automáticamente

---

## 💡 Tips

- **Cache**: El endpoint `get-price` tiene cache de 1 hora para optimizar performance
- **Gratis**: Todo esto funciona en el tier gratuito de Netlify
- **Confiable**: Netlify Blobs es más estable que archivos JSON en entornos serverless
- **Escalable**: Puedes agregar más productos creando nuevas funciones similares

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs en Netlify Dashboard
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de que `netlify.toml` esté en la raíz del proyecto
4. Consulta la documentación oficial: [docs.netlify.com](https://docs.netlify.com/)

---

**¡Listo! Tu sistema de precios automáticos de MercadoLibre está configurado y funcionando.** 🎉
