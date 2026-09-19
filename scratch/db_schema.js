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

    const [tables] = await connection.query('SHOW TABLES');
    console.log("Tables:");
    console.log(tables);

    // For each table, get the columns
    for (const tableRow of tables) {
      const tableName = Object.values(tableRow)[0];
      const [columns] = await connection.query(`SHOW COLUMNS FROM ${tableName}`);
      console.log(`\nTable: ${tableName}`);
      console.log(columns.map(c => `${c.Field} (${c.Type})`).join(', '));
    }

    await connection.end();
  } catch (error) {
    console.error(error);
  }
}

run();
