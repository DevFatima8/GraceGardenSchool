import GenericPage from "@/components/pages/our-school/GenericPage";

const defaultContent = {
  hero: {
    image_url: "/uploads/academics.jpg"
  },
  intro: {
    title: "Books Lists",
    subtitle: "Curriculum Resources",
    description: "To support our robust curriculum, we carefully select textbooks and workbooks that align with our educational standards. Our book lists are updated before the start of each academic year to ensure students have the best resources available.",
    image_url: "/uploads/academics.jpg"
  },
  lists: {
    title: "Required Reading & Supplies",
    subtitle: "By Section",
    description: "You can purchase the required books from our designated campus bookstore or any authorized dealer.",
    json_data: [
      {
        title: "Pre-School (Early Years)",
        description: "Focuses on interactive workbooks, phonics readers, coloring books, and fine motor skills development materials."
      },
      {
        title: "Primary Section (Classes 1-5)",
        description: "Includes core textbooks for English, Urdu, Mathematics, Science, and Social Studies, along with supplementary reading books."
      },
      {
        title: "Middle Section (Class 6)",
        description: "Advanced subject-specific textbooks, reference materials, science lab manuals, and literature books."
      }
    ]
  }
};

export default function BooksListsPage() {
    return <GenericPage pageSlug="books-lists" pageTitle="Books Lists" defaultContent={defaultContent} />;
}
