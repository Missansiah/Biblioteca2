DROP DATABASE biblioteca_digital;
CREATE DATABASE biblioteca_digital;
USE biblioteca_digital;
CREATE TABLE IF NOT EXISTS libros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    anio INT NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    estado VARCHAR(50) DEFAULT 'Disponible',
    imagen_url VARCHAR(500) DEFAULT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de prueba con imágenes de ejemplo
INSERT INTO libros (titulo, autor, genero, anio, isbn, estado, imagen_url) VALUES
('La sombra del viento', 'Carlos Ruiz Zafón', 'Misterio', 2001, '978-84-08-03620-1', 'Disponible', 'https://images-na.ssl-images-amazon.com/images/I/51eq2A0mUnL._SX331_BO1,204,203,200_.jpg'),
('Sapiens: De animales a dioses', 'Yuval Noah Harari', 'Historia', 2011, '978-84-9992-404-4', 'Prestado', 'https://images-na.ssl-images-amazon.com/images/I/51Sn8PEXwcL._SX324_BO1,204,203,200_.jpg'),
('Crónica de una muerte anunciada', 'Gabriel García Márquez', 'Ficción', 1981, '978-84-376-0493-5', 'Disponible', 'https://images-na.ssl-images-amazon.com/images/I/41MdP5Tn0wL._SX322_BO1,204,203,200_.jpg'),
('La Odisea', 'Homero', 'Clásico', -700, '978-84-376-0499-6', 'Disponible', 'https://images-na.ssl-images-amazon.com/images/I/51MKzn3UsuL._SX331_BO1,204,203,200_.jpg'),
('Fahrenheit 451', 'Ray Bradbury', 'Ciencia ficción', 1953, '978-0-7432-4722-1', 'Prestado', 'https://images-na.ssl-images-amazon.com/images/I/51S9xUEGfuL._SX309_BO1,204,203,200_.jpg'),
('Los juegos del hambre', 'Suzanne Collins', 'Juvenil', 2008, '978-84-08-08523-0', 'Disponible', 'https://images-na.ssl-images-amazon.com/images/I/51UzKE3PgYL._SX327_BO1,204,203,200_.jpg'),
('El alquimista', 'Paulo Coelho', 'Ficción', 1988, '978-0-06-112241-5', 'Disponible', 'https://images-na.ssl-images-amazon.com/images/I/41CXWaH+OeL._SX331_BO1,204,203,200_.jpg'),
('La chica del tren', 'Paula Hawkins', 'Suspenso', 2015, '978-84-08-14723-5', 'Prestado', 'https://images-na.ssl-images-amazon.com/images/I/51wOOMF+8eL._SX327_BO1,204,203,200_.jpg');

