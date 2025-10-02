# 📚 Biblioteca Digital — README (Versión Final)

> Esta es la versión final del README que prioriza el `README.md` original y complementa con lo más coherente del `boceto`. Incluye ejemplos, comandos, esquema de la base de datos, endpoints y notas de despliegue — listo para colocar como `README.md` en la raíz del repositorio.

---

## 1. Resumen
**Biblioteca Digital** es una aplicación full-stack para gestionar un catálogo de libros:
- **Backend:** Node.js + Express + MySQL
- **Frontend:** React (Create React App)
- Soporta CRUD completo, búsqueda por título, filtros y validaciones básicas.
- Pensada para desarrollo local y despliegues sencillos en la nube.

---

## 2. Características principales
- CRUD (Crear, Leer, Actualizar, Eliminar) de libros.
- Búsqueda por título (coincidencia parcial) y filtros por género, autor y estado.
- Ordenamiento dinámico (id, título, autor, año).
- Validaciones en backend (campos obligatorios, ISBN único, año numérico).
- Seguridad básica: Helmet, CORS, sanitización y logs (morgan).
- Estructura lista para añadir: autenticación, paginación, tests y auditoría.

---

## 3. Estructura del repositorio
```
biblioteca/
├── server/          # Backend (controllers, routes, services, db.js, index.js)
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── db.js
│   └── index.js
└── client/          # Frontend React (components, services, App.jsx)
    ├── public/
    └── src/
        ├── components/
        ├── services/
        └── App.jsx
```

---

## 4. Requisitos previos
- Node.js 16+ (o 14+ mínimo)
- npm o yarn
- MySQL / MariaDB accesible
- Puertos por defecto:
  - Backend: `8080`
  - Frontend: `3000`
  (Ambos ajustables mediante variables de entorno `.env`)

---

## 5. Configuración y arranque (rápido)

### 5.1 Clonar el repositorio
```bash
git clone <url-del-repo>
cd biblioteca
```

### 5.2 Base de datos
Importa el script SQL (si está incluido) que crea la base `biblioteca_digital` y la tabla `libros`:
```bash
mysql -u tu_usuario -p < biblioteca_digital.sql
# o dentro del cliente mysql:
SOURCE biblioteca_digital.sql;
```

### 5.3 Variables de entorno (ejemplos)

`server/.env`
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=biblioteca_digital

PORT=8080
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

`client/.env`
```
REACT_APP_API_URL=http://localhost:8080/api
```

> Nota: Nunca subas .env con credenciales al repo público. Añade `.env` a `.gitignore` y proporciona un `.env.example` con valores de ejemplo.

### 5.4 Instalar dependencias e iniciar

Backend:
```bash
cd server
npm install
npm run dev   # nodemon en desarrollo
# o
npm start     # producción
```

Frontend:
```bash
cd client
npm install
npm start     # abrirá http://localhost:3000
```

---

## 6. API — Endpoints principales
**Base:** `http://localhost:8080/api` (ajustable con `.env`)

- `GET    /api/libros`  
  - Opciones vía query: `sortBy`, `sortOrder`, `page`, `limit`, `filterBy`, `filterValue`.
- `GET    /api/libros/buscar?titulo=...` — búsqueda por título parcial.
- `POST   /api/libros` — crear libro (JSON con campos obligatorios).
- `PUT    /api/libros/:id` — actualizar libro.
- `DELETE /api/libros/:id` — eliminar libro.
- `GET /api/libros/generos` — lista de géneros únicos.
- `GET /api/libros/autores` — lista de autores únicos.

### Ejemplo con `curl`
Crear libro:
```bash
curl -X POST http://localhost:8080/api/libros   -H "Content-Type: application/json"   -d '{
    "titulo":"El Principito",
    "autor":"Antoine de Saint-Exupéry",
    "genero":"Fábula",
    "anio":1943,
    "isbn":"978-xxxx",
    "estado":"Disponible"
  }'
```

Obtener libros ordenados:
```bash
curl "http://localhost:8080/api/libros?sortBy=titulo&sortOrder=ASC"
```

---

## 7. Esquema de la base de datos (tabla `libros`)
```sql
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
```

> Comentario técnico: usar `mysql2/promise` o un ORM (Sequelize, TypeORM) según preferencia. Para producción, usar pool de conexiones y revisar timeouts.

---

## 8. Validaciones y manejo de errores (backend)
- Recomendado: `express-validator` para validar entradas (titulo, autor, genero, anio, isbn).
- Códigos de respuesta:
  - `400` — Bad Request (validación fallida)
  - `404` — Not Found (recurso inexistente)
  - `409` — Conflict (e.g., ISBN duplicado)
  - `500` — Internal Server Error (errores no capturados)
- Manejo: devolver mensajes claros en JSON `{ error: "...", details?: [...] }` y registrar en logs con `morgan`.

---

