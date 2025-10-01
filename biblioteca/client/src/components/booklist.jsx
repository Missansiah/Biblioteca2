import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import { getLibros, searchLibros } from '../services/api';
import BookForm from './bookform';
import BookItem from './bookitem';

export default function BookList(){
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [statusFilter, setStatusFilter] = useState('');

  const load = async () => {
    try {
      const res = await getLibros(sortBy, sortOrder, statusFilter ? 'estado' : null, statusFilter || null);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const search = async (term) => {
    try {
      if (term.trim() === '') {
        load();
        return;
      }
      const res = await searchLibros(term);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, [sortBy, sortOrder, statusFilter]);

  const created = (libro) => setBooks((prev) => [libro, ...prev]);
  const updated = (libro) => setBooks((prev) => prev.map((item) => (item.id === libro.id ? libro : item)));
  const deleted = (id) => setBooks((prev) => prev.filter((item) => item.id !== id));

  const handleSearch = (e) => {
    e.preventDefault();
    search(searchTerm);
  };

  const resetAll = () => {
    setSearchTerm('');
    setStatusFilter('');
    setSortBy('id');
    setSortOrder('ASC');
    load();
  };

  return (
    <div className="card-surface" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <BookForm editing={editing} onCreated={created} onUpdated={updated} onCancel={() => setEditing(null)} />

      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          className="card-surface"
          style={{
            background: 'linear-gradient(135deg, rgba(162, 197, 242, 0.55), rgba(254, 219, 214, 0.65))',
            border: 'none',
            padding: 28
          }}
        >
          <h3 style={{ margin: '0 0 20px 0', color: 'var(--color-text)', fontSize: '1.15rem', fontWeight: 600 }}>
            Herramientas de búsqueda y ordenamiento
          </h3>

          <div style={{ display: 'flex', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, flex: 1, minWidth: 280 }}>
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: 12,
                  border: '2px solid rgba(162, 197, 242, 0.65)',
                  borderRadius: 12,
                  flex: 1,
                  fontSize: '0.95rem',
                  color: 'var(--color-text)',
                  background: 'rgba(254, 252, 239, 0.8)'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 22px',
                  background: 'var(--color-primary)',
                  color: 'var(--color-text)',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  boxShadow: '0 6px 12px rgba(162, 197, 242, 0.35)'
                }}
              >
                Buscar
              </button>
            </form>

            <button
              onClick={resetAll}
              style={{
                padding: '12px 22px',
                background: 'var(--color-secondary)',
                color: 'var(--color-text)',
                border: 'none',
                borderRadius: 12,
                fontSize: '0.95rem',
                fontWeight: 600,
                boxShadow: '0 6px 12px rgba(242, 173, 133, 0.3)'
              }}
            >
              Limpiar filtros
            </button>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9rem' }}>Ordenar por</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: 10,
                  borderRadius: 12,
                  border: '2px solid rgba(162, 197, 242, 0.6)',
                  background: 'var(--color-card)',
                  color: 'var(--color-text)'
                }}
              >
                <option value="id">ID</option>
                <option value="titulo">Título</option>
                <option value="autor">Autor</option>
                <option value="anio">Año</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  padding: 10,
                  borderRadius: 12,
                  border: '2px solid rgba(162, 197, 242, 0.6)',
                  background: 'var(--color-card)',
                  color: 'var(--color-text)'
                }}
              >
                <option value="ASC">Ascendente</option>
                <option value="DESC">Descendente</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9rem' }}>Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: 10,
                  borderRadius: 12,
                  border: '2px solid rgba(254, 219, 214, 0.6)',
                  background: 'var(--color-card)',
                  color: 'var(--color-text)'
                }}
              >
                <option value="">Todos</option>
                <option value="Disponible">Disponible</option>
                <option value="Prestado">Prestado</option>
                <option value="En reparación">En reparación</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-surface" style={{ padding: 18, background: 'rgba(254, 252, 239, 0.85)' }}>
          <span style={{ color: 'var(--color-text)', fontSize: '0.95rem', fontWeight: 500 }}>
            Mostrando <strong>{books.length}</strong> libro{books.length !== 1 ? 's' : ''}
            {sortBy !== 'id' || sortOrder !== 'ASC' ? ` • Ordenado por ${sortBy} (${sortOrder})` : ''}
            {statusFilter ? ` • Estado: ${statusFilter}` : ''}
          </span>
        </div>

        <div style={{ borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Año</th>
                <th>Estado</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <BookItem key={book.id} book={book} onEdit={(item) => setEditing(item)} onDeleted={deleted} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
