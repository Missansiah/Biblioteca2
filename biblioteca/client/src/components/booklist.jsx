import React, { useEffect, useState } from 'react';
import { getLibros, searchLibros, filterByStatus } from '../services/api';
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
    } catch (err) { console.error(err); }
  };

  const search = async (term) => {
    try {
      if (term.trim() === '') {
        load();
        return;
      }
      const res = await searchLibros(term);
      setBooks(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(()=>{ 
    load(); 
  }, [sortBy, sortOrder, statusFilter]);

  const created = b => setBooks(prev => [b, ...prev]);
  const updated = b => setBooks(prev => prev.map(x => x.id === b.id ? b : x));
  const deleted = id => setBooks(prev => prev.filter(x => x.id !== id));

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
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
      <BookForm editing={editing} onCreated={created} onUpdated={updated} onCancel={() => setEditing(null)} />
      
      {/* Panel de controles simplificado */}
      <div style={{ 
        marginBottom: 25, 
        padding: 20, 
        backgroundColor: '#ffffff', 
        borderRadius: 12, 
        border: '1px solid #e1e5e9',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: '18px', fontWeight: '600' }}>
          🔍 Búsqueda y Ordenamiento
        </h3>
        
        {/* Primera fila: Búsqueda */}
        <div style={{ display: 'flex', gap: 15, alignItems: 'center', marginBottom: 15, flexWrap: 'wrap' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1, minWidth: 300 }}>
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                padding: 12, 
                border: '2px solid #e1e5e9', 
                borderRadius: 8, 
                flex: 1,
                fontSize: '14px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
            <button 
              type="submit" 
              style={{ 
                padding: '12px 20px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: 8, 
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              🔍 Buscar
            </button>
          </form>
          
          <button 
            onClick={resetAll}
            style={{ 
              padding: '12px 20px', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: 8, 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#545b62'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
          >
            🔄 Limpiar
          </button>
        </div>

        {/* Segunda fila: Ordenamiento y filtro de estado */}
        <div style={{ display: 'flex', gap: 15, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <label style={{ fontWeight: '600', color: '#495057', fontSize: '14px' }}>Ordenar:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ 
                padding: 8, 
                border: '2px solid #e1e5e9', 
                borderRadius: 6,
                fontSize: '14px',
                backgroundColor: 'white'
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
                padding: 8, 
                border: '2px solid #e1e5e9', 
                borderRadius: 6,
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="ASC">⬆️ Ascendente</option>
              <option value="DESC">⬇️ Descendente</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <label style={{ fontWeight: '600', color: '#495057', fontSize: '14px' }}>Estado:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ 
                padding: 8, 
                border: '2px solid #e1e5e9', 
                borderRadius: 6,
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="">Todos</option>
              <option value="Disponible">✅ Disponible</option>
              <option value="Prestado">📖 Prestado</option>
              <option value="En reparación">🔧 En reparación</option>
            </select>
          </div>
        </div>
      </div>

      {/* Información de resultados */}
      <div style={{ 
        marginBottom: 15, 
        padding: 10, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 6,
        border: '1px solid #e9ecef'
      }}>
        <span style={{ color: '#495057', fontSize: '14px', fontWeight: '500' }}>
          📚 Mostrando <strong>{books.length}</strong> libro{books.length !== 1 ? 's' : ''}
          {sortBy !== 'id' || sortOrder !== 'ASC' ? ` • Ordenado por ${sortBy} (${sortOrder === 'ASC' ? '⬆️' : '⬇️'})` : ''}
          {statusFilter ? ` • Estado: ${statusFilter}` : ''}
        </span>
      </div>

      {/* Tabla de libros */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: 12, 
        border: '1px solid #e1e5e9',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: 15, textAlign: 'left', borderBottom: '2px solid #e1e5e9', color: '#495057', fontWeight: '600' }}>ID</th>
              <th style={{ padding: 15, textAlign: 'left', borderBottom: '2px solid #e1e5e9', color: '#495057', fontWeight: '600' }}>Título</th>
              <th style={{ padding: 15, textAlign: 'left', borderBottom: '2px solid #e1e5e9', color: '#495057', fontWeight: '600' }}>Autor</th>
              <th style={{ padding: 15, textAlign: 'left', borderBottom: '2px solid #e1e5e9', color: '#495057', fontWeight: '600' }}>Año</th>
              <th style={{ padding: 15, textAlign: 'left', borderBottom: '2px solid #e1e5e9', color: '#495057', fontWeight: '600' }}>Estado</th>
              <th style={{ padding: 15, textAlign: 'center', borderBottom: '2px solid #e1e5e9', color: '#495057', fontWeight: '600' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map(b => <BookItem key={b.id} book={b} onEdit={(bk)=>setEditing(bk)} onDeleted={deleted} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
