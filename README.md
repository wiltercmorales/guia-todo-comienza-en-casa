# Todo Comienza en Casa 🏠✝️

Aplicación web interactiva para el programa **"Todo Comienza en Casa"** — una guía de 10 semanas para formar el hábito del culto personal infantil en familia, dirigida a padres de niños de 8 y 9 años.

## Funcionalidades

| Sección | Descripción |
|---|---|
| 🏠 **Página de inicio** | Landing con presentación del programa y formulario de inicio |
| 📊 **Dashboard** | Progreso general, semana actual, accesos rápidos |
| 📅 **Rutina diaria** | Los 7 pasos del culto personal infantil |
| 📋 **Plan por semanas** | Semanas 0–10 con objetivos, pasos, frases y más |
| ✅ **Checklist diario** | Marcar los 7 pasos completados hoy (guardado en localStorage) |
| 🎖 **Pasaporte con Jesús** | Passport espiritual visual con stickers por día completado |
| ⭐ **Desafíos espirituales** | 10 tarjetas de desafío con animación flip |
| 💛 **Para Padres** | Consejos, preguntas frecuentes y versículos bíblicos |
| 🌟 **Cierre del programa** | Certificado, carta de gratitud y plan de continuidad |

## Tecnologías

- **React 18** + **Vite**
- **Tailwind CSS** (tema personalizado: colores crema, dorado, verde bosque)
- **Lucide React** para íconos
- **React Router DOM** (HashRouter para compatibilidad con GitHub Pages)
- **LocalStorage** para persistencia del progreso

## Instalación y uso

```bash
# 1. Entra a la carpeta del proyecto
cd todo-comienza-en-casa-app

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Compilar para producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`. Usa `npm run preview` para ver la versión de producción localmente.

## Publicar en GitHub Pages

```bash
# 1. Instala gh-pages
npm install -D gh-pages

# 2. Agrega en package.json > scripts:
#    "predeploy": "npm run build",
#    "deploy": "gh-pages -d dist"

# 3. Despliega
npm run deploy
```

## Publicar en Vercel

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) e importa el repositorio
3. Vercel detecta Vite automáticamente
4. Clic en **Deploy** — ¡listo!

> Nota: El `base: './'` en `vite.config.js` garantiza que los recursos funcionen correctamente en subdirectorios.

## Datos del programa

Todo el contenido del programa está en:
- `src/data/weeks.js` — 11 semanas (0–10) con objetivos, pasos, frases, etc.
- `src/data/challenges.js` — 10 desafíos espirituales y consejos para padres

Para personalizar el contenido, edita estos archivos directamente.

## Diseño

- **Fuentes:** Lora (titulares, espiritual) + Nunito (cuerpo, amigable)
- **Colores:** Crema cálida, dorado, verde bosque, azul cielo, rosa suave
- **Estilo:** Tarjetas redondeadas, sombras suaves, animaciones ligeras
- **Responsive:** Optimizado para móvil, tablet y computadora

---

*"Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él." — Proverbios 22:6*
