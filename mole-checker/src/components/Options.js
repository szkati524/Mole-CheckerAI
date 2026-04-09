import React, { useState } from 'react';
import axios from 'axios';
import './Options.css';

const Options = () => {
    const [emailData, setEmailData] = useState({ newEmail: '' });
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
    const [message, setMessage] = useState({ text: '', isError: false });

    const token = localStorage.getItem('token'); 

    const handleEmailChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/users/request-email-change', 
                { newEmail: emailData.newEmail },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage({ text: response.data.message, isError: false });
        } catch (err) {
            setMessage({ text: err.response?.data?.message || 'Błąd zmiany email', isError: true });
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/users/change-password', 
                passwordData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage({ text: response.data.message, isError: false });
            setPasswordData({ oldPassword: '', newPassword: '' }); // Czyścimy pola
        } catch (err) {
            setMessage({ text: err.response?.data?.message || 'Błąd zmiany hasła', isError: true });
        }
    };

    return (
        
        <div className="options-page-wrapper">
            <div className="options-container">
                <h2>Ustawienia Konta</h2>
                
                {message.text && (
                    <div className={`message ${message.isError ? 'error' : 'success'}`}>
                        {message.text}
                    </div>
                )}

                <div className="options-sections">
                    <form className="options-section" onSubmit={handleEmailChange}>
                        <h3>Zmień adres Email</h3>
                        <input 
                            type="email" 
                            placeholder="Nowy adres email"
                            value={emailData.newEmail}
                            onChange={(e) => setEmailData({ newEmail: e.target.value })}
                            required
                        />
                        <button type="submit" className="btn-save">Wyślij link potwierdzający</button>
                    </form>

                    <hr />

                    <form className="options-section" onSubmit={handlePasswordChange}>
                        <h3>Zmień hasło</h3>
                        <input 
                            type="password" 
                            placeholder="Obecne hasło"
                            value={passwordData.oldPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Nowe hasło"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            required
                        />
                        <button type="submit" className="btn-save">Zaktualizuj hasło</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Options;