import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_DATABASE || 'school',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'Ali@786',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
