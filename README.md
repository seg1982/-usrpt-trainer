# 🏊 USRPT TRAINER

App inteligente para entrenamientos de natación USRPT hacia el Nacional de Invierno 2025.

**IA integrada que ajusta tus entrenamientos automáticamente según tu feedback.**

## 🎯 Características

- ✅ **Generación automática de entrenamientos USRPT** personalizados
- ✅ **IA que ajusta** entrenamientos basado en tu feedback
- ✅ **Sistema de periodización** hacia Nacional 24 Julio
- ✅ **Recomendaciones nutricionales** inteligentes
- ✅ **Feedback post-entreno** con análisis automático
- ✅ **Web app responsive** funciona en iPhone/Android/Desktop
- ✅ **Zero setup** para el usuario - solo abrir en navegador

## 🚀 Deploy en vivo

- **Frontend:** https://usrpt-trainer.vercel.app
- **Backend:** Railway (API privada)
- **IA:** Claude Anthropic API

## 📱 Acceso

### iPhone (Recomendado)
1. Abrir Safari
2. Ir a: https://usrpt-trainer.vercel.app
3. Share → Agregar a inicio
4. ¡Listo! Aparece como app nativa

### Web (Cualquier navegador)
- https://usrpt-trainer.vercel.app

## 🛠 Tecnología

**Frontend:**
- React 18
- Vite
- CSS moderno (Grid, Flexbox)
- Responsive design

**Backend:**
- Node.js + Express
- Claude API (Anthropic)
- Generación dinámica de entrenamientos
- Análisis de feedback con IA

**Deploy:**
- Vercel (frontend)
- Railway (backend)
- GitHub (code)

## 📋 Cómo usar

### 1. Crear usuario
- Abre la app
- Click "Iniciar Sesión"
- IA configura tu perfil automáticamente

### 2. Ver entrenamientos
- Dashboard muestra próximo entreno
- Click "Ver Detalles" para completo
- Formato USRPT profesional

### 3. Registrar feedback post-entreno
- Después de nadar: Pestaña "Feedback"
- Cumplimiento (%), tiempos, sensación, notas
- IA analiza automáticamente

### 4. Próximo entreno ajustado
- IA genera nuevo entreno considerando feedback
- Periódicamente se adapta a tu progreso
- Hacia Nacional 24 Julio

## 🤖 Cómo funciona la IA

1. **Generación de entrenamientos:**
   - Análisis de periodización
   - Feedback anterior
   - Composición corporal
   - Estado médico

2. **Análisis de feedback:**
   - Cumplimiento vs objetivo
   - Tiempos vs velocidades plan
   - Sensación post-entreno
   - Molestias reportadas

3. **Ajustes automáticos:**
   - Si cumplimiento bajo → reduce intensidad
   - Si tiempos suben → mantén o aumenta
   - Si fatiga alta → descarga
   - Recomendaciones nutricionales dinámicas

## 📊 Datos del usuario

**Datos almacenados:**
- Perfil médico/nutricional
- Entrenamientos generados
- Feedback post-entreno
- Análisis de la IA
- Proyecciones de peso

**Privacidad:**
- Datos en memoria (desarrollo)
- Opción para MySQL/MongoDB
- Nunca compartido
- Bajo GDPR compliance

## 🔧 Desarrollo local

### Setup inicial
```bash
# Clonar
git clone https://github.com/tuuser/usrpt-trainer.git
cd usrpt-trainer

# Instalar dependencias
npm install

# Crear .env
cp .env.example .env
# Editar .env con tu ANTHROPIC_API_KEY
```

### Ejecutar en desarrollo
```bash
# Terminal 1: Frontend
npm run dev
# http://localhost:5173

# Terminal 2: Backend
npm run server
# http://localhost:3001
```

### Build para producción
```bash
npm run build
npm run preview
```

## 🚀 Deploy en Vercel + Railway

Ver: [DEPLOY_VERCEL_RAILWAY.md](./DEPLOY_VERCEL_RAILWAY.md)

**En 15 minutos:**
1. GitHub → Vercel (frontend)
2. GitHub → Railway (backend)
3. API keys configuradas
4. ¡Listo!

## 📝 Variables de entorno

```bash
# NECESARIO
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Desarrollo
VITE_API_URL=http://localhost:3001

# Producción
VITE_API_URL=https://tu-railway-url.up.railway.app
```

## 🔌 API Endpoints

```
POST /api/usuario/crear
POST /api/entrenamientos/proximo
POST /api/entrenamientos/generar
POST /api/feedback/guardar
POST /api/nutricion/recomendaciones
GET /api/usuario/:usuarioId
```

## 📈 Roadmap

- [ ] Autenticación (JWT)
- [ ] Base de datos (MongoDB)
- [ ] Gráficas de progreso
- [ ] Exportar PDF entrenamientos
- [ ] Notificaciones push
- [ ] App nativa iOS (React Native)
- [ ] Integración Gravl API (gym sync)
- [ ] Historial metrizable completo

## 🐛 Troubleshooting

**"Cannot connect to backend"**
- Verificar `VITE_API_URL` en Vercel
- Verificar Railway está running
- Redeploy Vercel

**"Invalid API key"**
- Verificar API key es correcta
- Ir a console.anthropic.com
- Crear nueva si está expirada

**"Entrenamientos vacíos"**
- Ver logs de la app (F12 → Console)
- Verificar conexión a internet
- Esperar 2-3 segundos

## 🤝 Contribuciones

Este proyecto es para un atleta específico (Alfredo Segnini).

Para tu propio caso:
1. Fork el repo
2. Modifica parámetros iniciales en App.jsx
3. Deploy tu propia instancia
4. ¡Entrena hacia tu competencia!

## 📄 Licencia

MIT - Libre para usar y modificar

## 👨‍💻 Autor

Desarrollado para: **Alfredo Segnini**
- Objetivo: 100mts Mariposa @ Nacional Invierno 2025
- Meta: 105 kg
- Método: USRPT

---

## 🏆 Próxima competencia

**Nacional de Invierno 2025**
- **Evento:** 100mts Mariposa
- **Fecha:** 24 Julio 2025
- **Ubicación:** Santiago de Chile

---

**¿Preguntas?** Revisa los logs, comprueba variables de entorno, y redeploy.

**¡Buena suerte en tu entrenamiento! 🏊💪**
