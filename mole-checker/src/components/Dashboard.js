import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Options from './Options'; 
import './Dashboard.css';


const Dashboard = ({ onLogout, userRole, onOpenAdmin }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [selectedScan, setSelectedScan] = useState(null);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8081/api/history', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Błąd pobierania historii", error);
            setHistory([]);
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
            
            setTimeout(() => {
                fetchHistory();
            }, 1000);

        } catch (error) {
            alert("Błąd: " + (error.response?.data?.message || "Problem z serwerem"));
        } finally {
            setLoading(false);
        }
    };

    const resetScanner = () => {
        setFile(null);
        setResult(null);
        setSelectedScan(null);
    };

    return (
        <div className="dashboard-wrapper">
            
            <div className="top-right-nav">
            
                {userRole === 'ADMIN' && (
                    <button 
                        onClick={onOpenAdmin} 
                        className="nav-btn admin-btn"
                        style={{ backgroundColor: '#ffc107', color: '#000', fontWeight: 'bold' }}
                    >
                        🛡️ Panel Admina
                    </button>
                )}
                
                <button className="nav-btn" onClick={() => setShowOptions(true)}>Opcje</button>
                <button className="nav-btn btn-logout" onClick={onLogout}>Wyloguj się</button>
            </div>

            <aside className="sidebar-history">
                <h2 className="sidebar-title">Historia skanów</h2>
                <div className="history-list">
                    {history.length > 0 ? history.map((item, index) => (
                        <div 
                            key={index} 
                            className={`history-item ${selectedScan === item ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedScan(item);
                                setResult(null);
                            }}
                        >
                            <small>{item.localDateTime ? new Date(item.localDateTime).toLocaleString() : 'Brak daty'}</small>
                            <p>{item.aiResult ? item.aiResult.substring(0, 30) : "Brak opisu"}...</p>
                        </div>
                    )) : (
                        <p style={{opacity: 0.5}}>Brak zapisanych skanów</p>
                    )}
                </div>
            </aside>

            <main className="main-scanner-area">
                <div className="scanner-box">
                    {selectedScan ? (
                        <div className="fade-in">
                            <h2 style={{color: '#007bff'}}>Archiwalny wynik</h2>
                            <p style={{fontSize: '12px', opacity: 0.6}}>{new Date(selectedScan.localDateTime).toLocaleString()}</p>
                            <div className="result-display">
                                {selectedScan.aiResult}
                            </div>
                            <button className="nav-btn" style={{marginTop: '20px'}} onClick={resetScanner}>
                                Wróć do skanera
                            </button>
                        </div>
                    ) : (
                        <div className="fade-in">
                            <h1 className="scanner-logo">MoleCheckerAI</h1>
                            <p className="scanner-subtitle">Prześlij zdjęcie fragmentu skóry</p>
                            
                            <div className="upload-container">
                                <input type="file" id="file-input" onChange={(e) => setFile(e.target.files[0])} hidden />
                                <label htmlFor="file-input" className="file-label">
                                    {file ? file.name : "Wybierz zdjęcie"}
                                </label>
                            </div>

                            <button className="analyze-button" onClick={handleUpload} disabled={loading || !file}>
                                {loading ? "Analizowanie..." : "Rozpocznij badanie"}
                            </button>

                            {result && (
                                <div className="fade-in">
                                    <div className="result-display" style={{marginTop: '20px'}}>
                                        <strong>Wynik: </strong> {result}
                                    </div>
                                    <button 
                                        className="nav-btn" 
                                        style={{marginTop: '15px', width: '100%', borderColor: '#007bff'}}
                                        onClick={resetScanner}
                                    >
                                        Nowe badanie
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {showOptions && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-btn" onClick={() => setShowOptions(false)}>×</button>
                        <Options onLogout={onLogout}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;