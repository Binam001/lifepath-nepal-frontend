import BookCard from "@/components/books/BookCard";
import PageTitle from "@/components/ui/PageTitle";
import { books } from "@/constants/books";

const booksBySlug = Object.fromEntries(books.map((book) => [book.slug, book]));

const sections = [
  {
    title: "Lifebook",
    subtitle:
      "Core reads for self-awareness, direction, and steady personal growth.",
    slugs: [
      "light-the-path",
      "rooted-in-resilience",
      "the-architecture-of-you",
      "the-light-from-within",
    ],
  },
  {
    title: "Job",
    subtitle:
      "Books that sharpen decision-making, confidence, and readiness for work.",
    slugs: [
      "light-the-path",
      "the-unwritten-chapter",
      "the-path-of-becoming",
      "orbital-boundaries",
    ],
  },
  {
    title: "Life",
    subtitle:
      "Minimal, thoughtful reads for relationships, resilience, and everyday clarity.",
    slugs: [
      "the-light-from-within",
      "the-geometry-of-us",
      "rooted-in-resilience",
      "the-architecture-of-you",
    ],
  },
  {
    title: "Career",
    subtitle:
      "A focused shelf for growth, ambition, and building your next chapter.",
    slugs: [
      "light-the-path",
      "the-unwritten-chapter",
      "the-path-of-becoming",
      "the-architecture-of-you",
    ],
  },
];

export default function BooksPage() {
  return (
    <main className="bg-white pt-16">
      <div className="flex flex-col gap-2 bg-linear-to-r from-blue-600 to-black px-4 py-8 text-white md:px-0">
        <PageTitle
          title="Shape your future with lifebook."
          subtitle="A simple reading shelf built around growth, work, life, and career clarity."
          titleClassName="text-2xl md:text-4xl font-bold text-white mb-4"
          subtitleClassName="text-lg text-blue-100 mb-6"
          containerClassName="text-center max-w-3xl mx-auto"
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-0 md:py-14">
        <div className="space-y-14">
          {sections.map((section, index) => {
            const sectionBooks = section.slugs
              .map((slug) => booksBySlug[slug])
              .filter(Boolean);

            return (
              <section key={section.title}>
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="mt-2 font-montserrat text-3xl font-bold tracking-[-0.04em] text-blue-500 md:text-4xl">
                      {section.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
                  {sectionBooks.map((book) => (
                    <BookCard
                      key={`${section.title}-${book.id}`}
                      slug={book.slug}
                      title={book.title}
                      author={book.author}
                      description={book.description}
                      category={book.category}
                      genre={book.genre}
                      image={book.image}
                      priceNpr={book.priceNpr}
                      isbn={book.isbn}
                      isBestSeller={book.isBestSeller}
                      pageImageCount={book.pages.length}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
