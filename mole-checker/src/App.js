import React, { useState, useEffect } from 'react'; 
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPageTemp';
import RegisterPage from './components/RegistryPageTemp';
import Dashboard from './components/Dashboard';
import ConfirmEmail from './components/ConfirmEmail';

function App() {
    const [view, setView] = useState('main'); 

    
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
                    onLoginSuccess={(token) => {
                        localStorage.setItem('token', token);
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
                <Dashboard onLogout={() => {
                    localStorage.removeItem('token');
                    setView('main');
                }} />
            )}
        </div>
    );
}

export default App;