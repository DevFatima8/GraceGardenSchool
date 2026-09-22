import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/facilities.jpg"
  },
  intro: {
    title: "Science & Art Exhibition",
    subtitle: "Creativity & Discovery",
    description: "Our annual Science & Art Exhibition showcases the incredible talents and innovative projects created by our students. From interactive science models to breathtaking artwork, this event is a testament to our students' hard work and creativity.",
    image_url: "/uploads/facilities.jpg"
  }
};

export default function ScienceArtExhibitionPage() {
    return <GenericPage pageSlug="science-art-exhibition" pageTitle="Science & Art Exhibition" defaultContent={defaultContent} />;
}
