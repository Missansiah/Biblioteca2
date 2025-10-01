/**
 * Componente principal de la aplicación Biblioteca Digital
 * Gestiona el tema visual (modo claro/oscuro) y renderiza la estructura principal
 */
import React, { useState, useEffect } from 'react';
import BookList from './components/booklist';

export default function App(){
  // Estado para controlar el modo oscuro (true = oscuro, false = claro)
  const [darkMode, setDarkMode] = useState(false);

  /**
   * Efecto que se ejecuta al montar el componente
   * Recupera la preferencia de tema guardada en localStorage
   * y aplica la clase CSS correspondiente al body
   */
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  /**
   * Alterna entre modo claro y oscuro
   * Guarda la preferencia en localStorage para persistencia
   * Aplica/remueve la clase 'dark-mode' del body para cambiar los estilos
   */
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

  // Estilos dinámicos para el badge según el tema activo
  const badgeStyle = {
    backgroundColor: darkMode ? 'rgba(139, 180, 232, 0.25)' : 'rgba(162, 197, 242, 0.3)',
    color: darkMode ? '#f0f0f0' : '#5b5b5b'
  };

  // Estilos dinámicos para el texto según el tema activo
  const textStyle = {
    margin: 0,
    fontSize: '1rem',
    color: darkMode ? '#d0d0d0' : '#5b5b5b'
  };

  return (
    <>
      {/* Botón flotante para alternar entre modo claro y oscuro */}
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
          {/* Encabezado principal con información de la aplicación */}
          <header className="hero-header card-surface" style={{ textAlign: 'center', padding: 32 }}>
            <span className="badge" style={badgeStyle}>
              📚 Catálogo interactivo
            </span>
            <h1 style={{ marginTop: 16, marginBottom: 8, fontSize: '2.5rem' }}>Biblioteca Digital</h1>
            <p style={textStyle}>
              Gestiona tu colección con búsquedas instantáneas, filtros dinámicos y un panel de edición amigable.
            </p>
          </header>

          {/* Componente principal que muestra la lista de libros */}
          <BookList/>
        </div>
      </div>
    </>
  );
}
