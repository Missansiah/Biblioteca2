Biblioteca Digital
Proyecto full-stack para gestionar una colección de libros. Cuenta con un servidor REST en Node.js/Express conectado a MySQL, y una interfaz web en React para listar, crear, editar, buscar y filtrar libros. Ofrece funcionalidades completas (CRUD) sobre los libros, con filtros por género, autor y estado.
Contenido del proyecto
•	server/ – API en Node.js/Express.
•	client/ – Aplicación frontend en React.
•	biblioteca_digital.sql, Libreria.sql – Scripts SQL para crear tablas y datos iniciales.
Características
•	Listado de libros con ordenamiento y filtros configurables.
•	Creación, actualización y eliminación de libros (CRUD completo).
•	Búsqueda de libros por título.
•	Filtrado por género, autor y estado del libro.
•	Endpoints adicionales para obtener listas de géneros y autores disponibles.
Requisitos
•	Node.js (versión 16 o superior recomendada).
•	npm o yarn (para instalar dependencias).
•	MySQL (o MariaDB) accesible y con la base de datos creada.
Variables de entorno
El proyecto utiliza archivos .env separados para el servidor y el cliente. Crea los siguientes archivos con las variables indicadas:
•	En el servidor (server/.env):
•	PORT – Puerto en que escuchará el servidor (por defecto 8080).
•	DB_HOST – Host de la base de datos MySQL (por ejemplo, 127.0.0.1).
•	DB_PORT – Puerto de MySQL (por defecto 3306).
•	DB_USER – Usuario de MySQL.
•	DB_PASSWORD – Contraseña de MySQL.
•	DB_NAME – Nombre de la base de datos (ejemplo: biblioteca_db).
•	FRONTEND_URL – URL del cliente (por ejemplo, http://localhost:3000). Si no se define, el servidor permitirá por defecto http://localhost:3000 en CORS.
Ejemplo de archivo server/.env:
PORT=8080
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=biblioteca_db
FRONTEND_URL=http://localhost:3000
•	En el cliente (client/.env):
•	REACT_APP_API_URL – URL base para las peticiones a la API (por defecto http://localhost:8080/api).
Ejemplo de archivo client/.env:
REACT_APP_API_URL=http://localhost:8080/api
Si no defines REACT_APP_API_URL, el frontend usará http://localhost:8080/api por defecto. Si no defines FRONTEND_URL, el servidor permitirá por defecto http://localhost:3000 en CORS.
Instalación
1.	Clona el proyecto en tu máquina:

 	git clone <URL-del-repositorio> biblioteca_digital
2.	Configura la base de datos MySQL y crea la base de datos indicada en DB_NAME. Usa los archivos SQL incluidos (biblioteca_digital.sql, Libreria.sql) para crear las tablas y los datos iniciales.
Luego, instala dependencias y ejecuta cada parte de la aplicación:
Backend (servidor)
Instala dependencias y ejecuta el servidor:
cd server
npm install
•	Crea un archivo server/.env con las variables indicadas arriba.
•	En desarrollo, inicia con nodemon:
 	npm run dev
•	En producción:
 	npm start
 	El servidor se ejecuta en http://localhost:<PORT> (por defecto 8080) y expone la API en /api/libros.
Frontend (cliente)
Instala dependencias y ejecuta la aplicación React:
cd client
npm install
•	Crea un archivo client/.env si necesitas sobreescribir la URL de la API (REACT_APP_API_URL).
•	En desarrollo:
 	npm start
•	Para producción:
 	npm run build
 	La aplicación React se ejecuta por defecto en http://localhost:3000 cuando usas npm start.
API - Endpoints
Base: /api/libros
•	GET /api/libros – Obtener lista de libros.
•	Parámetros opcionales:
o	sortBy (p. ej. id, titulo) – campo por el que ordenar (por defecto id).
o	sortOrder (ASC o DESC) – orden ascendente o descendente (por defecto ASC).
o	filterBy y filterValue – filtros personalizados.
•	POST /api/libros – Crear un nuevo libro.
•	Cuerpo JSON (valores obligatorios indicados):
o	titulo (string, requerido)
o	autor (string, requerido)
o	genero (string, requerido)
o	anio (entero, rango razonable)
o	isbn (string, requerido, único)
o	estado (opcional, uno de: Disponible, Prestado, En reparación)
•	PUT /api/libros/:id – Actualizar un libro existente (mismas validaciones que en POST).
•	DELETE /api/libros/:id – Eliminar un libro por su ID.
•	GET /api/libros/buscar?titulo=... – Buscar libros por coincidencia de título.
•	GET /api/libros/generos – Obtener lista de géneros de libros disponibles.
•	GET /api/libros/autores – Obtener lista de autores disponibles.
•	GET /api/libros/filtrar/genero/:genero – Filtrar libros por género.
•	GET /api/libros/filtrar/autor/:autor – Filtrar libros por autor.
•	GET /api/libros/filtrar/estado/:estado – Filtrar libros por estado.
Ejemplo con curl (obtener libros ordenados):
curl -s "http://localhost:8080/api/libros?sortBy=titulo&sortOrder=ASC" | jq
Ejemplo curl (crear un libro):
curl -X POST http://localhost:8080/api/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Cien Años de Soledad","autor":"Gabriel García Márquez","genero":"Realismo Mágico","anio":1967,"isbn":"978-xxxx","estado":"Disponible"}'
•	Nota: El frontend incluye funciones auxiliares en client/src/services/api.js que usan axios y asumen que la URL base de la API está definida en REACT_APP_API_URL.
Base de datos
•	El proyecto utiliza el paquete mysql2/promise con un pool de conexiones (configurado en server/db.js).
•	Asegúrate de crear la base de datos y las tablas. Revisa los archivos biblioteca_digital.sql y Libreria.sql (en la raíz) para los scripts de creación de tablas y datos iniciales.
Estructura del proyecto (resumen)
•	server/
•	index.js – Punto de entrada y configuración de middlewares.
•	db.js – Configuración del pool de conexiones MySQL.
•	routes/libros.js – Definición de rutas de la API.
•	controllers/librosController.js – Lógica de las rutas (controladores).
•	services/librosService.js – Acceso a datos / consultas SQL.
•	client/
•	src/components/ – Componentes React (formularios, listas, items de libro, etc.).
•	src/services/api.js – Cliente HTTP basado en axios para llamar a la API.
•	package.json – Dependencias y scripts del frontend.
Buenas prácticas y notas
•	Usa variables de entorno para credenciales y URLs. No subas los archivos .env a repositorios públicos.
•	Validaciones en el backend realizadas con express-validator para asegurar datos correctos.
•	Seguridad HTTP mejorada usando helmet y limitadores de velocidad (rate limiting) – ambas dependencias ya están incluidas.
Contribuir
1.	Haz un fork del repositorio y crea una rama con nombre descriptivo para tus cambios.
2.	Añade tests (si aplica) y documenta las modificaciones que realices.
3.	Envía un pull request con una descripción clara de los cambios introducidos.
Licencia
Este proyecto no cuenta con una licencia explícita. Si deseas aplicar una licencia de código abierto, añade un archivo LICENSE con la licencia de tu elección.
________________________________________
