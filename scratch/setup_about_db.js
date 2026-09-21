const mysql = require('mysql2/promise');

async function setupDB() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    database: 'school',
    user: 'root',
    password: 'Ali@786',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  const query = `
    CREATE TABLE IF NOT EXISTS about_content (
      section_id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(255),
      subtitle VARCHAR(255),
      description TEXT,
      image_url VARCHAR(255),
      json_data JSON
    );
  `;

  try {
    console.log('Creating about_content table...');
    await pool.query(query);
    console.log('about_content table created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    await pool.end();
  }
}

setupDB();
