import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// Helper to load .env if not loaded
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: process.env.DB_DATABASE || 'school',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'Ali@786',
  connectTimeout: 10000
};

export async function runSeed() {
  console.log(`Connecting to MySQL database [${dbConfig.database}] at [${dbConfig.host}:${dbConfig.port}] as [${dbConfig.user}]...`);

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log(' Successfully connected to MySQL database.');
  } catch (err) {
    console.error(' Database connection failed:', err.message);
    if (err.code === 'ETIMEDOUT') {
      console.error('\nNOTE: If connecting to Hostinger Remote MySQL, ensure your current IP or "%" is allowed in Hostinger hPanel -> Databases -> Remote MySQL.');
    }
    throw err;
  }

  try {
    console.log('\n--- Step 1: Creating Tables if they do not exist ---');

    // 1. home_content table
    await connection.query(`
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
    console.log(' Table `home_content` verified/created.');

    // 2. about_content table
    await connection.query(`
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
    console.log(' Table `about_content` verified/created.');

    // 3. our_school_content table
    await connection.query(`
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
    console.log(' Table `our_school_content` verified/created.');

    // 4. site_visits table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_visits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        visit_date DATE NOT NULL UNIQUE,
        visits_count INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log(' Table `site_visits` verified/created.');

    console.log('\n--- Step 2: Seeding Initial Data ---');

    // Seed home_content
    const homeSections = [
      {
        section_id: 'hero',
        title: 'Grace Garden School',
        subtitle: 'Cultivating Minds, Nurturing Hearts, Building Future Leaders',
        description: 'A forward-thinking educational institution in Green Town, Lahore, dedicated to academic excellence, character development, and extracurricular enrichment.',
        image_url: '/uploads/hero-1.jpg',
        json_data: JSON.stringify([
          {
            title: 'Grace Garden School',
            subtitle: 'Cultivating Minds, Nurturing Hearts, Building Future Leaders',
            description: 'A forward-thinking educational institution in Green Town, Lahore, dedicated to academic excellence, character development, and extracurricular enrichment.',
            image_url: '/uploads/hero-1.jpg'
          },
          {
            title: 'Inspiring Academic Excellence',
            subtitle: "Discover Your Child's True Potential",
            description: 'Our modern curriculum, state-of-the-art facilities, and dedicated faculty provide an unmatched learning environment.',
            image_url: '/uploads/hero-2.jpg'
          },
          {
            title: 'A Vibrant School Community',
            subtitle: 'Fostering Friendships & Social Skills',
            description: 'From engaging extracurricular activities to interactive learning sessions, students thrive in our supportive community.',
            image_url: '/uploads/hero-3.jpg'
          }
        ])
      },
      {
        section_id: 'about',
        title: 'School Profile',
        subtitle: 'School Profile',
        description: 'Established in 2023, Grace Garden School has quickly become a hub for academic excellence, character development, and extracurricular enrichment. With a holistic approach to education, we are committed to shaping the next generation of leaders, innovators, and responsible global citizens.',
        image_url: '/assets/img/about/about-1.jpg',
        json_data: null
      },
      {
        section_id: 'academics',
        title: 'Foundations for Lifelong Achievement',
        subtitle: 'Academic Programs',
        description: 'High-quality academic programs designed to foster literacy, numeracy, critical inquiry, and creative exploration from Pre-School to 6th Class.',
        image_url: '/uploads/academics.jpg',
        json_data: null
      },
      {
        section_id: 'faculty',
        title: 'Dedicated to Academic Excellence & Mentorship',
        subtitle: 'Faculty and Staff',
        description: 'Our educators hold advanced trainings and are committed to student-centered teaching, continuous professional development, and supportive administration.',
        image_url: '/assets/img/pages/experience-1.jpg',
        json_data: null
      },
      {
        section_id: 'facilities',
        title: 'State-of-the-Art Learning Environment',
        subtitle: 'Facilities & Resources',
        description: 'Equipped with modern classrooms, interactive digital learning tools, science laboratories, well-stocked library, and expansive sports grounds.',
        image_url: '/uploads/facilities.jpg',
        json_data: null
      },
      {
        section_id: 'achievements',
        title: 'Recognized for Academic & Community Excellence',
        subtitle: 'Achievements & Accolades',
        description: 'Top standardized scores, athletic championships, and community service recognition.',
        image_url: '/uploads/achievements.jpg',
        json_data: null
      },
      {
        section_id: 'extracurricular',
        title: 'Enriching Student Life Beyond the Classroom',
        subtitle: 'Extracurricular Activities',
        description: 'Sports festivals, Debate Club, Drama Society, Robotics Club, and meaningful community service projects.',
        image_url: '/uploads/extracurricular.jpg',
        json_data: null
      },
      {
        section_id: 'future',
        title: 'Continuous Innovation & Growth',
        subtitle: 'Future Plans & Vision',
        description: 'Planning our new campus expansion, science and innovation hub, 1:1 technology integration, and global student exchange programs.',
        image_url: '/uploads/future.jpg',
        json_data: null
      },
      {
        section_id: 'team_members',
        title: 'Our Team',
        subtitle: 'Qualified Educators',
        description: 'Dedicated faculty and staff mentoring future leaders.',
        image_url: '',
        json_data: JSON.stringify([
          {
            id: 'sobia-waqas',
            name: 'Sobia Waqas',
            position: 'Teacher',
            category: 'teacher',
            mail: 'sobia.waqas@gracegardenschool.com',
            phone: '+92 300 406 6340',
            image: { src: '/assets/img/team/teacher-placeholder.jpg' }
          },
          {
            id: 'sobia-javed',
            name: 'Sobia Javed',
            position: 'Teacher',
            category: 'teacher',
            mail: 'sobia.javed@gracegardenschool.com',
            phone: '+92 300 406 6340',
            image: { src: '/assets/img/team/teacher-placeholder.jpg' }
          },
          {
            id: 'sidra-dilawar',
            name: 'Sidra Dilawar',
            position: 'Teacher',
            category: 'teacher',
            mail: 'sidra.dilawar@gracegardenschool.com',
            phone: '+92 300 406 6340',
            image: { src: '/assets/img/team/teacher-placeholder.jpg' }
          },
          {
            id: 'sehrish-arif',
            name: 'Sehrish Arif',
            position: 'Teacher',
            category: 'teacher',
            mail: 'sehrish.arif@gracegardenschool.com',
            phone: '+92 300 406 6340',
            image: { src: '/assets/img/team/teacher-placeholder.jpg' }
          },
          {
            id: 'aneela-iqbal',
            name: 'Aneela Iqbal',
            position: 'Teacher',
            category: 'teacher',
            mail: 'aneela.iqbal@gracegardenschool.com',
            phone: '+92 300 406 6340',
            image: { src: '/assets/img/team/teacher-placeholder.jpg' }
          }
        ])
      }
    ];

    for (const item of homeSections) {
      await connection.query(`
        INSERT INTO home_content (section_id, title, subtitle, description, image_url, json_data)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          title = COALESCE(title, VALUES(title)),
          subtitle = COALESCE(subtitle, VALUES(subtitle)),
          description = COALESCE(description, VALUES(description)),
          image_url = COALESCE(image_url, VALUES(image_url)),
          json_data = COALESCE(json_data, VALUES(json_data))
      `, [item.section_id, item.title, item.subtitle, item.description, item.image_url, item.json_data]);
    }
    console.log(` Seeded ${homeSections.length} sections in \`home_content\`.`);

    // Seed about_content
    const aboutSections = [
      {
        section_id: 'hero',
        title: 'About Us',
        subtitle: '',
        description: '',
        image_url: '/uploads/about-hero.jpg',
        json_data: null
      },
      {
        section_id: 'history',
        title: 'Our History',
        subtitle: 'A Legacy of Excellence',
        description: 'Grace Garden School was founded with a mission to deliver world-class education in an environment that fosters intellectual curiosity, moral integrity, and social responsibility. Over the years, we have grown from a small institution to a prestigious school recognized for academic excellence.',
        image_url: '/assets/img/about/history.jpg',
        json_data: null
      },
      {
        section_id: 'motto',
        title: 'School Motto',
        subtitle: 'Learn, Grow, Lead',
        description: 'Our motto reflects our commitment to continuous learning, personal growth, and developing the leaders of tomorrow.',
        image_url: '/assets/img/about/vision.jpg',
        json_data: null
      },
      {
        section_id: 'vision',
        title: 'Vision Statement',
        subtitle: 'Inspiring the Future',
        description: 'To be a leading educational institution that empowers students to reach their full potential and make a positive impact on the world.',
        image_url: '/assets/img/about/vision.jpg',
        json_data: null
      },
      {
        section_id: 'board',
        title: 'Board of Governors',
        subtitle: 'Guiding with Wisdom',
        description: 'Our dedicated board members ensure the school maintains its high standards and strategic direction.',
        image_url: '',
        json_data: JSON.stringify([
          { title: 'Dr. Sarah Ahmed', subtitle: 'Chairperson', description: 'Education expert with 20 years of experience.', image_url: '/assets/img/avatar/avatar-1.jpg' },
          { title: 'Mr. Ali Khan', subtitle: 'Vice Chairman', description: 'Business leader and philanthropist.', image_url: '/assets/img/avatar/avatar-2.jpg' }
        ])
      },
      {
        section_id: 'values',
        title: 'Core Values',
        subtitle: 'What We Stand For',
        description: 'Our core values shape our culture and community.',
        image_url: '/assets/img/about/values.jpg',
        json_data: JSON.stringify([
          { title: 'Integrity', description: 'We act with honesty and strong moral principles.' },
          { title: 'Excellence', description: 'We strive for the highest quality in everything we do.' },
          { title: 'Respect', description: 'We value and celebrate diversity in our community.' }
        ])
      }
    ];

    for (const item of aboutSections) {
      await connection.query(`
        INSERT INTO about_content (section_id, title, subtitle, description, image_url, json_data)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          title = COALESCE(title, VALUES(title)),
          subtitle = COALESCE(subtitle, VALUES(subtitle)),
          description = COALESCE(description, VALUES(description)),
          image_url = COALESCE(image_url, VALUES(image_url)),
          json_data = COALESCE(json_data, VALUES(json_data))
      `, [item.section_id, item.title, item.subtitle, item.description, item.image_url, item.json_data]);
    }
    console.log(` Seeded ${aboutSections.length} sections in \`about_content\`.`);

    // Seed our_school_content (contact page fallback)
    await connection.query(`
      INSERT INTO our_school_content (page_slug, section_id, title, subtitle, description, image_url, json_data)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = COALESCE(title, VALUES(title)),
        subtitle = COALESCE(subtitle, VALUES(subtitle)),
        description = COALESCE(description, VALUES(description))
    `, [
      'contact',
      'contact_info',
      'Contact Information',
      'Get In Touch',
      'We would love to hear from you. Whether you have a question about our curriculum or anything else, our team is ready to answer all your questions.',
      '',
      JSON.stringify({
        address: 'Sector C-2, Block 5, Green Town, Lahore',
        email: 'admin@gracegardenschool.com',
        phone: '+92 300 406 6340'
      })
    ]);
    console.log(' Seeded default contact page in `our_school_content`.');

    // Seed site_visits (7 days of default traffic)
    await connection.query(`
      INSERT INTO site_visits (visit_date, visits_count)
      VALUES 
        (CURDATE() - INTERVAL 6 DAY, 145),
        (CURDATE() - INTERVAL 5 DAY, 190),
        (CURDATE() - INTERVAL 4 DAY, 215),
        (CURDATE() - INTERVAL 3 DAY, 240),
        (CURDATE() - INTERVAL 2 DAY, 290),
        (CURDATE() - INTERVAL 1 DAY, 320),
        (CURDATE(), 185)
      ON DUPLICATE KEY UPDATE
        visits_count = VALUES(visits_count)
    `);
    console.log(' Seeded last 7 days of visitor analytics in `site_visits`.');

    console.log('\n DATABASE SEEDING COMPLETED SUCCESSFULLY! No errors detected.');
  } finally {
    if (connection) await connection.end();
  }
}

// Execute if run directly from CLI
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('seed.js')) {
  runSeed().catch((err) => {
    console.error('Seed process failed:', err);
    process.exit(1);
  });
}
