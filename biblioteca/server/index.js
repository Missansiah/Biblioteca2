/**
 * Servidor Express - Punto de entrada principal del backend
 * Configura middlewares, rutas y manejo de errores
 * Gestiona la API REST para la biblioteca digital
 */
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');  // Middleware de seguridad HTTP
const morgan = require('morgan');  // Logger de peticiones HTTP
const cors = require('cors');      // Habilita CORS para peticiones cross-origin

// Crear instancia de la aplicación Express
const app = express();

/* ========================================
   MIDDLEWARES
   ======================================== */

// Helmet: Añade headers de seguridad HTTP
app.use(helmet());

// Morgan: Registra todas las peticiones HTTP en consola (modo desarrollo)
app.use(morgan('dev'));

// Parser de JSON: Permite recibir datos JSON en el body de las peticiones
app.use(express.json());

// CORS: Permite peticiones desde el frontend (configurable por variable de entorno)
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

/* ========================================
   RUTAS DE LA API
   ======================================== */

// Rutas de libros: /api/libros
app.use('/api/libros', require('./routes/libros'));

/* ========================================
   MANEJO DE ERRORES
   ======================================== */

// Handler 404: Ruta no encontrada
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Handler de errores generales del servidor
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

/* ========================================
   INICIAR SERVIDOR
   ======================================== */

// Puerto del servidor (configurable por variable de entorno)
const PORT = process.env.PORT || 8080;

// Solo iniciar el servidor si se ejecuta directamente (útil para tests)
if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
}

// Exportar la app para tests o uso externo
module.exports = app;
