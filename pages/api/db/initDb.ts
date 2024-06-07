import pool from './database';
import useDb from './useDb';
import 'dotenv/config';

const initDb = async () => {
  try {
    await pool.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);

    await useDb();

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS links (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          userId INT UNSIGNED,
          url VARCHAR(255) NOT NULL,
          shortUrl VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          clicks INT UNSIGNED DEFAULT 0,
          lastClick TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);

    await pool.execute(`
    CREATE TABLE IF NOT EXISTS linkVisits (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        linkId INT UNSIGNED NOT NULL,
        visitedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        visitorIP VARCHAR(45), 
        referrer VARCHAR(255),
        userAgent VARCHAR(255),
        FOREIGN KEY (linkId) REFERENCES links(id) ON DELETE CASCADE
      );
    `);

    await pool.execute(`
    CREATE INDEX idx_userId ON links(userId);`);

    await pool.execute(`
    CREATE INDEX idx_shortUrl ON links(shortUrl);`);

    console.log("¡Base de datos inicializada con éxito!");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  } finally {
    await pool.end();
  }
};

initDb();