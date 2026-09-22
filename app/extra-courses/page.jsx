import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/academics.jpg"
  },
  intro: {
    title: "Extra Courses",
    subtitle: "Chinese, AI & Robotics",
    description: "To prepare our students for the future, we offer specialized extra courses. Our curriculum includes Chinese language classes for global competency, as well as Artificial Intelligence and Robotics courses to build strong foundations in emerging tech fields.",
    image_url: "/uploads/academics.jpg"
  }
};

export default function ExtraCoursesPage() {
    return <GenericPage pageSlug="extra-courses" pageTitle="Extra Courses" defaultContent={defaultContent} />;
}
