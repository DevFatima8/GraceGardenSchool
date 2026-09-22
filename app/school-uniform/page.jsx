import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/community.jpg"
  },
  uniform: {
    title: "School Uniform",
    subtitle: "Dress Code Guidelines",
    description: "At Grace Garden School, we believe that wearing a uniform fosters a sense of unity, equality, and pride among our students. Our uniform policy is designed to be comfortable and practical for daily school activities.",
    image_url: "/uploads/community.jpg"
  }
};

export default function SchoolUniformPage() {
    return <GenericPage pageSlug="school-uniform" pageTitle="School Uniform" defaultContent={defaultContent} />;
}
