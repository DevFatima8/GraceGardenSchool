import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/community.jpg"
  },
  intro: {
    title: "School Day",
    subtitle: "Daily Excellence",
    description: "A typical School Day at Grace Garden is filled with engaging academic sessions, interactive peer learning, and physical activities. We ensure a balanced routine that keeps students motivated, energized, and ready to learn throughout the day.",
    image_url: "/uploads/community.jpg"
  }
};

export default function SchoolDayPage() {
    return <GenericPage pageSlug="school-day" pageTitle="School Day" defaultContent={defaultContent} />;
}
