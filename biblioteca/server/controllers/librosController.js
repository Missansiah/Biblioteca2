/**
 * Controlador de Libros
 * Maneja la lógica de negocio y las respuestas HTTP para todas las operaciones de libros
 * Actúa como intermediario entre las rutas y el servicio de datos
 */
const service = require('../services/librosService');
const { body, validationResult } = require('express-validator');

/* ========================================
   OPERACIONES CRUD BÁSICAS
   ======================================== */

/**
 * Obtiene todos los libros con opciones de ordenamiento y filtrado
 * @param {Object} req - Request con query params: sortBy, sortOrder, filterBy, filterValue
 * @param {Object} res - Response con array de libros
 */
async function obtenerLibros(req, res) {
  try {
    const { sortBy, sortOrder, filterBy, filterValue } = req.query;
    const libros = await service.getAll(sortBy, sortOrder, filterBy, filterValue);
    res.json(libros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

/**
 * Crea un nuevo libro en la base de datos
 * @param {Object} req - Request con body: { titulo, autor, genero, anio, isbn, estado }
 * @param {Object} res - Response con el libro creado (status 201)
 */
async function crearLibro(req, res) {
  try {
    // Validar datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const libro = await service.createLibro(req.body);
    res.status(201).json(libro);
  } catch (err) {
    console.error(err);
    // Manejo específico de error de ISBN duplicado
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'ISBN duplicado' });
    res.status(500).json({ error: 'Error servidor' });
  }
}

/**
 * Actualiza un libro existente
 * @param {Object} req - Request con params.id y body: { titulo, autor, genero, anio, isbn, estado }
 * @param {Object} res - Response con el libro actualizado
 */
async function actualizarLibro(req, res) {
  const id = req.params.id;
  try {
    // Validar datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: errors.array()
      });
    }

    const updated = await service.updateLibro(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    // Manejo específico de error de ISBN duplicado
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'ISBN duplicado' });
    res.status(500).json({ error: 'Error servidor' });
  }
}

/**
 * Elimina un libro de la base de datos
 * @param {Object} req - Request con params.id
 * @param {Object} res - Response vacía (status 204)
 */
async function borrarLibro(req, res) {
  try {
    await service.deleteLibro(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

/* ========================================
   OPERACIONES DE BÚSQUEDA Y FILTRADO
   ======================================== */

/**
 * Busca libros por título (búsqueda parcial)
 * @param {Object} req - Request con query.titulo
 * @param {Object} res - Response con array de libros que coinciden
 */
async function buscarLibros(req, res) {
  const { titulo } = req.query;
  try {
    const rows = await service.searchByTitle(titulo || '');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

/**
 * Filtra libros por género
 * @param {Object} req - Request con params.genero
 * @param {Object} res - Response con array de libros del género especificado
 */
async function filtrarPorGenero(req, res) {
  const { genero } = req.params;
  try {
    const libros = await service.filterByGenre(genero);
    res.json(libros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

/**
 * Filtra libros por autor
 * @param {Object} req - Request con params.autor
 * @param {Object} res - Response con array de libros del autor especificado
 */
async function filtrarPorAutor(req, res) {
  const { autor } = req.params;
  try {
    const libros = await service.filterByAuthor(autor);
    res.json(libros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

/**
 * Filtra libros por estado
 * @param {Object} req - Request con params.estado
 * @param {Object} res - Response con array de libros con el estado especificado
 */
async function filtrarPorEstado(req, res) {
  const { estado } = req.params;
  try {
    const libros = await service.filterByStatus(estado);
    res.json(libros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

/* ========================================
   OPERACIONES DE CATÁLOGO
   ======================================== */

/**
 * Obtiene la lista de géneros únicos disponibles en la biblioteca
 * @param {Object} req - Request
 * @param {Object} res - Response con array de géneros
 */
async function obtenerGeneros(req, res) {
  try {
    const generos = await service.getGenres();
    res.json(generos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

/**
 * Obtiene la lista de autores únicos disponibles en la biblioteca
 * @param {Object} req - Request
 * @param {Object} res - Response con array de autores
 */
async function obtenerAutores(req, res) {
  try {
    const autores = await service.getAuthors();
    res.json(autores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

/* ========================================
   EXPORTACIÓN DE FUNCIONES
   ======================================== */

module.exports = {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  borrarLibro,
  buscarLibros,
  filtrarPorGenero,
  filtrarPorAutor,
  filtrarPorEstado,
  obtenerGeneros,
  obtenerAutores
};
