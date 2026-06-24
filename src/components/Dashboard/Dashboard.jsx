import { useState } from 'react';

export default function Dashboard({ user, onLogout }) {
  const [view, setView] = useState('overview');
  
  return (
    <div style={{ minHeight: '100vh', background: '#0A1929', color: 'white' }}>
      <header style={{ background: 'linear-gradient(135deg, #1D5B7D 0%, #0F9E8F 100%)', padding: '24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '40px', margin: '0' }}>🏊 USRPT TRAINER</h1>
        <p style={{ margin: '10px 0', opacity: 0.9 }}>Nacional 100m Mariposa - 24 Julio 2026</p>
        <button onClick={onLogout} style={{ marginTop: '12px', padding: '8px 20px', background: '#D85A30', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cerrar Sesión</button>
      </header>

      <nav style={{ display: 'flex', background: '#0F3D52', borderBottom: '3px solid #0F9E8F' }}>
        {['overview', 'entrenamientos', 'feedback', 'nutrición'].map(item => (
          <button key={item} onClick={() => setView(item)} style={{ flex: 1, padding: '16px', background: view === item ? '#0F9E8F' : 'transparent', color: 'white', border: 'none', cursor: 'pointer', fontWeight: view === item ? 'bold' : 'normal', fontSize: '14px', textTransform: 'uppercase' }}>
            {item === 'overview' ? 'Dashboard' : item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>

      <main style={{ padding: '32px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        {view === 'overview' && (
          <>
            <h2 style={{ color: '#0F9E8F', marginBottom: '32px', fontSize: '28px' }}>📊 Estado Actual</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div style={{ background: 'linear-gradient(135deg, #1D5B7D, #0F9E8F)', padding: '24px', borderRadius: '12px' }}>
                <p style={{ opacity: 0.8, fontSize: '12px', marginBottom: '10px' }}>⚖️ PESO</p>
                <p style={{ fontSize: '40px', fontWeight: 'bold', color: '#00FFFF' }}>117.8 kg</p>
                <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>Objetivo: 105 kg</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #0F9E8F, #06D6D0)', padding: '24px', borderRadius: '12px' }}>
                <p style={{ opacity: 0.8, fontSize: '12px', marginBottom: '10px' }}>⏰ DÍAS</p>
                <p style={{ fontSize: '40px', fontWeight: 'bold' }}>38</p>
                <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>24 Julio 2026</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #1F4788, #0F7C8F)', padding: '24px', borderRadius: '12px' }}>
                <p style={{ opacity: 0.8, fontSize: '12px', marginBottom: '10px' }}>📈 FASE</p>
                <p style={{ fontSize: '40px', fontWeight: 'bold', color: '#0F9E8F' }}>SEMANA 1</p>
                <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>Base 75-80%</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #D85A30, #FF7F50)', padding: '24px', borderRadius: '12px' }}>
                <p style={{ opacity: 0.8, fontSize: '12px', marginBottom: '10px' }}>🎯 PRÓXIMO</p>
                <p style={{ fontSize: '40px', fontWeight: 'bold' }}>LUNES</p>
                <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>7:00 AM</p>
              </div>
            </div>
            <div style={{ background: '#0F3D52', padding: '24px', borderRadius: '12px' }}>
              <p style={{ color: '#0F9E8F', marginBottom: '16px', fontWeight: 'bold' }}>📊 Progreso</p>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', height: '20px', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #0F9E8F, #D85A30)', height: '100%', width: '42%' }}></div>
              </div>
              <p style={{ color: '#AAA', fontSize: '13px', marginTop: '8px' }}>42% completado</p>
            </div>
          </>
        )}

        {view === 'entrenamientos' && (
          <>
            <h2 style={{ color: '#0F9E8F', marginBottom: '32px', fontSize: '28px' }}>🏊 Plan de Entrenamientos</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ background: '#0F3D52', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #0F9E8F' }}>
                <h3 style={{ color: '#0F9E8F', marginBottom: '12px' }}>Viernes 28 Junio</h3>
                <p style={{ marginBottom: '12px' }}>🏊 8x50m Mariposa @ 42 seg</p>
                <p style={{ marginBottom: '12px' }}>⏱️ Descanso: 90 segundos</p>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>📍 Fase: BASE - Intensidad 75-80%</p>
              </div>
              <div style={{ background: '#0F3D52', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #D85A30' }}>
                <h3 style={{ color: '#D85A30', marginBottom: '12px' }}>Lunes 1 Julio</h3>
                <p style={{ marginBottom: '12px' }}>🏊 6x100m Mariposa @ 1:25</p>
                <p style={{ marginBottom: '12px' }}>⏱️ Descanso: 120 segundos</p>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>📍 Fase: BASE - Intensidad 75-80%</p>
              </div>
              <div style={{ background: '#0F3D52', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #0F9E8F', opacity: 0.6 }}>
                <h3 style={{ color: '#AAA', marginBottom: '12px' }}>Viernes 5 Julio</h3>
                <p style={{ marginBottom: '12px' }}>🏊 Próximamente...</p>
              </div>
            </div>
          </>
        )}

        {view === 'feedback' && (
          <>
            <h2 style={{ color: '#0F9E8F', marginBottom: '32px', fontSize: '28px' }}>💬 Tu Feedback</h2>
            <div style={{ background: '#0F3D52', padding: '32px', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '48px', marginBottom: '20px' }}>📝</p>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>¿Cómo te sentiste en tu último entrenamiento?</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginTop: '30px' }}>
                {['Excelente', 'Bien', 'Normal', 'Cansado'].map(level => (
                  <button key={level} style={{ padding: '16px', background: '#1D5B7D', color: 'white', border: '2px solid #0F9E8F', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s ease' }} onMouseOver={(e) => e.target.style.background = '#0F9E8F'} onMouseOut={(e) => e.target.style.background = '#1D5B7D'}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {view === 'nutrición' && (
          <>
            <h2 style={{ color: '#0F9E8F', marginBottom: '32px', fontSize: '28px' }}>🥗 Plan de Nutrición</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ background: '#0F3D52', padding: '24px', borderRadius: '12px' }}>
                <h3 style={{ color: '#0F9E8F', marginBottom: '12px' }}>🌅 Desayuno</h3>
                <p style={{ marginBottom: '8px' }}>• Avena con plátano y almendras</p>
                <p style={{ marginBottom: '8px' }}>• Café con leche desnatada</p>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>Calorías: 450 kcal</p>
              </div>
              <div style={{ background: '#0F3D52', padding: '24px', borderRadius: '12px' }}>
                <h3 style={{ color: '#0F9E8F', marginBottom: '12px' }}>🥗 Almuerzo</h3>
                <p style={{ marginBottom: '8px' }}>• Pechuga de pollo a la plancha</p>
                <p style={{ marginBottom: '8px' }}>• Arroz integral + verduras</p>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>Calorías: 650 kcal</p>
              </div>
              <div style={{ background: '#0F3D52', padding: '24px', borderRadius: '12px' }}>
                <h3 style={{ color: '#0F9E8F', marginBottom: '12px' }}>🍎 Merienda</h3>
                <p style={{ marginBottom: '8px' }}>• Proteína en polvo con agua</p>
                <p style={{ marginBottom: '8px' }}>• Manzana verde</p>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>Calorías: 250 kcal</p>
              </div>
              <div style={{ background: '#0F3D52', padding: '24px', borderRadius: '12px' }}>
                <h3 style={{ color: '#0F9E8F', marginBottom: '12px' }}>🍽️ Cena</h3>
                <p style={{ marginBottom: '8px' }}>• Salmón a la parrilla</p>
                <p style={{ marginBottom: '8px' }}>• Batata cocida + brócoli</p>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>Calorías: 550 kcal</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
