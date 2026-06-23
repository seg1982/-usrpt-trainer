import { useState, useEffect } from 'react';
import '../Dashboard/Dashboard.css';
import CountdownCard from './CountdownCard';
import UpcomingWorkout from './UpcomingWorkout';
import WeeklyPlan from '../Training/WeeklyPlan';

export default function Dashboard({ user, onLogout }) {
  const [daysUntilNational, setDaysUntilNational] = useState(0);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [upcomingWorkout, setUpcomingWorkout] = useState(null);
  const [viewMode, setViewMode] = useState('overview');

  useEffect(() => {
    const nationalDate = new Date('2026-07-24');
    const today = new Date();
    const diff = Math.ceil((nationalDate - today) / (1000 * 60 * 60 * 24));
    setDaysUntilNational(Math.max(0, diff));
}, []);

  useEffect(() => {
    setUpcomingWorkout({
      day: 'Viernes 26 Junio',
      type: 'Natación',
      event: '50m Butterfly',
      description: '6x50m @ 38s, descanso 40"',
      completed: false,
});
}, []);

  const handleSelectDays = () => {
    setViewMode('selectdays');
  };

  const handleViewWeekPlan = () => {
    setViewMode('weekplan');
  };

  const handleBackToOverview = () => {
    setViewMode('overview');
  };

  if (viewMode === 'weekplan') {
    return <WeeklyPlan user={user} onBack={handleBackToOverview} />;
  }

  return (
        <div className="dashboard">
          <header className="dashboard-header">
            <div className="header-content">
              <div className="logo-section">
                <h1 className="logo-title">USRPT</h1>
                <p className="logo-subtitle">Trainer</p>
              </div>
              <div className="header-user">
                <span className="user-name">{user.nombre || 'Nadador'}</span>
                <button className="logout-btn" onClick={onLogout} title="Cerrar sesión">
                  <i className="ti ti-logout" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </header>

          <main className="dashboard-main">
            <CountdownCard days={daysUntilNational} />

            <div className="quick-stats">
              <div className="stat-card">
                <p className="stat-label">Próximo entrenamiento</p>
            <p className="stat-value">{upcomingWorkout?.day || 'No programado'}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Entrenamientos esta semana</p>
            <p className="stat-value">3 planificados</p>
          </div>
        </div>

{upcomingWorkout && (
          <UpcomingWorkout workout={upcomingWorkout} />
        )}

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={handleViewWeekPlan}>
            <i className="ti ti-calendar" aria-hidden="true"></i>
            Ver Plan Semanal
          </button>
          <button className="btn btn-secondary" onClick={handleSelectDays}>
            <i className="ti ti-calendar-check" aria-hidden="true"></i>
            Seleccionar Días
          </button>
        </div>

        <div className="info-section">
          <h3 className="section-title">Tu Objetivo</h3>
          <div className="info-card">
            <p><strong>Evento:</strong> Nacional 100m Mariposa</p>
                <p><strong>Fecha:</strong> 24 Julio 2026</p>
                <p><strong>Tiempo objetivo:</strong> 1:30</p>
                <p><strong>Mejor tiempo registrado:</strong> 1:28 (LC)</p>
              </div>
            </div>

            <div className="info-section">
              <h3 className="section-title">Plan USRPT - Fase Actual</h3>
              <div className="info-card">
                <p><strong>Semana 1 - Base:</strong> 75-80% intensidad</p>
                <p>Diagnóstico de técnica y capacidad aeróbica.</p>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
              Próximas fases se ajustarán según feedback.
            </p>
          </div>
        </div>
          </main>

          <footer className="dashboard-footer">
            <button className="footer-btn active">
              <i className="ti ti-home" aria-hidden="true"></i>
              <span>Inicio</span>
            </button>
            <button className="footer-btn">
              <i className="ti ti-calendar" aria-hidden="true"></i>
              <span>Plan</span>
            </button>
            <button className="footer-btn">
              <i className="ti ti-chart-bar" aria-hidden="true"></i>
              <span>Progreso</span>
            </button>
            <button className="footer-btn">
              <i className="ti ti-settings" aria-hidden="true"></i>
              <span>Perfil</span>
            </button>
          </footer>
        </div>
      );
}
