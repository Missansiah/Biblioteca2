# Biblioteca Digital – Documentación Técnica

## 1. Descripción general
Biblioteca Digital es un sistema full-stack para administrar una colección de libros que expone una API REST en Express conectada a MySQL y una SPA en React para gestionar altas, bajas, modificaciones, búsquedas y filtros en tiempo real.

## 2. Arquitectura del proyecto
Servidor Node.js/Express 5 con controladores, servicios y pool mysql2/promise; cliente React 19 con hooks y Axios; almacenamiento en MySQL con tabla `libros`; comunicación mediante JSON sobre HTTP protegido con Helmet, CORS y validaciones de entrada.

## 3. Requisitos previos
Node.js 16+, npm, MySQL/MariaDB accesible, Git opcional, puertos 8080 y 3000 libres (o variables alternativas).

## 4. Estructura de carpetas
```
biblioteca/
├── server/          # Backend Express
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── db.js
│   └── index.js
├── client/          # Frontend React
│   ├── src/components/
│   ├── src/hooks/
│   ├── src/services/api.js
│   └── src/index.js, App.jsx, estilos
├── biblioteca_digital.sql
└── Libreria.sql
```

## 5. Configuración inicial paso a paso
1. Clonar el repositorio y entrar en la carpeta `biblioteca`.
2. Ejecutar `SOURCE biblioteca_digital.sql;` en MySQL para crear la base de datos y los datos de prueba.
3. Crear `biblioteca/server/.env` con `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` y `FRONTEND_URL`.
4. (Opcional) Crear `biblioteca/client/.env` con `REACT_APP_API_URL=http://localhost:8080/api`.
5. Instalar dependencias del backend: `cd biblioteca/server && npm install`.
6. Instalar dependencias del frontend: `cd ../client && npm install`.
7. Iniciar el backend: `npm run dev`.
8. Iniciar el frontend en otra terminal: `npm start`.
9. Abrir `http://localhost:3000` y comprobar que se listan los libros semilla.

## 6. Base de datos
Tabla `libros(id INT PK AI, titulo VARCHAR(255), autor VARCHAR(255), genero VARCHAR(100), anio INT, isbn VARCHAR(20) UNIQUE, estado VARCHAR(50) DEFAULT 'Disponible', fecha_registro TIMESTAMP)`; el script `biblioteca_digital.sql` crea el esquema y ocho registros iniciales; `mysql2/promise` usa consultas parametrizadas y pool de hasta 10 conexiones.

## 7. Backend – API y lógica
- Middlewares: `helmet`, `cors` (permitiendo `FRONTEND_URL`), `express.json`, `morgan`.
- Estructura: rutas en `routes/libros.js`, controladores en `controllers/librosController.js`, operaciones SQL en `services/librosService.js`, pool configurado en `db.js`.
- Validaciones: `express-validator` exige título, autor, género, ISBN único y año numérico; estados permitidos `Disponible`, `Prestado`, `En reparación`.
- Manejo de errores: 400 (datos inválidos), 404 (libro inexistente), 409 (ISBN duplicado), 500 (errores internos) con logs en consola.
- Endpoints principales:
  - GET `/api/libros` con `sortBy`, `sortOrder`, `filterBy`, `filterValue`.
  - POST `/api/libros` para crear libros (JSON completo).
  - PUT `/api/libros/:id` para actualizar registros.
  - DELETE `/api/libros/:id` elimina y devuelve 204.
  - GET `/api/libros/buscar?titulo=` busca por coincidencia parcial.
  - GET `/api/libros/generos` y `/autores` devuelven listas únicas.
  - GET `/api/libros/filtrar/genero/:genero`, `/autor/:autor` y `/estado/:estado` aplican filtros dedicados.
- Ejemplos:
```bash
curl -s "http://localhost:8080/api/libros?sortBy=titulo&sortOrder=ASC" | jq
curl -X POST http://localhost:8080/api/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"El Principito","autor":"Antoine de Saint-Exupéry","genero":"Fábula","anio":1943,"isbn":"978-84-9105-123-4","estado":"Disponible"}'
```

## 8. Frontend – Interfaz y flujo
- `App.jsx` presenta encabezado y `BookList`.
- `BookList` administra estado local (libros, orden, filtros, búsqueda) y coordina la recarga tras crear, editar o eliminar usando `getLibros`, `searchLibros` y `deleteLibro`.
- `BookForm` maneja creación/edición, reinicia campos, muestra spinner textual y avisa sobre ISBN duplicado.
- `BookItem` renderiza filas con iconos según `estado` y confirma antes de eliminar.
- `useLibros` encapsula la carga inicial de datos; disponible para reutilizar en otras vistas.
- `services/api.js` centraliza Axios con `baseURL` configurable (`REACT_APP_API_URL`) y helpers para filtros por género, autor y estado.
- Estilos base definidos en `index.css` y complementados con estilos inline para tarjetas, formularios y tablas responsivas.

## 9. Scripts disponibles
Backend: `npm run dev` (nodemon), `npm start` (producción), `npm test` (placeholder). Frontend: `npm start`, `npm run build`, `npm test` (CRA), `npm run eject` deshabilitado por defecto.

## 10. Flujo de desarrollo recomendado
Crear rama feature, actualizar modelos y scripts SQL cuando sea necesario, mantener sincronía controlador-servicio, probar endpoints con curl o herramientas como Postman, verificar manualmente la UI y ejecutar `npm run build` antes de desplegar.

## 11. Despliegue
Configurar variables de entorno en el servidor (Docker, PM2, Heroku, etc.), ejecutar `npm install --production` en `server`, generar `npm run build` en `client`, servir el bundle estático desde un CDN o proxy inverso y ajustar `FRONTEND_URL` al dominio final; habilitar TLS en producción.

## 12. Resolución de problemas
- **ER_ACCESS_DENIED_ERROR/ECONNREFUSED**: verifica credenciales y host de MySQL.
- **CORS blocked**: define `FRONTEND_URL` correcto y reinicia la API.
- **ISBN duplicado**: revisar que la solicitud use un código único o eliminar el registro previo.
- **Cambios no visibles**: confirma `REACT_APP_API_URL` y limpia la cache del navegador o reinicia el backend.

## 13. Mejoras futuras sugeridas
Autenticación con roles, paginación y exportación de catálogos, tests automatizados (Jest, Supertest), internacionalización y modo oscuro, auditoría de préstamos o historial.

## 14. Licencia y contribuciones
Actualmente sin licencia explícita; se recomienda añadir un archivo `LICENSE`. Las contribuciones deben abrirse mediante pull request describiendo cambios, pruebas realizadas y actualizaciones a esta documentación cuando proceda.

## 15. Contacto y soporte
Para dudas o incidencias documenta el problema, adjunta logs relevantes del backend y envía una propuesta de solución o abre un issue en el repositorio correspondiente.
