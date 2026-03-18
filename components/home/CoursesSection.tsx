import {
  ArrowRight,
  Images,
  User,
  Clock,
  PlayCircle,
  BookIcon,
  Check,
} from "lucide-react";

export default function CoursesSection() {
  const courses = [
    {
      title: "Frontend Mastery-2026 (Beginner)",
      instructor: "by Uchero D. Lucky",
      duration: "8hr 25min",
      lessons: "14 lessons",
      price: "5200",
      originalPrice: "5200",
      discount: "30% OFF",
      color: "from-zinc-50 to-zinc-100",
      includes: [
        "Psychology class",
        "Personality Development",
        "Life Books",
        "Personal Guidance",
        "Interview Practice",
        "100% Placement",
      ],
    },
    {
      title: "Become a UX Designer in 2025 (Beginner)",
      instructor: "by Uchero D. Lucky",
      duration: "8hr 25min",
      lessons: "14 lessons",
      price: "5200",
      originalPrice: "5200",
      discount: "30% OFF",
      isFree: false,
      color: "from-zinc-50 to-zinc-100",
      includes: [
        "Psychology class",
        "Personality Development",
        "Life Books",
        "Personal Guidance",
      ],
    },
    {
      title: "MERN-Stack Mastery-2026 (Beginner)",
      instructor: "by Uchero D. Lucky",
      duration: "8hr 25min",
      lessons: "14 lessons",
      price: "5200",
      originalPrice: "5200",
      discount: "30% OFF",
      color: "from-zinc-50 to-zinc-100",
      includes: ["Psychology class", "Personality  Development", "Life Books"],
    },
    {
      title: "Become a UX Designer in 2025 (Beginner)",
      instructor: "by Uchero D. Lucky",
      duration: "8hr 25min",
      lessons: "14 lessons",
      price: "5200",
      originalPrice: "5200",
      discount: "30% OFF",
      color: "from-zinc-50 to-zinc-100",
      includes: [
        "Personality Development",
        "Life Books",
        "Personal Guidance",
        "100% Placement",
      ],
    },
    {
      title: "Become a UX Designer in 2025 (Beginner)",
      instructor: "by Uchero D. Lucky",
      duration: "8hr 25min",
      lessons: "14 lessons",
      price: "5200",
      originalPrice: "5200",
      discount: "30% OFF",
      isFree: false,
      color: "from-zinc-50 to-zinc-100",
      includes: ["Psychology class", "Personal Guidance", "Interview Practice"],
    },
    {
      title: "Become a UX Designer in 2025 (Beginner)",
      instructor: "by Uchero D. Lucky",
      duration: "8hr 25min",
      lessons: "14 lessons",
      price: "5200",
      originalPrice: "$52",
      discount: "30% OFF",
      color: "from-zinc-50 to-zinc-100",
      includes: [
        "Personality Development",
        "Life Books",
        "Interview Practice",
        "100% Placement",
      ],
    },
  ];

  return (
    <section id="courses" className="pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center">
          <div className="mb-12 text-center">
            <div className="flex justify-center items-center gap-3 mb-3">
              <BookIcon size={32} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Mastery courses curated for you
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold  text-zinc-900 mb-4">
              Explore Our Popular Courses
            </h2>
            <p className="text-lg text-zinc-600">
              Discover premium job opportunities from top companies across
              Nepal.
            </p>
          </div>
          {/* Job Count Badge */}
          {/* <button className="w-fit px-4 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <span>View More Courses</span>
            <ArrowRight size={18} />
          </button> */}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-zinc-200 flex flex-col"
            >
              {/* Course Image/Thumbnail */}
              <div
                className={`bg-linear-to-br ${course.color} h-40 hidden items-center justify-center relative overflow-hidden`}
              >
                {/* Discount Badge */}
                {!course.isFree && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {course.discount}
                  </div>
                )}
                {course.isFree && (
                  <div className="absolute top-2 right-2 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded">
                    FREE COURSE
                  </div>
                )}

                {/* Image Placeholder */}
                <div className="text-center">
                  <Images
                    size={48}
                    className="text-blue-300 mx-auto mb-2 opacity-60"
                  />
                  <p className="text-blue-400 text-xs opacity-60">
                    Course Image
                  </p>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-4 flex flex-col h-full group cursor-pointer">
                {/* Title */}
                <h4 className="text-xl font-semibold text-zinc-900 mb-3 line-clamp-3 leading-tight fornt-poppins group-hover:underline group-hover:text-blue-500">
                  {course.title}
                </h4>

                {/* Instructor */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <p className="text-xs text-zinc-600">{course.instructor}</p>
                </div>

                {/* Duration and Lessons */}
                <div className="flex items-center gap-3 text-xs text-zinc-600 mb-3 pb-3 border-b border-zinc-200">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <PlayCircle size={14} />
                    {course.lessons}
                  </span>
                </div>

                {/* What's Included */}
                <div className="mb-4 bg-blue-50 border border-blue-300 rounded-lg p-3.5 grow">
                  <p className="text-xs font-bold text-zinc-800 mb-3 uppercase tracking-wide">
                    What&apos;s included
                  </p>
                  <div className="flex flex-col gap-2">
                    {course.includes.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-zinc-700 hover:text-blue-600 transition-colors"
                      >
                        <div className="bg-green-500 rounded-full p-0.5 shrink-0">
                          <Check size={10} className="text-white" />
                        </div>
                        <span className="font-medium leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-3">
                  {course.isFree ? (
                    <p className="text-lg font-bold text-green-500">FREE</p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-800">
                        Rs.{course.price}
                      </span>
                      <span className="text-xs text-zinc-500 line-through">
                        {course.originalPrice}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 items-center justify-between w-full mt-auto">
                  {/* Enroll Button */}
                  <button className="w-full px-4 py-2 bg-zinc-100 text-blue-500 border cursor-pointer hover:bg-zinc-50 hover:text-blue-700 hover:border-blue-600 font-semibold rounded-full transition-colors text-sm">
                    View course
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-full transition-colors text-sm">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
