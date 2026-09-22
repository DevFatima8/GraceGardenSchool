import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/community.jpg"
  },
  mission: {
    title: "Mission and Vision",
    subtitle: "II. Core Values",
    description: "Mission Statement: To build a fundamental teacher-student centered environment and a broad, inspiring curriculum with engaging resources. They aim to enhance students' abilities to transform them into confident, proactive, and independent learners.\n\nVision: To empower students with knowledge and skills through exceptional mentorship, shaping them into lifelong learners who strictly adhere to the morals and ethical values of Pakistani society.",
    image_url: "/uploads/academics.jpg"
  },
  character: {
    title: "Commitment to Character",
    subtitle: "Nurturing Values",
    description: "Our curriculum emphasizes the importance of integrity, respect, and empathy, nurturing well-rounded individuals ready to make positive contributions to society.",
    json_data: [
      {
        title: "Academic Excellence",
        description: "We provide a challenging and supportive learning environment that prepares students for academic achievement and lifelong learning."
      },
      {
        title: "Empower Students",
        description: "Our vision is to empower every student to become a confident, critical thinker equipped with the skills to navigate an ever-changing world."
      },
      {
        title: "Innovative Education",
        description: "We aim to be a leader in innovative, student-centered education, integrating technology and creative teaching strategies that enhance the learning experience."
      }
    ]
  }
};

export default function CharacterConductPage() {
    return <GenericPage pageSlug="character-conduct" pageTitle="Commitment To Character And Conduct" defaultContent={defaultContent} />;
}
