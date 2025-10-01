// server/index.js (arranque mínimo y ordenado)
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');        // seguridad HTTP
const morgan = require('morgan');        // logs
const cors = require('cors');

const app = express();                   // <<< crear app ANTES de usar app.use

// middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// rutas (ajusta la ruta si tu router está en routes/libros.js)
app.use('/api/libros', require('./routes/libros'));

// handler 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// handler de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

// solo escuchar si se ejecuta directamente (útil para tests)
const PORT = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
}

module.exports = app;
