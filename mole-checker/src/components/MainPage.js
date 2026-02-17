import React from 'react';
import './MainPage.css';

const MainPage = ({ onStart }) => {
    return (
        <div className="main-page-container">
                <h1 className="logo-text">MoleCheckerAI</h1>
         <div className="content-wrapper">
            <button className="main-page-button" onClick={onStart}>
             skorzystaj z modelu
            </button>
            </div>
        </div>
    );
};
export default MainPage;