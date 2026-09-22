import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/pre_school.jpg"
  },
  intro: {
    title: "Nursery A",
    subtitle: "Pre School",
    description: "Welcome to Nursery A at Grace Garden School. Our Pre School is designed to foster a love for learning in a supportive and engaging environment. We focus on holistic development, combining academic excellence with character building.",
    image_url: "/uploads/pre_school.jpg"
  },
  curriculum: {
    title: "Curriculum & Activities",
    subtitle: "What we learn",
    description: "Our curriculum is carefully crafted to meet the developmental needs of students in Nursery A.",
    json_data: [
      {
        title: "Core Subjects",
        description: "Comprehensive instruction in English, Mathematics, Science, and Urdu.",
        image_url: "/uploads/academics.jpg"
      },
      {
        title: "Co-Curriculars",
        description: "Engaging activities including arts, sports, and character-building exercises.",
        image_url: "/uploads/activities.jpg"
      },
      {
        title: "Assessment",
        description: "Regular evaluations to track progress and provide personalized support.",
        image_url: "/uploads/facilities.jpg"
      }
    ]
  }
};

export default function Page() {
    return <GenericPage pageSlug="nursery-a" pageTitle="Nursery A" defaultContent={defaultContent} />;
}
