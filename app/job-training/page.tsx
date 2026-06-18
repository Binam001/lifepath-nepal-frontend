import CourseCardSection from "@/components/courses/CourseCardSection";
import StudentReviewSection from "@/components/courses/StudentReviewSection";
import HeroSection from "@/components/shared/HeroSection";

export default function JobTrainingPage() {
  return (
    <div className="min-h-screen pt-16 bg-zinc-100">
      <HeroSection
        title="Job Training Programs"
        subtitle="Learn job focused, high demand skills that companies in Nepal and abroad are hiring right now."
        tag="Job Training Programs"
        // tagIcon={<Sparkles className="h-3.5 w-3.5" />}
      />
      <CourseCardSection />
      <StudentReviewSection />
    </div>
  );
}
