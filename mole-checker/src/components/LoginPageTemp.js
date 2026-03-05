import React, { useState } from 'react';
import './LoginPageTemp.css';

const LoginPage = ({ onBack, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logowanie:", email, password);
        //dodać Fetch z Spring Api
    };
    return (
        <div className="Login-container">
            <button className="back-button" onClick={onBack}>← Return </button>

            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Zaloguj się</h2>

                <input 
                type="email"
                placeholder="Email"
                className="Login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input 
                type="password"
                placeholder="Hasło"
                className="Login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit" className="login-submit-btn">
                    Zatwierdz
                </button>
            </form>
        </div>
    );
};
export default LoginPage;