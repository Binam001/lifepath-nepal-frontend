import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    title: "Start",
    links: [
      { label: "Home", href: "/" },
      { label: "Personality Test", href: "/personality-test" },
      // { label: "Sign Up", href: "/signup" },
    ],
  },
  {
    title: "Learn",
    links: [
      // { label: "Guide Books", href: "/guide-books" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "About Us", href: "/about-us" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Job Training", href: "/job-training" },
      { label: "Jobs", href: "/jobs" },
      { label: "Events", href: "/events" },
    ],
  },

  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      // { label: "Login", href: "/login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="">
      <div className="">
        <div className="relative overflow-hidden bg-white px-4 pb-5 pt-12 sm:px-8 sm:pt-16 lg:px-10">
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="mt-4 font-montserrat text-3xl font-semibold tracking-[-0.04em] text-blue-500 sm:text-4xl md:text-[3.2rem] md:leading-[1.05]">
              Ready to Take Control
              <br />
              of Your Future?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-600 sm:text-base">
              Explore career paths, training, events, and guidance built to help
              you move forward with clarity.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/personality-test"
                scroll={true}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.28)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Start Now
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-200 bg-white/85 px-6 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur transition-colors duration-200 hover:bg-white"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto  mt-12 rounded-[28px] border border-black/5 bg-linear-to-b from-zinc-50 to-blue-50 px-5 py-6 shadow-[0_10px_40px_rgba(255,255,255,0.55)_inset] backdrop-blur-xl sm:px-6 sm:py-8 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1.9fr] lg:gap-14">
              <div>
                <Link href="/" className="inline-flex items-center">
                  <Image
                    src="/main-logo.png"
                    alt="LifePath Logo"
                    width={148}
                    height={44}
                    className="h-9 w-auto"
                  />
                </Link>

                {/* <div className="mt-7 max-w-sm">
                  <p className="text-sm font-medium text-zinc-900">
                    Sign up to receive career tips.
                  </p>
                  <div className="mt-4 flex w-full items-center rounded-full border border-zinc-200 bg-white p-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="h-11 flex-1 bg-transparent px-4 text-sm text-zinc-700 outline-none placeholder:text-zinc-400"
                    />
                    <button
                      type="button"
                      className=" h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-800"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="mt-3 sm:max-w-xs text-xs leading-5 text-zinc-500">
                    Explore the pages on this site to find programs, stories,
                    guidance, and ways to get in touch.
                  </p>
                </div> */}
                <div className="mt-7 max-w-sm">
                  <p className="text-sm font-medium text-zinc-900">
                    Sign up to receive career tips.
                  </p>
                  <div className="mt-4 flex gap-2 rounded-full border border-zinc-200 bg-white p-2 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="h-11 w-full bg-transparent px-4 text-sm text-zinc-700 outline-none placeholder:text-zinc-400 sm:flex-1"
                    />
                    <button
                      type="button"
                      className="inline-flex h-11 w-auto  items-center justify-center rounded-full bg-zinc-900 px-4 sm:px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-800"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="mt-3 max-w-xs text-xs leading-5 text-zinc-500">
                    Explore the pages on this site to find programs, stories,
                    guidance, and ways to get in touch.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {footerGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-sm font-semibold uppercase text-zinc-500">
                      {group.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-zinc-700 transition-colors duration-200 hover:text-blue-700"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-between sm:gap-12 border-t border-zinc-200 pt-4 text-center text-xs text-zinc-500">
              <p>
                &copy; {new Date().getFullYear()} Lifepath Nepal. All rights
                reserved.
              </p>
              <Link
                href="/https:webxnepal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center gap-2"
              >
                <span>Design & Developed by </span>
                <Image src="/webx.png" alt="WebX Logo" height={50} width={50} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
