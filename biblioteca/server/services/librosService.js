/**
 * Servicio de Libros - Capa de acceso a datos
 * Contiene toda la lógica de interacción con la base de datos MySQL
 * Realiza operaciones CRUD y consultas especializadas sobre la tabla 'libros'
 */
const pool = require('../db');

/* ========================================
   OPERACIONES CRUD BÁSICAS
   ======================================== */

/**
 * Obtiene todos los libros con opciones de ordenamiento y filtrado
 * @param {string} sortBy - Campo por el cual ordenar (id, titulo, autor, genero, anio, estado, fecha_registro)
 * @param {string} sortOrder - Orden ASC o DESC
 * @param {string|null} filterBy - Campo por el cual filtrar
 * @param {string|null} filterValue - Valor del filtro
 * @returns {Promise<Array>} Array de libros
 */
async function getAll(sortBy = 'id', sortOrder = 'ASC', filterBy = null, filterValue = null) {
  let query = 'SELECT * FROM libros';
  let params = [];

  // Agregar filtros si se especifican
  if (filterBy && filterValue) {
    query += ` WHERE ${filterBy} LIKE ?`;
    params.push(`%${filterValue}%`);
  }

  // Validar y agregar ordenamiento
  const validSortColumns = ['id', 'titulo', 'autor', 'genero', 'anio', 'estado', 'fecha_registro'];
  const validSortOrders = ['ASC', 'DESC'];

  const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'id';
  const order = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

  query += ` ORDER BY ${sortColumn} ${order}`;

  const [rows] = await pool.query(query, params);
  return rows;
}

/**
 * Obtiene un libro por su ID
 * @param {number} id - ID del libro
 * @returns {Promise<Object|undefined>} Objeto libro o undefined si no existe
 */
async function getById(id) {
  const [rows] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
  return rows[0];
}

/**
 * Crea un nuevo libro en la base de datos
 * @param {Object} data - Datos del libro { titulo, autor, genero, anio, isbn, estado, imagen_url }
 * @returns {Promise<Object>} Libro creado con su ID asignado
 */
async function createLibro(data) {
  const { titulo, autor, genero, anio, isbn, estado, imagen_url } = data;
  const libroEstado = estado || 'Disponible';
  const [res] = await pool.query(
    'INSERT INTO libros (titulo, autor, genero, anio, isbn, estado, imagen_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [titulo, autor, genero, anio, isbn, libroEstado, imagen_url || null]
  );
  return { id: res.insertId, ...data, estado: libroEstado };
}

/**
 * Actualiza un libro existente
 * @param {number} id - ID del libro a actualizar
 * @param {Object} data - Datos actualizados del libro
 * @returns {Promise<Object>} Libro actualizado
 */
async function updateLibro(id, data) {
  const { titulo, autor, genero, anio, isbn, estado, imagen_url } = data;
  await pool.query(
    'UPDATE libros SET titulo = ?, autor = ?, genero = ?, anio = ?, isbn = ?, estado = ?, imagen_url = ? WHERE id = ?',
    [titulo, autor, genero, anio, isbn, estado, imagen_url || null, id]
  );
  return { id, ...data };
}

/**
 * Elimina un libro de la base de datos
 * @param {number} id - ID del libro a eliminar
 * @returns {Promise<void>}
 */
async function deleteLibro(id) {
  await pool.query('DELETE FROM libros WHERE id = ?', [id]);
}

/* ========================================
   OPERACIONES DE BÚSQUEDA Y FILTRADO
   ======================================== */

/**
 * Busca libros por título (búsqueda parcial con LIKE)
 * @param {string} titulo - Término de búsqueda
 * @returns {Promise<Array>} Array de libros que coinciden con el título
 */
async function searchByTitle(titulo) {
  const [rows] = await pool.query(
    'SELECT * FROM libros WHERE titulo LIKE ? ORDER BY titulo',
    [`%${titulo}%`]
  );
  return rows;
}

/**
 * Filtra libros por género (búsqueda parcial)
 * @param {string} genero - Género a buscar
 * @returns {Promise<Array>} Array de libros del género especificado
 */
async function filterByGenre(genero) {
  const [rows] = await pool.query(
    'SELECT * FROM libros WHERE genero LIKE ? ORDER BY titulo',
    [`%${genero}%`]
  );
  return rows;
}

/**
 * Filtra libros por autor (búsqueda parcial)
 * @param {string} autor - Autor a buscar
 * @returns {Promise<Array>} Array de libros del autor especificado
 */
async function filterByAuthor(autor) {
  const [rows] = await pool.query(
    'SELECT * FROM libros WHERE autor LIKE ? ORDER BY titulo',
    [`%${autor}%`]
  );
  return rows;
}

/**
 * Filtra libros por estado exacto
 * @param {string} estado - Estado del libro (Disponible, Prestado, En reparación)
 * @returns {Promise<Array>} Array de libros con el estado especificado
 */
async function filterByStatus(estado) {
  const [rows] = await pool.query(
    'SELECT * FROM libros WHERE estado = ? ORDER BY titulo',
    [estado]
  );
  return rows;
}

/* ========================================
   OPERACIONES DE CATÁLOGO
   ======================================== */

/**
 * Obtiene la lista de géneros únicos disponibles en la biblioteca
 * @returns {Promise<Array<string>>} Array de géneros únicos ordenados alfabéticamente
 */
async function getGenres() {
  const [rows] = await pool.query('SELECT DISTINCT genero FROM libros ORDER BY genero');
  return rows.map(row => row.genero);
}

/**
 * Obtiene la lista de autores únicos disponibles en la biblioteca
 * @returns {Promise<Array<string>>} Array de autores únicos ordenados alfabéticamente
 */
async function getAuthors() {
  const [rows] = await pool.query('SELECT DISTINCT autor FROM libros ORDER BY autor');
  return rows.map(row => row.autor);
}

/* ========================================
   EXPORTACIÓN DE FUNCIONES
   ======================================== */

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
