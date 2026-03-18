import { BookOpenText, Star, ShoppingCart } from "lucide-react";

export default function BooksSection() {
  const books = [
    {
      title: "The Career Architect",
      author: "Sarah Johnson",
      price: "$29.99",
      originalPrice: "$49.99",
      rating: 4.8,
      reviews: 342,
      badge: "Featured",
    },
    {
      title: "Skill Mastery Guide",
      author: "Michael Chen",
      price: "$24.99",
      originalPrice: "$39.99",
      rating: 4.9,
      reviews: 521,
      badge: "Bestseller",
    },
    {
      title: "Leadership Essentials",
      author: "Emma Williams",
      price: "$34.99",
      originalPrice: "$54.99",
      rating: 4.7,
      reviews: 289,
      badge: "Popular",
    },
    {
      title: "Networking Blueprint",
      author: "David Martinez",
      price: "$27.99",
      originalPrice: "$44.99",
      rating: 4.6,
      reviews: 198,
      badge: "New",
    },
  ];

  return (
    <section
      id="books"
      className="py-20 bg-white border-t border-b border-zinc-200"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Career Books
          </h3>
          <p className="text-lg text-zinc-600">
            Learn from industry experts and career leaders
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-zinc-200 hover:border-blue-300 flex flex-col"
            >
              {/* Badge */}
              <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {book.badge}
              </div>

              {/* Book Cover Image Placeholder */}
              <div className="relative w-full h-48 bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center border-b border-zinc-200 overflow-hidden">
                {/* Placeholder for book image */}
                <div className="text-center">
                  <BookOpenText
                    size={64}
                    className="text-blue-300 mx-auto mb-2"
                  />
                  <p className="text-xs text-blue-400 font-medium">
                    Book Cover Image
                  </p>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-4 flex flex-col grow">
                {/* Title and Author */}
                <h4 className="text-sm font-bold text-zinc-900 mb-1 line-clamp-2">
                  {book.title}
                </h4>
                <p className="text-xs text-zinc-600 mb-3">by {book.author}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3 pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(book.rating)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-zinc-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-zinc-900 ml-1">
                    {book.rating}
                  </span>
                  <span className="text-xs text-zinc-500">
                    ({book.reviews})
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-zinc-900">
                    {book.price}
                  </span>
                  <span className="text-xs text-zinc-500 line-through">
                    {book.originalPrice}
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2 mt-auto">
                  <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full cursor-pointer transition-colors flex items-center justify-center gap-1 text-sm">
                    <ShoppingCart size={16} />
                    Buy Now
                  </button>
                  <button className="w-full px-3 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-full cursor-pointer transition-colors text-sm">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
