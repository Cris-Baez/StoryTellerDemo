
# Storyteller AI Demo

Este proyecto contiene un MVP funcional dividido en:

- `backend/`: API en Express para procesar historias
- `frontend/`: Interfaz en Next.js + Tailwind

El backend expone la ruta `POST /parse` que por ahora devuelve escenas de
ejemplo definidas en `backend/data/story-mock.json`. El frontend consume dicha
API para mostrar las escenas generadas.

## Uso

1. Rellena los archivos `.env` en `backend/` y `frontend/`
2. Ejecuta el backend:

```bash
cd backend
npm install
node index.js
```

3. Ejecuta el frontend:

```bash
cd frontend
npm install
npm run dev
```

¡Listo! Ya puedes enviar historias y ver escenas generadas.
