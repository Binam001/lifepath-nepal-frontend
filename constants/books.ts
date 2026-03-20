export type Genre = {
  name: string;
  image: string;
  icon:
    | "sparkles"
    | "target"
    | "zap"
    | "rocket"
    | "brain"
    | "repeat"
    | "compass";
};

export type BookPage = {
  id: string;
  image: string;
};

export type Book = {
  id: number;
  slug: string;
  title: string;
  author: string;
  description: string;
  category: string;
  genre: string;
  image: string;
  pages: BookPage[];
  priceNpr: number;
  isbn: string;
  publishedAt: string;
  isBestSeller: boolean;
  isFeatured: boolean;
  inStock: boolean;
};

const createPages = (slug: string, totalPages: number): BookPage[] =>
  Array.from({ length: totalPages }, (_, index) => ({
    id: `${slug}-page-${index + 1}`,
    image: `/books/${slug}/pages/page-${index + 1}.jpg`,
  }));

export const genres: Genre[] = [
  {
    name: "Self Improvement",
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
    icon: "sparkles",
  },
  {
    name: "Mindset & Discipline",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    icon: "target",
  },
  {
    name: "Productivity",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    icon: "zap",
  },
  {
    name: "Career & Growth",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    icon: "rocket",
  },
  {
    name: "Psychology & Behavior",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    icon: "brain",
  },
  {
    name: "Habits & Routine",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
    icon: "repeat",
  },
  {
    name: "Life Philosophy",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    icon: "compass",
  },
];

export const books: Book[] = [
  {
    id: 1,
    slug: "light-the-path",
    title: "Light The Path",
    author: "Elena Brooks",
    description:
      "A reflective guide about clarity, courage, and choosing direction when life feels uncertain.",
    category: "Career Guidance",
    genre: "Career & Growth",
    image: "/BooksNew/LightThePath.png",
    pages: createPages("light-the-path", 6),
    priceNpr: 899,
    isbn: "978-9937-0000-01-6",
    publishedAt: "2026-01-10",
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 2,
    slug: "orbital-boundaries",
    title: "Orbital Boundaries",
    author: "Mira Solis",
    description:
      "A thoughtful exploration of personal space, emotional limits, and the balance between connection and self-protection.",
    category: "Self Development",
    genre: "Psychology & Behavior",
    image: "/BooksNew/OrbitalBoundaries.png",
    pages: createPages("orbital-boundaries", 5),
    priceNpr: 749,
    isbn: "978-9937-0000-02-3",
    publishedAt: "2025-11-22",
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
  },
  {
    id: 3,
    slug: "rooted-in-resilience",
    title: "Rooted in Resilience",
    author: "Sana Whitmore",
    description:
      "A book about staying grounded through change, recovering from setbacks, and building steady inner strength.",
    category: "Self Development",
    genre: "Self Improvement",
    image: "/BooksNew/RootedInResilience.png",
    pages: createPages("rooted-in-resilience", 5),
    priceNpr: 599,
    isbn: "978-9937-0000-03-0",
    publishedAt: "2026-02-14",
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 4,
    slug: "the-architecture-of-you",
    title: "The Architecture of You",
    author: "Julian Hart",
    description:
      "A personal growth book about identity, design, and intentionally shaping the life you want to live.",
    category: "Life Design",
    genre: "Mindset & Discipline",
    image: "/BooksNew/TheArchitectureOfYou.png",
    pages: createPages("the-architecture-of-you", 6),
    priceNpr: 1099,
    isbn: "978-9937-0000-04-7",
    publishedAt: "2025-09-05",
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 5,
    slug: "the-geometry-of-us",
    title: "The Geometry of Us",
    author: "Claire Rowan",
    description:
      "A relationship-centered read about patterns, distance, alignment, and the shapes people create together.",
    category: "Relationships",
    genre: "Life Philosophy",
    image: "/BooksNew/TheGeometryOfUs.png",
    pages: createPages("the-geometry-of-us", 4),
    priceNpr: 799,
    isbn: "978-9937-0000-05-4",
    publishedAt: "2026-03-01",
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
  },
  {
    id: 6,
    slug: "the-light-from-within",
    title: "The Light From Within",
    author: "Amara Wells",
    description:
      "A calm, introspective book on hope, healing, and discovering the strength already living inside you.",
    category: "Inner Growth",
    genre: "Self Improvement",
    image: "/BooksNew/TheLightFromWithin.png",
    pages: createPages("the-light-from-within", 5),
    priceNpr: 829,
    isbn: "978-9937-0000-06-1",
    publishedAt: "2026-01-28",
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 7,
    slug: "the-path-of-becoming",
    title: "The Path of Becoming",
    author: "Noah Sterling",
    description:
      "A reflective journey through growth, identity shifts, and the slow process of becoming who you are meant to be.",
    category: "Personal Growth",
    genre: "Productivity",
    image: "/BooksNew/ThePathofBecoming.png",
    pages: createPages("the-path-of-becoming", 6),
    priceNpr: 879,
    isbn: "978-9937-0000-07-8",
    publishedAt: "2026-03-08",
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 8,
    slug: "the-unwritten-chapter",
    title: "The Unwritten Chapter",
    author: "Ivy Bennett",
    description:
      "A forward-looking book about transition, possibility, and writing the next phase of life with intention.",
    category: "Career Guidance",
    genre: "Career & Growth",
    image: "/BooksNew/TheUnwrittenChapter.png",
    pages: createPages("the-unwritten-chapter", 5),
    priceNpr: 919,
    isbn: "978-9937-0000-08-5",
    publishedAt: "2026-03-15",
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
  },
];

export const featuredBooks = books.filter((book) => book.isFeatured);

export const bestSellerBooks = books.filter((book) => book.isBestSeller);

export const newBooks = [...books]
  .sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  )
  .slice(0, 3);

export const booksBySlug = Object.fromEntries(
  books.map((book) => [book.slug, book]),
) as Record<string, Book>;
