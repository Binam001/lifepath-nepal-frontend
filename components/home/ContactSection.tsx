"use client";

import { useState } from "react";
import { Mail, Phone, Send, MapPin } from "lucide-react";
import PageTitle from "../ui/PageTitle";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useContactMutation } from "@/hooks/useContactMutation";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const contactMutation = useContactMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");
    setStatusType("");

    if (!executeRecaptcha) {
      setStatus("reCAPTCHA is still loading. Please try again.");
      setStatusType("error");
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("contact_submit");
      const response = await contactMutation.mutateAsync({
        payload: form,
        recaptchaToken,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to send message.");
      }

      setStatus("Your message has been sent successfully.");
      setStatusType("success");
      setForm(initialForm);
    } catch (error: unknown) {
      const fallbackMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.";

      setStatus(fallbackMessage);
      setStatusType("error");
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-zinc-100 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <PageTitle
              title="Get in touch with us"
              subtitle="Whether you're a student exploring courses or a parent looking for guidance, we'd love to hear from you."
              titleClassName="text-3xl md:text-5xl font-semibold text-blue-600 mb-3"
              subtitleClassName="text-base md:text-lg text-zinc-700"
              containerClassName="text-center max-w-3xl mx-auto"
              align="left"
            />

            <div className="space-y-8 pt-4 md:pt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Chat to us
                  </h3>
                  <p className="text-zinc-600">
                    Our friendly team is here to help.
                  </p>
                  <a
                    href="mailto:lifepathnepal@gmail.com"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    lifepathnepal@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Visit us
                  </h3>
                  <p className="text-zinc-600">
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
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Call us
                  </h3>
                  <p className="text-zinc-600">Sun-Fri from 9am to 6pm.</p>
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

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-zinc-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-700">
                    First name<span className="text-red-400"> *</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-700">
                    Last name<span className="text-red-400"> *</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Email<span className="text-red-400"> *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Phone number<span className="text-red-400"> *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+977 981 000 0000"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Address <span className="text-zinc-400">(Full address)</span>
                  <span className="text-red-400"> *</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Where do you live?"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Message
                </label>
                <textarea
                  placeholder="Leave us a message..."
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-zinc-900 placeholder:text-zinc-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-600/20 cursor-pointer"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>

              {status && (
                <p
                  className={`text-sm font-medium ${
                    statusType === "success" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {status}
                </p>
              )}

              <p className="text-xs leading-5 text-zinc-500">
                This form is protected by Google reCAPTCHA.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
