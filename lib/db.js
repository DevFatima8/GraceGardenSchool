import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: process.env.DB_DATABASE || 'school',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'Ali@786',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
});

let tablesEnsured = false;
let ensurePromise = null;

const originalQuery = pool.query.bind(pool);

async function ensureTables() {
  if (tablesEnsured) return;
  if (!ensurePromise) {
    ensurePromise = (async () => {
      try {
        await originalQuery(`
          CREATE TABLE IF NOT EXISTS home_content (
            id INT AUTO_INCREMENT PRIMARY KEY,
            section_id VARCHAR(100) NOT NULL UNIQUE,
            title VARCHAR(255) NULL,
            subtitle VARCHAR(255) NULL,
            description LONGTEXT NULL,
            image_url VARCHAR(500) NULL,
            json_data LONGTEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        await originalQuery(`
          CREATE TABLE IF NOT EXISTS about_content (
            id INT AUTO_INCREMENT PRIMARY KEY,
            section_id VARCHAR(100) NOT NULL UNIQUE,
            title VARCHAR(255) NULL,
            subtitle VARCHAR(255) NULL,
            description LONGTEXT NULL,
            image_url VARCHAR(500) NULL,
            json_data LONGTEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        await originalQuery(`
          CREATE TABLE IF NOT EXISTS our_school_content (
            id INT AUTO_INCREMENT PRIMARY KEY,
            page_slug VARCHAR(100) NOT NULL,
            section_id VARCHAR(100) NOT NULL,
            title VARCHAR(255) NULL,
            subtitle VARCHAR(255) NULL,
            description LONGTEXT NULL,
            image_url VARCHAR(500) NULL,
            json_data LONGTEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY unique_page_section (page_slug, section_id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        await originalQuery(`
          CREATE TABLE IF NOT EXISTS site_visits (
            id INT AUTO_INCREMENT PRIMARY KEY,
            visit_date DATE NOT NULL UNIQUE,
            visits_count INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        tablesEnsured = true;
      } catch (err) {
        console.error('Auto DB Schema check notice:', err.message);
      }
    })();
  }
  return ensurePromise;
}

pool.query = async (...args) => {
  if (!tablesEnsured) {
    await ensureTables();
  }
  return originalQuery(...args);
};

export default pool;
