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

    console.log("Creating tables...");

    // 1. Create site_visits table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_visits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        visit_date DATE UNIQUE NOT NULL,
        visits_count INT DEFAULT 0
      )
    `);

    // 2. Create admissions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        program VARCHAR(255),
        status ENUM('pending', 'reviewed') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create contact_messages table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        message TEXT,
        status ENUM('unread', 'read') DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Inserting mock data...");

    // Insert mock visits for the last 7 days
    const visitData = [
      { offset: 6, count: 120 },
      { offset: 5, count: 200 },
      { offset: 4, count: 150 },
      { offset: 3, count: 250 },
      { offset: 2, count: 300 },
      { offset: 1, count: 180 },
      { offset: 0, count: 90 },
    ];
    for (const v of visitData) {
      await connection.query(
        `INSERT IGNORE INTO site_visits (visit_date, visits_count) VALUES (DATE_SUB(CURDATE(), INTERVAL ? DAY), ?)`,
        [v.offset, v.count]
      );
    }

    // Insert mock admissions for the last 6 months
    const admissionCounts = [10, 15, 30, 25, 40, 65]; // Oldest to newest (last 6 months)
    for (let i = 0; i < admissionCounts.length; i++) {
      const monthOffset = 5 - i;
      const count = admissionCounts[i];
      for (let j = 0; j < count; j++) {
         // Create dummy admission records
         await connection.query(
           `INSERT INTO admissions (student_name, program, created_at) VALUES (?, ?, DATE_SUB(CURDATE(), INTERVAL ? MONTH))` ,
           [`Student ${monthOffset}-${j}`, 'Matric', monthOffset]
         );
      }
    }

    // Insert some unread messages
    await connection.query(`INSERT INTO contact_messages (name, email, message, status) VALUES ('John Doe', 'john@example.com', 'How to apply?', 'unread')`);
    await connection.query(`INSERT INTO contact_messages (name, email, message, status) VALUES ('Jane Smith', 'jane@example.com', 'Fee structure?', 'unread')`);
    await connection.query(`INSERT INTO contact_messages (name, email, message, status) VALUES ('Ali', 'ali@example.com', 'Location?', 'unread')`);

    console.log("Done!");
    await connection.end();
  } catch (error) {
    console.error(error);
  }
}

run();
