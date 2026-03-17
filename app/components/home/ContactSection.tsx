"use client";

// import Link from "next/link";
import { Mail, Phone, Send, MapPin } from "lucide-react";
import PageTitle from "../ui/PageTitle";

export default function ContactSection() {
  return (
    // <section className="relative py-16 md:py-24 bg-linear-to-b from-blue-50 to-blue-600/50 border-t border-zinc-200">
    <section className="relative py-16 md:py-24 bg-linear-to-b from-blue-100 to-blue-600/40 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Side: Contact Details */}
          <div>
            <PageTitle
              title="Get in touch with us"
              subtitle="Whether you're a student exploring courses or a parent looking for guidance, we'd love to hear from you."
              titleClassName="text-3xl md:text-4xl font-semibold text-zinc-900 mb-4"
              subtitleClassName="text-lg text-zinc-600"
              containerClassName="text-left mb-10"
              align="left"
            />

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                    Chat to us
                  </h3>
                  <p className="text-zinc-600 mb-2">
                    Our friendly team is here to help.
                  </p>
                  <a
                    href="mailto:hello@lifepathnepal.com"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    hello@lifepathnepal.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                    Visit us
                  </h3>
                  <p className="text-zinc-600 mb-2">
                    Come say hello at our office HQ.
                  </p>
                  <p className="text-zinc-900 font-medium">Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                    Call us
                  </h3>
                  <p className="text-zinc-600 mb-2">Mon-Fri from 8am to 5pm.</p>
                  <a
                    href="tel:+9779761082244"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    +977 976-1082244
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Simple Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-zinc-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-700">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="+977 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Leave us a message..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400 resize-none"
                />
              </div>

              <button
                type="button"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-600/20 cursor-pointer"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
