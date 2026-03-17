"use client";

import { useState } from "react";
import {
  Award,
  Calendar,
  Info,
  Mail,
  User,
  BookOpen,
  Contact,
  LocateIcon,
  FileText,
} from "lucide-react";
import Image from "next/image";

const essayEvent = {
  title: "National Essay Competition 2026",
  description:
    "A platform for students to voice their ideas on career development and personal growth. Showcase your writing and win exciting prizes.",
  rules: [
    "The essay must be original and unpublished.",
    "Word count should be between 1000-1500 words.",
    "Submit in PDF format.",
    "Topic: 'The title will be released right after 2 days of submission'.",
  ],
  prizes: [
    "1st Prize: Rs. 50,000 + Certificate",
    "2nd Prize: Rs. 25,000 + Certificate",
    "3rd Prize: Rs. 10,000 + Certificate",
    "Top 10 entries will be published on our blog.",
  ],
  deadline: "July 15, 2026, 11:59 PM",
};

type EventFormData = {
  fullName: string;
  email: string;
  number: string;
  address: string;
  college: string;
  parentsNumber: string;
  paymentPhoto: File | null;
};

const initialFormData: EventFormData = {
  fullName: "",
  email: "",
  number: "",
  address: "",
  college: "",
  parentsNumber: "",
  paymentPhoto: null,
};

export default function EssayCompetitionPage() {
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as Exclude<keyof EventFormData, "paymentPhoto">;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, paymentPhoto: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.number ||
      !formData.address ||
      !formData.parentsNumber ||
      !formData.paymentPhoto
    ) {
      setSubmitMessage(
        "Please fill all required fields, including parent's phone number, and upload the payment screenshot.",
      );
      setIsSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form Data:", formData);
    setSubmitMessage("Thank you! Your submission has been received.");
    setFormData(initialFormData);

    const fileInput = document.getElementById(
      "paymentPhoto",
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = "";
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-zinc-50 pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-0">
        {/* Header */}
        <div className="w-full">
          <Image
            src="/assets/essay_small.jpeg"
            alt="Essay Competition"
            height={400}
            width={1300}
            priority
            className="bg-blue-200 rounded-4xl h-50 w-full object-cover   md:hidden"
          />
          <Image
            src="/assets/essay_big.jpeg"
            alt="Essay Competition"
            height={400}
            width={1300}
            priority
            className="hidden bg-blue-200 rounded-4xl h-100 w-full object-cover md:block"
          />
        </div>
        {/* <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-4 py-1.5">
            <Award size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Competition Details
            </span>
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 md:text-5xl">
            {essayEvent.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            {essayEvent.description}
          </p>
        </div> */}

        <div className="grid gap-10 md:grid-cols-2 mt-4 md:mt-16">
          {/* Left: Details */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Info size={24} className="text-blue-500" />
                Rules & Guidelines
              </h2>
              <ul className="list-outside list-disc space-y-2 text-zinc-600 px-6">
                {essayEvent.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Award size={24} className="text-blue-500" />
                Prizes
              </h2>
              <ul className="list-outside list-disc space-y-2 text-zinc-600 px-6">
                {essayEvent.prizes.map((prize, index) => (
                  <li key={index}>{prize}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Calendar size={24} className="text-blue-500" />
                Important Date
              </h2>
              <p className="text-zinc-600">
                Submission Deadline:{" "}
                <span className="font-semibold text-zinc-800">
                  {essayEvent.deadline}
                </span>
              </p>
            </div>
          </div>

          {/* Right: Submission Form */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-800">
              Register & Submit Your Essay
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1 block text-sm font-medium text-zinc-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-zinc-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-zinc-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-zinc-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="mb-1 block text-sm font-medium text-zinc-700"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Contact
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-zinc-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="9700000000"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="parentsNumber"
                  className="mb-1 block text-sm font-medium text-zinc-700"
                >
                  Parent/Guardian Phone Number
                </label>
                <div className="relative">
                  <Contact
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <input
                    type="tel"
                    id="parentsNumber"
                    name="parentsNumber"
                    value={formData.parentsNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-zinc-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="9800000000"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="mb-1 block text-sm font-medium text-zinc-700"
                >
                  Address
                </label>
                <div className="relative">
                  <LocateIcon
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-zinc-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="college"
                  className="mb-1 block text-sm font-medium text-zinc-700"
                >
                  College/University (Optional)
                </label>
                <div className="relative">
                  <BookOpen
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={18}
                  />
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-zinc-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your institution name"
                  />
                </div>
              </div>
              {/* <div>
                <label
                  htmlFor="essayFile"
                  className="mb-1 block text-sm font-medium text-zinc-700"
                >
                  Upload Essay (PDF)
                </label>
                <div className="relative mt-1 flex justify-center rounded-lg border-2 border-dashed border-zinc-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <FileText
                      className="mx-auto h-12 w-12 text-zinc-400"
                      strokeWidth={1}
                    />
                    <div className="flex text-sm text-zinc-600">
                      <label
                        htmlFor="essayFile"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                      >
                        <span>Upload a file</span>
                        <input
                          id="paymentPhoto"
                          name="paymentPhoto"
                          type="file"
                          accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                          onChange={handleFileChange}
                          required
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {formData.essayFile
                        ? formData.essayFile.name
                        : "PDF up to 10MB"}
                    </p>
                  </div>
                </div>
              </div> */}
              <div>
                <label
                  htmlFor="paymentPhoto"
                  className="mb-1 block text-sm font-medium text-zinc-700"
                >
                  Upload Payment Screenshot
                </label>
                <div className="relative mt-1 flex justify-center rounded-lg border-2 border-dashed border-zinc-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <FileText
                      className="mx-auto h-12 w-12 text-zinc-400"
                      strokeWidth={1}
                    />
                    <div className="flex text-sm text-zinc-600">
                      <label
                        htmlFor="paymentPhoto"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                      >
                        <span>Upload a file</span>
                        <input
                          id="paymentPhoto"
                          name="paymentPhoto"
                          type="file"
                          accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                          onChange={handleFileChange}
                          required
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <div className="text-xs text-zinc-500">
                      {formData.paymentPhoto ? (
                        formData.paymentPhoto.name
                      ) : (
                        <div className="flex flex-col gap-1">
                          <p>Photo upto 2MB</p>
                          <p className="text-[8px] tracking-wider">
                            (png, jpg, jpeg)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
              {submitMessage && (
                <p
                  className={`text-center text-sm ${
                    submitMessage.includes("Thank you")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
