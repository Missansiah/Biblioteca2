/**
 * Hook personalizado useLibros
 * Gestiona el estado y la carga de libros desde la API
 * Proporciona funcionalidad de carga, estados de loading y error
 *
 * @returns {Object} Objeto con:
 *   - libros: Array de libros cargados
 *   - loading: Boolean indicando si está cargando
 *   - error: Objeto de error si ocurrió alguno
 *   - load: Función para recargar los libros
 *   - setLibros: Función para actualizar manualmente el estado de libros
 */
import { useState, useEffect } from 'react';
import { getLibros } from '../services/api';

export default function useLibros() {
  // Estados del hook
  const [libros, setLibros] = useState([]);      // Lista de libros
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(null);      // Error si ocurre

  /**
   * Carga los libros desde la API
   * @param {string} query - Parámetros de consulta opcionales
   */
  const load = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const res = await getLibros(query);
      setLibros(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar libros al montar el componente
  useEffect(()=> { load(); }, []);

  // Retornar estado y funciones del hook
  return { libros, loading, error, load, setLibros };
}
