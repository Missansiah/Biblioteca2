import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import { createLibro, updateLibro } from '../services/api';

export default function BookForm({ editing, onCreated, onUpdated, onCancel }) {
  const [form, setForm] = useState({ titulo:'', autor:'', genero:'', anio:'', isbn:'', estado:'Disponible' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(()=> { 
    if (editing) {
      setForm(editing); 
    } else {
      setForm({ titulo:'', autor:'', genero:'', anio:'', isbn:'', estado:'Disponible' }); 
    }
  }, [editing]);

  const change = e => setForm({...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.autor || !form.isbn) {
      alert('Por favor completa título, autor e ISBN');
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (editing) {
        const res = await updateLibro(editing.id, form);
        onUpdated(res.data);
        onCancel();
      } else {
        const res = await createLibro(form);
        onCreated(res.data);
        setForm({ titulo:'', autor:'', genero:'', anio:'', isbn:'', estado:'Disponible' });
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        alert('Error: El ISBN ya existe en la base de datos');
      } else {
        alert('Error al guardar el libro');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="card-surface"
      style={{
        marginBottom: 24,
        background: 'linear-gradient(145deg, rgba(254, 252, 239, 0.95), rgba(254, 219, 214, 0.75))',
        border: '1px solid rgba(162, 197, 242, 0.35)'
      }}
    >
      <h3
        style={{
          margin: '0 0 22px 0',
          color: 'var(--color-text)',
          fontSize: '1.2rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        {editing ? '✏️ Editar libro' : '➕ Registrar nuevo libro'}
      </h3>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18
          }}
        >
          {[
            { label: 'Título *', name: 'titulo', placeholder: 'Ingresa el título del libro' },
            { label: 'Autor *', name: 'autor', placeholder: 'Nombre del autor' },
            { label: 'Género', name: 'genero', placeholder: 'Ej: Ficción, Historia...' },
            { label: 'Año', name: 'anio', type: 'number', placeholder: 'Año de publicación' },
            { label: 'ISBN *', name: 'isbn', placeholder: 'Código ISBN único' }
          ].map((field) => (
            <div key={field.name}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 6,
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  fontSize: '0.9rem'
                }}
              >
                {field.label}
              </label>
              <input
                name={field.name}
                type={field.type || 'text'}
                value={form[field.name]}
                onChange={change}
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  padding: 12,
                  border: '2px solid rgba(162, 197, 242, 0.45)',
                  borderRadius: 12,
                  fontSize: '0.95rem',
                  background: 'var(--color-card)',
                  color: 'var(--color-text)'
                }}
              />
            </div>
          ))}

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: 6,
                fontWeight: 600,
                color: 'var(--color-text)',
                fontSize: '0.9rem'
              }}
            >
              Estado
            </label>
            <select
              name="estado"
              value={form.estado}
              onChange={change}
              style={{
                width: '100%',
                padding: 12,
                border: '2px solid rgba(254, 219, 214, 0.6)',
                borderRadius: 12,
                fontSize: '0.95rem',
                background: 'var(--color-card)',
                color: 'var(--color-text)'
              }}
            >
              <option value="Disponible">Disponible</option>
              <option value="Prestado">Prestado</option>
              <option value="En reparación">En reparación</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {editing && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '12px 26px',
                background: 'var(--color-accent)',
                color: 'var(--color-text)',
                border: 'none',
                borderRadius: 999,
                fontWeight: 600,
                boxShadow: '0 6px 14px rgba(254, 219, 214, 0.45)'
              }}
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px 26px',
              background: isSubmitting ? 'rgba(91, 91, 91, 0.35)' : editing ? 'var(--color-secondary)' : 'var(--color-primary)',
              color: 'var(--color-text)',
              border: 'none',
              borderRadius: 999,
              fontWeight: 600,
              boxShadow: `0 8px 18px ${editing ? 'rgba(242, 173, 133, 0.35)' : 'rgba(162, 197, 242, 0.35)'}`
            }}
          >
            {isSubmitting ? 'Guardando…' : editing ? 'Actualizar libro' : 'Crear libro'}
          </button>
        </div>
      </form>
    </div>
  );
}
