import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const api = axios.create({ baseURL, timeout: 7000 });

// Función para construir query parameters
const buildQueryParams = (params) => {
  const queryString = new URLSearchParams();
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
      queryString.append(key, params[key]);
    }
  });
  return queryString.toString();
};

export const getLibros = (sortBy = 'id', sortOrder = 'ASC', filterBy = null, filterValue = null) => {
  const params = { sortBy, sortOrder };
  if (filterBy && filterValue) {
    params.filterBy = filterBy;
    params.filterValue = filterValue;
  }
  const queryString = buildQueryParams(params);
  return api.get(`/libros${queryString ? `?${queryString}` : ''}`);
};

export const createLibro = (data) => api.post('/libros', data);
export const updateLibro = (id, data) => api.put(`/libros/${id}`, data);
export const deleteLibro = (id) => api.delete(`/libros/${id}`);
export const searchLibros = (titulo) => api.get(`/libros/buscar?titulo=${encodeURIComponent(titulo)}`);

// Nuevas funciones de filtrado
export const filterByGenre = (genero) => api.get(`/libros/filtrar/genero/${encodeURIComponent(genero)}`);
export const filterByAuthor = (autor) => api.get(`/libros/filtrar/autor/${encodeURIComponent(autor)}`);
export const filterByStatus = (estado) => api.get(`/libros/filtrar/estado/${encodeURIComponent(estado)}`);

// Funciones para obtener listas
export const getGenres = () => api.get('/libros/generos');
export const getAuthors = () => api.get('/libros/autores');

export default api;
