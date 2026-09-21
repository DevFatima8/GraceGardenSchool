import team2 from "../../public/assets/img/team/team-2.jpg";
import team3 from "../../public/assets/img/team/team-3.jpg";
import team4 from "../../public/assets/img/team/team-4.jpg";
import team5 from "../../public/assets/img/team/team-5.jpg";
import team6 from "../../public/assets/img/team/team-6.jpg";

const teamData = [
    {
        id: 'administrator-ceo',
        image: { src: '/assets/img/team/ceo-administrator.jpg' },
        position: 'CEO & Administrator',
        name: 'Leadership & Administration',
        mail: 'admin@gracegardenschool.com',
        phone: '+92 300 406 6340',
        category: 'founder',
        social_link: [
            { link: 'https://www.youtube.com/@Gracegarden-d8j', target: '_blank', icon: <i className="fab fa-youtube"></i> },
            { link: '#', target: '_blank', icon: <i className="fab fa-facebook-f"></i> },
            { link: '#', target: '_blank', icon: <i className="fab fa-instagram"></i> },
        ],
    },
    {
        id: 'academic-director',
        image: team2,
        position: 'Academic Director / Principal',
        name: 'Principal & Faculty Head',
        mail: 'admin@gracegardenschool.com',
        phone: '+92 316 440 8633',
        category: 'manager',
        social_link: [
            { link: '#', target: '_blank', icon: <i className="fab fa-facebook-f"></i> },
            { link: '#', target: '_blank', icon: <i className="fab fa-instagram"></i> },
        ],
    },
    {
        id: 'pre-school-coordinator',
        image: team3,
        position: 'Pre-School Coordinator',
        name: 'Early Years Wing',
        mail: 'admin@gracegardenschool.com',
        phone: '+92 300 406 6340',
        category: 'founder',
        social_link: [
            { link: '#', target: '_blank', icon: <i className="fab fa-facebook-f"></i> },
            { link: '#', target: '_blank', icon: <i className="fab fa-instagram"></i> },
        ],
    },
    {
        id: 'primary-coordinator',
        image: team4,
        position: 'Primary Wing Coordinator',
        name: 'Primary Academic Team',
        mail: 'admin@gracegardenschool.com',
        phone: '+92 300 406 6340',
        category: 'manager',
        social_link: [
            { link: '#', target: '_blank', icon: <i className="fab fa-facebook-f"></i> },
            { link: '#', target: '_blank', icon: <i className="fab fa-instagram"></i> },
        ],
    },
    {
        id: 'matric-coordinator',
        image: team5,
        position: 'Matric & Middle Coordinator',
        name: 'Secondary Wing Team',
        mail: 'admin@gracegardenschool.com',
        phone: '+92 316 440 8633',
        category: 'manager',
        social_link: [
            { link: '#', target: '_blank', icon: <i className="fab fa-facebook-f"></i> },
            { link: '#', target: '_blank', icon: <i className="fab fa-instagram"></i> },
        ],
    },
    {
        id: 'cambridge-coordinator',
        image: team6,
        position: 'Cambridge Section Coordinator',
        name: 'O-Level Academic Team',
        mail: 'admin@gracegardenschool.com',
        phone: '+92 300 406 6340',
        category: 'manager',
        social_link: [
            { link: '#', target: '_blank', icon: <i className="fab fa-facebook-f"></i> },
            { link: '#', target: '_blank', icon: <i className="fab fa-instagram"></i> },
        ],
    },
];

export default teamData;