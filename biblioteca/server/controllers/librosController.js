// server/controllers/librosController.js
const service = require('../services/librosService');
const { body, validationResult } = require('express-validator');

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
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'ISBN duplicado' });
    res.status(500).json({ error: 'Error servidor' });
  }
}

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
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'ISBN duplicado' });
    res.status(500).json({ error: 'Error servidor' });
  }
}

async function borrarLibro(req, res) {
  try {
    await service.deleteLibro(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

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

async function obtenerGeneros(req, res) {
  try {
    const generos = await service.getGenres();
    res.json(generos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

async function obtenerAutores(req, res) {
  try {
    const autores = await service.getAuthors();
    res.json(autores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error servidor' });
  }
}

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
