import React, { useState, useEffect } from 'react';
import BookList from './components/booklist';

export default function App(){
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);

    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Corner Menu */}
      <div className="corner-menu">
        <button
          className="corner-menu-toggle"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={`hamburger ${menuOpen ? 'active' : ''}`}></span>
        </button>
        
        <div className={`corner-menu-content ${menuOpen ? 'open' : ''}`}>
          <button
            className="corner-menu-item"
            onClick={toggleDarkMode}
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
          >
            {darkMode ? '☀' : '☽'}
            <span>{darkMode ? 'Claro' : 'Oscuro'}</span>
          </button>
          <button className="corner-menu-item" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            ↑
            <span>Arriba</span>
          </button>
          <button className="corner-menu-item" onClick={() => setMenuOpen(false)}>
            ×
            <span>Cerrar</span>
          </button>
        </div>
      </div>

      <div className="app-container">
        <div className="page-shell">
          <header className="main-header">
            <div className="header-content">
              <h1 className="header-title">Biblioteca Digital</h1>
              <p className="header-subtitle">
                Gestión moderna de catálogos bibliográficos
              </p>
            </div>
          </header>

          <BookList/>
        </div>
      </div>
    </>
  );
}
