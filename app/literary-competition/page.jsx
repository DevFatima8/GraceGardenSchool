import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/community.jpg"
  },
  intro: {
    title: "Literary Competition",
    subtitle: "Celebrating Words & Ideas",
    description: "Our Literary Competition encourages students to express their creativity and hone their communication skills. The event includes poetry recitation, essay writing, storytelling, and debates, allowing our young writers and orators to shine.",
    image_url: "/uploads/community.jpg"
  }
};

export default function LiteraryCompetitionPage() {
    return <GenericPage pageSlug="literary-competition" pageTitle="Literary Competition" defaultContent={defaultContent} />;
}
