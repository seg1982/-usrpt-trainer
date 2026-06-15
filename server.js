// ═══════════════════════════════════════════════════════════════
// BACKEND - server.js
// Express + Claude API + Generación dinámica de entrenamientos
// ═══════════════════════════════════════════════════════════════

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic();

// BASE DE DATOS EN MEMORIA (Luego cambiar a MongoDB)
const database = {
  usuarios: {},
  entrenamientos: {},
  feedback: {}
};

// ═══════════════════════════════════════════════════════════════
// 1. CREAR/OBTENER USUARIO
// ═══════════════════════════════════════════════════════════════

app.post('/api/usuario/crear', (req, res) => {
  const { nombre, edad, altura, pesoActual, pesoObjetivo, objetivo } = req.body;
  
  const usuarioId = Date.now().toString();
  
  database.usuarios[usuarioId] = {
    id: usuarioId,
    nombre,
    edad,
    altura,
    pesoActual,
    pesoObjetivo,
    objetivo,
    fechaCreacion: new Date(),
    medico: {
      hipertension: true,
      colesterol: true,
      alergia: 'Alimentos del mar'
    },
    nutricion: {
      calorias: 2369,
      agua: 3,
      fuentes: ['Pollo', 'Carne', 'Huevo', 'Queso']
    }
  };

  res.json({
    success: true,
    usuarioId,
    usuario: database.usuarios[usuarioId]
  });
});

// ═══════════════════════════════════════════════════════════════
// 2. GENERAR ENTRENO CON IA
// ═══════════════════════════════════════════════════════════════

