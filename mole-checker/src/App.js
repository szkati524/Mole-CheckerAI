import React, { useState } from 'react';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPageTemp';
import RegisterPage from './components/RegistryPageTemp';
import Dashboard  from './components/Dashboard';
function App() {
    const [view, setView] = useState('main'); 

    return (
        <div className="App">
           
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