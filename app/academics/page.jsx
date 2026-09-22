import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/academics.jpg"
  },
  programs: {
    title: "Academic Excellence",
    subtitle: "III. Academic Programs",
    description: "High-quality academic programs are the foundation of student success and achievement.\n\nPrimary Education (K-6): Our primary program focuses on building strong foundations in literacy, numeracy, and critical thinking. Core subjects include Mathematics, English, Science, and Social Studies, with additional instruction in Art, Physical Education, and Music.",
    image_url: "/uploads/academics.jpg"
  },
  faculty: {
    title: "Faculty and Staff",
    subtitle: "IV. Our Educators",
    description: "The quality of teaching staff directly impacts the learning experience. Our faculty is dedicated to fostering academic excellence.",
    json_data: [
      {
        title: "Highly Qualified Teachers",
        description: "Our educators hold advanced trainings in their respective fields and are dedicated to student-centered teaching, inspiring curiosity and lifelong learning."
      },
      {
        title: "Professional Development",
        description: "Continuous learning is encouraged for all staff members. We provide ongoing training and development opportunities to ensure our educators remain at the forefront of teaching practices."
      },
      {
        title: "Supportive Administration",
        description: "Our administrative team works closely with teachers, parents, and students to ensure a seamless and supportive learning environment, focusing on student well-being and academic growth."
      }
    ]
  }
};

export default function AcademicsPage() {
    return <GenericPage pageSlug="academics" pageTitle="Academics" defaultContent={defaultContent} />;
}
