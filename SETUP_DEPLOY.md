═══════════════════════════════════════════════════════════════════════════════
                    USRPT TRAINER - SETUP & DEPLOY
═══════════════════════════════════════════════════════════════════════════════

🚀 OPCIÓN A: DEPLOY EN 5 MINUTOS (Recomendado)
═══════════════════════════════════════════════════════════════════════════════

1. CLONAR O CREAR PROYECTO VITE

```bash
npm create vite@latest usrpt-trainer -- --template react
cd usrpt-trainer
npm install
npm install cors axios dotenv @anthropic-ai/sdk
```

2. REEMPLAZAR ARCHIVOS

- Copiar App.jsx → src/App.jsx
- Copiar App.css → src/App.css
- Copiar server.js → raíz del proyecto

3. CREAR .env

```
VITE_API_URL=http://localhost:3001
ANTHROPIC_API_KEY=tu_clave_aqui
```

4. INSTALAR DEPENDENCIAS DEL BACKEND

```bash
npm install express cors dotenv @anthropic-ai/sdk
```

5. EJECUTAR AMBOS EN PARALELO

Terminal 1 (Frontend):
```bash
npm run dev
# http://localhost:5173
```

Terminal 2 (Backend):
```bash
node server.js
# http://localhost:3001
```

6. ABRIR EN iOS

En iPhone:
- Safari → http://tuIP:5173
- Agregar a home (Share → Agregar a inicio)

═══════════════════════════════════════════════════════════════════════════════
🌐 OPCIÓN B: DEPLOY EN VERCEL (Production)
═══════════════════════════════════════════════════════════════════════════════

1. CREAR REPO EN GITHUB

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tuuser/usrpt-trainer.git
git push -u origin main
```

2. CONECTAR A VERCEL

```
https://vercel.com/new
```

- Importar repo GitHub
- Framework: Vite
- Environment variables:
  - ANTHROPIC_API_KEY = tu_clave

3. DEPLOY BACKEND EN RAILWAY O RENDER

Backend (server.js):
```
https://railway.app o https://render.com
- Conectar mismo repo
- Environment: ANTHROPIC_API_KEY
```

4. UPDATE VITE_API_URL EN VERCEL

```
VITE_API_URL=https://tu-backend-url.com
```

5. ¡LISTO!

Tu app funciona en:
- https://usrpt-trainer.vercel.app
- Accesible desde cualquier iPhone en el mundo

═══════════════════════════════════════════════════════════════════════════════
🔐 VARIABLES DE ENTORNO (.env)
═══════════════════════════════════════════════════════════════════════════════

NECESARIAS:

ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
(Obtener en: https://console.anthropic.com/account/keys)

VITE_API_URL=http://localhost:3001 (desarrollo)
             =https://tu-backend-url.com (producción)

PORT=3001 (opcional, para backend)

═══════════════════════════════════════════════════════════════════════════════
📱 ESTRUCTURA PROYECTO
═══════════════════════════════════════════════════════════════════════════════

usrpt-trainer/
├── src/
│   ├── App.jsx         ← React frontend
│   ├── App.css         ← Estilos
│   ├── main.jsx        ← Entry point
│   └── index.css       ← Global styles
├── server.js           ← Express backend
├── .env                ← Variables de entorno
├── package.json        ← Dependencias
├── vite.config.js      ← Configuración Vite
└── README.md

═══════════════════════════════════════════════════════════════════════════════
🔧 DEPENDENCIAS NECESARIAS
═══════════════════════════════════════════════════════════════════════════════

Frontend (Vite + React):
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.0.0"
  }
}
```

