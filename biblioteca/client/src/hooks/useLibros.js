import { useState, useEffect } from 'react';
import { getLibros } from '../services/api';

export default function useLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async (query = '') => {
    setLoading(true); setError(null);
    try {
      const res = await getLibros(query);
      setLibros(res.data);
    } catch (err) {
      setError(err);
    } finally { setLoading(false); }
  };

  useEffect(()=> { load(); }, []);

  return { libros, loading, error, load, setLibros };
}
