import React, { useEffect, useState, useRef } from 'react'; 
import axios from 'axios';
import './ConfirmEmail.css'; 

const ConfirmEmail = ({ onBackToLogin }) => {
    const [status, setStatus] = useState('loading'); 
   
    const hasCalled = useRef(false);

    useEffect(() => {
    
        if (hasCalled.current) return;

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
          
            hasCalled.current = true; 

            axios.get(`http://localhost:8081/api/auth/confirm-email?token=${token}`)
                .then(() => {
                    console.log("Token potwierdzony pomyślnie");
                    setStatus('success');
                })
                .catch((error) => {
                    console.error("Błąd podczas weryfikacji tokenu:", error.response?.data);
                    setStatus('error');
                });
        } else {
            setStatus('error');
        }
    }, []);

    return (
        <div className="options-page-wrapper">
            <div className="options-container" style={{ textAlign: 'center' }}>
                {status === 'loading' && <h2>Weryfikacja tokenu...</h2>}
                
                {status === 'success' && (
                    <div className="fade-in">
                        <h2 style={{ color: '#00d2ff' }}>Sukces! ✅</h2>
                        <p>Twój email został zmieniony. Możesz się teraz zalogować używając nowego adresu.</p>
                        <button className="btn-save" onClick={onBackToLogin}>Przejdź do logowania</button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="fade-in">
                        <h2 style={{ color: '#ff4b2b' }}>Błąd! ❌</h2>
                        <p>Link jest nieaktywny, został już wykorzystany lub wygasł.</p>
                        <button className="btn-save" onClick={onBackToLogin}>Wróć do strony głównej</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmEmail;