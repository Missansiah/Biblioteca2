import React, { useState, useEffect } from 'react';
import BookList from './components/booklist';

export default function App(){
  const [darkMode, setDarkMode] = useState(false);

  // Cargar preferencia de modo oscuro desde localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Toggle modo oscuro
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

  // Colores adaptativos según el modo
  const badgeStyle = {
    backgroundColor: darkMode ? 'rgba(139, 180, 232, 0.25)' : 'rgba(162, 197, 242, 0.3)',
    color: darkMode ? '#f0f0f0' : '#5b5b5b'
  };

  const textStyle = {
    margin: 0,
    fontSize: '1rem',
    color: darkMode ? '#d0d0d0' : '#5b5b5b'
  };

  return (
    <>
      <button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
        title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className="app-container">
        <div className="page-shell">
          <header className="hero-header card-surface" style={{ textAlign: 'center', padding: 32 }}>
            <span className="badge" style={badgeStyle}>
              📚 Catálogo interactivo
            </span>
            <h1 style={{ marginTop: 16, marginBottom: 8, fontSize: '2.5rem' }}>Biblioteca Digital</h1>
            <p style={textStyle}>
              Gestiona tu colección con búsquedas instantáneas, filtros dinámicos y un panel de edición amigable.
            </p>
          </header>
          <BookList/>
        </div>
      </div>
    </>
  );
}
