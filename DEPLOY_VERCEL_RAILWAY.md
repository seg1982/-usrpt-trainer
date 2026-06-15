═══════════════════════════════════════════════════════════════════════════════
                       🚀 DEPLOY EN PRODUCCIÓN
                     VERCEL + RAILWAY (15 MINUTOS)
═══════════════════════════════════════════════════════════════════════════════

PARTE 1: PREPARAR ANTHROPIC API KEY
═══════════════════════════════════════════════════════════════════════════════

1. Ir a https://console.anthropic.com/account/keys
2. Crear nueva API key (o copiar existente)
3. Guardar en lugar seguro (NECESITARÁS ESTO VARIAS VECES)

   Ejemplo: sk-ant-bWVudGFsLWFjdGl2...

═══════════════════════════════════════════════════════════════════════════════
PARTE 2: GITHUB (2 minutos)
═══════════════════════════════════════════════════════════════════════════════

1. Crear cuenta en GitHub si no tienes: https://github.com/signup

2. Crear nuevo repositorio:
   - Ir a: https://github.com/new
   - Nombre: usrpt-trainer
   - Descripción: App inteligente para entrenamientos USRPT
   - Public o Private (como prefieras)
   - ✓ Initialize with README
   - CREATE REPOSITORY

3. Clonar en tu computadora:

   ```bash
   git clone https://github.com/TU_USUARIO/usrpt-trainer.git
   cd usrpt-trainer
   ```

4. Agregar todos los archivos que creamos:

   Copia estos archivos en tu carpeta usrpt-trainer/:

   ✓ server.js
   ✓ App.jsx
   ✓ App.css
   ✓ package.json
   ✓ vite.config.js
   ✓ vercel.json
   ✓ .env.example
   ✓ .gitignore
   ✓ SETUP_DEPLOY.md

   Luego estructura así:
   
   usrpt-trainer/
   ├── src/
   │   ├── App.jsx
   │   ├── App.css
   │   └── main.jsx (crea uno vacío o usa template Vite)
   ├── server.js
   ├── package.json
   ├── vite.config.js
   ├── vercel.json
   ├── .env.example
   ├── .gitignore
   └── README.md

5. Hacer commit y push:

   ```bash
   git add .
   git commit -m "Initial: USRPT Trainer App"
   git push -u origin main
   ```

═══════════════════════════════════════════════════════════════════════════════
PARTE 3: DEPLOY FRONTEND EN VERCEL (3 minutos)
═══════════════════════════════════════════════════════════════════════════════

1. Ir a https://vercel.com/signup
   - Registrarse con GitHub
   - Autorizar Vercel acceso a GitHub

2. Importar proyecto:
   - Hacer click en "New Project"
   - Seleccionar: usrpt-trainer
   - Framework: Vite (detecta automáticamente)
   - Deploy (sin cambiar nada)

3. Configurar variables de entorno:
   - En Vercel: Settings → Environment Variables
   - Agregar:
   
     KEY: VITE_API_URL
     VALUE: https://tu-backend-railway-url.com/api
     (Lo actualizaremos después de crear Railway)

4. ¡Tu frontend está en vivo!
   
   URL: https://usrpt-trainer.vercel.app

═══════════════════════════════════════════════════════════════════════════════
PARTE 4: DEPLOY BACKEND EN RAILWAY (5 minutos)
═══════════════════════════════════════════════════════════════════════════════

1. Ir a https://railway.app
   - Sign up con GitHub
   - Autorizar Railway

2. Crear nuevo proyecto:
   - Click "New Project"
   - "Deploy from GitHub"
   - Seleccionar: usrpt-trainer
   - Confirmar

3. Railway configura automáticamente:
   - Detecta Node.js
   - Instala dependencias
   - Ejecuta: node server.js

4. Agregar variables de entorno:
   - En Railway: Variables
   - Agregar:
   
     ANTHROPIC_API_KEY = sk-ant-tu_clave_aqui
     NODE_ENV = production
     PORT = 3001

5. Esperar a que el deployment termine (2-3 min)

