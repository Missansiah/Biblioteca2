/**
 * Componente BookItem - Representa una fila de libro en la tabla
 * Muestra la información del libro y proporciona botones para editar y eliminar
 */
import React from 'react'; // eslint-disable-line no-unused-vars
import { deleteLibro } from '../services/api';

/**
 * Paleta de colores para los diferentes estados de los libros
 * Define el color de texto y fondo para cada estado posible
 */
const estadoPalette = {
  Disponible: { color: '#5b5b5b', background: 'rgba(162, 197, 242, 0.35)' },
  Prestado: { color: '#5b5b5b', background: 'rgba(242, 173, 133, 0.35)' },
  'En reparación': { color: '#5b5b5b', background: 'rgba(254, 219, 214, 0.6)' },
  default: { color: '#5b5b5b', background: 'rgba(91, 91, 91, 0.15)' }
};

export default function BookItem({ book, onEdit, onDeleted }) {
  /**
   * Maneja la eliminación de un libro
   * Solicita confirmación antes de proceder con la eliminación
   */
  const del = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar este libro?')) return;
    try {
      await deleteLibro(book.id);
      onDeleted(book.id);
    } catch (err) {
      console.error(err);
      alert('Error al eliminar');
    }
  };

  /**
   * Retorna el emoji correspondiente al estado del libro
   */
  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'Disponible':
        return '✅';
      case 'Prestado':
        return '📖';
      case 'En reparación':
        return '🔧';
      default:
        return '❓';
    }
  };

  // Obtiene los colores correspondientes al estado del libro
  const badgeColors = estadoPalette[book.estado] || estadoPalette.default;

  return (
    <tr
      style={{
        borderBottom: '1px solid rgba(254, 219, 214, 0.5)',
        transition: 'background-color 0.2s ease'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(162, 197, 242, 0.12)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {/* Columnas de información del libro */}
      <td style={{ padding: 16, color: 'var(--color-text)', fontWeight: 500 }}>{book.id}</td>
      <td style={{ padding: 16, fontWeight: 600, color: 'var(--color-text)' }}>{book.titulo}</td>
      <td style={{ padding: 16, color: 'var(--color-text)' }}>{book.autor}</td>
      <td style={{ padding: 16, color: 'var(--color-text)' }}>{book.anio}</td>

      {/* Badge de estado con icono y colores dinámicos */}
      <td style={{ padding: 16 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 999,
            fontWeight: 600,
            fontSize: '0.85rem',
            color: badgeColors.color,
            background: badgeColors.background
          }}
        >
          {getStatusIcon(book.estado)} {book.estado}
        </span>
      </td>

      {/* Botones de acción: Editar y Eliminar */}
      <td style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button
            onClick={() => onEdit(book)}
            style={{
              padding: '8px 14px',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text)',
              border: 'none',
              borderRadius: 10,
              fontSize: '0.85rem',
              fontWeight: 600,
              boxShadow: '0 6px 12px rgba(162, 197, 242, 0.25)'
            }}
          >
            ✏️ Editar
          </button>
          <button
            onClick={del}
            style={{
              padding: '8px 14px',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-text)',
              border: 'none',
              borderRadius: 10,
              fontSize: '0.85rem',
              fontWeight: 600,
              boxShadow: '0 6px 12px rgba(254, 219, 214, 0.35)'
            }}
          >
            🗑️ Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}