Backend (Node.js):
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.0",
    "dotenv": "^16.0.0",
    "@anthropic-ai/sdk": "^0.7.0"
  }
}
```

Instalar todo:
```bash
npm install react react-dom express cors dotenv @anthropic-ai/sdk
npm install -D @vitejs/plugin-react vite
```

═══════════════════════════════════════════════════════════════════════════════
🚀 COMANDOS ÚTILES
═══════════════════════════════════════════════════════════════════════════════

Desarrollo:
```bash
npm run dev          # Frontend (Vite)
node server.js       # Backend
```

Build para producción:
```bash
npm run build        # Genera dist/
npm run preview      # Preview local
```

Limpiar:
```bash
rm -rf node_modules
npm install
```

═══════════════════════════════════════════════════════════════════════════════
🔌 API ENDPOINTS
═══════════════════════════════════════════════════════════════════════════════

POST /api/usuario/crear
  - Crea nuevo usuario
  - Body: { nombre, edad, altura, pesoActual, pesoObjetivo, objetivo }

POST /api/entrenamientos/generar
  - Genera entreno con IA
  - Body: { usuarioId, dia, feedback_anterior }

POST /api/entrenamientos/proximo
  - Obtiene próximo entreno recomendado
  - Body: { usuarioId }

POST /api/feedback/guardar
  - Guarda feedback post-entreno
  - Body: { usuarioId, entrenoId, cumplimiento, tiempos, sensacion, notas }
  - Response: { feedback, recomendaciones }

POST /api/nutricion/recomendaciones
  - Obtiene plan nutricional personalizado
  - Body: { usuarioId }

GET /api/usuario/:usuarioId
  - Obtiene datos completos del usuario
  - Response: { usuario, entrenamientos, feedbacks }

═══════════════════════════════════════════════════════════════════════════════
🤖 CÓMO FUNCIONA LA IA
═══════════════════════════════════════════════════════════════════════════════

1. GENERAR ENTRENO

   Usuario → "Quiero USRPT para mariposa lunes" 
            ↓
   API → Claude API con prompt específico
        ↓
   IA genera entreno JSON con:
   - Calentamiento
   - Preset
   - Set Principal (USRPT)
   - Set Complementario
   - Enfriamiento
   - Ajustes IA (si hay feedback anterior)

2. GUARDAR FEEDBACK

   Usuario → Cumplimiento 85%, tiempos, sensación, notas
            ↓
   API → Claude API analiza
        ↓
   IA genera:
   - Análisis del rendimiento
   - Ajustes próxima semana
   - Recomendaciones nutrición
   - Alertas médicas
   - Proyección de peso

3. AJUSTES AUTOMÁTICOS

   Próximo entreno generado CONSIDERANDO:
   - Cumplimiento anterior
   - Tiempos alcanzados vs objetivos
   - Sensación post-entreno
   - Notas sobre molestias
   
   Ejemplo:
   - Si cumplimiento < 80% → REDUCE intensidad
   - Si tiempos suben → MANTÉN o AUMENTA
   - Si sensación "fatiga" → DESCARGA

═══════════════════════════════════════════════════════════════════════════════
🐛 TROUBLESHOOTING
═══════════════════════════════════════════════════════════════════════════════

Error: "Cannot find module '@anthropic-ai/sdk'"
Solución:
```bash
npm install @anthropic-ai/sdk
```

Error: "ANTHROPIC_API_KEY is not defined"
Solución:
- Verificar .env tiene: ANTHROPIC_API_KEY=sk-ant-xxx
- Reiniciar servidor

Error: "CORS error"
Solución:
- Backend tiene cors() configurado
- Verificar VITE_API_URL = URL correcta del backend
- En desarrollo: http://localhost:3001

Error: "Entrenamientos vacíos"
Solución:
- Verificar Claude API key activa
- Ver logs del servidor para errores

═══════════════════════════════════════════════════════════════════════════════
📊 PRÓXIMAS MEJORAS
═══════════════════════════════════════════════════════════════════════════════

[ ] MongoDB para persistencia real
[ ] Autenticación con JWT
[ ] Gráficas de progreso
[ ] Exportar PDF entrenamientos
[ ] Notificaciones push
[ ] App nativa iOS (React Native)
[ ] Integración Gravl API
[ ] Histórico metrizable
[ ] Comparación vs objetivos

═══════════════════════════════════════════════════════════════════════════════
💡 TIPS
═══════════════════════════════════════════════════════════════════════════════

1. Prueba la app en tu iPhone: guardar como web app (más fluido que browser)

2. Comparte feedback PRECISO post-entreno:
   - Tiempos exactos (no aproximado)
   - Sensación honesta
   - Notas sobre molestias
   
   → IA aprende y ajusta mejor

3. Usa Claude API key gratuita o paga según necesidad:
   - Free: $5 crédito inicial
   - Pay as you go: muy económico

4. El backend almacena TODO en memoria ahora (development)
   - Para producción: integrar MongoDB
   - Base de datos + autenticación

═══════════════════════════════════════════════════════════════════════════════
📞 SOPORTE
═══════════════════════════════════════════════════════════════════════════════

Si algo no funciona:
1. Verificar logs del servidor (Terminal 2)
2. Verificar logs del navegador (DevTools F12)
3. Verificar ANTHROPIC_API_KEY es válida
4. Reiniciar servidor: Ctrl+C y node server.js

═══════════════════════════════════════════════════════════════════════════════
¡LISTO! Tu app USRPT Trainer está lista para entrenar hacia el Nacional 🏊🚀

═══════════════════════════════════════════════════════════════════════════════
