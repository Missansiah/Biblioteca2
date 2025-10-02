import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { deleteLibro } from '../services/api';

// Paleta para los estados del libro
const estadoPalette = {
  Disponible: { color: '#2d5016', background: 'rgba(162, 197, 242, 0.45)' },
  Prestado: { color: '#8b4513', background: 'rgba(242, 173, 133, 0.45)' },
  'En reparación': { color: '#8b2500', background: 'rgba(254, 219, 214, 0.7)' },
  default: { color: '#5b5b5b', background: 'rgba(91, 91, 91, 0.15)' }
};

export default function BookCard({ book, onEdit, onDeleted }) {
  const [imageError, setImageError] = useState(false);

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

  const getPlaceholderImage = () => {
    const colors = ['A2C5F2', 'FEDBD6', 'F2AD85', 'FEFCEF', 'E8F4F8'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const encodedTitle = encodeURIComponent(book.titulo.substring(0, 30));
    return `https://via.placeholder.com/300x450/${randomColor}/5b5b5b?text=${encodedTitle}`;
  };

  const badgeColors = estadoPalette[book.estado] || estadoPalette.default;

  return (
    <div
      className="card-surface"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        height: '100%',
        boxShadow: '0 4px 12px rgba(162, 197, 242, 0.2)',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(162, 197, 242, 0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(162, 197, 242, 0.2)';
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          borderRadius: 999,
          fontWeight: 600,
          fontSize: '0.8rem',
          color: badgeColors.color,
          background: badgeColors.background,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}
      >
        {getStatusIcon(book.estado)} {book.estado}
      </div>

      <div
        style={{
          width: '100%',
          minHeight: 280,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(162, 197, 242, 0.2), rgba(254, 219, 214, 0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px'
        }}
      >
        <img
          src={imageError || !book.imagen_url ? getPlaceholderImage() : book.imagen_url}
          alt={book.titulo}
          onError={() => setImageError(true)}
          style={{
            maxWidth: '100%',
            maxHeight: '400px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <h3
          style={{
            margin: 0,
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            lineHeight: 1.3,
            minHeight: '2.6em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {book.titulo}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.1rem' }}>👤</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text)', fontWeight: 500 }}>
              {book.autor}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.1rem' }}>📚</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>{book.genero}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.1rem' }}>📅</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>{book.anio}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '1.1rem' }}>🔖</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text)', opacity: 0.7 }}>
              ISBN: {book.isbn}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 12 }}>
          <button
            onClick={() => onEdit(book)}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text)',
              border: 'none',
              borderRadius: 10,
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 8px rgba(162, 197, 242, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(162, 197, 242, 0.9)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(162, 197, 242, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(162, 197, 242, 0.25)';
            }}
          >
            ✏️ Editar
          </button>

          <button
            onClick={del}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text)',
              border: 'none',
              borderRadius: 10,
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 8px rgba(254, 219, 214, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(254, 219, 214, 0.9)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(254, 219, 214, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(254, 219, 214, 0.25)';
            }}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
