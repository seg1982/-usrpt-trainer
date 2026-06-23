import { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/colors.css';
import Dashboard from './components/Dashboard/Dashboard';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import LoginScreen from './components/Auth/LoginScreen';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
    const [isOnboarding, setIsOnboarding] = useState(false);
      const [loading, setLoading] = useState(true);

        // Verificar si hay usuario en localStorage
          useEffect(() => {
              const savedUser = localStorage.getItem('usrpt_user');
                  if (savedUser) {
                        try {
                                const user = JSON.parse(savedUser);
                                        setCurrentUser(user);
                                                setIsOnboarding(false);
                                                      } catch (error) {
                                                              console.error('Error loading user:', error);
                                                                      localStorage.removeItem('usrpt_user');
                                                                            }
                                                                                }
                                                                                    setLoading(false);
                                                                                      }, []);

                                                                                        const handleLogin = (userData) => {
                                                                                            setCurrentUser(userData);
                                                                                                setIsOnboarding(true);
                                                                                                  };

                                                                                                    const handleOnboardingComplete = (userData) => {
                                                                                                        const userWithOnboarding = {
                                                                                                              ...currentUser,
                                                                                                                    ...userData,
                                                                                                                          onboardingCompleted: true,
                                                                                                                                createdAt: new Date().toISOString(),
                                                                                                                                    };
                                                                                                                                        setCurrentUser(userWithOnboarding);
                                                                                                                                            localStorage.setItem('usrpt_user', JSON.stringify(userWithOnboarding));
                                                                                                                                                setIsOnboarding(false);
                                                                                                                                                  };
                                                                                                                                                  
                                                                                                                                                    const handleLogout = () => {
                                                                                                                                                        setCurrentUser(null);
                                                                                                                                                            setIsOnboarding(false);
                                                                                                                                                                localStorage.removeItem('usrpt_user');
                                                                                                                                                                  };
                                                                                                                                                                  
                                                                                                                                                                    if (loading) {
                                                                                                                                                                        return <div className="loading-container">Cargando USRPT Trainer...</div>;
                                                                                                                                                                          }
                                                                                                                                                                          
                                                                                                                                                                            // Sin usuario: Login
                                                                                                                                                                              if (!currentUser) {
                                                                                                                                                                                  return <LoginScreen onLogin={handleLogin} />;
                                                                                                                                                                                    }
                                                                                                                                                                                    
                                                                                                                                                                                      // Usuario con onboarding incompleto
                                                                                                                                                                                        if (isOnboarding) {
                                                                                                                                                                                            return (
                                                                                                                                                                                                  <OnboardingFlow
                                                                                                                                                                                                          userData={currentUser}
                                                                                                                                                                                                                  onComplete={handleOnboardingComplete}
                                                                                                                                                                                                                          onCancel={handleLogout}
                                                                                                                                                                                                                                />
                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                        // Usuario con onboarding completo: Dashboard
                                                                                                                                                                                                                                          return (
                                                                                                                                                                                                                                              <div className="app-container">
                                                                                                                                                                                                                                                    <Dashboard user={currentUser} onLogout={handleLogout} />
                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                          }