app.post('/api/entrenamientos/generar', async (req, res) => {
  const { usuarioId, dia, feedback_anterior } = req.body;
  
  const usuario = database.usuarios[usuarioId];
  
  try {
    const prompt = `Eres entrenador especialista en USRPT (natación). 
    
Atleta: ${usuario.nombre}, ${usuario.edad} años, ${usuario.altura}cm, ${usuario.pesoActual}kg
Objetivo: ${usuario.objetivo}
Restricción médica: ${usuario.medico.alergia}

Feedback anterior (si existe): ${JSON.stringify(feedback_anterior)}

GENERA UN ENTRENO EN ESTE FORMATO EXACTO (JSON):
{
  "dia": "${dia}",
  "titulo": "string",
  "duracion": "string",
  "intensidad": "percentage",
  "volumen": "meters",
  "calentamiento": {
    "distancia": "meters",
    "ejercicios": ["string"]
  },
  "preset": {
    "distancia": "meters",
    "series": "string",
    "descanso": "seconds"
  },
  "setPrincipal": {
    "distancia": "meters",
    "serie": "string",
    "objetivo": "string",
    "intervalo": "seconds",
    "regla": "string"
  },
  "setComplementario": {
    "distancia": "meters",
    "serie": "string"
  },
  "enfriamiento": {
    "distancia": "meters",
    "ejercicios": ["string"]
  },
  "total": "meters",
  "ajustesIA": "string (si hay feedback anterior, explica qué cambió)"
}

Considera:
- Semana 1: BASE (75-80%)
- Periodización hacia 24 julio
- Si feedback anterior existe: ajusta volumen/intensidad según cumplimiento y sensación`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const contenido = message.content[0].text;
    const entreno = JSON.parse(contenido);
    
    const entrenoId = Date.now().toString();
    database.entrenamientos[entrenoId] = {
      id: entrenoId,
      usuarioId,
      ...entreno,
      createdAt: new Date()
    };

    res.json({
      success: true,
      entrenoId,
      entreno: database.entrenamientos[entrenoId]
    });

  } catch (error) {
    console.error('Error generando entreno:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 3. GUARDAR FEEDBACK POST-ENTRENO
// ═══════════════════════════════════════════════════════════════

app.post('/api/feedback/guardar', async (req, res) => {
  const { usuarioId, entrenoId, cumplimiento, tiempos, sensacion, notas } = req.body;
  
  const feedbackId = Date.now().toString();
  
  database.feedback[feedbackId] = {
    id: feedbackId,
    usuarioId,
    entrenoId,
    cumplimiento,
    tiempos,
    sensacion,
    notas,
    fecha: new Date()
  };

  // AQUÍ LA IA ANALIZA Y GENERA RECOMENDACIONES
  try {
    const entreno = database.entrenamientos[entrenoId];
    
    const prompt = `Analiza este feedback de entrenamiento USRPT:

Entreno planeado: ${entreno.setPrincipal.serie}
Cumplimiento: ${cumplimiento}%
Tiempos alcanzados: ${tiempos}
Sensación post-entreno: ${sensacion}
Notas: ${notas}

GENERA RECOMENDACIONES (responde en JSON):
{
  "analisis": "string (evaluación del rendimiento)",
  "ajustes_proxima_semana": "string (qué cambiar en el próximo entreno)",
  "recomendaciones_nutricion": "string (cambios en plan nutricional si aplica)",
  "alerta_medica": "string o null (si detecta alerta como fatiga excesiva)",
  "proyeccion_peso": "string (estimación de progreso)"
}`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const recomendaciones = JSON.parse(message.content[0].text);

    res.json({
      success: true,
      feedback: database.feedback[feedbackId],
      recomendaciones
    });

  } catch (error) {
    console.error('Error analizando feedback:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 4. OBTENER RECOMENDACIONES NUTRICIONALES INTELIGENTES
// ═══════════════════════════════════════════════════════════════

app.post('/api/nutricion/recomendaciones', async (req, res) => {
  const { usuarioId } = req.body;
  
  const usuario = database.usuarios[usuarioId];
  const feedbacks = Object.values(database.feedback).filter(f => f.usuarioId === usuarioId);
  
  try {
    const prompt = `Atleta: ${usuario.nombre}
Peso actual: ${usuario.pesoActual}kg
Objetivo: ${usuario.pesoObjetivo}kg
Alergia: ${usuario.medico.alergia}
Plan actual: ${usuario.nutricion.calorias} Kcal/día
Última semana feedback: ${JSON.stringify(feedbacks.slice(-3))}

GENERA PLAN NUTRICIONAL AJUSTADO (JSON):
{
  "calorias_diarias": number,
  "proteina_gramos": number,
  "distribucion": {
    "desayuno": "string",
    "merienda_am": "string",
    "almuerzo": "string",
    "merienda_pm": "string",
    "cena": "string"
  },
  "recomendaciones": ["string"],
  "ajustes_basados_en_feedback": "string"
}`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const plan = JSON.parse(message.content[0].text);

    res.json({
      success: true,
      plan
    });

  } catch (error) {
    console.error('Error generando plan nutricional:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// 5. OBTENER DATOS USUARIO
// ═══════════════════════════════════════════════════════════════

app.get('/api/usuario/:usuarioId', (req, res) => {
  const usuario = database.usuarios[req.params.usuarioId];
  
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const entrenamientos = Object.values(database.entrenamientos)
    .filter(e => e.usuarioId === req.params.usuarioId)
    .slice(-5);

  const feedbacks = Object.values(database.feedback)
    .filter(f => f.usuarioId === req.params.usuarioId)
    .slice(-5);

  res.json({
    usuario,
    entrenamientos,
    feedbacks
  });
});

// ═══════════════════════════════════════════════════════════════
// 6. OBTENER PRÓXIMO ENTRENO RECOMENDADO
// ═══════════════════════════════════════════════════════════════

app.post('/api/entrenamientos/proximo', async (req, res) => {
  const { usuarioId } = req.body;
  
  const usuario = database.usuarios[usuarioId];
  const feedbacks = Object.values(database.feedback)
    .filter(f => f.usuarioId === usuarioId)
    .slice(-1)[0];

  const dias = ['lunes', 'miercoles', 'viernes'];
  const dia_actual = new Date().getDay(); // 0=dom, 1=lun, 3=mié, 5=vie
  
  let dia_proximo = 'lunes';
  if (dia_actual >= 2) dia_proximo = 'miercoles';
  if (dia_actual >= 4) dia_proximo = 'viernes';

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: `Entrena USRPT hacia Nacional 24 julio.
Usuario: ${usuario.nombre}
Próximo día: ${dia_proximo}
Feedback anterior: ${feedbacks ? JSON.stringify(feedbacks) : 'Primero'}

Genera entreno en formato JSON (mismo que antes)`
        }
      ]
    });

    const entreno = JSON.parse(message.content[0].text);
    
    res.json({
      success: true,
      entreno,
      dia: dia_proximo
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ═══════════════════════════════════════════════════════════════
// INICIAR SERVIDOR
// ═══════════════════════════════════════════════════════════════

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor USRPT en http://localhost:${PORT}`);
  console.log('✓ IA Claude integrada');
  console.log('✓ Generación dinámmica de entrenamientos');
  console.log('✓ Análisis de feedback automático');
});

module.exports = app;
