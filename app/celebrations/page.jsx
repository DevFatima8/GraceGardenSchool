import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/activities.jpg"
  },
  intro: {
    title: "Celebrations",
    subtitle: "Joy & Unity",
    description: "We believe in celebrating our diverse culture and milestones together. Throughout the year, we host various celebrations including cultural days, national holidays, and school anniversaries, bringing joy and a sense of unity to our community.",
    image_url: "/uploads/activities.jpg"
  }
};

export default function CelebrationsPage() {
    return <GenericPage pageSlug="celebrations" pageTitle="Celebrations" defaultContent={defaultContent} />;
}