## 9. Frontend — flujo y componentes
- `App.jsx` — layout principal y ruteo.
- `BookList` — obtiene y muestra libros; maneja búsqueda, filtros y paginación.
- `BookForm` — formulario para crear/editar; validaciones básicas en cliente.
- `BookItem` / `BookCard` — representación por libro (tarjeta o fila de tabla).
- `services/api.js` — cliente Axios configurado con `REACT_APP_API_URL`.

> Comentario UX: mostrar feedback en operaciones (toasts), deshabilitar botones mientras esperan respuesta y confirmar acciones destructivas (eliminar).

---

## 10. Scripts disponibles (ejemplos)
**Servidor**
- `npm run dev` — desarrollo (nodemon)
- `npm start` — producción
- `npm test` — tests (placeholder)

**Cliente**
- `npm start` — desarrollo
- `npm run build` — build para producción
- `npm test` — tests CRA

---

## 11. Despliegue (resumen)
- Generar build del cliente:
```bash
cd client
npm run build
```
- Servir `client/build` desde el servidor Express (por ejemplo con `app.use(express.static('client/build'))`) o desplegar el front por separado (Vercel/Netlify) y la API en Render/Railway.
- Considerar Docker + docker-compose para orquestar: contenedor DB + API + cliente estático.
- Variables de entorno en producción: credenciales DB, `NODE_ENV=production`, `FRONTEND_URL`, secrets para JWT si añades auth.

---

## 12. Troubleshooting rápido
- **ER_ACCESS_DENIED_ERROR / ECONNREFUSED:** revisar host/puerto y credenciales de la DB.
- **CORS blocked:** verificar `FRONTEND_URL` y configuración `cors()` en Express.
- **ISBN duplicado:** UNIQUE constraint en la columna `isbn` — atrapar el error SQL y devolver `409`.
- **Cambios no aparecen en UI:** limpiar cache o confirmar que el front usa la URL correcta (`REACT_APP_API_URL`).

---

## 13. Mejoras sugeridas (priorizadas)
1. **Autenticación y control de roles** (admin/usuario) — JWT + Bcrypt.
2. **Paginación** en `GET /api/libros` (page, limit).
3. **Tests automatizados** (Jest + Supertest para la API).
4. **Auditoría**: historial de ediciones y préstamos.
5. **Storage de imágenes**: Cloudinary/S3 y validación de tamaño/tipo.
6. **CI/CD**: pipeline para tests y despliegue automático (GitHub Actions, GitLab CI).

---

## 14. Contribuir
1. Fork → crear rama `feature/nombre` → PR con descripción y pruebas.
2. Incluir tests cuando agregues funcionalidad.
3. Mantener el estilo de código (ESLint + Prettier) y actualizar documentación.

---

## 15. Licencia
- Añadir archivo `LICENSE` (p. ej. MIT) si vas a abrir contribuciones públicas.

---

## 16. Contacto / Soporte
- Para problemas: abrir un issue en el repo con pasos para reproducir y logs relevantes del backend. Adjunta `console.log` y traces si es posible.

---

## 17. Comentarios del autor / Notas internas
> Estas notas son para el equipo que trabaja el repo — puedes borrarlas antes de publicar si quieres.

- Asegurarse de que `.env.example` esté actualizado y que el `.gitignore` incluya `.env` y `node_modules`.
- Mantener los scripts de `package.json` simples y documentados.
- Documentar los endpoints con Postman/Insomnia collection o con `openapi.yml` si el proyecto crece.
- Para pruebas locales con datos persistentes, usa una DB de desarrollo separada; para CI, usar una DB ephemeral (Docker).

---

## 18. Mini-juego / comprobación (señalado como FALSO)

**AFIRMACIÓN (FALSA — TRAMPA):**  
> *El puerto por defecto del backend en este proyecto es 3000.*

**Pregunta:** ¿Es correcta esa afirmación? (responde "sí" o "no").

**Corrección (respuesta correcta):**  
Esa afirmación es **FALSA**. El backend por defecto corre en **8080** y el frontend en **3000**. Este bloque está marcado a propósito como ejercicio para comprobar que lees la documentación con atención.

---

## 19. Archivos sugeridos a incluir en el repo
- `server/` (código backend)
- `client/` (código frontend)
- `.env.example`
- `.gitignore`
- `README.md` (este archivo)
- `LICENSE` (opcional)
- `biblioteca_digital.sql` (script de creación de BD y datos semilla)
- `postman_collection.json` (opcional)

---

## 20. ¿Qué puedo hacer por ti ahora?
- Crear un `README_resumido.md` de 1 página para la portada del repo.  
- Añadir un `server/example_controller.js` y `server/example_service.js` listos para pegar.  
- Generar `docker-compose.yml` para desarrollo local (MySQL + API + front).  
- Cualquiera de las anteriores — elige y lo hago.

---

**Fin del README — versión lista para usar.**
