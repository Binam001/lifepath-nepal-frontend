import BookSection from "@/components/books/BookSection";
import HeroSection from "@/components/shared/HeroSection";

export default function BooksPage() {
  return (
    <main className="bg-white">
      <HeroSection
        title="Shape your future with lifebook."
        subtitle="A simple reading shelf built around growth, work, life, and career clarity."
      />
      <BookSection />
    </main>
  );
}
