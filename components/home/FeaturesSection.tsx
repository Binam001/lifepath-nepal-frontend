import { Briefcase, BookOpen, BriefcaseIcon, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Career Foundation",
      description: "Build your professional profile and core skills",
      icon: Briefcase,
      badge: "FREE",
      badgeColor: "bg-zinc-100 text-zinc-600",
      iconBg: "bg-blue-500",
    },
    {
      title: "Learning Paths",
      description: "Structured courses and training programs",
      icon: BookOpen,
      badge: "PRO",
      badgeColor: "bg-blue-100 text-blue-600",
      iconBg: "bg-zinc-300",
    },
    {
      title: "Job Matching",
      description: "Find roles aligned with your goals",
      icon: BriefcaseIcon,
      badge: "PRO",
      badgeColor: "bg-blue-100 text-blue-600",
      iconBg: "bg-zinc-300",
    },
    {
      title: "Career Coaching",
      description: "Expert guidance and mentorship",
      icon: Users,
      badge: "PRO",
      badgeColor: "bg-blue-100 text-blue-600",
      iconBg: "bg-zinc-300",
    },
  ];

  return (
    <section className="bg-zinc-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`px-8 py-8 flex flex-col items-center text-center ${
                index !== features.length - 1 ? "border-r border-zinc-100" : ""
              }`}
            >
              {/* Icon Badge */}
              <div
                className={`${feature.iconBg} rounded-2xl p-4 mb-6 flex items-center justify-center`}
              >
                <feature.icon size={32} className="text-white" />
              </div>

              {/* Title with Badge */}
              <div className="mb-3 flex items-center gap-2 justify-center">
                <h4 className="text-lg font-semibold text-zinc-900">
                  {feature.title}
                </h4>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${feature.badgeColor}`}
                >
                  {feature.badge}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
