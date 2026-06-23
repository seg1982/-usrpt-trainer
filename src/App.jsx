import { useState, useEffect } from 'react';
import './styles/colors.css';
import './styles/App.css';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('usrpt_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('usrpt_user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    const userData = {
      id: '1',
      nombre: 'Alfredo',
      email: 'alfredo@sofritocreativo.com',
      competencia: 'Nacional 100m Mariposa',
      fecha_competencia: '2026-07-24',
      tiempo_objetivo: '1:30',
      mejor_tiempo: '1:28'
    };
    setCurrentUser(userData);
    localStorage.setItem('usrpt_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('usrpt_user');
  };

  if (loading) {
    return <div className="loading-container">Cargando USRPT Trainer...</div>;
  }

  if (!currentUser) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1D5B7D 0%, #0F9E8F 100%)' }}>
        <h1 style={{ color: 'white', marginBottom: '20px', fontSize: '48px' }}>🏊 USRPT Trainer</h1>
        <p style={{ color: '#ccc', marginBottom: '40px', fontSize: '18px' }}>App inteligente para tu Nacional 100m Mariposa</p>
        <button onClick={handleLogin} style={{ padding: '15px 40px', fontSize: '16px', background: '#0F9E8F', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          INICIAR SESIÓN
        </button>
        <p style={{ color: '#aaa', marginTop: '30px', fontSize: '14px' }}>IA ajusta entrenamientos según tu feedback</p>
      </div>
    );
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />;
}

export default App;
