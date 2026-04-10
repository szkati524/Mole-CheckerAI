import React, { useState } from 'react';
import axios from 'axios';
import './Options.css';

const Options = ({ onLogout }) => {
    const [emailData, setEmailData] = useState({ newEmail: '' });
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
    const [deleteData, setDeleteData] = useState({ password: '', confirmPassword: '' });
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
            setPasswordData({ oldPassword: '', newPassword: '' });
        } catch (err) {
            setMessage({ text: err.response?.data?.message || 'Błąd zmiany hasła', isError: true });
        }
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        if (deleteData.password !== deleteData.confirmPassword) {
            setMessage({ text: 'Hasła do usunięcia konta nie są identyczne!', isError: true });
            return;
        }
        if (!window.confirm("UWAGA: Czy na pewno chcesz trwale usunąć konto? Tej operacji nie da się cofnąć.")) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:8081/api/users/delete-account', 
                { password: deleteData.password, confirmPassword: deleteData.confirmPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(response.data.message);
            if (onLogout) onLogout(); 
        } catch (err) {
            setMessage({ text: err.response?.data?.message || 'Błąd podczas usuwania konta', isError: true });
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

                    <hr />

                   
                    <form className="options-section danger-zone-wrapper" onSubmit={handleDeleteAccount}>
                        <h3 className="danger-title">Strefa niebezpieczna</h3>
                        <p className="danger-text">Wprowadź hasło dwukrotnie, aby potwierdzić usunięcie konta.</p>
                        <input 
                            type="password" 
                            placeholder="Hasło"
                            value={deleteData.password}
                            onChange={(e) => setDeleteData({ ...deleteData, password: e.target.value })}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Powtórz hasło"
                            value={deleteData.confirmPassword}
                            onChange={(e) => setDeleteData({ ...deleteData, confirmPassword: e.target.value })}
                            required
                        />
                        <button type="submit" className="btn-danger-action">
                            USUŃ KONTO NA ZAWSZE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Options;