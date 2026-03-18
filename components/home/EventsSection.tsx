import { Calendar, GraduationCap, Handshake } from "lucide-react";

export default function EventsSection() {
  const events = [
    {
      title: "Tech Career Summit 2026",
      date: "February 15",
      location: "Virtual",
      description: "Industry leaders discussing future of tech careers.",
      icon: Calendar,
    },
    {
      title: "Leadership Workshop",
      date: "February 22",
      location: "San Francisco",
      description: "Intensive 2-day workshop on developing leadership skills.",
      icon: GraduationCap,
    },
    {
      title: "Networking Mixer",
      date: "March 5",
      location: "New York",
      description: "Connect with professionals from your industry.",
      icon: Handshake,
    },
  ];

  return (
    <section
      id="events"
      className="py-20 bg-white border-t border-b border-zinc-200"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Upcoming Events
          </h3>
          <p className="text-lg text-zinc-600">
            Join our community events and connect with peers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-zinc-200">
          {events.map((event, index) => (
            <div
              key={index}
              className="px-8 py-8 flex flex-col items-center text-center"
            >
              <div className="bg-purple-500 rounded-2xl p-4 mb-6 flex items-center justify-center">
                <event.icon size={32} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold text-zinc-900 mb-3">
                {event.title}
              </h4>
              <p className="text-sm text-zinc-600 mb-2">{event.date}</p>
              <p className="text-sm text-zinc-600 mb-3">{event.location}</p>
              <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                {event.description}
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
