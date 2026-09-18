const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const { exec } = require('child_process');

// Read from .env
const envContent = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
const envConfig = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envConfig[match[1].trim()] = match[2].trim();
  }
});

const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helper to download image using curl
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(uploadsDir, filename);
    exec(`curl -L "${url}" -o "${filePath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`curl error: ${error}`);
        reject(error);
        return;
      }
      resolve(`/uploads/${filename}`);
    });
  });
}

const seedData = [
  {
    section_id: 'hero',
    title: 'Grace Garden School',
    subtitle: 'Sector C-2, Block 5, Green Town, Lahore',
    description: 'A forward-thinking educational institution dedicated to fostering a learning environment where students are encouraged to explore their full potential.',
    imageUrl: 'https://picsum.photos/id/10/1200/800',
    imageName: 'hero-bg.jpg'
  },
  {
    section_id: 'about',
    title: 'School Profile',
    subtitle: 'Established in 2023',
    description: 'Grace Garden School has quickly become a hub for academic excellence, character development, and extracurricular enrichment. With a holistic approach to education, Grace Garden School is committed to shaping the next generation of leaders, innovators, and responsible global citizens.',
    imageUrl: 'https://picsum.photos/id/1073/1200/800',
    imageName: 'about.jpg'
  },
  {
    section_id: 'mission',
    title: 'Mission and Vision',
    subtitle: 'To build a fundamental teacher-student centered environment',
    description: 'Mission Statement: To build a fundamental teacher-student centered environment and a broad, inspiring curriculum with engaging resources. They aim to enhance students\' abilities to transform them into confident, proactive, and independent learners.\n\nVision: To empower students with knowledge and skills through exceptional mentorship, shaping them into lifelong learners who strictly adhere to the morals and ethical values of Pakistani society.',
    imageUrl: 'https://picsum.photos/id/117/1200/800',
    imageName: 'mission.jpg'
  },
  {
    section_id: 'academics',
    title: 'Academic Programs',
    subtitle: 'High-quality academic programs are the foundation of student success',
    description: 'Primary Education (K-6): Our primary program focuses on building strong foundations in literacy, numeracy, and critical thinking. Core subjects include Mathematics, English, Science, and Social Studies, with additional instruction in Art, Physical Education, and Music.',
    imageUrl: 'https://picsum.photos/id/119/1200/800',
    imageName: 'academics.jpg'
  },
  {
    section_id: 'faculty',
    title: 'Faculty and Staff',
    subtitle: 'Dedicated to fostering academic excellence',
    description: 'Highly Qualified Teachers: Our educators hold advanced trainings in their respective fields and are dedicated to student-centered teaching, inspiring curiosity and lifelong learning.\nProfessional Development: Continuous learning is encouraged for all staff members.',
    imageUrl: 'https://picsum.photos/id/145/1200/800',
    imageName: 'faculty.jpg'
  },
  {
    section_id: 'facilities',
    title: 'Facilities and Resources',
    subtitle: 'Enriching Learning Environment',
    description: 'Modern Classrooms: Equipped with cutting-edge technology, including interactive whiteboards and digital learning tools. Library and Media Center: A well-stocked library with access to both print and digital resources.',
    imageUrl: 'https://picsum.photos/id/163/1200/800',
    imageName: 'facilities.jpg'
  },
  {
    section_id: 'extracurricular',
    title: 'Extracurricular Activities',
    subtitle: 'Developing well-rounded students',
    description: 'Sports Festival: Soccer, basketball, volleyball, and track. Clubs and Societies: Debate Club, Drama Society, and Robotics Club. Community Service: Outreach programs for civic duty.',
    imageUrl: 'https://picsum.photos/id/183/1200/800',
    imageName: 'extracurricular.jpg'
  },
  {
    section_id: 'admissions',
    title: 'Admissions',
    subtitle: 'Join the Grace Garden Community',
    description: 'Prospective students and their families are invited to tour the school, meet with faculty, and submit an application for admission. We offer scholarships and financial aid for students demonstrating academic excellence or financial need.',
    imageUrl: 'https://picsum.photos/id/20/1200/800',
    imageName: 'admissions.jpg'
  },
  {
    section_id: 'achievements',
    title: 'Achievements and Accolades',
    subtitle: 'Commitment to Excellence',
    description: 'Our students have consistently achieved top scores in standardized tests. Our sports teams have won numerous district and state championships. Grace Garden School has been recognized for its local community service initiatives.',
    imageUrl: 'https://picsum.photos/id/201/1200/800',
    imageName: 'achievements.jpg'
  },
  {
    section_id: 'future',
    title: 'Future Plans',
    subtitle: 'Continuous Improvement',
    description: 'Campus Expansion: Planning a new state-of-the-art facility including a science lab. Technology Integration: Expanding our 1:1 device program. Global Exchange Programs: Establishing partnerships with international schools.',
    imageUrl: 'https://picsum.photos/id/214/1200/800',
    imageName: 'future.jpg'
  }
];

async function seedDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: envConfig.DB_HOST || '127.0.0.1',
      port: envConfig.DB_PORT || 3306,
      user: envConfig.DB_USERNAME || 'root',
      password: envConfig.DB_PASSWORD || 'Ali@786',
      database: envConfig.DB_DATABASE || 'school'
    });

    console.log('Downloading images and inserting data...');
    for (const data of seedData) {
      console.log(`Processing section: ${data.section_id}`);
      let localImageUrl = '';
      if (data.imageUrl) {
        console.log(`Downloading image for ${data.section_id}...`);
        try {
          localImageUrl = await downloadImage(data.imageUrl, data.imageName);
        } catch (e) {
          console.error(`Failed to download ${data.section_id}, using placeholder.`);
          localImageUrl = await downloadImage(`https://picsum.photos/1200/800?random=${Math.random()}`, data.imageName);
        }
      }

      await connection.query(`
        INSERT INTO home_content (section_id, title, subtitle, description, image_url)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          subtitle = VALUES(subtitle),
          description = VALUES(description),
          image_url = VALUES(image_url)
      `, [data.section_id, data.title, data.subtitle, data.description, localImageUrl]);
      console.log(`Saved ${data.section_id} to database.`);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (connection) await connection.end();
  }
}

seedDatabase();
