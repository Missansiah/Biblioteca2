const pool = require('../db');

async function getAll(sortBy = 'id', sortOrder = 'ASC', filterBy = null, filterValue = null) {
  let query = 'SELECT * FROM libros';
  let params = [];
  
  // Agregar filtros si se especifican
  if (filterBy && filterValue) {
    query += ` WHERE ${filterBy} LIKE ?`;
    params.push(`%${filterValue}%`);
  }
  
  // Agregar ordenamiento
  const validSortColumns = ['id', 'titulo', 'autor', 'genero', 'anio', 'estado', 'fecha_registro'];
  const validSortOrders = ['ASC', 'DESC'];
  
  const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'id';
  const order = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';
  
  query += ` ORDER BY ${sortColumn} ${order}`;
  
  const [rows] = await pool.query(query, params);
  return rows;
}

async function getById(id) {
  const [rows] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
  return rows[0];
}

async function createLibro(data) {
  const { titulo, autor, genero, anio, isbn, estado } = data;
  const [res] = await pool.query(
    'INSERT INTO libros (titulo, autor, genero, anio, isbn, estado) VALUES (?, ?, ?, ?, ?, ?)',
    [titulo, autor, genero, anio, isbn, estado || 'Disponible']
  );
  return getById(res.insertId);
}

async function updateLibro(id, data) {
  const { titulo, autor, genero, anio, isbn, estado } = data;
  await pool.query(
    'UPDATE libros SET titulo=?, autor=?, genero=?, anio=?, isbn=?, estado=? WHERE id=?',
    [titulo, autor, genero, anio, isbn, estado, id]
  );
  return getById(id);
}

async function deleteLibro(id) {
  await pool.query('DELETE FROM libros WHERE id = ?', [id]);
  return;
}

async function searchByTitle(titulo) {
  const [rows] = await pool.query(
    'SELECT * FROM libros WHERE titulo LIKE ? ORDER BY titulo',
    [`%${titulo}%`]
  );
  return rows;
}

async function filterByGenre(genero) {
  const [rows] = await pool.query(
    'SELECT * FROM libros WHERE genero LIKE ? ORDER BY titulo',
    [`%${genero}%`]
  );
  return rows;
}

async function filterByAuthor(autor) {
  const [rows] = await pool.query(
    'SELECT * FROM libros WHERE autor LIKE ? ORDER BY titulo',
    [`%${autor}%`]
  );
  return rows;
}

async function filterByStatus(estado) {
  const [rows] = await pool.query(
    'SELECT * FROM libros WHERE estado = ? ORDER BY titulo',
    [estado]
  );
  return rows;
}

async function getGenres() {
  const [rows] = await pool.query('SELECT DISTINCT genero FROM libros ORDER BY genero');
  return rows.map(row => row.genero);
}

async function getAuthors() {
  const [rows] = await pool.query('SELECT DISTINCT autor FROM libros ORDER BY autor');
  return rows.map(row => row.autor);
}

module.exports = { 
  getAll, 
  getById, 
  createLibro, 
  updateLibro, 
  deleteLibro, 
  searchByTitle,
  filterByGenre,
  filterByAuthor,
  filterByStatus,
  getGenres,
  getAuthors
};