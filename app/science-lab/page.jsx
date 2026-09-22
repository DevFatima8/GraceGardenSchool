import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/facilities.jpg"
  },
  intro: {
    title: "Science Lab",
    subtitle: "Hands-on Discovery",
    description: "The Science Lab at Grace Garden School is a hub of exploration. Outfitted with modern safety equipment, microscopes, and chemical apparatus, it allows students to conduct practical experiments that bring their textbook theories to life.",
    image_url: "/uploads/facilities.jpg"
  }
};

export default function ScienceLabPage() {
    return <GenericPage pageSlug="science-lab" pageTitle="Science Lab" defaultContent={defaultContent} />;
}
