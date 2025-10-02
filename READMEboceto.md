# 📚 Biblioteca Digital

Una aplicación web moderna para la gestión de catálogos de libros con una interfaz intuitiva y funcionalidades avanzadas de búsqueda y filtrado.

**Biblioteca Digital** es una aplicación full-stack para gestionar un catálogo de libros:
- **Backend:** Node.js + Express + MySQL
- **Frontend:** React (Create React App)
- Soporta CRUD completo, búsqueda por título, filtros y validaciones básicas.
- Pensada para desarrollo local y despliegues sencillos en la nube.

## 🎯 Características Principales

- **Gestión completa de libros**: Crear, leer, actualizar y eliminar libros
- **Búsqueda inteligente**: Búsqueda por título con resultados instantáneos
- **Filtros avanzados**: Por género, autor, estado y año
- **Ordenamiento dinámico**: Por ID, título, autor o año (ascendente/descendente)
- **Vistas múltiples**: Modo tarjetas y tabla para diferentes preferencias
- **Modo oscuro**: Tema claro/oscuro con persistencia de preferencias
- **Diseño responsivo**: Adaptable a diferentes tamaños de pantalla
- **API REST completa**: Backend robusto con validaciones y manejo de errores

## 🏗️ Arquitectura del Proyecto

### Frontend (React)
```
client/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── bookcard.jsx     # Tarjeta individual de libro
│   │   ├── bookform.jsx     # Formulario de creación/edición
│   │   ├── bookitem.jsx     # Item de tabla
│   │   └── booklist.jsx     # Lista principal con controles
│   ├── hooks/               # Hooks personalizados
│   │   └── useLibros.js     # Hook para gestión de estado
│   ├── services/            # Servicios de API
│   │   └── api.js           # Cliente HTTP centralizado
│   ├── utils/               # Utilidades
│   │   └── imageUtils.js    # Manejo de imágenes
│   ├── App.jsx              # Componente principal
│   └── index.css            # Estilos globales
├── public/                  # Archivos estáticos
└── package.json             # Dependencias del frontend
```

### Backend (Node.js + Express)
```
server/
├── controllers/             # Controladores de lógica de negocio
│   └── librosController.js  # CRUD de libros
├── routes/                  # Definición de rutas
│   └── libros.js            # Endpoints de libros
├── services/                # Servicios de datos
│   └── librosService.js     # Acceso a base de datos
├── db.js                    # Configuración de MySQL
├── index.js                 # Servidor principal
└── package.json             # Dependencias del backend
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1** - Biblioteca de interfaz de usuario
- **Axios 1.12.2** - Cliente HTTP para comunicación con API
- **CSS3** - Estilos modernos con variables CSS y modo oscuro

### Backend
- **Node.js** - Entorno de ejecución
- **Express 5.1.0** - Framework web
- **MySQL2 3.15.1** - Driver de base de datos
- **Helmet 8.1.0** - Seguridad HTTP
- **Morgan 1.10.1** - Logger de peticiones
- **CORS 2.8.5** - Manejo de CORS
- **Express Validator 7.2.1** - Validación de datos

### Base de Datos
- **MySQL** - Sistema de gestión de base de datos relacional

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- MySQL (versión 5.7 o superior)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd biblioteca
```

### 2. Configurar la base de datos
```sql
-- Ejecutar el script SQL para crear la base de datos y tablas
mysql -u root -p < biblioteca_digital.sql
```

### 3. Configurar variables de entorno

#### Backend (.env en server/)
```env
# Base de datos
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=biblioteca_digital

# Servidor
PORT=8080
FRONTEND_URL=http://localhost:3000

# Entorno
NODE_ENV=development
```

#### Frontend (.env en client/)
```env
REACT_APP_API_URL=http://localhost:8080/api
```

### 4. Instalar dependencias

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

## 🎮 Uso de la Aplicación

### Iniciar el servidor backend
```bash
cd server
npm run dev    # Modo desarrollo con nodemon
# o
npm start      # Modo producción
```

### Iniciar el frontend
```bash
cd client
npm start      # Se abrirá en http://localhost:3000
```

### Acceder a la aplicación
Abre tu navegador y visita `http://localhost:3000`

## 📋 Funcionalidades Detalladas

### Gestión de Libros
- **Crear libro**: Formulario con validación de campos obligatorios
- **Editar libro**: Modificación de todos los campos del libro
- **Eliminar libro**: Confirmación antes de eliminar
- **Visualizar detalles**: Información completa en tarjetas o tabla

### Búsqueda y Filtrado
- **Búsqueda por título**: Búsqueda parcial en tiempo real
- **Filtro por estado**: Disponible, Prestado, En reparación
- **Filtro por género**: Lista dinámica de géneros disponibles
- **Filtro por autor**: Lista dinámica de autores
- **Ordenamiento**: Por ID, título, autor o año (ASC/DESC)