6. Obtener URL del backend:
   - Railway → Settings → Public Networking
   - Copiar URL (ejemplo: https://usrpt-trainer-prod.up.railway.app)

7. Actualizar VITE_API_URL en Vercel:
   - Vercel → Settings → Environment Variables
   - Editar VITE_API_URL
   - Pegar: https://usrpt-trainer-prod.up.railway.app
   - Redeploy automático

═══════════════════════════════════════════════════════════════════════════════
PARTE 5: PROBAR EN iPhone (2 minutos)
═══════════════════════════════════════════════════════════════════════════════

1. Abrir Safari en iPhone

2. Ir a: https://usrpt-trainer.vercel.app

3. Share → Agregar a inicio

   Ahora aparece como app en home

4. Abre y prueba:
   - Crear usuario
   - Ver entrenamientos
   - Registrar feedback

═══════════════════════════════════════════════════════════════════════════════
🔄 FLUJO COMPLETO CUANDO HAGAS CAMBIOS
═══════════════════════════════════════════════════════════════════════════════

Si haces cambios en el código (ej: modificar App.jsx):

1. En tu computadora:
   ```bash
   git add .
   git commit -m "Updated: descrición del cambio"
   git push
   ```

2. Vercel se redeploya automáticamente (~30 segundos)

3. Railway TAMBIÉN si hay cambios en server.js

4. En iPhone: Recargar (pull down) la app

═══════════════════════════════════════════════════════════════════════════════
✅ CHECKLIST FINAL
═══════════════════════════════════════════════════════════════════════════════

[ ] API key de Anthropic creada
[ ] Repositorio GitHub creado y pusheado
[ ] Frontend en Vercel (https://usrpt-trainer.vercel.app)
[ ] Backend en Railway (URL guardada)
[ ] VITE_API_URL actualizada en Vercel
[ ] ANTHROPIC_API_KEY en Railway
[ ] App funciona en iPhone
[ ] Puedo crear usuario
[ ] Puedo ver entrenamientos
[ ] Puedo registrar feedback y la IA responde

═══════════════════════════════════════════════════════════════════════════════
📊 COSTO (GRATUITO)
═══════════════════════════════════════════════════════════════════════════════

✓ Vercel: Gratuito (hasta 100 GB bandwidth/mes)
✓ Railway: Gratuito ($5 crédito/mes, más que suficiente)
✓ Anthropic API: Pay as you go (~$0.01 por cada llamada IA)
✓ GitHub: Gratuito (repositorio público)

TOTAL COSTO MENSUAL: ~$0-2 (API key usage)

═══════════════════════════════════════════════════════════════════════════════
🐛 SI ALGO FALLA
═══════════════════════════════════════════════════════════════════════════════

ERROR: "Cannot connect to backend"
SOLUCIÓN:
  1. Verificar VITE_API_URL en Vercel es correcta
  2. Verificar ANTHROPIC_API_KEY en Railway está set
  3. Redeploy Vercel: Settings → Deployments → Redeploy

ERROR: "Invalid API key"
SOLUCIÓN:
  1. Verificar API key en Railway es exacta (copiar/pegar bien)
  2. Ir a https://console.anthropic.com y verificar está activa
  3. Redeploy Railway

ERROR: "Frontend loads pero entrenamientos vacíos"
SOLUCIÓN:
  1. Abrir DevTools (F12) → Console
  2. Ver si hay error de conexión
  3. Verificar VITE_API_URL es accesible

═══════════════════════════════════════════════════════════════════════════════
🎯 PRÓXIMOS PASOS
═══════════════════════════════════════════════════════════════════════════════

1. MONDAY (16 JUN): Haces tu primer entreno
   - Abres app
   - Ves el plan LUNES
   - Nadas
   - Registras feedback

2. La IA ANALIZA tu feedback

3. WEDNESDAY (18 JUN): App genera nuevo entreno
   - AJUSTADO basado en tu feedback
   - Periódicamente (cada semana) se adapta

4. Continúa hasta NACIONAL 24 JULIO 🏆

═══════════════════════════════════════════════════════════════════════════════
📞 SOPORTE RÁPIDO
═══════════════════════════════════════════════════════════════════════════════

Si algo falla:
1. Ir a Vercel → Function logs
2. Ir a Railway → Logs
3. Copiar errores
4. Buscar en docs o GitHub issues

═══════════════════════════════════════════════════════════════════════════════
🚀 ¡LISTO! TU APP ESTÁ EN VIVO

Frontend:   https://usrpt-trainer.vercel.app
Backend:    https://tu-railway-url.up.railway.app
GitHub:     https://github.com/tuuser/usrpt-trainer

Abre en iPhone → Home → Guardado como app nativa

¡Ahora sí a entrenar! 🏊💪

═══════════════════════════════════════════════════════════════════════════════
