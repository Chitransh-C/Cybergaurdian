import mysql from 'mysql2/promise';
import config from '../config/env.config.js';

/**
 * Database Connection Manager (Singleton Pattern)
 * Encapsulates MySQL connection pool lifecycle.
 */
class DatabaseConnection {
  constructor() {
    this.pool = mysql.createPool({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
      waitForConnections: true,
      connectionLimit: config.database.connectionLimit,
      queueLimit: 0,
      dateStrings: true,
      decimalNumbers: true
    });
  }

  getPool() {
    return this.pool;
  }

  async testConnection() {
    try {
      const conn = await this.pool.getConnection();
      const [rows] = await conn.query('SELECT 1 as connected, VERSION() as version');
      conn.release();
      return {
        success: true,
        version: rows[0].version,
        database: config.database.name,
        host: config.database.host,
        port: config.database.port
      };
    } catch (err) {
      return {
        success: false,
        error: err.message
      };
    }
  }

  async close() {
    await this.pool.end();
  }
}

export const dbConnection = new DatabaseConnection();
export const pool = dbConnection.getPool();
export default pool;
