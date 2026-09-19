const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const envContent = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
const envConfig = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envConfig[match[1].trim()] = match[2].trim();
  }
});

async function setup() {
  console.log('Connecting to new database...');
  try {
    const connection = await mysql.createConnection({
      host: envConfig.DB_HOST || '127.0.0.1',
      port: envConfig.DB_PORT || 3306,
      user: envConfig.DB_USERNAME || 'root',
      password: envConfig.DB_PASSWORD || '',
      database: envConfig.DB_DATABASE || 'test'
    });
    
    console.log('Connected! Creating table home_content...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS home_content (
        section_id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255),
        subtitle VARCHAR(255),
        description TEXT,
        image_url VARCHAR(255)
      )
    `);
    console.log('Table home_content created successfully.');
    
    await connection.end();
  } catch (error) {
    console.error('Error setting up DB:', error);
  }
}

setup();
