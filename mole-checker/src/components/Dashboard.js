import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8081/api/history', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(response.data);
        } catch (error) {
            console.error("Błąd pobierania historii", error);
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Wybierz plik!");

        setLoading(true);
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', file);

        try {
          
            const response = await axios.post('http://localhost:8081/api/scan', formData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data.message || response.data);
            fetchHistory(); 
        } catch (error) {
            alert("Błąd podczas analizy: " + (error.response?.data || "Serwer nie odpowiada"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-wrapper">
         
            <div className="top-right-nav">
                <button className="nav-btn" onClick={() => alert('Opcje użytkownika')}>Opcje</button>
                <button className="nav-btn btn-logout" onClick={onLogout}>Wyloguj się</button>
            </div>

        
            <aside className="sidebar-history">
                <h2 className="sidebar-title">Historia skanów</h2>
                <div className="history-list">
                    {history.length > 0 ? history.map((item, index) => (
                        <div key={index} className="history-item">
                            <small>{new Date(item.date).toLocaleDateString()}</small>
                            <p>{item.result}</p>
                        </div>
                    )) : (
                        <p style={{opacity: 0.5}}>Brak historii</p>
                    )}
                </div>
            </aside>

           
            <main className="main-scanner-area">
                <div className="scanner-box">
                    <h1 className="scanner-logo">MoleCheckerAI</h1>
                    <p className="scanner-subtitle">Prześlij zdjęcie fragmentu skóry do analizy AI</p>
                    
                    <div className="upload-container">
                        <input 
                            type="file" 
                            id="file-input"
                            onChange={(e) => setFile(e.target.files[0])} 
                            hidden
                        />
                        <label htmlFor="file-input" className="file-label">
                            {file ? file.name : "Wybierz zdjęcie"}
                        </label>
                    </div>

                    <button 
                        className="analyze-button" 
                        onClick={handleUpload} 
                        disabled={loading || !file}
                    >
                        {loading ? <span className="loader">Analizowanie...</span> : "Rozpocznij badanie"}
                    </button>

                    {result && (
                        <div className="result-display fade-in">
                            <strong>Wynik: </strong> {result}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;