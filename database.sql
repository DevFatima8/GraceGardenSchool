-- ==============================================================
-- Grace Garden School - Complete Database Schema & Seed Data
-- ==============================================================
-- Hostinger / MySQL Database Setup
-- Compatible with MySQL 5.7+ and MySQL 8.0+ / MariaDB
-- ==============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------------
-- Table 1: home_content
-- Stores editable sections of the homepage and team members
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_content` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `section_id` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `subtitle` VARCHAR(255) DEFAULT NULL,
  `description` LONGTEXT DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `json_data` LONGTEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_section` (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------
-- Table 2: about_content
-- Stores editable sections of the About Us page
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `about_content` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `section_id` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `subtitle` VARCHAR(255) DEFAULT NULL,
  `description` LONGTEXT DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `json_data` LONGTEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_about_section` (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------
-- Table 3: our_school_content
-- Stores sections for Our School, Classes, Departments, and Misc pages
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `our_school_content` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `page_slug` VARCHAR(100) NOT NULL,
  `section_id` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `subtitle` VARCHAR(255) DEFAULT NULL,
  `description` LONGTEXT DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `json_data` LONGTEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_page_section` (`page_slug`, `section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------
-- Table 4: site_visits
-- Stores visitor analytics for dashboard charts
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_visits` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `visit_date` DATE NOT NULL,
  `visits_count` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_visit_date` (`visit_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================
-- INITIAL SEED DATA
-- ==============================================================

-- 1. Seed home_content
INSERT INTO `home_content` (`section_id`, `title`, `subtitle`, `description`, `image_url`, `json_data`) VALUES
('hero', 'Grace Garden School', 'Cultivating Minds, Nurturing Hearts, Building Future Leaders', 'A forward-thinking educational institution in Green Town, Lahore, dedicated to academic excellence, character development, and extracurricular enrichment.', '/uploads/hero-1.jpg', '[{\"title\":\"Grace Garden School\",\"subtitle\":\"Cultivating Minds, Nurturing Hearts, Building Future Leaders\",\"description\":\"A forward-thinking educational institution in Green Town, Lahore, dedicated to academic excellence, character development, and extracurricular enrichment.\",\"image_url\":\"/uploads/hero-1.jpg\"},{\"title\":\"Inspiring Academic Excellence\",\"subtitle\":\"Discover Your Child\'s True Potential\",\"description\":\"Our modern curriculum, state-of-the-art facilities, and dedicated faculty provide an unmatched learning environment.\",\"image_url\":\"/uploads/hero-2.jpg\"},{\"title\":\"A Vibrant School Community\",\"subtitle\":\"Fostering Friendships & Social Skills\",\"description\":\"From engaging extracurricular activities to interactive learning sessions, students thrive in our supportive community.\",\"image_url\":\"/uploads/hero-3.jpg\"}]'),
('about', 'School Profile', 'School Profile', 'Established in 2023, Grace Garden School has quickly become a hub for academic excellence, character development, and extracurricular enrichment. With a holistic approach to education, we are committed to shaping the next generation of leaders, innovators, and responsible global citizens.', '/assets/img/about/about-1.jpg', NULL),
('academics', 'Foundations for Lifelong Achievement', 'Academic Programs', 'High-quality academic programs designed to foster literacy, numeracy, critical inquiry, and creative exploration from Pre-School to 6th Class.', '/uploads/academics.jpg', NULL),
('faculty', 'Dedicated to Academic Excellence & Mentorship', 'Faculty and Staff', 'Our educators hold advanced trainings and are committed to student-centered teaching, continuous professional development, and supportive administration.', '/assets/img/pages/experience-1.jpg', NULL),
('facilities', 'State-of-the-Art Learning Environment', 'Facilities & Resources', 'Equipped with modern classrooms, interactive digital learning tools, science laboratories, well-stocked library, and expansive sports grounds.', '/uploads/facilities.jpg', NULL),
('achievements', 'Recognized for Academic & Community Excellence', 'Achievements & Accolades', 'Top standardized scores, athletic championships, and community service recognition.', '/uploads/achievements.jpg', NULL),
('extracurricular', 'Enriching Student Life Beyond the Classroom', 'Extracurricular Activities', 'Sports festivals, Debate Club, Drama Society, Robotics Club, and meaningful community service projects.', '/uploads/extracurricular.jpg', NULL),
('future', 'Continuous Innovation & Growth', 'Future Plans & Vision', 'Planning our new campus expansion, science and innovation hub, 1:1 technology integration, and global student exchange programs.', '/uploads/future.jpg', NULL),
('team_members', 'Our Team', 'Qualified Educators', 'Dedicated faculty and staff mentoring future leaders.', '', '[{\"id\":\"sobia-waqas\",\"name\":\"Sobia Waqas\",\"position\":\"Teacher\",\"category\":\"teacher\",\"mail\":\"sobia.waqas@gracegardenschool.com\",\"phone\":\"+92 300 406 6340\",\"image\":{\"src\":\"/assets/img/team/teacher-placeholder.jpg\"}},{\"id\":\"sobia-javed\",\"name\":\"Sobia Javed\",\"position\":\"Teacher\",\"category\":\"teacher\",\"mail\":\"sobia.javed@gracegardenschool.com\",\"phone\":\"+92 300 406 6340\",\"image\":{\"src\":\"/assets/img/team/teacher-placeholder.jpg\"}},{\"id\":\"sidra-dilawar\",\"name\":\"Sidra Dilawar\",\"position\":\"Teacher\",\"category\":\"teacher\",\"mail\":\"sidra.dilawar@gracegardenschool.com\",\"phone\":\"+92 300 406 6340\",\"image\":{\"src\":\"/assets/img/team/teacher-placeholder.jpg\"}},{\"id\":\"sehrish-arif\",\"name\":\"Sehrish Arif\",\"position\":\"Teacher\",\"category\":\"teacher\",\"mail\":\"sehrish.arif@gracegardenschool.com\",\"phone\":\"+92 300 406 6340\",\"image\":{\"src\":\"/assets/img/team/teacher-placeholder.jpg\"}},{\"id\":\"aneela-iqbal\",\"name\":\"Aneela Iqbal\",\"position\":\"Teacher\",\"category\":\"teacher\",\"mail\":\"aneela.iqbal@gracegardenschool.com\",\"phone\":\"+92 300 406 6340\",\"image\":{\"src\":\"/assets/img/team/teacher-placeholder.jpg\"}}]')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `subtitle` = VALUES(`subtitle`);

-- 2. Seed about_content
INSERT INTO `about_content` (`section_id`, `title`, `subtitle`, `description`, `image_url`, `json_data`) VALUES
('hero', 'About Us', '', '', '/uploads/about-hero.jpg', NULL),
('history', 'Our History', 'A Legacy of Excellence', 'Grace Garden School was founded with a mission to deliver world-class education in an environment that fosters intellectual curiosity, moral integrity, and social responsibility. Over the years, we have grown from a small institution to a prestigious school recognized for academic excellence.', '/assets/img/about/history.jpg', NULL),
('motto', 'School Motto', 'Learn, Grow, Lead', 'Our motto reflects our commitment to continuous learning, personal growth, and developing the leaders of tomorrow.', '/assets/img/about/vision.jpg', NULL),
('vision', 'Vision Statement', 'Inspiring the Future', 'To be a leading educational institution that empowers students to reach their full potential and make a positive impact on the world.', '/assets/img/about/vision.jpg', NULL),
('board', 'Board of Governors', 'Guiding with Wisdom', 'Our dedicated board members ensure the school maintains its high standards and strategic direction.', '', '[{\"title\":\"Dr. Sarah Ahmed\",\"subtitle\":\"Chairperson\",\"description\":\"Education expert with 20 years of experience.\",\"image_url\":\"/assets/img/avatar/avatar-1.jpg\"},{\"title\":\"Mr. Ali Khan\",\"subtitle\":\"Vice Chairman\",\"description\":\"Business leader and philanthropist.\",\"image_url\":\"/assets/img/avatar/avatar-2.jpg\"}]'),
('values', 'Core Values', 'What We Stand For', 'Our core values shape our culture and community.', '/assets/img/about/values.jpg', '[{\"title\":\"Integrity\",\"description\":\"We act with honesty and strong moral principles.\"},{\"title\":\"Excellence\",\"description\":\"We strive for the highest quality in everything we do.\"},{\"title\":\"Respect\",\"description\":\"We value and celebrate diversity in our community.\"}]')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `subtitle` = VALUES(`subtitle`);

-- 3. Seed our_school_content
INSERT INTO `our_school_content` (`page_slug`, `section_id`, `title`, `subtitle`, `description`, `image_url`, `json_data`) VALUES
('contact', 'contact_info', 'Contact Information', 'Get In Touch', 'We would love to hear from you. Whether you have a question about our curriculum or anything else, our team is ready to answer all your questions.', '', '{\"address\":\"Sector C-2, Block 5, Green Town, Lahore\",\"email\":\"admin@gracegardenschool.com\",\"phone\":\"+92 300 406 6340\"}')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `subtitle` = VALUES(`subtitle`);

-- 4. Seed site_visits (Last 7 days)
INSERT INTO `site_visits` (`visit_date`, `visits_count`) VALUES
(CURDATE() - INTERVAL 6 DAY, 145),
(CURDATE() - INTERVAL 5 DAY, 190),
(CURDATE() - INTERVAL 4 DAY, 215),
(CURDATE() - INTERVAL 3 DAY, 240),
(CURDATE() - INTERVAL 2 DAY, 290),
(CURDATE() - INTERVAL 1 DAY, 320),
(CURDATE(), 185)
ON DUPLICATE KEY UPDATE `visits_count` = VALUES(`visits_count`);

SET FOREIGN_KEY_CHECKS = 1;
