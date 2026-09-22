import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/faculty.jpg"
  },
  intro: {
    title: "Lower Primary Coordinator",
    subtitle: "Coordinators",
    description: "Welcome to the Lower Primary Coordinator department at Grace Garden School. Our focus is to ensure the highest standards of education and management, providing continuous support to both our faculty and students.",
    image_url: "/uploads/faculty.jpg"
  },
  roles: {
    title: "Key Responsibilities",
    subtitle: "What we do",
    description: "Our department plays a critical role in the smooth functioning and academic growth of the school.",
    json_data: [
      {
        title: "Curriculum Management",
        description: "Ensuring all teaching materials meet international standards.",
        image_url: "/uploads/academics.jpg"
      },
      {
        title: "Staff Support",
        description: "Providing continuous professional development for teachers.",
        image_url: "/uploads/faculty.jpg"
      },
      {
        title: "Student Progress",
        description: "Monitoring and evaluating student outcomes to maximize their potential.",
        image_url: "/uploads/activities.jpg"
      }
    ]
  }
};

export default function Page() {
    return <GenericPage pageSlug="lower-primary" pageTitle="Lower Primary Coordinator" defaultContent={defaultContent} />;
}
