import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/faculty.jpg"
  },
  intro: {
    title: "Build a Rewarding Teaching Career",
    subtitle: "Join Our Faculty",
    description: "At Grace Garden School, we are always looking for passionate, certified, and forward-thinking educators and administrative professionals who want to make a meaningful difference in the lives of young learners.",
    image_url: "/uploads/faculty.jpg"
  },
  jobs: {
    title: "Open Positions",
    subtitle: "Current Opportunities",
    description: "Explore the roles currently available at our campus.",
    json_data: [
      { 
          title: 'Pre-School / Montessori', 
          subtitle: 'Early Childhood Wing', 
          description: 'Montessori Diploma / Graduate with 2+ years of early childhood teaching experience.', 
          image_url: '/uploads/activities.jpg' 
      },
      { 
          title: 'Primary English & Science', 
          subtitle: 'Primary Wing (Grades 1-5)', 
          description: 'B.Ed / BS English or Science with strong pedagogical skills and fluency.', 
          image_url: '/uploads/academics.jpg' 
      },
      { 
          title: 'Mathematics & Computer', 
          subtitle: 'Middle Wing', 
          description: 'BS Mathematics / Computer Science with experience in middle school syllabi.', 
          image_url: '/uploads/test.jpg' 
      },
    ]
  },
  apply: {
    title: "How to Apply",
    subtitle: "Join the Team",
    description: "Please email your updated CV/Resume mentioning the position in the subject line to admin@gracegardenschool.com or drop your CV at our campus in Sector C-2, Block 5, Green Town, Lahore. Our HR department will reach out to shortlisted candidates.",
    image_url: "/uploads/community.jpg"
  }
};

export default function Page() {
    return <GenericPage pageSlug="careers" pageTitle="Careers" defaultContent={defaultContent} />;
}
