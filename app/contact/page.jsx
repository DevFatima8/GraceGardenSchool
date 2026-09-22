import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/community.jpg"
  },
  contact_info: {
    type: "contact",
    title: "Contact Information",
    subtitle: "Get In Touch",
    description: "We would love to hear from you. Whether you have a question about admissions, curriculum, or anything else, our team is ready to answer all your questions.",
    address: "Sector C-2, Block 5, Green Town, Lahore",
    email: "admin@gracegardenschool.com",
    phone: "+92 300 406 6340"
  }
};

export default function ContactPage() {
    return <GenericPage pageSlug="contact" pageTitle="Contact Us" defaultContent={defaultContent} />;
}