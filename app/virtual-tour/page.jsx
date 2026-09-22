import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/community.jpg"
  },
  tour: {
    title: "Welcome to Our Campus",
    subtitle: "Virtual Tour",
    description: "Explore our beautiful campus from the comfort of your home. Grace Garden School offers state-of-the-art facilities designed to foster learning, creativity, and growth.",
    image_url: "/uploads/facilities.jpg"
  }
};

export default function VirtualTourPage() {
    return <GenericPage pageSlug="virtual-tour" pageTitle="Virtual Tour" defaultContent={defaultContent} />;
}
