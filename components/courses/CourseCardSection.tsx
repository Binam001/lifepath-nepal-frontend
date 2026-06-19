import { Timer, UserCheck } from "lucide-react";
import Image from "next/image";
import Button from "../shared/Button";
import { courseLists } from "@/constants/courseLists";

const CourseCardSection = () => {
  return (
    <div>
      <section className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          {courseLists.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-zinc-200 hover:border-blue-500 flex flex-col relative"
            >
              {course.id <= 3 && (
                <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              {/* Badge */}
              {/* Course Info */}
              <div className="p-4 flex flex-col gap-4 h-full group cursor-pointer">
                {/* Title */}
                <h4 className="text-lg md:text-xl font-semibold text-zinc-900 line-clamp-3 leading-tight">
                  {course.title}
                </h4>

                {/* Duration and Lessons */}
                <div className="flex items-center justify-between gap-3 text-xs text-zinc-600 pb-3 border-b border-zinc-200">
                  {/* Instructor */}
                  <div className="flex items-center gap-1">
                    {" "}
                    <div className="w-7 h-7 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        className="text-blue-600 text-lg"
                      >
                        <path
                          fill="currentColor"
                          d="M12.65 3.797c.487.131.908.458 1.42.854l.297.23c.243.187.301.23.359.261a1 1 0 0 0 .196.081c.063.019.134.03.438.07l.373.047c.642.082 1.17.149 1.607.4c.383.22.7.537.92.92c.251.436.318.965.4 1.607l.048.373c.039.304.05.375.069.438q.03.102.08.196c.032.058.075.116.262.359l.23.297c.396.512.723.933.854 1.42a2.5 2.5 0 0 1 0 1.3c-.131.487-.458.908-.854 1.42l-.23.297c-.187.243-.23.301-.261.359q-.051.094-.081.196c-.019.063-.03.134-.07.438l-.047.373c-.082.642-.149 1.17-.4 1.607a2.5 2.5 0 0 1-.92.92c-.436.251-.965.318-1.607.4l-.373.048c-.304.039-.375.05-.438.069q-.102.03-.196.08c-.058.032-.116.075-.359.262l-.297.23c-.512.396-.933.723-1.42.854a2.5 2.5 0 0 1-1.3 0c-.487-.131-.908-.458-1.42-.854l-.297-.23c-.243-.187-.301-.23-.359-.261a1 1 0 0 0-.196-.081c-.063-.019-.134-.03-.438-.07l-.373-.047c-.642-.082-1.17-.149-1.607-.4a2.5 2.5 0 0 1-.92-.92c-.251-.436-.318-.965-.4-1.607l-.048-.373c-.039-.304-.05-.375-.069-.438a1 1 0 0 0-.08-.196c-.032-.058-.075-.116-.262-.359l-.23-.297c-.396-.512-.723-.933-.854-1.42a2.5 2.5 0 0 1 0-1.3c.131-.487.458-.908.854-1.42l.23-.297c.187-.243.23-.301.261-.359a1 1 0 0 0 .081-.196c.019-.063.03-.134.07-.438l.047-.373c.082-.642.149-1.17.4-1.607a2.5 2.5 0 0 1 .92-.92c.436-.251.965-.318 1.607-.4l.373-.048c.304-.039.375-.05.438-.069a1 1 0 0 0 .196-.08c.058-.032.116-.075.359-.262l.297-.23c.512-.396.933-.723 1.42-.854a2.5 2.5 0 0 1 1.3 0m3.057 5.496a1 1 0 0 0-1.414 0L11 12.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414"
                        />
                      </svg>
                    </div>
                    <p className="text-base font-semibold text-blue-600">
                      Job Guarantee
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <Timer size={18} />
                    {course.duration}
                  </span>
                </div>

                {/* What's Included */}
                <div className="rounded-lg grow flex items-center justify-center h-50 overflow-hidden">
                  <Image
                    src={course.img}
                    alt="What's included"
                    width={320}
                    height={100}
                    className="object-cover h-full w-full"
                    priority={false}
                  />
                </div>

                {/* Pricing */}
                <div className="">
                  <div className="flex items-center gap-2 text-sm font-medium  text-green-500">
                    <UserCheck size={20} className="" />
                    <p className="">Limited seats</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 items-center justify-between w-full mt-auto">
                  <Button
                    href={`/job-training/${course.slug}`}
                    label="View Course"
                    variant="outline"
                    size="sm"
                    className="w-full!"
                  />
                  <Button
                    label={course.id <= 3 ? "Join Now" : "Book Now"}
                    size="sm"
                    className="w-full!"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseCardSection;
