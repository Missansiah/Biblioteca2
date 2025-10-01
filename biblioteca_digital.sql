
CREATE DATABASE IF NOT EXISTS biblioteca_digital;
USE biblioteca_digital;
CREATE TABLE IF NOT EXISTS libros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    anio INT NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    estado VARCHAR(50) DEFAULT 'Disponible',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de prueba
INSERT INTO libros (titulo, autor, genero, anio, isbn, estado) VALUES
('La sombra del viento', 'Carlos Ruiz Zafón', 'Misterio', 2001, '978-84-08-03620-1', 'Disponible'),
('Sapiens: De animales a dioses', 'Yuval Noah Harari', 'Historia', 2011, '978-84-9992-404-4', 'Prestado'),
('Crónica de una muerte anunciada', 'Gabriel García Márquez', 'Ficción', 1981, '978-84-376-0493-5', 'Disponible'),
('La Odisea', 'Homero', 'Clásico', -700, '978-84-376-0499-6', 'Disponible'),
('Fahrenheit 451', 'Ray Bradbury', 'Ciencia ficción', 1953, '978-0-7432-4722-1', 'Prestado'),
('Los juegos del hambre', 'Suzanne Collins', 'Juvenil', 2008, '978-84-08-08523-0', 'Disponible'),
('El alquimista', 'Paulo Coelho', 'Ficción', 1988, '978-0-06-112241-5', 'Disponible'),
('La chica del tren', 'Paula Hawkins', 'Suspenso', 2015, '978-84-08-14723-5', 'Prestado');






