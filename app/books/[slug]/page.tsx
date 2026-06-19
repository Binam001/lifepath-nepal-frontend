import { notFound } from "next/navigation";
import { booksBySlug } from "@/constants/books";
import BookDetailView from "@/components/books/BookDetailView";

type BookDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { slug } = await params;
  const book = booksBySlug[slug];

  if (!book) {
    notFound();
  }

  return <BookDetailView book={book} />;
}
