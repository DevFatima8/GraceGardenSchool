import image1 from "../../public/assets/img/service/service-1.jpg";
import image2 from "../../public/assets/img/service/service-2.jpg";
import image3 from "../../public/assets/img/service/service-3.jpg";
import image4 from "../../public/assets/img/service/service-4.jpg";
import image5 from "../../public/assets/img/service/service-5.jpg";
import image6 from "../../public/assets/img/service/service-6.jpg";

const servicesData = [
    {
        id: 'primary-education',
        icon: <i className="flaticon-creative"></i>,
        title: 'Primary Education (K-6)',
        description: 'Building strong foundations in literacy, numeracy, and critical thinking with Mathematics, English, Science, and Social Studies.',
        number: '1',
        image: image1,
    },
    {
        id: 'pre-school',
        icon: <i className="flaticon-resource"></i>,
        title: 'Pre-School Wing',
        description: 'Montessori-inspired early learning, phonics, sensory development, and social skills in a caring, vibrant atmosphere.',
        number: '2',
        image: image2,
    },
    {
        id: 'middle-school',
        icon: <i className="flaticon-analysis"></i>,
        title: 'Middle School (Grades 6-8)',
        description: 'Subject-specialized instruction in Sciences, Mathematics, Languages, Computer Science, and character building.',
        number: '3',
        image: image3,
    },
    {
        id: 'matric-wing',
        icon: <i className="flaticon-corporate"></i>,
        title: 'Matriculation Wing (9-10)',
        description: 'BISE Lahore board exam preparation with comprehensive science laboratory practicals, test sessions, and past paper drills.',
        number: '4',
        image: image4,
    },
    {
        id: 'cambridge-pathway',
        icon: <i className="flaticon-data-science"></i>,
        title: 'Cambridge Section (CAIE)',
        description: 'Cambridge Lower Secondary and O-Level pathways focused on international standards, analytical thought, and inquiry.',
        number: '5',
        image: image5,
    },
    {
        id: 'second-shift',
        icon: <i className="flaticon-consultant-services"></i>,
        title: '2nd Shift Program',
        description: 'Quality afternoon education program offering full curriculum coverage and equal access to labs and sports facilities.',
        number: '6',
        image: image6,
    },
];

export default servicesData;