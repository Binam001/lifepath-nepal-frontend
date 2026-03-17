import Image from "next/image";
import NewsletterCTA from "../components/home/NewsletterCTA";
import PageTitle from "../components/ui/PageTitle";

type Story = {
  name: string;
  role: string;
  company: string;
  before: string;
  after: string;
  quote: string;
  story: string;
  img: string;
};

const stories: Story[] = [
  {
    name: "Alish Maharjan",
    role: "Creative Designer",
    company: "Logolab",
    before: "Liked creative work but did not know how to turn it into a job",
    after: "Got his first Creative Designer job in 4 months",
    quote:
      "Lifepath helped me focus on design and build a portfolio I could actually show to companies.",
    story:
      "He learned the basics of design step by step, practiced real design tasks every week, and improved his portfolio with feedback. Over time, he became more confident in showing his work and explaining his ideas in interviews.",
    img: "/students/Alish.jpeg",
  },
  {
    name: "Krishma Maharjan",
    role: "UI/UX Designer",
    company: "WebX Nepal",
    before: "Did not know how websites and apps are designed",
    after: "Now works as a UI/UX Designer at WebX Nepal",
    quote:
      "The learning path was simple, practical, easy to follow, and made everything feel manageable.",
    story:
      "She started by learning wireframes, layouts, colors, and user flow. Then she worked on small design projects and case studies. This helped her understand how to design screens that look good and are easy to use.",
    img: "/students/krishma.jpeg",
  },
  {
    name: "Saurav Shrestha",
    role: "Web Developer",
    company: "WebX Nepal",
    before: "Learned bits of coding but had no clear direction",
    after: "Now builds websites as a Web Developer",
    quote:
      "I finally understood what to learn first and how to improve step by step.",
    story:
      "He focused on HTML, CSS, JavaScript, and building real website projects. By practicing regularly and making complete pages on his own, he built enough confidence and skill to start working in web development.",
    img: "/students/Saurav.jpeg",
  },
  {
    name: "Aayush Shrestha",
    role: "Graphic Designer",
    company: "Adspire Nepal",
    before: "Had design interest but no strong portfolio",
    after: "Now freelances as a Graphic Designer with regular clients",
    quote:
      "The reviews and feedback helped me make my work look much more professional.",
    story:
      "He worked on posters, branding, and social media designs while improving his presentation style. After making his portfolio better and learning how to talk to clients properly, he started getting repeat freelance work.",
    img: "/students/Aayush.jpeg",
  },
  {
    name: "Sujan Theng",
    role: "Social Media Manager",
    company: "Adspire Nepal",
    before: "Did not know how to grow pages or manage content properly",
    after: "Now manages social media for 5+ brands",
    quote:
      "Lifepath gave me a clear path and the confidence to start working seriously.",
    story:
      "He learned how to plan content, write captions, understand trends, and track results. With regular practice and real brand work, he became confident in handling multiple social media accounts.",
    img: "/students/sujan.jpeg",
  },
  {
    name: "Sijan Bartaula",
    role: "Full Stack Developer",
    company: "WebX Nepal",
    before: "Was doing random coding courses without a proper goal",
    after: "Now works as a Full Stack Developer",
    quote:
      "The roadmap helped me understand both frontend and backend in a simple way.",
    story:
      "He learned how to build complete web apps, not just small parts. By working on frontend design, backend logic, and database basics together, he became more job-ready and confident in building real projects.",
    img: "/students/Sijan.jpeg",
  },
  {
    name: "Smile Moktan",
    role: "Brand Developer",
    company: "Leaders Club",
    before: "Was confused about how to build and grow a brand properly",
    after: "Now helps build brand identity and marketing direction",
    quote:
      "The structured guidance helped me understand how branding connects with business growth.",
    story:
      "He learned how brands communicate, how visuals and messaging work together, and how to create consistency across platforms. This helped him support brand growth in a more practical and professional way.",
    img: "/students/smile.jpeg",
  },
  {
    name: "Binam Shrestha",
    role: "Web Developer",
    company: "WebX Nepal",
    before: "Wanted to enter tech but did not know where to begin",
    after: "Now works on live website projects",
    quote:
      "The practical projects made web development feel real, not just theory.",
    story:
      "He started with the basics and slowly moved into building full pages and features. By practicing on real-style tasks and improving his coding habits, he became ready to work on actual web projects.",
    img: "/students/binam.jpeg",
  },
  {
    name: "Umesh B.K.",
    role: "Social Media Manager",
    company: "Lifepath",
    before:
      "Was active online but did not know how to manage social media professionally",
    after: "Now handles social media content and growth for Lifepath",
    quote:
      "I learned how to create content with purpose instead of just posting randomly.",
    story:
      "He learned content planning, posting strategy, audience engagement, and performance tracking. With regular practice, he became better at managing pages, keeping content consistent, and helping the brand grow online.",
    img: "/students/umesh.jpeg",
  },
];

const page = () => {
  return (
    <section className="bg-zinc-100">
      {/* Banner */}
      <section className="bg-linear-to-l from-blue-600 to-black text-white mt-16">
        <div className="max-w-6xl mx-auto py-8">
          <PageTitle
            title="Lifepath students who found clarity and careers"
            subtitle="Real outcomes from learners who followed the Lifepath clarity framework."
            titleClassName="text-2xl md:text-4xl font-bold text-white mb-4"
            subtitleClassName="text-lg text-blue-100"
            containerClassName="text-center max-w-3xl mx-auto"
          />
        </div>
      </section>

      {/* Cards */}
      <div className="max-w-6xl mx-auto py-16 px-4 md:px-0">
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((data) => {
            return (
              <div
                key={data.name}
                className="flex h-full flex-col border border-zinc-200 bg-white p-6"
              >
                <div className="mt-auto flex flex-col items-center gap-3">
                  <div className="relative h-44 w-44 overflow-hidden rounded-full border border-zinc-200">
                    <Image
                      src={data.img}
                      alt={data.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-zinc-900 uppercase tracking-wide text-center">
                      {data.name}
                    </div>
                    <div className="text-sm text-zinc-600">
                      {data.role} • {data.company}
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div className="">
                    <div className="text-xl flex items-center justify-center gap-1  text-yellow-500 tracking-[0.2em]">
                      ★★★★★
                    </div>

                    <p className="mt-4 text-lg font-semibold text-zinc-900 leading-relaxed">
                      {data.quote}
                    </p>

                    <p className="mt-3 text-sm text-zinc-700 leading-relaxed min-h-30">
                      {data.story}
                    </p>
                  </div>

                  <div className="mt-8 flex gap-4 border-t border-zinc-200 text-xs text-zinc-600 pt-2">
                    <div>
                      <div className="text-base font-semibold text-zinc-900">
                        Before
                      </div>
                      <div className="mt-1">{data.before}</div>
                    </div>
                    <div className="w-px h-full bg-zinc-200" />
                    <div>
                      <div className="text-base font-semibold text-zinc-900">
                        After
                      </div>
                      <div className="mt-1">{data.after}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <NewsletterCTA
        btnText="Join Class Today"
        title="Ready to take the next step in your career?"
        description="Enroll in our job training programs and unlock your potential."
        imageSrc="/heroImages/woman2.png"
      />
    </section>
  );
};

export default page;
