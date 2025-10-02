/**
 * Utilidades para manejo de imágenes de libros
 * Proporciona funciones para generar URLs de imágenes placeholder y buscar imágenes de ejemplo
 */

/**
 * Genera una URL de imagen placeholder usando el servicio placeholder.com
 * @param {string} titulo - Título del libro
 * @param {number} width - Ancho de la imagen (por defecto 300)
 * @param {number} height - Alto de la imagen (por defecto 450)
 * @returns {string} URL de la imagen placeholder
 */
export const getPlaceholderImage = (titulo, width = 300, height = 450) => {
  const colors = ['A2C5F2', 'FEDBD6', 'F2AD85', 'FEFCEF', 'E8F4F8', 'D4E8F7', 'FFE5E0'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const encodedTitle = encodeURIComponent(titulo.substring(0, 30));
  return `https://via.placeholder.com/${width}x${height}/${randomColor}/5b5b5b?text=${encodedTitle}`;
};

/**
 * Genera una URL de imagen usando el servicio de Open Library
 * Open Library proporciona portadas de libros basadas en ISBN
 * @param {string} isbn - ISBN del libro
 * @param {string} size - Tamaño de la imagen (S, M, L)
 * @returns {string} URL de la imagen de Open Library
 */
export const getOpenLibraryImage = (isbn, size = 'M') => {
  // Limpia el ISBN de guiones y espacios
  const cleanIsbn = isbn.replace(/[-\s]/g, '');
  return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-${size}.jpg`;
};

/**
 * Genera una URL de imagen usando el servicio de Google Books
 * @param {string} titulo - Título del libro
 * @returns {string} URL de búsqueda de Google Books
 */
export const getGoogleBooksImage = (titulo) => {
  const encodedTitle = encodeURIComponent(titulo);
  // Esta es una URL de ejemplo, en producción necesitarías usar la API de Google Books
  return `https://books.google.com/books/content?id=&printsec=frontcover&img=1&zoom=1&q=${encodedTitle}`;
};

/**
 * Lista de URLs de imágenes de ejemplo para libros populares
 * Útil para demos y pruebas
 */
export const ejemplosImagenes = {
  'La sombra del viento': 'https://images-na.ssl-images-amazon.com/images/I/51eq2A0mUnL._SX331_BO1,204,203,200_.jpg',
  'Sapiens': 'https://images-na.ssl-images-amazon.com/images/I/51Sn8PEXwcL._SX324_BO1,204,203,200_.jpg',
  'Crónica de una muerte anunciada': 'https://images-na.ssl-images-amazon.com/images/I/41MdP5Tn0wL._SX322_BO1,204,203,200_.jpg',
  'La Odisea': 'https://images-na.ssl-images-amazon.com/images/I/51MKzn3UsuL._SX331_BO1,204,203,200_.jpg',
  'Fahrenheit 451': 'https://images-na.ssl-images-amazon.com/images/I/51S9xUEGfuL._SX309_BO1,204,203,200_.jpg',
  'Los juegos del hambre': 'https://images-na.ssl-images-amazon.com/images/I/51UzKE3PgYL._SX327_BO1,204,203,200_.jpg',
  'El alquimista': 'https://images-na.ssl-images-amazon.com/images/I/41CXWaH+OeL._SX331_BO1,204,203,200_.jpg',
  'La chica del tren': 'https://images-na.ssl-images-amazon.com/images/I/51wOOMF+8eL._SX327_BO1,204,203,200_.jpg',
  'Cien años de soledad': 'https://images-na.ssl-images-amazon.com/images/I/51Q3YJZsGsL._SX327_BO1,204,203,200_.jpg',
  '1984': 'https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX277_BO1,204,203,200_.jpg',
  'El principito': 'https://images-na.ssl-images-amazon.com/images/I/41MXiDm+MZL._SX331_BO1,204,203,200_.jpg',
  'Don Quijote': 'https://images-na.ssl-images-amazon.com/images/I/51wSckmUMuL._SX331_BO1,204,203,200_.jpg'
};

/**
 * Busca una imagen de ejemplo basada en el título del libro
 * @param {string} titulo - Título del libro
 * @returns {string|null} URL de la imagen o null si no se encuentra
 */
export const buscarImagenEjemplo = (titulo) => {
  // Busca coincidencias parciales en el título
  const tituloLower = titulo.toLowerCase();
  for (const [key, value] of Object.entries(ejemplosImagenes)) {
    if (tituloLower.includes(key.toLowerCase()) || key.toLowerCase().includes(tituloLower)) {
      return value;
    }
  }
  return null;
};

/**
 * Obtiene la mejor imagen disponible para un libro
 * Intenta en orden: URL proporcionada, imagen de ejemplo, Open Library, placeholder
 * @param {Object} libro - Objeto libro con titulo, isbn, imagen_url
 * @returns {string} URL de la imagen
 */
export const obtenerMejorImagen = (libro) => {
  // 1. Si tiene URL de imagen, usarla
  if (libro.imagen_url && libro.imagen_url.trim() !== '') {
    return libro.imagen_url;
  }
  
  // 2. Buscar en ejemplos
  const imagenEjemplo = buscarImagenEjemplo(libro.titulo);
  if (imagenEjemplo) {
    return imagenEjemplo;
  }
  
  // 3. Intentar con Open Library si tiene ISBN
  if (libro.isbn) {
    return getOpenLibraryImage(libro.isbn);
  }
  
  // 4. Fallback a placeholder
  return getPlaceholderImage(libro.titulo);
};
