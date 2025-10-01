import React, { useEffect, useState } from 'react';
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
    <div style={{ 
      marginBottom: 25, 
      padding: 20, 
      backgroundColor: '#ffffff', 
      borderRadius: 12, 
      border: '1px solid #e1e5e9',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: '#2c3e50', 
        fontSize: '18px', 
        fontWeight: '600' 
      }}>
        {editing ? '✏️ Editar Libro' : '➕ Agregar Nuevo Libro'}
      </h3>
      
      <form onSubmit={submit}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 15, 
          marginBottom: 20 
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 5, 
              fontWeight: '600', 
              color: '#495057',
              fontSize: '14px'
            }}>
              Título *
            </label>
            <input 
              name='titulo' 
              value={form.titulo} 
              onChange={change} 
              placeholder='Ingresa el título del libro'
              style={{ 
                width: '100%',
                padding: 12, 
                border: '2px solid #e1e5e9', 
                borderRadius: 8,
                fontSize: '14px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 5, 
              fontWeight: '600', 
              color: '#495057',
              fontSize: '14px'
            }}>
              Autor *
            </label>
            <input 
              name='autor' 
              value={form.autor} 
              onChange={change} 
              placeholder='Nombre del autor'
              style={{ 
                width: '100%',
                padding: 12, 
                border: '2px solid #e1e5e9', 
                borderRadius: 8,
                fontSize: '14px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 5, 
              fontWeight: '600', 
              color: '#495057',
              fontSize: '14px'
            }}>
              Género
            </label>
            <input 
              name='genero' 
              value={form.genero} 
              onChange={change} 
              placeholder='Ej: Ficción, Historia, etc.'
              style={{ 
                width: '100%',
                padding: 12, 
                border: '2px solid #e1e5e9', 
                borderRadius: 8,
                fontSize: '14px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 5, 
              fontWeight: '600', 
              color: '#495057',
              fontSize: '14px'
            }}>
              Año
            </label>
            <input 
              name='anio' 
              type='number'
              value={form.anio} 
              onChange={change} 
              placeholder='Año de publicación'
              style={{ 
                width: '100%',
                padding: 12, 
                border: '2px solid #e1e5e9', 
                borderRadius: 8,
                fontSize: '14px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 5, 
              fontWeight: '600', 
              color: '#495057',
              fontSize: '14px'
            }}>
              ISBN *
            </label>
            <input 
              name='isbn' 
              value={form.isbn} 
              onChange={change} 
              placeholder='Código ISBN único'
              style={{ 
                width: '100%',
                padding: 12, 
                border: '2px solid #e1e5e9', 
                borderRadius: 8,
                fontSize: '14px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: 5, 
              fontWeight: '600', 
              color: '#495057',
              fontSize: '14px'
            }}>
              Estado
            </label>
            <select 
              name='estado' 
              value={form.estado} 
              onChange={change}
              style={{ 
                width: '100%',
                padding: 12, 
                border: '2px solid #e1e5e9', 
                borderRadius: 8,
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="Disponible">✅ Disponible</option>
              <option value="Prestado">📖 Prestado</option>
              <option value="En reparación">🔧 En reparación</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          {editing && (
            <button 
              type='button' 
              onClick={onCancel}
              style={{ 
                padding: '12px 24px', 
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
              ❌ Cancelar
            </button>
          )}
          
          <button 
            type='submit' 
            disabled={isSubmitting}
            style={{ 
              padding: '12px 24px', 
              backgroundColor: isSubmitting ? '#6c757d' : (editing ? '#28a745' : '#007bff'), 
              color: 'white', 
              border: 'none', 
              borderRadius: 8, 
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = editing ? '#218838' : '#0056b3';
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = editing ? '#28a745' : '#007bff';
              }
            }}
          >
            {isSubmitting ? '⏳ Guardando...' : (editing ? '💾 Actualizar' : '➕ Crear Libro')}
          </button>
        </div>
      </form>
    </div>
  );
}
