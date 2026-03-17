import ContactSection from "../components/home/ContactSection";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen pt-16 bg-zinc-50">
      <ContactSection />

      {/* <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-900">
            Let&apos;s bring your learning goals closer to you.
          </h1>
          <p className="mt-4 text-base md:text-lg text-zinc-600">
            Whether you&apos;re a student exploring courses or a parent looking
            for guidance, we&apos;d love to hear from you.
          </p>
        </div>

        <form className="mt-12 space-y-6 text-lg text-zinc-900">
          <div className="flex flex-wrap items-center gap-3">
            <span>Hello, I&apos;m</span>
            <input
              type="text"
              placeholder="Full Name*"
              className="flex-1 min-w-55 border-b border-zinc-300 bg-transparent pb-2 placeholder:text-blue-200 focus:outline-none focus:border-zinc-900 text-blue-600"
            />
            <span>and I&apos;m from</span>
            <input
              type="text"
              placeholder="Your Address*"
              className="flex-1 min-w-55 border-b border-zinc-300 bg-transparent pb-2 text-blue-600 placeholder:text-blue-200 focus:outline-none focus:border-zinc-900"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span>I&apos;m reaching out because</span>
            <select className="flex-1 min-w-55 border-b border-zinc-300 bg-transparent pb-2 text-blue-600 focus:outline-none focus:border-zinc-900">
              <option value="" disabled>
                Select a purpose...
              </option>
              <option value="course">I want help choosing a course</option>
              <option value="scholarship">
                I&apos;m looking for scholarships
              </option>
              <option value="career">I need career guidance</option>
              <option value="partnership">
                I&apos;m interested in partnerships
              </option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span>You can contact me at</span>
            <input
              type="email"
              placeholder="Email Address*"
              className="flex-1 min-w-55 border-b border-zinc-300 bg-transparent pb-2 text-blue-600 placeholder:text-blue-200 focus:outline-none focus:border-zinc-900"
            />
            <span>and my number is</span>
            <input
              type="tel"
              placeholder="+977 Phone Number*"
              className="flex-1 min-w-55 border-b border-zinc-300 bg-transparent pb-2 text-blue-600 placeholder:text-blue-200 focus:outline-none focus:border-zinc-900"
            />
          </div>

          <div className="flex flex-wrap items-start gap-3">
            <span className="pt-2">
              Here&apos;s a bit more I&apos;d like to share:
            </span>
            <textarea
              rows={4}
              placeholder="Share your interests, preferred courses, learning goals..."
              className="flex-1 min-w-55 border-b border-zinc-300 bg-transparent pb-2 text-blue-600 placeholder:text-blue-200 focus:outline-none focus:border-zinc-900"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-zinc-500">
              By submitting, you agree to our
              <Link href="/" className="text-blue-600 font-semibold ml-1">
                privacy policy
              </Link>
              .
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white font-semibold px-6 py-3 hover:bg-blue-700 transition-colors"
            >
              Submit Inquiry <Send size={16} />
            </button>
          </div>
        </form>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-sm bg-blue-100 p-4 rounded-xl text-blue-600">
          <div className="flex items-center gap-2">
            <Mail size={16} /> hello@lifepathnepal.com
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} /> +977 976-1082244
          </div>
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 font-semibold"
          >
            Explore success stories <ArrowRight size={16} />
          </Link>
        </div> */}
    </div>
  );
}
