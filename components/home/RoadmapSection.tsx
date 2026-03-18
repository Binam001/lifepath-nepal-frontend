export default function RoadmapSection() {
  const roadmapSteps = [
    {
      step: 1,
      title: "Self Discovery",
      description: "Identify your strengths, values, and interests.",
    },
    {
      step: 2,
      title: "Goal Setting",
      description: "Set clear, achievable career goals.",
    },
    {
      step: 3,
      title: "Skill Building",
      description: "Develop skills needed for your target role.",
    },
    {
      step: 4,
      title: "Networking",
      description: "Build meaningful professional connections.",
    },
    {
      step: 5,
      title: "Job Search",
      description: "Find and apply for your ideal position.",
    },
    {
      step: 6,
      title: "Career Growth",
      description: "Continuously advance and evolve in your role.",
    },
  ];

  return (
    <section id="roadmap" className="py-16 md:py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Your Career Roadmap
          </h3>
          <p className="text-lg text-zinc-600">
            Follow our proven 6-step pathway to career success
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapSteps.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-zinc-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-zinc-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
