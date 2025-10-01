/**
 * Punto de entrada principal de la aplicación React
 * Configura el renderizado de la aplicación en el DOM
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Crea la raíz de React en el elemento con id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación envuelta en StrictMode para detectar problemas potenciales
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Medición de rendimiento de la aplicación (opcional)
// Para registrar métricas, pasa una función: reportWebVitals(console.log)
// Más información: https://bit.ly/CRA-vitals
reportWebVitals();
