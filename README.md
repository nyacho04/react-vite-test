# VMware Assistance (Frontend)

Este es el frontend de un asistente virtual para diagnóstico de infraestructura VMware, construido con React, Vite y Chakra UI.

## Estructura del proyecto

```
/project-root
  /src
    App.jsx
    main.jsx
    index.css
    /components
      ChatInput.jsx
      ChatMessage.jsx
  package.json
  package-lock.json
  vite.config.js
  /public
    index.html
```

## Requisitos
- Node.js >= 18.x
- npm >= 9.x

## Instalación

1. Clona el repositorio o copia los archivos a tu nuevo proyecto.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal).

## Notas
- Si no tienes backend, la interfaz funcionará pero no responderá a los mensajes.
- Si tienes backend, asegúrate de que el endpoint `/chat` esté disponible en `http://localhost:8000`.

## Migración
- Copia la carpeta `src`, el archivo `package.json`, `package-lock.json`, `vite.config.js` y la carpeta `public` a tu nuevo repositorio.
- Sigue los pasos de instalación arriba indicados.

---

