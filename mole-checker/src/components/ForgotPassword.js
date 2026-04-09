import React, { useState } from 'react';
import './ForgotPassword.css';


const ForgotPassword = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Reset hasła dla:", email);
        
        setIsSent(true);
    };

    return (
        <div className="forgot-container">
            <button className="back-arrow" onClick={onBack}>← Wróć</button>

            <div className="forgot-form-wrapper">
                {!isSent ? (
                    <form className="forgot-form" onSubmit={handleSubmit}>
                        <h2 className="forgot-title">Resetuj hasło</h2>
                        <p className="forgot-subtitle">
                            Wpisz swój adres e-mail, a wyślemy Ci instrukcje resetowania hasła.
                        </p>

                        <input 
                            type="email"
                            placeholder="Twój adres e-mail"
                            className="forgot-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button type="submit" className="forgot-submit-btn">
                            Wyślij instrukcje
                        </button>
                    </form>
                ) : (
                    <div className="forgot-success">
                        <div className="success-icon">✓</div>
                        <h2>Sprawdź e-mail</h2>
                        <p>Jeśli konto istnieje, wysłaliśmy instrukcje na: <strong>{email}</strong></p>
                        <button className="forgot-submit-btn" onClick={onBack}>
                            Powrót do logowania
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;