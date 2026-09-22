import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/activities.jpg"
  },
  overview: {
    title: "Admissions Overview",
    subtitle: "Welcome to Grace Garden",
    description: "At Grace Garden School, we welcome ambitious learners from Pre-School to 6th Class. Our admissions process is designed to identify students who are eager to learn, grow, and thrive in an intellectually inspiring and nurturing environment.\n\nWe admit students on merit, baseline assessment evaluation, and family interview, ensuring each child receives the personalized attention and academic support required to excel.",
    image_url: "/uploads/facilities.jpg"
  },
  why_ggs: {
    title: "Why Choose Us?",
    subtitle: "The Grace Garden Advantage",
    description: "Our core values and infrastructure set us apart, providing an unparalleled educational experience for your child.",
    json_data: [
      {
        title: "Certified & Caring Faculty",
        description: "Our educators combine proven subject expertise with empathetic, student-centered teaching methodologies.",
        image_url: "/uploads/academics.jpg"
      },
      {
        title: "Modern STEM & IT Labs",
        description: "Equipped with science labs, computer workstations, robotics, and interactive learning tools.",
        image_url: "/uploads/facilities.jpg"
      },
      {
        title: "Character & Values",
        description: "Comprehensive co-curricular activities, ethical grooming, leadership clubs, and sports galas.",
        image_url: "/uploads/community.jpg"
      }
    ]
  },
  process: {
    title: "Admission Process",
    subtitle: "Step by Step",
    description: "Follow these simple steps to enroll your child at Grace Garden School.",
    json_data: [
      {
        title: "Step 1: Registration",
        description: "Submit online registration form or collect the prospectus packet from the admissions desk.",
        image_url: "/uploads/activities.jpg"
      },
      {
        title: "Step 2: Assessment",
        description: "Age-appropriate written assessment/informal observation to evaluate readiness and grade placement.",
        image_url: "/uploads/academics.jpg"
      },
      {
        title: "Step 3: Interview",
        description: "Parent and student interactive session with the principal/wing coordinator.",
        image_url: "/uploads/community.jpg"
      },
      {
        title: "Step 4: Fee & Enrollment",
        description: "Submission of required documents, fee voucher payment, and receipt of admission confirmation.",
        image_url: "/uploads/facilities.jpg"
      }
    ]
  }
};

export default function AdmissionsPage() {
    return <GenericPage pageSlug="admissions" pageTitle="Admissions" defaultContent={defaultContent} />;
}
