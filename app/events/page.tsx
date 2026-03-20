"use client";

import { useRef, useState } from "react";
import {
  Calendar,
  Info,
  Mail,
  User,
  BookOpen,
  Contact,
  LocateIcon,
  FileText,
  CheckCheck,
  // Check,
  CheckCircle,
  Award,
  BookCheck,
} from "lucide-react";
import Image from "next/image";
import { z } from "zod";

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters."),

  email: z.string().trim().email("Enter a valid email."),

  number: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),

  address: z.string().trim().min(3, "Address is required."),

  parentsNumber: z
    .string()
    .regex(
      /^\d{10}$/,
      "Parent/Guardian phone number must be exactly 10 digits.",
    ),

  college: z.string().trim().optional().or(z.literal("")),

  paymentPhoto: z
    .instanceof(File, { message: "Essay PDF is required." })
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed.",
    )
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "File must be 2MB or smaller.",
    ),
});

const essayEvent = {
  title: "National Essay Competition 2026",
  description:
    "A platform for students to voice their ideas on career development and personal growth. Showcase your writing and win exciting prizes.",
  rules: [
    "Eligibility: Open to students of Grade 10 and +2.",
    "Original Work: Essays must be completely original.",
    "No AI Usage: Use of AI tools (like ChatGPT or similar) is strictly prohibited. Any AI-generated or plagiarized work will be disqualified.",
    "Word Limit: Essays must be between 480–500 words. Entries outside this range will not be accepted.",
    "Competition Rounds: The competition will have multiple rounds, each with a unique topic.",
    "Topic Announcement: Topics will be announced on April 12, 2026, along with submission deadlines.",
    "Fair Participation: No copying from books, websites, or other sources.",
    "Final Decision: Judges’ and organizers’ decisions will be final.",
  ],
  prizes: [
    "1st Prize: Rs. 50,000 + Certificate",
    "All other participants: Digital Certificates",
    "Top 10 entries will be featured on our official blog",
  ],
  entryFee: "Entry Fee: NPR 500",
  deadline: "May 11 2026, 11:59 PM",
  submissionGuidelines: [
    "Participants must upload their essay in PDF format only through the website submission portal.",
    "Submissions sent through email or other platforms will not be accepted.",
    "Students must ensure that their PDF file is properly formatted and readable before submission.",
  ],
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
  const [errors, setErrors] = useState<
    Partial<Record<keyof EventFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as Exclude<keyof EventFormData, "paymentPhoto">;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const updateSelectedFile = (file: File | null) => {
    setFormData((prev) => ({ ...prev, paymentPhoto: file }));

    if (errors.paymentPhoto) {
      setErrors((prev) => ({ ...prev, paymentPhoto: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSelectedFile(e.target.files?.[0] ?? null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFile(false);

    const file = e.dataTransfer.files?.[0] ?? null;
    if (!file) return;

    updateSelectedFile(file);

    if (fileInputRef.current) {
      const transfer = new DataTransfer();
      transfer.items.add(file);
      fileInputRef.current.files = transfer.files;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setErrors({});

    const validationResult = formSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: Partial<Record<keyof EventFormData, string>> = {};

      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof EventFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      setSubmitMessage("Please fill all the required fields.");
      setIsSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Validated Form Data:", validationResult.data);

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
        <div className="w-full">
          <Image
            src="/assets/essay_small.jpeg"
            alt="Essay Competition"
            height={400}
            width={1300}
            priority
            className="h-50 w-full rounded-4xl bg-blue-200 object-cover md:hidden"
          />
          <Image
            src="/assets/essay_big.jpeg"
            alt="Essay Competition"
            height={400}
            width={1300}
            priority
            className="hidden h-100 w-full rounded-4xl bg-blue-200 object-cover md:block"
          />
        </div>

        <div className="mt-4 grid gap-10 md:mt-16 md:grid-cols-2">
          {/* Left: Details */}
          <div className="space-y-8">
            <div className=" flex flex-col ">
              <div className="flex gap-2">
                <CheckCircle className="text-blue-500" />
                <h2 className="text-2xl font-semibold">Register here:</h2>
              </div>
              <Image
                src="/assets/qrcode.png"
                alt=""
                width={300}
                height={300}
              ></Image>
            </div>
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Info size={24} className="text-blue-500" />
                Rules & Guidelines
              </h2>
              <ul className="space-y-3 text-sm text-zinc-600">
                {essayEvent.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCheck className="mt-0.5 h-4 w-4 text-blue-500 shrink-0" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Award size={24} className="text-blue-500" />
                Prizes
              </h2>
              <ul className="space-y-3 text-sm text-zinc-600">
                {essayEvent.prizes.map((prizes, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCheck className="mt-0.5 h-4 w-4 text-blue-500 shrink-0" />
                    <span className="leading-relaxed">{prizes}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Calendar size={24} className="text-blue-500" />
                Important Date
              </h2>
              <p className="text-zinc-600">
                Registration Deadline:{" "}
                <span className="font-semibold text-zinc-800">
                  {essayEvent.deadline}
                </span>
              </p>
            </div>
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <p className="font-semibold text-zinc-800">
                  {essayEvent.entryFee}
                </p>
              </h2>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <BookCheck size={24} className="text-blue-500" />
                Submission Guidelines
              </h2>
              <ul className="space-y-3 text-sm text-zinc-600">
                {essayEvent.submissionGuidelines.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCheck className="mt-0.5 h-4 w-4 text-blue-500 shrink-0" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-8">
              <h2 className="mb-6 text-2xl font-semibold text-zinc-800">
                Submit Your Essay
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
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                      size={18}
                    />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      autoFocus
                      className="w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.fullName}
                    </p>
                  )}
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
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                      size={18}
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      className="w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
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
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                      size={18}
                    />
                    <input
                      type="tel"
                      inputMode="numeric"
                      id="number"
                      name="number"
                      placeholder="+977"
                      value={formData.number}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                  {errors.number && (
                    <p className="mt-1 text-sm text-red-600">{errors.number}</p>
                  )}
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
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                      size={18}
                    />
                    <input
                      type="tel"
                      inputMode="numeric"
                      id="parentsNumber"
                      name="parentsNumber"
                      placeholder="+977"
                      value={formData.parentsNumber}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                  {errors.parentsNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.parentsNumber}
                    </p>
                  )}
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
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                      size={18}
                    />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Your address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
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
                      className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                      size={18}
                    />
                    <input
                      type="text"
                      id="college"
                      name="college"
                      placeholder="College/University"
                      value={formData.college}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="paymentPhoto"
                    className="mb-1 block text-sm font-medium text-zinc-700"
                  >
                    Upload Your Essay
                  </label>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative mt-1 flex justify-center rounded-lg border-2 border-dashed px-6 pt-5 pb-6 transition-colors ${
                      errors.paymentPhoto
                        ? "border-red-400"
                        : isDraggingFile
                          ? "border-blue-500 bg-blue-50"
                          : "border-zinc-300"
                    }`}
                  >
                    <div className="space-y-1 text-center">
                      <FileText
                        className="mx-auto h-12 w-12 text-zinc-400"
                        strokeWidth={1}
                      />
                      <div className="flex text-sm text-zinc-600">
                        <label
                          htmlFor="paymentPhoto"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            ref={fileInputRef}
                            id="paymentPhoto"
                            name="paymentPhoto"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
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
                            <p className="text-xs tracking-wider">(PDF only)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative mt-1 flex justify-center rounded-lg border-2 border-dashed px-6 pt-5 pb-6 transition-colors ${
                      errors.paymentPhoto
                        ? "border-red-400"
                        : isDraggingFile
                          ? "border-blue-500 bg-blue-50"
                          : "border-zinc-300"
                    }`}
                  >
                    <div className="space-y-1 text-center">
                      <FileText
                        className="mx-auto h-12 w-12 text-zinc-400"
                        strokeWidth={1}
                      />
                      <div className="flex text-sm text-zinc-600">
                        <label
                          htmlFor="paymentPhoto"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            ref={fileInputRef}
                            id="paymentPhoto"
                            name="paymentPhoto"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
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
                            <p className="text-xs tracking-wider">(PDF only)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {errors.paymentPhoto && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.paymentPhoto}
                    </p>
                  )}
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
      </div>
    </main>
  );
}
