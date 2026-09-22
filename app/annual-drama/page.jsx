import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/activities.jpg"
  },
  intro: {
    title: "Annual Drama",
    subtitle: "Theatrical Brilliance",
    description: "The Annual Drama is a highly anticipated event where our Drama Society students perform theatrical plays. Complete with colorful costumes and stage lighting, it provides students a platform to express their artistic talents and build public speaking confidence.",
    image_url: "/uploads/activities.jpg"
  }
};

export default function AnnualDramaPage() {
    return <GenericPage pageSlug="annual-drama" pageTitle="Annual Drama" defaultContent={defaultContent} />;
}
