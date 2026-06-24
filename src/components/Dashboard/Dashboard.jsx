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
        {['Overview', 'Entrenamientos', 'Feedback', 'Nutrición'].map(item => (
          <button key={item} onClick={() => setView(item.toLowerCase())} style={{ flex: 1, padding: '16px', background: view === item.toLowerCase() ? '#0F9E8F' : 'transparent', color: 'white', border: 'none', cursor: 'pointer', fontWeight: view === item.toLowerCase() ? 'bold' : 'normal', fontSize: '14px', textTransform: 'uppercase' }}>{item}</button>
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
        {view !== 'overview' && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2 style={{ color: '#0F9E8F', marginBottom: '20px' }}>Sección: {view.toUpperCase()}</h2>
            <p style={{ opacity: 0.7 }}>Próximamente...</p>
          </div>
        )}
      </main>
    </div>
  );
}
