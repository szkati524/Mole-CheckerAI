import React, { useState } from 'react';
import axios from 'axios'; 
import './LoginPageTemp.css';


const LoginPage = ({ onLoginSuccess, onSwitchToRegister, onBack }) => {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleLogin = async (e) => {
        if (e) e.preventDefault(); 
        setErrorMessage(''); 

        try {
            const response = await axios.post('http://localhost:8081/api/auth/login', {
                username: username, 
                password: password
            });

            if (response.data.token) {
                onLoginSuccess(response.data.token); 
            }
        } catch (error) {
            // Logujemy błąd tylko raz
            console.error("Błąd logowania:", error.response?.status);
            setErrorMessage("Nieprawidłowy login, email lub hasło ❌");
        }
    };

    return (
        <div className="login-container">
       
            <button className="back-arrow" onClick={onBack}>
                <span className="arrow">←</span> Wróć
            </button>

            <form className="login-form" onSubmit={handleLogin}> 
                <h2 className="login-title">Zaloguj się</h2>

                {errorMessage && (
                    <div className="error-box" style={{
                        color: '#ff4b2b', 
                        backgroundColor: 'rgba(255, 75, 43, 0.1)',
                        padding: '10px',
                        borderRadius: '8px',
                        marginBottom: '15px',
                        fontSize: '14px',
                        border: '1px solid #ff4b2b'
                    }}>
                        {errorMessage}
                    </div>
                )}

                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Login lub Email"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Hasło"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-submit-btn">
                    Zaloguj się
                </button>

                <div className="login-footer">
                    <p>Nie masz konta? <span className="footer-link" onClick={onSwitchToRegister}>Zarejestruj się</span></p>
                    <p className="footer-link small">Zapomniałeś hasła?</p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;