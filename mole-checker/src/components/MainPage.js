import React from 'react';
import './MainPage.css';

const MainPage = ({ onLogin,onRegistry }) => {
    return (
        <div className="main-page-container">
                <h1 className="logo-text">MoleCheckerAI</h1>
         <div className="content-wrapper">
            <button className="main-page-button slide-in-left" onClick={onLogin}>
             Zaloguj się
             </button>
           
            <button className="main-page-button slide-in-right" onClick={onRegistry}>
                Zarejestruj się
            </button>
        
            </div>
        </div>
    );
};
export default MainPage;