### Interfaz de Usuario
- **Vista de tarjetas**: Diseño visual atractivo con imágenes
- **Vista de tabla**: Información compacta y organizada
- **Modo oscuro**: Tema alternativo con persistencia
- **Diseño responsivo**: Adaptable a móviles y tablets

## 🔧 API Endpoints

### Libros
```
GET    /api/libros                    # Obtener todos los libros
POST   /api/libros                    # Crear nuevo libro
PUT    /api/libros/:id                # Actualizar libro
DELETE /api/libros/:id                # Eliminar libro
```

### Búsqueda y Filtrado
```
GET    /api/libros/buscar?titulo=...  # Buscar por título
GET    /api/libros/generos            # Obtener géneros únicos
GET    /api/libros/autores            # Obtener autores únicos
GET    /api/libros/filtrar/genero/:genero     # Filtrar por género
GET    /api/libros/filtrar/autor/:autor       # Filtrar por autor
GET    /api/libros/filtrar/estado/:estado     # Filtrar por estado
```

### Parámetros de Query
- `sortBy`: Campo de ordenamiento (id, titulo, autor, anio)
- `sortOrder`: Orden (ASC, DESC)
- `filterBy`: Campo de filtro
- `filterValue`: Valor del filtro

## 📊 Estructura de la Base de Datos

### Tabla: libros
```sql
CREATE TABLE libros (
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
```
## Validaciones y manejo de errores (backend)
- Recomendado: `express-validator` para validar entradas (titulo, autor, genero, anio, isbn).
- Códigos de respuesta:
  - `400` — Bad Request (validación fallida)
  - `404` — Not Found (recurso inexistente)
  - `409` — Conflict (e.g., ISBN duplicado)
  - `500` — Internal Server Error (errores no capturados)
- Manejo: devolver mensajes claros en JSON `{ error: "...", details?: [...] }` y registrar en logs con `morgan`.

---

## Frontend — flujo y componentes
- `App.jsx` — layout principal y ruteo.
- `BookList` — obtiene y muestra libros; maneja búsqueda, filtros y paginación.
- `BookForm` — formulario para crear/editar; validaciones básicas en cliente.
- `BookItem` / `BookCard` — representación por libro (tarjeta o fila de tabla).
- `services/api.js` — cliente Axios configurado con `REACT_APP_API_URL`.

## 🎨 Características de Diseño

### Sistema de Colores
- **Modo claro**: Tonos pastel con gradientes suaves
- **Modo oscuro**: Esquema oscuro con contraste optimizado
- **Colores primarios**: Azules y naranjas complementarios

### Componentes UI
- **Tarjetas**: Diseño con sombras suaves y bordes redondeados
- **Formularios**: Validación visual y feedback inmediato
- **Botones**: Estados hover y active con transiciones
- **Tablas**: Diseño limpio con alternancia de filas

## 🔒 Seguridad

### Backend
- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configuración de origen permitido
- **Validación**: Sanitización de datos de entrada
- **Rate Limiting**: Protección contra ataques de fuerza bruta

### Frontend
- **Validación**: Validación de formularios en tiempo real
- **Sanitización**: Limpieza de datos antes del envío
- **Manejo de errores**: Gestión robusta de errores de red

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Características responsivas
- Grid adaptativo para tarjetas de libros
- Navegación colapsable en móviles
- Formularios optimizados para touch
- Texto escalable y legible

## 🧪 Testing

### Backend
```bash
cd server
npm test
```

### Frontend
```bash
cd client
npm test
```

## 📦 Scripts Disponibles

### Backend
```bash
npm start          # Iniciar servidor en producción
npm run dev        # Iniciar servidor en desarrollo
npm test           # Ejecutar tests
```

### Frontend
```bash
npm start          # Iniciar servidor de desarrollo
npm run build      # Construir para producción
npm test           # Ejecutar tests
```

## 🚀 Despliegue

### Backend (Producción)
```bash
cd server
NODE_ENV=production npm start
```

### Frontend (Producción)
```bash
cd client
npm run build
# Servir archivos desde la carpeta build/
```

### Variables de entorno de producción
```env
NODE_ENV=production
DB_HOST=tu-servidor-mysql
DB_USER=usuario-produccion
DB_PASSWORD=contraseña-segura
FRONTEND_URL=https://tu-dominio.com
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [TuGitHub](https://github.com/tuusuario)

## 🙏 Agradecimientos

- React team por el excelente framework
- Express.js por el servidor robusto
- MySQL por la base de datos confiable
- Comunidad open source por las librerías utilizadas

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:
- Abre un issue en GitHub
- Contacta al desarrollador principal
- Revisa la documentación de la API

---

**¡Gracias por usar Biblioteca Digital! 📚✨**
