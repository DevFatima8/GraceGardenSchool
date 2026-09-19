const fs = require('fs');
const path = require('path');

const appDir = 'd:\\heapware\\GraceGardenSchool\\app';

const pagesToCreate = [
  // General & School
  { slug: 'virtual-tour', title: 'Virtual Tour', subtitle: 'Explore Grace Garden School Campus', desc: 'Take an interactive virtual walkthrough of our state-of-the-art campus facilities, classrooms, playgrounds, and specialized labs in Green Town, Lahore.' },
  { slug: 'gallery', title: 'Photo Gallery', subtitle: 'Memories & Celebrations', desc: 'Explore moments of joy, academic achievements, sports galas, cultural days, and co-curricular activities at Grace Garden School.' },
  { slug: 'commitment-to-character-and-conduct', title: 'Commitment to Character & Conduct', subtitle: 'Values, Ethics & Discipline', desc: 'Grace Garden School emphasizes moral integrity, civic responsibility, mutual respect, and disciplined conduct in every student.' },
  
  // Beyond the Classroom
  { slug: 'morning-assembly', title: 'Morning Assembly', subtitle: 'Starting the Day with Inspiration & Unity', desc: 'Our morning assembly fosters spiritual grounding, national pride, public speaking skills, and daily motivation for students and faculty.' },
  { slug: 'outreach-programs', title: 'Outreach Programs', subtitle: 'Community Service & Social Impact', desc: 'Empowering students to connect with society through charity drives, environmental campaigns, and community welfare initiatives.' },
  { slug: 'service-learning', title: 'Service Learning', subtitle: 'Learning by Helping Others', desc: 'Integrating classroom knowledge with hands-on community service to develop compassionate, proactive, and socially responsible citizens.' },
  { slug: 'mun', title: 'Model United Nations (MUN)', subtitle: 'Diplomacy, Debate & Global Leadership', desc: 'Training future diplomats and global thinkers in parliamentary debate, international relations, conflict resolution, and public speaking.' },
  { slug: 'annual-drama', title: 'Annual Drama', subtitle: 'Theatrical Arts & Creative Expression', desc: 'Showcasing our students’ creative flair, stage performance, storytelling, and artistic expression through annual theatrical productions.' },
  { slug: 'science-art-exhibition', title: 'Science & Art Exhibition', subtitle: 'Innovation, Creativity & Discovery', desc: 'An inspiring platform where students display working STEM models, robotics experiments, visual art masterpieces, and creative crafts.' },

  // Yearly Competitions
  { slug: 'annual-sports-meet', title: 'Annual Sports Meet', subtitle: 'Athletics, Teamwork & Sportsmanship', desc: 'Celebrating athleticism, endurance, team spirit, and healthy competition with track events, football, cricket, badminton, and gymnastics.' },
  { slug: 'brain-competition', title: 'Brain Competition', subtitle: 'Quiz, Logic & Academic Brilliance', desc: 'An intellectual contest testing general knowledge, logical reasoning, mathematics, and scientific acumen across all grade levels.' },
  { slug: 'literary-competition', title: 'Literary Competition', subtitle: 'Debates, Speeches & Creative Writing', desc: 'Fostering eloquence, critical thought, and literary appreciation in English and Urdu debates, declamation contests, and essay writing.' },

  // Facilities
  { slug: 'computer-lab', title: 'Computer Lab & IT Center', subtitle: 'Modern Computing & Digital Literacy', desc: 'High-speed internet-connected workstations equipped with modern software for coding, digital skills, graphic design, and research.' },
  { slug: 'science-lab', title: 'Science Laboratories', subtitle: 'Hands-on Experiments in Physics, Chemistry & Biology', desc: 'Fully equipped physics, chemistry, and biology laboratories meeting national and international safety and experimentation standards.' },
  { slug: 'club-activity', title: 'Clubs & Societies', subtitle: 'Nurturing Passions Beyond Textbooks', desc: 'Join diverse student clubs including Robotics, Debating, Environmental Action, Coding, Arts & Crafts, Drama, and Music.' },
  { slug: 'extra-courses', title: 'Specialized Courses (Chinese, AI, Robotics)', subtitle: 'Future-Ready Skills & Languages', desc: 'Empowering learners with modern 21st-century capabilities including conversational Mandarin Chinese, Artificial Intelligence basics, and STEM Robotics.' },

  // Journals / Articles
  { slug: 'how-to-prepare-your-child-for-school', title: 'How to Prepare Your Child for School', subtitle: 'Parenting Guide & Transition Tips', desc: 'Essential practical advice for parents on easing school transitions, establishing morning routines, and fostering an enthusiastic attitude towards learning.' },
  { slug: 'dress-code-uniform-rules', title: 'Dress Code & Uniform Rules', subtitle: 'Neatness, Identity & Discipline', desc: 'Comprehensive guidelines on Grace Garden School’s official student uniform, seasonal wear, grooming standards, and dress code policies.' },
  { slug: 'why-early-year-education', title: 'Why Early Year Education Matters', subtitle: 'Building Lifelong Foundations', desc: 'Exploring how holistic play-based inquiry, emotional nurturing, and foundational literacy in early childhood shape future academic success.' },
  { slug: 'result-day-a-parent-reset-plan', title: 'Result Day: A Parent Reset Plan', subtitle: 'Constructive Reflection & Encouragement', desc: 'How to approach academic report cards with empathy, recognize effort over perfection, and create supportive improvement goals with your child.' },
  { slug: 'guide-for-choosing-best-school', title: 'Guide for Choosing the Best School', subtitle: 'Making the Right Choice for Your Child', desc: 'Key factors to consider when selecting an educational institution: academic standards, teacher qualifications, facilities, values, and student well-being.' },

  // Events
  { slug: 'school-day', title: 'School Day Celebrations', subtitle: 'Honoring Excellence & School Spirit', desc: 'A grand celebration celebrating foundation day, student achievements, faculty dedication, and parent partnerships.' },
  { slug: 'celebrations', title: 'Festivals & Celebrations', subtitle: 'Cultural Harmony & Festive Joy', desc: 'Marking Pakistan Day, Independence Day, Eid, Christmas, Iqbal Day, and Global Peace Days with unity, joy, and cultural pride.' },

  // Classes - Pre School
  { slug: 'pre-nursery', title: 'Pre-Nursery Class', subtitle: 'Early Childhood Care & Sensory Learning', desc: 'A gentle, playful introduction to structured learning, sensory discovery, motor skill development, and social bonding.' },
  { slug: 'nursery-a', title: 'Nursery A Class', subtitle: 'Foundational Phonics, Numbers & Social Skills', desc: 'Building early language skills, numeric concepts, social etiquette, and creative curiosity through interactive Montessori methods.' },
  { slug: 'nursery-b', title: 'Nursery B Class', subtitle: 'Foundational Phonics, Numbers & Social Skills', desc: 'Interactive classroom learning focusing on cognitive development, phonics, fine motor activities, and creative storytelling.' },
  { slug: 'prep-a', title: 'Prep A Class', subtitle: 'Preparing for Primary Schooling', desc: 'Strengthening reading, writing, mathematical comprehension, and inquiry-based problem solving to ensure a confident leap into Grade 1.' },
  { slug: 'prep-b', title: 'Prep B Class', subtitle: 'Preparing for Primary Schooling', desc: 'Comprehensive preparatory curriculum cultivating independent thinking, cooperative learning, and foundational academic proficiency.' },

  // Classes - Primary
  { slug: '1-a', title: 'Class 1-A', subtitle: 'Primary Education Wing', desc: 'Cultivating core literacy, numeracy, environmental awareness, and creative expression in a vibrant classroom atmosphere.' },
  { slug: '1-b', title: 'Class 1-B', subtitle: 'Primary Education Wing', desc: 'Fostering collaborative learning, reading enthusiasm, basic arithmetic, and social values for young primary learners.' },
  { slug: '2-a', title: 'Class 2-A', subtitle: 'Primary Education Wing', desc: 'Enhancing reading comprehension, mathematical reasoning, scientific curiosity, and character building.' },
  { slug: '2-b', title: 'Class 2-B', subtitle: 'Primary Education Wing', desc: 'Interactive teaching methods focusing on language fluency, numbers, artistic expression, and team projects.' },
  { slug: '3-a', title: 'Class 3-A', subtitle: 'Primary Education Wing', desc: 'Developing independent study habits, intermediate arithmetic, introductory general sciences, and social studies.' },
  { slug: '3-b', title: 'Class 3-B', subtitle: 'Primary Education Wing', desc: 'Promoting analytical thinking, creative writing, scientific inquiry, and healthy collaborative group work.' },
  { slug: '4-a', title: 'Class 4-A', subtitle: 'Primary Education Wing', desc: 'Advanced primary curriculum covering conceptual mathematics, science experiments, language mastery, and IT fundamentals.' },
  { slug: '4-b', title: 'Class 4-B', subtitle: 'Primary Education Wing', desc: 'Encouraging problem solving, reading projects, cultural studies, and sportsmanship.' },
  { slug: '5-a', title: 'Class 5-A', subtitle: 'Primary Education Wing - Graduating Primary', desc: 'Preparing students for the transition to Middle School with rigorous academics, leadership training, and digital skills.' },
  { slug: '5-b', title: 'Class 5-B', subtitle: 'Primary Education Wing - Graduating Primary', desc: 'Comprehensive revision, conceptual clarity in core subjects, and development of confident communication skills.' },

  // Classes - Middle Section
  { slug: '6-a', title: 'Class 6-A', subtitle: 'Middle School Section', desc: 'Transitioning to specialized subject teaching in Sciences, Mathematics, English, Urdu, Islamiat, Social Studies, and Computer Science.' },
  { slug: '7-a', title: 'Class 7-A', subtitle: 'Middle School Section', desc: 'Deepening analytical capabilities, science laboratory work, critical essay writing, and mathematical problem-solving.' },
  { slug: '8-a', title: 'Class 8-A', subtitle: 'Middle School Section - Pre-Secondary', desc: 'Preparing for board-level rigor, subject stream selection (Matric/Cambridge), and advanced conceptual mastery.' },

  // Classes - Matric Section
  { slug: '9-a', title: 'Class 9-A', subtitle: 'Matriculation Board Wing', desc: 'Rigorous BISE Lahore board preparation in Science (Physics, Chemistry, Biology / Computer Science) with dedicated lab work and past paper practice.' },
  { slug: '10-a', title: 'Class 10-A', subtitle: 'Matriculation Board Wing - Final Year', desc: 'Targeted exam preparation, test sessions, comprehensive revisions, and individualized mentoring for outstanding board results.' },

  // Classes - Cambridge Section
  { slug: '6-c', title: 'Grade 6-C (Cambridge)', subtitle: 'Cambridge Lower Secondary Pathway', desc: 'Inquiry-based Cambridge Lower Secondary curriculum emphasizing international benchmarks in English, Math, and Science (Checkpoint).' },
  { slug: '7-c', title: 'Grade 7-C (Cambridge)', subtitle: 'Cambridge Lower Secondary Pathway', desc: 'Advanced critical thinking, global perspectives, scientific research projects, and active problem solving.' },
  { slug: '8-c', title: 'Grade 8-C (Cambridge)', subtitle: 'Cambridge Lower Secondary Pathway', desc: 'Preparation for Cambridge Checkpoint examinations and comprehensive grounding for O-Level subject selection.' },
  { slug: '9-c', title: 'Grade 9-C (Cambridge O-Level)', subtitle: 'Cambridge IGCSE / O-Level Pathway', desc: 'Specialized Cambridge O-Level preparation with international syllabus, practical laboratory skills, and global standards.' },
  { slug: '10-c', title: 'Grade 10-C (Cambridge O-Level)', subtitle: 'Cambridge O-Level Final Year', desc: 'Intensive O-Level exam prep, past paper marathons, conceptual masterclasses, and college counseling support.' },

  // Classes - 2nd Shift
  { slug: 'nursery-e', title: 'Nursery 2nd Shift (E)', subtitle: 'Afternoon Education Program', desc: 'High quality early education in our afternoon shift, providing flexible scheduling and equal academic excellence.' },
  { slug: 'prep-e', title: 'Prep 2nd Shift (E)', subtitle: 'Afternoon Education Program', desc: 'Structured preparatory curriculum in the afternoon shift with full access to school facilities and certified faculty.' },
  { slug: '1-e', title: 'Class 1-E (2nd Shift)', subtitle: 'Afternoon Primary Education', desc: 'Dedicated afternoon primary school class following the same rigorous curriculum and interactive learning model.' },
  { slug: '2-e', title: 'Class 2-E (2nd Shift)', subtitle: 'Afternoon Primary Education', desc: 'Quality education, character building, and academic foundation in the second shift.' },
  { slug: '3-e', title: 'Class 3-E (2nd Shift)', subtitle: 'Afternoon Primary Education', desc: 'Conceptual learning, arithmetic, science, and languages tailored for afternoon shift students.' },
  { slug: '4-e', title: 'Class 4-E (2nd Shift)', subtitle: 'Afternoon Primary Education', desc: 'Engaging curriculum, lab access, and extracurricular opportunities in the afternoon program.' },
  { slug: '5-e', title: 'Class 5-E (2nd Shift)', subtitle: 'Afternoon Primary Education', desc: 'Graduating primary level in the second shift, preparing learners for middle school success.' },
  { slug: '6-e', title: 'Class 6-E (2nd Shift)', subtitle: 'Afternoon Middle Section', desc: 'Middle school academic subjects, computer literacy, and character development in the afternoon shift.' },

  // Departments & Coordinators
  { slug: 'ace', title: 'ACE - Academic Center of Excellence', subtitle: 'Curriculum Design, Quality Assurance & Faculty Training', desc: 'The Academic Center of Excellence (ACE) oversees curriculum standards, innovative pedagogy, periodic assessments, and continuous professional development for our teaching staff.' },
  { slug: 'set', title: 'SET - Student Enrichment & Training', subtitle: 'Holistic Student Development & Counseling', desc: 'The Student Enrichment & Training (SET) department leads career guidance, student counseling, leadership training, and co-curricular enrichment.' },
  { slug: 'pre-school', title: 'Pre-School Wing Coordinator', subtitle: 'Early Childhood Guidance & Support', desc: 'Dedicated leadership overseeing Kindergarten, Nursery, and Prep classes with a warm, caring, and nurturing developmental environment.' },
  { slug: 'lower-primary', title: 'Lower Primary Wing Coordinator', subtitle: 'Grades 1 & 2 Academic Coordination', desc: 'Ensuring smooth transition from kindergarten to structured primary education with emphasis on literacy, numeracy, and social integration.' },
  { slug: 'upper-primary', title: 'Upper Primary Wing Coordinator', subtitle: 'Grades 3, 4 & 5 Academic Coordination', desc: 'Guiding upper primary students toward independent thinking, scientific curiosity, and academic discipline.' },
  { slug: 'middle', title: 'Middle School Coordinator', subtitle: 'Grades 6, 7 & 8 Academic Coordination', desc: 'Supervising middle school curriculum delivery, science projects, co-curricular societies, and student mentorship.' },
  { slug: 'matric', title: 'Matriculation Wing Coordinator', subtitle: 'Grades 9 & 10 BISE Lahore Board Coordination', desc: 'Specialized academic oversight for BISE board preparation, syllabus completion, test schedules, and laboratory practicals.' },
  { slug: 'cambridge', title: 'Cambridge Section Coordinator', subtitle: 'Cambridge International Curriculum Oversight', desc: 'Directing Cambridge Lower Secondary and O-Level academic programs in accordance with Cambridge Assessment International Education (CAIE) guidelines.' },
];

