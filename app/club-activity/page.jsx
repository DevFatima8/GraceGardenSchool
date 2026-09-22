import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/activities.jpg"
  },
  intro: {
    title: "Club Activity Spaces",
    subtitle: "Nurturing Hobbies",
    description: "We provide dedicated spaces and resources for various clubs, including the Robotics Club, Debate Society, and Arts Club. These facilities are designed to encourage collaboration, creativity, and out-of-the-box thinking among our students.",
    image_url: "/uploads/activities.jpg"
  }
};

export default function ClubActivityPage() {
    return <GenericPage pageSlug="club-activity" pageTitle="Club Activity" defaultContent={defaultContent} />;
}
