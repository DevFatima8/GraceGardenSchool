import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/academics.jpg"
  },
  intro: {
    title: "School Profile",
    subtitle: "I. Introduction",
    description: "Grace Garden School is a forward-thinking educational institution dedicated to fostering a learning environment where students are encouraged to explore their full potential. Established in 2023, the school has quickly become a hub for academic excellence, character development, and extracurricular enrichment. With a holistic approach to education, Grace Garden School is committed to shaping the next generation of leaders, innovators, and responsible global citizens.",
    image_url: "/uploads/community.jpg"
  },
  programs: {
    title: "Academic Programs",
    subtitle: "III. Core Academics",
    description: "High-quality academic programs are the foundation of student success and achievement. Our primary program (K-6) focuses on building strong foundations in literacy, numeracy, and critical thinking. Core subjects include Mathematics, English, Science, and Social Studies, with additional instruction in Art, Physical Education, and Music.",
    image_url: "/uploads/academics.jpg"
  }
};

export default function CurriculumPage() {
    return <GenericPage pageSlug="curriculum" pageTitle="Curriculum" defaultContent={defaultContent} />;
}