function generatePageCode(page) {
  return `"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header-one";
import BreadCrumb from "@/components/pages/common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "@/components/pages/common/scroll/scroll-to-top";
import Link from "next/link";

const Page = () => {
    return (
        <>
            <SEO pageTitle="${page.title.replace(/"/g, '')}" />
            <HeaderOne />
            <BreadCrumb title="${page.title.replace(/"/g, '')}" innerTitle="${page.title.replace(/"/g, '')}" />
            
            <div className="section-padding py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 mb-4">
                                <span className="text-primary fw-bold fs-6 mb-2 d-inline-block">${page.subtitle.replace(/"/g, '')}</span>
                                <h2 className="mb-4 text-dark fw-bold">${page.title.replace(/"/g, '')}</h2>
                                <p className="lead text-muted mb-4" style={{ lineHeight: "1.8" }}>
                                    ${page.desc.replace(/"/g, '')}
                                </p>
                                
                                <div className="p-4 rounded-3 mb-4" style={{ backgroundColor: "#f8fafc", borderLeft: "4px solid #004389" }}>
                                    <h4 className="fw-bold mb-3" style={{ color: "#004389" }}>Grace Garden School Profile</h4>
                                    <p className="mb-2"><strong>Location:</strong> Sector C-2, Block 5, Green Town, Lahore</p>
                                    <p className="mb-2"><strong>Established:</strong> 2023</p>
                                    <p className="mb-0"><strong>Focus:</strong> Academic Excellence, Character Development & Co-Curricular Enrichment</p>
                                </div>

                                <h4 className="fw-bold mb-3 text-dark">Key Highlights & Objectives</h4>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2 d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Student-centered learning environment with experienced, certified faculty.</span>
                                    </li>
                                    <li className="mb-2 d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Well-equipped modern classrooms, laboratories, and multimedia facilities.</span>
                                    </li>
                                    <li className="mb-2 d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Holistic character building, ethical values, and leadership training.</span>
                                    </li>
                                    <li className="mb-2 d-flex align-items-center">
                                        <i className="fas fa-check-circle text-success me-2"></i>
                                        <span>Regular parent-teacher engagement and continuous progress tracking.</span>
                                    </li>
                                </ul>

                                <div className="d-flex flex-wrap gap-3 pt-2">
                                    <Link href="/admissions" className="btn btn-primary px-4 py-2 rounded-pill fw-semibold">
                                        Admissions Info
                                    </Link>
                                    <Link href="/contact" className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold">
                                        Contact Office
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4" style={{ backgroundColor: "#004389", color: "#fff" }}>
                                <h4 className="fw-bold mb-3 text-white">Need Assistance?</h4>
                                <p className="text-white-50 mb-4">Feel free to contact our administration for admissions, campus tours, or academic inquiries.</p>
                                <div className="mb-3">
                                    <p className="mb-1 text-white-50 small">Phone Numbers:</p>
                                    <p className="fw-bold mb-0 text-white">0300-4740054 | 0321-4822765</p>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-1 text-white-50 small">Landline:</p>
                                    <p className="fw-bold mb-0 text-white">042-35111166</p>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-1 text-white-50 small">Email Address:</p>
                                    <p className="fw-bold mb-0 text-white">gracegardenschoollahore@gmail.com</p>
                                </div>
                                <div className="mb-4">
                                    <p className="mb-1 text-white-50 small">Campus Address:</p>
                                    <p className="fw-bold mb-0 text-white">Sector C-2, Block 5, Green Town, Lahore</p>
                                </div>
                                <Link href="/contact" className="btn btn-warning w-100 py-2 rounded-pill fw-bold text-dark">
                                    Get In Touch
                                </Link>
                            </div>

                            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                                <h5 className="fw-bold mb-3 text-dark">Quick Navigation</h5>
                                <ul className="list-unstyled mb-0">
                                    <li className="py-2 border-bottom"><Link href="/about-us" className="text-decoration-none text-muted">About Grace Garden</Link></li>
                                    <li className="py-2 border-bottom"><Link href="/admissions" className="text-decoration-none text-muted">Admission Procedures</Link></li>
                                    <li className="py-2 border-bottom"><Link href="/fee-structure" className="text-decoration-none text-muted">Fee Structure</Link></li>
                                    <li className="py-2 border-bottom"><Link href="/curriculum" className="text-decoration-none text-muted">Academic Curriculum</Link></li>
                                    <li className="py-2"><Link href="/contact" className="text-decoration-none text-muted">Contact Campus</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='all-footer'>
                <FooterOne />
            </div>
            <ScrollToTop />
        </>
    );
};

export default Page;
`;
}

let createdCount = 0;
pagesToCreate.forEach(p => {
  const dir = path.join(appDir, p.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, 'page.jsx');
  fs.writeFileSync(filePath, generatePageCode(p), 'utf8');
  createdCount++;
});

console.log(`Successfully generated ${createdCount} pages!`);
