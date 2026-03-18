import { GraduationCap, Laptop, Palette, Repeat } from "lucide-react";

interface CategoryCardProps {
  title: string;
  Icon: typeof GraduationCap;
}

const CategoryCard = ({ title, Icon }: CategoryCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/40 via-white to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-3 h-10 w-10 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center">
          <Icon size={20} className="text-blue-700" />
        </div>
        <h3 className="text-base md:text-xl font-semibold text-zinc-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm md:text-lg text-zinc-600 mt-2">
          Personalized guidance to move forward with clarity and confidence.
        </p>
      </div>
    </div>
  );
};

const CategorySection = () => {
  const categories = [
    {
      title: "Students confused about careers",
      Icon: GraduationCap,
    },
    {
      title: "Graduates without job‑ready skills",
      Icon: Laptop,
    },
    {
      title: "Career switchers",
      Icon: Palette,
    },
    {
      title: "Anyone tired of random advice",
      Icon: Repeat,
    },
  ];

  return (
    <section className="w-full px-4 bg-linear-to-b from-blue-50 via-white to-zinc-50">
      <div className="max-w-6xl mx-auto py-16">
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xl font-semibold text-blue-700">
            Designed for real people
          </div> */}
          <h2 className="max-w-5xl mx-auto leading-tight text-2xl md:text-3xl font-semibold text-zinc-900 mt-4">
            Who Is Lifepath For?
          </h2>
          <p className="text-sm md:text-lg text-zinc-600 mt-3 max-w-2xl mx-auto">
            Clear paths, real outcomes, and guidance that <br /> matches your
            personality and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              Icon={category.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
