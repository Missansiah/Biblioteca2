// server/routes/libros.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const ctrl = require('../controllers/librosController');

// Validaciones para crear y actualizar libros
const libroValidations = [
  body('titulo').notEmpty().withMessage('El título es obligatorio').isLength({ min: 1, max: 255 }).withMessage('El título debe tener entre 1 y 255 caracteres'),
  body('autor').notEmpty().withMessage('El autor es obligatorio').isLength({ min: 1, max: 255 }).withMessage('El autor debe tener entre 1 y 255 caracteres'),
  body('genero').notEmpty().withMessage('El género es obligatorio').isLength({ min: 1, max: 100 }).withMessage('El género debe tener entre 1 y 100 caracteres'),
  body('anio').isInt({ min: 1000, max: new Date().getFullYear() + 1 }).withMessage('El año debe ser un número válido'),
  body('isbn').notEmpty().withMessage('El ISBN es obligatorio').isLength({ min: 10, max: 20 }).withMessage('El ISBN debe tener entre 10 y 20 caracteres'),
  body('estado').optional().isIn(['Disponible', 'Prestado', 'En reparación']).withMessage('El estado debe ser: Disponible, Prestado o En reparación')
];

// GET /api/libros
router.get('/', ctrl.obtenerLibros);

// POST /api/libros
router.post('/', libroValidations, ctrl.crearLibro);

// PUT /api/libros/:id
router.put('/:id', libroValidations, ctrl.actualizarLibro);

// DELETE /api/libros/:id
router.delete('/:id', ctrl.borrarLibro);

// GET /api/libros/buscar?titulo=...
router.get('/buscar', ctrl.buscarLibros);

// GET /api/libros/generos - Obtener lista de géneros
router.get('/generos', ctrl.obtenerGeneros);

// GET /api/libros/autores - Obtener lista de autores
router.get('/autores', ctrl.obtenerAutores);

// GET /api/libros/filtrar/genero/:genero - Filtrar por género
router.get('/filtrar/genero/:genero', ctrl.filtrarPorGenero);

// GET /api/libros/filtrar/autor/:autor - Filtrar por autor
router.get('/filtrar/autor/:autor', ctrl.filtrarPorAutor);

// GET /api/libros/filtrar/estado/:estado - Filtrar por estado
router.get('/filtrar/estado/:estado', ctrl.filtrarPorEstado);

module.exports = router;
