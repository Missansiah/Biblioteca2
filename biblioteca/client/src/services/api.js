/**
 * Servicio API - Capa de comunicación con el backend
 * Centraliza todas las peticiones HTTP relacionadas con libros
 * Utiliza Axios para realizar las peticiones al servidor
 */
import axios from 'axios';

// URL base de la API, configurable mediante variable de entorno
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Instancia de Axios con configuración base
const api = axios.create({ baseURL, timeout: 7000 });

/**
 * Construye una cadena de query parameters a partir de un objeto
 * Filtra valores nulos, undefined o vacíos
 * @param {Object} params - Objeto con los parámetros a incluir
 * @returns {string} Cadena de query parameters codificada
 */
const buildQueryParams = (params) => {
  const queryString = new URLSearchParams();
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
      queryString.append(key, params[key]);
    }
  });
  return queryString.toString();
};

/**
 * Obtiene la lista de libros con opciones de ordenamiento y filtrado
 * @param {string} sortBy - Campo por el cual ordenar (id, titulo, autor, anio)
 * @param {string} sortOrder - Orden ascendente (ASC) o descendente (DESC)
 * @param {string|null} filterBy - Campo por el cual filtrar
 * @param {string|null} filterValue - Valor del filtro
 * @returns {Promise} Promesa con la respuesta de Axios
 */
export const getLibros = (sortBy = 'id', sortOrder = 'ASC', filterBy = null, filterValue = null) => {
  const params = { sortBy, sortOrder };
  if (filterBy && filterValue) {
    params.filterBy = filterBy;
    params.filterValue = filterValue;
  }
  const queryString = buildQueryParams(params);
  return api.get(`/libros${queryString ? `?${queryString}` : ''}`);
};

/**
 * Crea un nuevo libro en la base de datos
 * @param {Object} data - Datos del libro a crear
 * @returns {Promise} Promesa con la respuesta de Axios
 */
export const createLibro = (data) => api.post('/libros', data);

/**
 * Actualiza un libro existente
 * @param {number} id - ID del libro a actualizar
 * @param {Object} data - Nuevos datos del libro
 * @returns {Promise} Promesa con la respuesta de Axios
 */
export const updateLibro = (id, data) => api.put(`/libros/${id}`, data);

/**
 * Elimina un libro de la base de datos
 * @param {number} id - ID del libro a eliminar
 * @returns {Promise} Promesa con la respuesta de Axios
 */
export const deleteLibro = (id) => api.delete(`/libros/${id}`);

/**
 * Busca libros por título (búsqueda parcial)
 * @param {string} titulo - Término de búsqueda
 * @returns {Promise} Promesa con la respuesta de Axios
 */
export const searchLibros = (titulo) => api.get(`/libros/buscar?titulo=${encodeURIComponent(titulo)}`);

/**
 * Filtra libros por género
 * @param {string} genero - Género a filtrar
 * @returns {Promise} Promesa con la respuesta de Axios
 */
export const filterByGenre = (genero) => api.get(`/libros/filtrar/genero/${encodeURIComponent(genero)}`);

/**
 * Filtra libros por autor
 * @param {string} autor - Autor a filtrar
 * @returns {Promise} Promesa con la respuesta de Axios
 */
export const filterByAuthor = (autor) => api.get(`/libros/filtrar/autor/${encodeURIComponent(autor)}`);

/**
 * Filtra libros por estado
 * @param {string} estado - Estado a filtrar (Disponible, Prestado, En reparación)
 * @returns {Promise} Promesa con la respuesta de Axios
 */
export const filterByStatus = (estado) => api.get(`/libros/filtrar/estado/${encodeURIComponent(estado)}`);

/**
 * Obtiene la lista de géneros únicos disponibles
 * @returns {Promise} Promesa con la respuesta de Axios
 */
export const getGenres = () => api.get('/libros/generos');

/**
 * Obtiene la lista de autores únicos disponibles
 * @returns {Promise} Promesa con la respuesta de Axios
 */
export const getAuthors = () => api.get('/libros/autores');

export default api;
