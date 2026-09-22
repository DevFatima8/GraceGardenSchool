import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/activities.jpg"
  },
  intro: {
    title: "Annual Sports Meet",
    subtitle: "Physical Fitness & Teamwork",
    description: "Our Annual Sports Meet is a highlight of the school year. Students from all grades participate in various athletic events including track and field, relays, and team sports. This event fosters healthy competition, sportsmanship, and physical fitness among our students.",
    image_url: "/uploads/activities.jpg"
  }
};

export default function AnnualSportsMeetPage() {
    return <GenericPage pageSlug="annual-sports-meet" pageTitle="Annual Sports Meet" defaultContent={defaultContent} />;
}
