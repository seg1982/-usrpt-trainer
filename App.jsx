// ═══════════════════════════════════════════════════════════════
// FRONTEND - App.jsx (React + Vite)
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [usuarioId, setUsuarioId] = useState(localStorage.getItem('usuarioId'));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [entreno, setEntreno] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    cumplimiento: 100,
    tiempos: '',
    sensacion: '',
    notas: ''
  });
  const [recomendaciones, setRecomendaciones] = useState(null);

  // ═══════════════════════════════════════════════════════════════
  // CREAR USUARIO
  // ═══════════════════════════════════════════════════════════════

  const crearUsuario = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/usuario/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: 'Alfredo Segnini',
          edad: 42,
          altura: 182,
          pesoActual: 117.8,
          pesoObjetivo: 105,
          objetivo: '100mts Mariposa - Nacional Invierno 24 Julio'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setUsuarioId(data.usuarioId);
        setUsuario(data.usuario);
        localStorage.setItem('usuarioId', data.usuarioId);
        generarProximoEntreno(data.usuarioId);
      }
    } catch (error) {
      console.error('Error creando usuario:', error);
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  // ═══════════════════════════════════════════════════════════════
  // GENERAR ENTRENO CON IA
  // ═══════════════════════════════════════════════════════════════

  const generarProximoEntreno = async (id = usuarioId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/entrenamientos/proximo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId: id })
      });

      const data = await response.json();
      
      if (data.success) {
        setEntreno(data.entreno);
      }
    } catch (error) {
      console.error('Error generando entreno:', error);
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  // ═══════════════════════════════════════════════════════════════
  // GUARDAR FEEDBACK CON IA
  // ═══════════════════════════════════════════════════════════════

  const guardarFeedback = async () => {
    if (!feedback.sensacion) {
      alert('Por favor selecciona tu sensación');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/feedback/guardar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId,
          entrenoId: entreno.id,
          ...feedback
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setRecomendaciones(data.recomendaciones);
        alert('✓ Feedback guardado. IA analizando...');
        
        // Generar próximo entreno con ajustes
        setTimeout(() => {
          generarProximoEntreno();
        }, 2000);
      }
    } catch (error) {
      console.error('Error guardando feedback:', error);
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  // ═══════════════════════════════════════════════════════════════
  // OBTENER RECOMENDACIONES NUTRICIONALES
  // ═══════════════════════════════════════════════════════════════

  const obtenerNutricion = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/nutricion/recomendaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId })
      });

      const data = await response.json();
      
      if (data.success) {
        setRecomendaciones(data.plan);
      }
    } catch (error) {
      console.error('Error obteniendo nutrición:', error);
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  // ═══════════════════════════════════════════════════════════════
  // CARGAR USUARIO AL INICIAR
  // ═══════════════════════════════════════════════════════════════

  useEffect(() => {
    if (usuarioId) {
      fetch(`${API_URL}/api/usuario/${usuarioId}`)
        .then(r => r.json())
        .then(data => {
          setUsuario(data.usuario);
          if (data.entrenamientos.length === 0) {
            generarProximoEntreno(usuarioId);
          }
        })
        .catch(err => console.error('Error cargando usuario:', err));
    }
  }, [usuarioId]);

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════

  if (!usuarioId || !usuario) {
    return (
      <div className="app-container login">
        <div className="login-box">
          <h1>🏊 USRPT TRAINER</h1>
          <p>App inteligente para tu Nacional 100m Mariposa</p>
          <button onClick={crearUsuario} disabled={loading} className="btn-primary">
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
          <p className="footer-text">IA ajusta entrenamientos según tu feedback</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <h1>🏊 USRPT TRAINER</h1>
        <p>Nacional 100m Mariposa - 24 Julio</p>
      </header>

      {/* TABS */}
      <nav className="tabs">
        <button 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab ${activeTab === 'entreno' ? 'active' : ''}`}
          onClick={() => setActiveTab('entreno')}
        >
          Entrenamientos
        </button>
        <button 
          className={`tab ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
        <button 
          className={`tab ${activeTab === 'nutricion' ? 'active' : ''}`}
          onClick={() => setActiveTab('nutricion')}
        >
          Nutrición
        </button>
      </nav>

      {/* CONTENIDO */}
      <main className="app-content">
        
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="section">
            <h2>Estado Actual</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <p className="stat-label">Peso Actual</p>
                <p className="stat-value">{usuario.pesoActual} kg</p>
                <p className="stat-meta">Objetivo: {usuario.pesoObjetivo} kg</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Días para Nacional</p>
                <p className="stat-value">38</p>
                <p className="stat-meta">24 Julio 2025</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Fase</p>
                <p className="stat-value">SEMANA 1</p>
                <p className="stat-meta">BASE (75-80%)</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Próximo Entreno</p>
                <p className="stat-value">LUNES</p>
                <p className="stat-meta">7:00 AM</p>
              </div>
            </div>

            {entreno && (
              <div className="entreno-preview">
                <h3>Próximo Entreno</h3>
                <p><strong>{entreno.titulo}</strong></p>
                <p>{entreno.duracion} | {entreno.volumen} | {entreno.intensidad}%</p>
                {entreno.ajustesIA && (
                  <div className="ai-note">
                    <p><strong>🤖 IA ajustes:</strong> {entreno.ajustesIA}</p>
                  </div>
                )}
                <button onClick={() => setActiveTab('entreno')} className="btn-secondary">
                  Ver Detalles
                </button>
              </div>
            )}
          </div>
        )}

        {/* ENTRENAMIENTOS */}
        {activeTab === 'entreno' && entreno && (
          <div className="section">
            <h2>{entreno.titulo}</h2>
            
            <div className="entreno-detalle">
              <div className="entreno-info">
                <span>{entreno.duracion}</span>
                <span>{entreno.volumen}</span>
                <span>{entreno.intensidad}%</span>
              </div>

              <h3>1️⃣ Calentamiento ({entreno.calentamiento.distancia})</h3>
              <ul>
                {entreno.calentamiento.ejercicios.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>

              <h3>2️⃣ Preset ({entreno.preset.distancia})</h3>
              <p>{entreno.preset.series}</p>
              <p className="meta">Descanso: {entreno.preset.descanso}"</p>

              <h3>3️⃣ Set Principal - USRPT ({entreno.setPrincipal.distancia})</h3>
              <p><strong>{entreno.setPrincipal.serie}</strong></p>
              <p className="meta">Objetivo: {entreno.setPrincipal.objetivo}</p>
              <p className="meta">Intervalo: {entreno.setPrincipal.intervalo}"</p>
              <p className="warning">⚠️ {entreno.setPrincipal.regla}</p>

              <h3>4️⃣ Set Complementario ({entreno.setComplementario.distancia})</h3>
              <p>{entreno.setComplementario.serie}</p>

              <h3>5️⃣ Enfriamiento ({entreno.enfriamiento.distancia})</h3>
              <ul>
                {entreno.enfriamiento.ejercicios.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>

              <p className="total"><strong>TOTAL: {entreno.total}</strong></p>

              <button onClick={() => setActiveTab('feedback')} className="btn-primary">
                Reportar Feedback Post-Entreno
              </button>
            </div>
          </div>
        )}

        {/* FEEDBACK */}
        {activeTab === 'feedback' && (
          <div className="section">
            <h2>Post-Entreno Feedback</h2>
            
            <div className="form-group">
              <label>Cumplimiento (%)</label>
              <input 
                type="range" 
                min="0" 
                max="120" 
                value={feedback.cumplimiento}
                onChange={(e) => setFeedback({...feedback, cumplimiento: e.target.value})}
                className="slider"
              />
              <p className="value">{feedback.cumplimiento}%</p>
            </div>

            <div className="form-group">
              <label>Tiempos Reales (ej: 1:16 / 1:17)</label>
              <input 
                type="text"
                placeholder="Ingresa tiempos"
                value={feedback.tiempos}
                onChange={(e) => setFeedback({...feedback, tiempos: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>¿Cómo te sentiste?</label>
              <div className="sensation-buttons">
                {['excelente', 'bien', 'cansado', 'fatiga'].map(s => (
                  <button
                    key={s}
                    className={`sensation-btn ${feedback.sensacion === s ? 'active' : ''}`}
                    onClick={() => setFeedback({...feedback, sensacion: s})}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Notas</label>
              <textarea
                placeholder="Molestias, observaciones..."
                value={feedback.notas}
                onChange={(e) => setFeedback({...feedback, notas: e.target.value})}
              />
            </div>

            <button 
              onClick={guardarFeedback} 
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Analizando con IA...' : 'Guardar Feedback y Analizar'}
            </button>

            {recomendaciones && (
              <div className="ai-response">
                <h3>🤖 Análisis IA</h3>
                <p><strong>Análisis:</strong> {recomendaciones.analisis}</p>
                <p><strong>Próxima semana:</strong> {recomendaciones.ajustes_proxima_semana}</p>
                <p><strong>Nutrición:</strong> {recomendaciones.recomendaciones_nutricion}</p>
                {recomendaciones.alerta_medica && (
                  <p className="alert"><strong>⚠️ Alerta:</strong> {recomendaciones.alerta_medica}</p>
                )}
                <p><strong>Proyección:</strong> {recomendaciones.proyeccion_peso}</p>
              </div>
            )}
          </div>
        )}

        {/* NUTRICIÓN */}
        {activeTab === 'nutricion' && (
          <div className="section">
            <h2>Plan Nutricional</h2>
            
            <button 
              onClick={obtenerNutricion}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Generando con IA...' : 'Obtener Plan Personalizado'}
            </button>

            {recomendaciones && recomendaciones.distribucion && (
              <div className="nutricion-plan">
                <h3>Plan de {recomendaciones.calorias_diarias} Kcal/día</h3>
                <p>Proteína: {recomendaciones.proteina_gramos}g</p>
                
                <div className="comidas">
                  <div className="comida">
                    <strong>Desayuno</strong>
                    <p>{recomendaciones.distribucion.desayuno}</p>
                  </div>
                  <div className="comida">
                    <strong>Merienda AM</strong>
                    <p>{recomendaciones.distribucion.merienda_am}</p>
                  </div>
                  <div className="comida">
                    <strong>Almuerzo</strong>
                    <p>{recomendaciones.distribucion.almuerzo}</p>
                  </div>
                  <div className="comida">
                    <strong>Merienda PM</strong>
                    <p>{recomendaciones.distribucion.merienda_pm}</p>
                  </div>
                  <div className="comida">
                    <strong>Cena</strong>
                    <p>{recomendaciones.distribucion.cena}</p>
                  </div>
                </div>

                <h3>Recomendaciones</h3>
                <ul>
                  {recomendaciones.recomendaciones?.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
