const mysql = require('mysql2/promise');
// Removed dotenv require


// Read from .env manually to avoid dependency issues if dotenv isn't installed
const fs = require('fs');
const envContent = fs.readFileSync('./.env', 'utf8');
const envConfig = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envConfig[match[1].trim()] = match[2].trim();
  }
});

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: envConfig.DB_HOST || '127.0.0.1',
      port: envConfig.DB_PORT || 3306,
      user: envConfig.DB_USERNAME || 'root',
      password: envConfig.DB_PASSWORD || 'Ali@786',
    });

    const dbName = envConfig.DB_DATABASE || 'school';
    console.log(`Connected to MySQL server. Attempting to create database '${dbName}'...`);
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database '${dbName}' successfully created (or already exists).`);
    
    // Check if we need to create some initial tables (e.g. for users/admin)?
    // For now just creating the DB is enough.
    
    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

createDatabase();
