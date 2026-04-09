import React, { useState } from 'react';
import axios from 'axios'; 
import './RegistryPageTemp.css';


const RegisterPage = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/api/auth/register', {
                username: login, 
                email: email,
                password: password
            });
            onRegisterSuccess(); 
        } catch (error) {
            alert("Błąd rejestracji: " + (error.response?.data || "Serwer nie odpowiada"));
        }
    };

    return (
        <div className="register-container">
         
            <button className="back-arrow" onClick={onSwitchToLogin}>
                ← Wróć
            </button>

            <form className="register-form" onSubmit={handleRegister}>
                <h2 className="register-title">Stwórz konto</h2>
                <p className="register-subtitle">Dołącz do MoleCheckerAI</p>

                <div className="input-group">
                    <input 
                        type="text"
                        placeholder="Login (Nazwa użytkownika)"
                        className="register-input"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                    <input 
                        type="email"
                        placeholder="Adres Email"
                        className="register-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        placeholder="Hasło"
                        className="register-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="register-submit-btn">
                    Zarejestruj się
                </button>

                <div className="register-footer">
                    <p>
                        Masz już konto? 
                        <span className="footer-link" onClick={onSwitchToLogin}> Zaloguj się</span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;