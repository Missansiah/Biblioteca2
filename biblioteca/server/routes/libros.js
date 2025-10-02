/**
 * Rutas de la API de Libros
 * Define todos los endpoints relacionados con la gestión de libros
 * Incluye validaciones de datos usando express-validator
 */
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const ctrl = require('../controllers/librosController');

/* ========================================
   VALIDACIONES
   ======================================== */

/**
 * Validaciones para crear y actualizar libros
 * Asegura que los datos recibidos cumplan con los requisitos
 */
const libroValidations = [
  body('isbn')
    .notEmpty().withMessage('El ISBN es obligatorio')
    .isLength({ min: 10, max: 20 }).withMessage('El ISBN debe tener entre 10 y 20 caracteres'),

  body('estado')
    .optional()
    .isIn(['Disponible', 'Prestado', 'En reparación'])
    .withMessage('El estado debe ser: Disponible, Prestado o En reparación'),

  body('imagen_url')
    .optional({ nullable: true })
    .isURL({ require_tld: false })
    .withMessage('La URL de la imagen debe ser válida')
];

/* ========================================
   RUTAS CRUD BÁSICAS
   ======================================== */

/**
 * GET /api/libros
 * Obtiene todos los libros con opciones de ordenamiento y filtrado
 * Query params: sortBy, sortOrder, filterBy, filterValue
 */
router.get('/', ctrl.obtenerLibros);

/**
 * POST /api/libros
 * Crea un nuevo libro
 * Body: { titulo, autor, genero, anio, isbn, estado }
 */
router.post('/', libroValidations, ctrl.crearLibro);

/**
 * PUT /api/libros/:id
 * Actualiza un libro existente
 * Params: id del libro
 * Body: { titulo, autor, genero, anio, isbn, estado }
 */
router.put('/:id', libroValidations, ctrl.actualizarLibro);

/**
 * DELETE /api/libros/:id
 * Elimina un libro
 * Params: id del libro
 */
router.delete('/:id', ctrl.borrarLibro);

/* ========================================
   RUTAS DE BÚSQUEDA Y FILTRADO
   ======================================== */

/**
 * GET /api/libros/buscar?titulo=...
 * Busca libros por título (búsqueda parcial)
 * Query params: titulo
 */
router.get('/buscar', ctrl.buscarLibros);

/**
 * GET /api/libros/generos
 * Obtiene la lista de géneros únicos disponibles
 */
router.get('/generos', ctrl.obtenerGeneros);

/**
 * GET /api/libros/autores
 * Obtiene la lista de autores únicos disponibles
 */
router.get('/autores', ctrl.obtenerAutores);

/**
 * GET /api/libros/filtrar/genero/:genero
 * Filtra libros por género específico
 * Params: genero
 */
router.get('/filtrar/genero/:genero', ctrl.filtrarPorGenero);

/**
 * GET /api/libros/filtrar/autor/:autor
 * Filtra libros por autor específico
 * Params: autor
 */
router.get('/filtrar/autor/:autor', ctrl.filtrarPorAutor);

/**
 * GET /api/libros/filtrar/estado/:estado
 * Filtra libros por estado (Disponible, Prestado, En reparación)
 * Params: estado
 */
router.get('/filtrar/estado/:estado', ctrl.filtrarPorEstado);

module.exports = router;
