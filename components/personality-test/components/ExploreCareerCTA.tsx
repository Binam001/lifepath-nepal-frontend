import { ArrowRight } from "lucide-react";
import Button from "@/components/shared/Button";

interface ExploreCareerCTAProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  href?: string;
}

export default function ExploreCareerCTA({
  title,
  subtitle,
  buttonText = "Explore Career Options",
  href = "/future",
}: ExploreCareerCTAProps) {
  return (
    <section className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-center text-white shadow-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">{title}</h2>
      <p className="text-base text-white/90 mb-6 max-w-xl mx-auto">
        {subtitle}
      </p>

      <Button
        label={buttonText}
        href={href}
        className="bg-white! hover:bg-white/90! text-black!"
        icon={<ArrowRight size={18} />}
      />
    </section>
  );
}
