import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/facilities.jpg"
  },
  intro: {
    title: "Fee Structure",
    subtitle: "Transparent & Affordable",
    description: "At Grace Garden School, we believe in providing quality education at affordable and transparent rates. Our fee structure is designed to be comprehensive with no hidden charges, ensuring parents can plan their child's educational journey with confidence.",
    image_url: "/uploads/facilities.jpg"
  },
  fees: {
    title: "Tuition & Fees Breakdown",
    subtitle: "Monthly & Annual",
    description: "Detailed fee schedules are updated annually. Below is a general overview of our fee categories.",
    json_data: [
      {
        title: "Registration Fee",
        description: "A one-time non-refundable fee paid at the time of initial admission."
      },
      {
        title: "Monthly Tuition Fee",
        description: "Covers all regular academic instruction and day-to-day school operations. Payable by the 10th of every month."
      },
      {
        title: "Annual Charges",
        description: "Covers lab maintenance, library access, sports equipment, and annual school events."
      }
    ]
  }
};

export default function FeeStructurePage() {
    return <GenericPage pageSlug="fee-structure" pageTitle="Fee Structure" defaultContent={defaultContent} />;
}
