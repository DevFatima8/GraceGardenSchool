const fs = require('fs');
const mysql = require('mysql2/promise');

async function run() {
  try {
    const envFile = fs.readFileSync('.env', 'utf-8');
    const env = {};
    envFile.split('\n').forEach(line => {
      if (line && !line.startsWith('#') && line.includes('=')) {
        const [key, ...value] = line.split('=');
        env[key.trim()] = value.join('=').trim();
      }
    });

    const connection = await mysql.createConnection({
      host: env.DB_HOST,
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      port: env.DB_PORT
    });

    console.log("Clearing data...");

    await connection.query('TRUNCATE TABLE site_visits');
    await connection.query('TRUNCATE TABLE admissions');
    await connection.query('TRUNCATE TABLE contact_messages');

    console.log("Data cleared!");
    await connection.end();
  } catch (error) {
    console.error(error);
  }
}

run();
