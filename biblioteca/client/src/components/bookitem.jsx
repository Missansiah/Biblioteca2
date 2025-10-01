import React from 'react';
import { deleteLibro } from '../services/api';

export default function BookItem({ book, onEdit, onDeleted }) {
  const del = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este libro?')) return;
    try {
      await deleteLibro(book.id);
      onDeleted(book.id);
    } catch (err) { console.error(err); alert('Error al eliminar'); }
  };

  const getStatusIcon = (estado) => {
    switch(estado) {
      case 'Disponible': return '✅';
      case 'Prestado': return '📖';
      case 'En reparación': return '🔧';
      default: return '❓';
    }
  };

  const getStatusColor = (estado) => {
    switch(estado) {
      case 'Disponible': return '#28a745';
      case 'Prestado': return '#ffc107';
      case 'En reparación': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <tr style={{ 
      borderBottom: '1px solid #e9ecef',
      transition: 'background-color 0.2s ease'
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
    >
      <td style={{ padding: 15, color: '#6c757d', fontWeight: '500' }}>{book.id}</td>
      <td style={{ padding: 15, fontWeight: '500', color: '#2c3e50' }}>{book.titulo}</td>
      <td style={{ padding: 15, color: '#495057' }}>{book.autor}</td>
      <td style={{ padding: 15, color: '#495057' }}>{book.anio}</td>
      <td style={{ padding: 15 }}>
        <span style={{ 
          color: getStatusColor(book.estado),
          fontWeight: '500',
          fontSize: '14px'
        }}>
          {getStatusIcon(book.estado)} {book.estado}
        </span>
      </td>
      <td style={{ padding: 15, textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button 
            onClick={() => onEdit(book)}
            style={{ 
              padding: '6px 12px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: 6, 
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            ✏️ Editar
          </button>
          <button 
            onClick={del}
            style={{ 
              padding: '6px 12px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: 6, 
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
          >
            🗑️ Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}
