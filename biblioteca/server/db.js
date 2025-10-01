/**
 * Configuración de conexión a la base de datos MySQL
 * Utiliza un pool de conexiones para optimizar el rendimiento
 * Las credenciales se cargan desde variables de entorno (.env)
 */
const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Pool de conexiones a MySQL
 * Permite reutilizar conexiones y gestionar múltiples peticiones concurrentes.
 * Esto reduce la sobrecarga de crear/cerrar conexiones en cada petición.
 *
 * Parámetros de configuración:
 * - host: Dirección del servidor MySQL (por defecto 127.0.0.1)
 * - port: Puerto de MySQL (por defecto 3306)
 * - user: Usuario de la base de datos (desde DB_USER)
 * - password: Contraseña del usuario (desde DB_PASSWORD)
 * - database: Nombre de la base de datos (desde DB_NAME)
 * - waitForConnections: Si true, las peticiones esperan cuando no hay conexiones disponibles
 * - connectionLimit: Número máximo de conexiones simultáneas en el pool (10 por defecto)
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
