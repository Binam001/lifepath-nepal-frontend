import FuturePageNew from "@/components/future/FuturePageNew";
import PageTitle from "@/components/ui/PageTitle";

export default function FuturePage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-linear-to-l from-blue-600 to-black text-white">
        <div className="max-w-6xl mx-auto py-10 px-4 md:px-0">
          <PageTitle
            title="Understand the Future Job Market"
            subtitle="See which careers are growing, which are fading, and what skills will matter most in Nepal's next decade."
            titleClassName="text-2xl md:text-4xl font-bold text-white mb-4"
            subtitleClassName="text-lg text-blue-100 mb-8"
            containerClassName="text-center max-w-3xl mx-auto"
          />
        </div>
      </section>
      <FuturePageNew />
    </div>
  );
}
