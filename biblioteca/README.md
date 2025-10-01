# Biblioteca Digital

Proyecto full-stack simple para gestionar una colección de libros. Incluye un servidor REST en Node/Express que se conecta a MySQL y una interfaz web en React para listar, crear, editar, buscar y filtrar libros.

## Contenido

- `server/` - API en Node.js / Express
- `client/` - Aplicación frontend con React
- `biblioteca_digital.sql`, `Libreria.sql` - scripts SQL (posible dump/estructura)

## Características

- Listar libros con ordenamiento y filtros
- Crear, actualizar y borrar libros
- Búsqueda por título
- Filtrar por género, autor y estado
- Endpoints para obtener listas de géneros y autores

## Requisitos

- Node.js (v16+ recomendado)
- npm o yarn
- MySQL (o MariaDB) accesible y con una base de datos creada

## Variables de entorno

Hay variables separadas para el servidor y el cliente. Coloca los archivos `.env` en `server/` y `client/`.

Ejemplo para `server/.env`:

```
PORT=8080
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=biblioteca_db
FRONTEND_URL=http://localhost:3000
```

Ejemplo para `client/.env`:

```
REACT_APP_API_URL=http://localhost:8080/api
```

Si no defines `REACT_APP_API_URL`, el frontend usará `http://localhost:8080/api` por defecto. Si no defines `FRONTEND_URL`, el servidor permitirá por defecto `http://localhost:3000` en CORS.

## Instalación

1. Clona o copia el proyecto en tu máquina.
2. Configura la base de datos MySQL y crea la base de datos indicada en `DB_NAME`. Puedes usar los archivos SQL incluidos (`biblioteca_digital.sql`, `Libreria.sql`) para crear tablas y datos iniciales.

### Backend (server)

```
cd server
npm install
```

Variables: crea `server/.env` con los valores mostrados arriba.

Arrancar en modo desarrollo (con nodemon):

```
npm run dev
```

Arrancar en modo producción:

```
npm start
```

El servidor escucha en `PORT` (por defecto `8080`) y expone la API en `/api/libros`.

### Frontend (client)

```
cd client
npm install
```

Variables: crea `client/.env` si quieres sobreescribir `REACT_APP_API_URL`.

Arrancar en desarrollo:

```
npm start
```

Construir para producción:

```
npm run build
```

La app de React corre por defecto en http://localhost:3000 al usar `npm start`.

## API - Endpoints

Base: `/api/libros`

- GET `/api/libros` - Obtener lista de libros
  - Query params opcionales:
    - `sortBy` (por ejemplo `id`, `titulo`) - por defecto `id`
    - `sortOrder` (`ASC` o `DESC`) - por defecto `ASC`
    - `filterBy` y `filterValue` para filtros personalizados

- POST `/api/libros` - Crear un libro
  - Body JSON (validaciones aplicadas):
    - `titulo` (string, obligatorio)
    - `autor` (string, obligatorio)
    - `genero` (string, obligatorio)
    - `anio` (entero, rango razonable)
    - `isbn` (string, obligatorio, único)
    - `estado` (opcional, uno de: `Disponible`, `Prestado`, `En reparación`)

- PUT `/api/libros/:id` - Actualizar libro (mismas validaciones que POST)

- DELETE `/api/libros/:id` - Eliminar libro

- GET `/api/libros/buscar?titulo=...` - Buscar por título

- GET `/api/libros/generos` - Lista de géneros disponibles

- GET `/api/libros/autores` - Lista de autores

- GET `/api/libros/filtrar/genero/:genero` - Filtrar por género

- GET `/api/libros/filtrar/autor/:autor` - Filtrar por autor

- GET `/api/libros/filtrar/estado/:estado` - Filtrar por estado

Ejemplo curl (obtener libros):

```
curl -s "http://localhost:8080/api/libros?sortBy=titulo&sortOrder=ASC" | jq
```

Ejemplo petición POST (crear):

```
curl -X POST http://localhost:8080/api/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Cien Años de Soledad","autor":"Gabriel García Márquez","genero":"Realismo Mágico","anio":1967,"isbn":"978-xxxx","estado":"Disponible"}'
```

Nota: El frontend ya contiene funciones auxiliares en `client/src/services/api.js` que usan `axios` y asumen que la API base está en `REACT_APP_API_URL`.

## Base de datos

- El proyecto usa `mysql2/promise` y un pool de conexiones (archivo `server/db.js`).
- Asegúrate de crear la base de datos y las tablas. Revisa los archivos `biblioteca_digital.sql` y `Libreria.sql` incluidos en la raíz para scripts SQL.

## Estructura del proyecto (resumen)

- `server/`
  - `index.js` - arranque y configuración de middlewares
  - `db.js` - configuración del pool MySQL
  - `routes/libros.js` - rutas de la API
  - `controllers/librosController.js` - lógica de rutas
  - `services/librosService.js` - acceso a datos / consultas SQL

- `client/`
  - `src/components/` - componentes React (formulario, lista, item)
  - `src/services/api.js` - cliente HTTP con axios
  - `package.json` - scripts y dependencias frontend

## Buenas prácticas y notas

- Usa variables de entorno para credenciales y URLs. No subas `.env` a repositorios públicos.
- Validaciones en backend con `express-validator`.
- Seguridad HTTP con `helmet` y rate limiting (dependencias incluidas).

## Contribuir

1. Fork y branch con nombre descriptivo
2. Añadir tests (si aplicable) y documentar cambios
3. Pull request con descripción de cambios

## Licencia

Proyecto sin licencia explícita. Añade un fichero `LICENSE` si quieres aplicar una licencia.

---

Si quieres, puedo crear un script de inicialización de la base de datos o un pequeño `Makefile`/`npm` script que importe los .sql automáticamente. ¿Te interesa eso?
