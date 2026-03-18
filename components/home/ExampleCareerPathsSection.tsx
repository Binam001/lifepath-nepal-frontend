import Link from "next/link";

const groups = [
  {
    group: "NT",
    types: "INTJ / ENTJ",
    careers: ["Strategy", "Product leadership", "Systems design"],
  },
  {
    group: "NF",
    types: "INFP / ENFP",
    careers: ["Content", "Psychology", "Creative direction"],
  },
  {
    group: "SJ",
    types: "ISTJ / ESTJ",
    careers: ["Operations", "Project management", "Quality assurance"],
  },
  {
    group: "SP",
    types: "ISTP / ESTP",
    careers: ["Field engineering", "Growth", "Product operations"],
  },
];

export default function ExampleCareerPathsSection() {
  return (
    <section className="w-full px-4 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-blue-500/80">
            Example Career Paths
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-semibold leading-tight text-transparent bg-clip-text bg-linear-to-r from-black to-blue-600">
            Proof through specificity
          </h2>
          <p className="text-sm md:text-base text-zinc-600 mt-4">
            See how personality groups map to real career directions.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((item) => (
            <div
              key={item.group}
              className="rounded-2xl border border-blue-100/80 bg-linear-to-br from-blue-50/60 via-white to-white p-6 shadow-[0_8px_30px_rgba(37,99,235,0.08)]"
            >
              <div className="text-xs font-semibold tracking-widest text-blue-600">
                {item.group}
              </div>
              <div className="mt-2 text-lg font-semibold text-zinc-900">
                {item.types}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                {item.careers.map((career) => (
                  <li key={career} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span>{career}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/personality-test"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all"
          >
            👉 See careers for your type
          </Link>
        </div>
      </div>
    </section>
  );
}
