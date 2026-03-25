"use client";

import { useState } from "react";
import { Mail, Phone, Send, MapPin, CheckCheck, X } from "lucide-react";
import PageTitle from "../ui/PageTitle";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCreateContactInquiryMutation } from "@/hooks/useCreateContactInquiryMutation";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

type SubmissionModalState = {
  isOpen: boolean;
  tone: "success" | "error";
  title: string;
  description: string;
  detail?: string;
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
  const [submissionModal, setSubmissionModal] = useState<SubmissionModalState>({
    isOpen: false,
    tone: "success",
    title: "",
    description: "",
  });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const contactMutation = useCreateContactInquiryMutation();

  const openSubmissionModal = (modal: SubmissionModalState) => {
    setSubmissionModal(modal);
  };

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

    if (!executeRecaptcha) {
      openSubmissionModal({
        isOpen: true,
        tone: "error",
        title: "Verification Unavailable",
        description:
          "reCAPTCHA is still loading. Please wait a moment and try again.",
      });
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("contact_submit");
      const response = await contactMutation.mutateAsync({
        payload: {
          fullname: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email.trim(),
          phoneNo: form.phone.trim(),
          address: form.address.trim(),
          message: form.message.trim(),
        },
        recaptchaToken,
      });

      if (!response.success) {
        openSubmissionModal({
          isOpen: true,
          tone: "error",
          title: "Message Not Sent",
          description: response.message || "Failed to send message.",
          detail:
            "Please review your details and try again. If the issue continues, contact us directly.",
        });
        return;
      }

      openSubmissionModal({
        isOpen: true,
        tone: "success",
        title: "Message Sent!",
        description: "Your contact inquiry has been submitted successfully.",
        detail:
          "Our team will review your message and get back to you soon.",
      });
      setForm(initialForm);
    } catch (error: unknown) {
      const fallbackMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.";

      openSubmissionModal({
        isOpen: true,
        tone: "error",
        title: "Message Not Sent",
        description: fallbackMessage,
        detail:
          "Please review your details and try again. If the issue continues, contact us directly.",
      });
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

              <p className="text-xs leading-5 text-zinc-500">
                This form is protected by Google reCAPTCHA.
              </p>
            </form>
          </div>
        </div>
      </div>
      {submissionModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
            <div
              className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                submissionModal.tone === "success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {submissionModal.tone === "success" ? (
                <CheckCheck className="h-8 w-8 text-green-600" />
              ) : (
                <X className="h-8 w-8 text-red-600" />
              )}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-zinc-800">
              {submissionModal.title}
            </h3>
            <p className="mb-1 text-sm text-zinc-600">
              {submissionModal.description}
            </p>
            {submissionModal.detail ? (
              <p className="mb-6 text-sm text-zinc-500">
                {submissionModal.detail}
              </p>
            ) : null}
            <a
              href="mailto:lifepathnepal@gmail.com"
              className="mb-4 flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
            >
              <Mail size={16} />
              Contact us at lifepathnepal@gmail.com
            </a>
            <button
              onClick={() =>
                setSubmissionModal((prev) => ({
                  ...prev,
                  isOpen: false,
                }))
              }
              className="w-full rounded-full bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {submissionModal.tone === "success" ? "Done" : "Close"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
