import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/facilities.jpg"
  },
  intro: {
    title: "Computer Lab",
    subtitle: "Technology & Innovation",
    description: "Our state-of-the-art Computer Lab is equipped with the latest hardware and software to ensure students are well-versed in modern technology. From basic computer literacy to advanced programming and design, our lab provides the perfect environment for digital learning.",
    image_url: "/uploads/facilities.jpg"
  }
};

export default function ComputerLabPage() {
    return <GenericPage pageSlug="computer-lab" pageTitle="Computer Lab" defaultContent={defaultContent} />;
}
