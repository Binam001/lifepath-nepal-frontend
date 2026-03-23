import FutureJobsInfographic from "@/components/jobs/FutureJobsInfographic";
import PageTitle from "@/components/ui/PageTitle";

export default function FuturePage() {
  return (
    <div className="min-h-screen pt-16 bg-zinc-100">
      <section className="bg-linear-to-l from-blue-600 to-black text-white">
        <div className="max-w-6xl mx-auto py-8 px-4 md:px-0">
          <PageTitle
            title="Understand the Job Market"
            subtitle="Clarity on trends, skills, and opportunities shaping your future."
            titleClassName="text-2xl md:text-4xl font-bold text-white mb-4"
            subtitleClassName="text-lg text-blue-100 mb-8"
            containerClassName="text-center max-w-3xl mx-auto"
          />
        </div>
      </section>
      <FutureJobsInfographic />
    </div>
  );
}
