import React, { useState, useEffect } from 'react'; 
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPageTemp';
import RegisterPage from './components/RegistryPageTemp';
import Dashboard from './components/Dashboard';
import ConfirmEmail from './components/ConfirmEmail';
import AdminPanel from './components/AdminPanel'; 
function App() {
    const [view, setView] = useState('main'); 
    const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'USER');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('token')) {
            setView('confirm-email');
        }
    }, []);

    const handleBackToLogin = () => {
        window.history.pushState({}, document.title, "/");
        setView('login');
    };

    return (
        <div className="App">
            {view === 'confirm-email' && (
                <ConfirmEmail onBackToLogin={handleBackToLogin} />
            )}

            {view === 'main' && (
                <MainPage 
                    onLogin={() => setView('login')} 
                    onRegistry={() => setView('register')} 
                />
            )}

            {view === 'login' && (
                <LoginPage 
                    onLoginSuccess={(token, role) => {
                        localStorage.setItem('token', token);
                        localStorage.setItem('role', role); 
                        setUserRole(role);
                        setView('dashboard'); 
                    }} 
                    onSwitchToRegister={() => setView('register')} 
                    onBack={() => setView('main')}
                />
            )}

            {view === 'register' && (
                <RegisterPage 
                    onRegisterSuccess={() => setView('login')} 
                    onSwitchToLogin={() => setView('login')} 
                    onBack={() => setView('main')}
                />
            )}

            {view === 'dashboard' && (
                <Dashboard 
                    userRole={userRole}
                    onLogout={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                        setView('main');
                    }}
                    onOpenAdmin={() => setView('admin-panel')}
                />
            )}

            {view === 'admin-panel' && (
                <AdminPanel onBack={() => setView('dashboard')} />
            )}
        </div>
    );
}

export default App;