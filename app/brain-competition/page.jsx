import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/academics.jpg"
  },
  intro: {
    title: "Brain of Grace Garden",
    subtitle: "Intellectual Excellence",
    description: "The 'Brain of Grace Garden' is our premier academic competition designed to challenge our brightest minds. Students compete in quizzes, problem-solving challenges, and debates covering science, mathematics, and general knowledge to win the coveted title.",
    image_url: "/uploads/academics.jpg"
  }
};

export default function BrainCompetitionPage() {
    return <GenericPage pageSlug="brain-competition" pageTitle="Brain of Grace Garden" defaultContent={defaultContent} />;
}
