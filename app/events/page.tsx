"use client";

import { useEffect, useRef, useState } from "react";
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
  Award,
  BookCheck,
} from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { submitEssay } from "@/lib/api";

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(6, "Full name must be at least 6 characters."),

  email: z.string().trim().email("Enter a valid email."),

  number: z
    .string()
    .regex(
      /^9\d{9}$/,
      "Must be a valid 10-digit Nepali number starting with 9",
    ),

  address: z.string().trim().min(3, "Address is required."),

  parentsNumber: z
    .string()
    .regex(
      /^9\d{9}$/,
      "Must be a valid 10-digit Nepali number starting with 9",
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

  screenshotFile: z
    .instanceof(File, { message: "Payment screenshot is required." })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG, or WEBP images are allowed.",
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File must be 5MB or smaller.",
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
    "Topic Announcement: Topics will be announced on May 13, 2026, along with submission deadlines.",
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
  screenshotFile: File | null;
};

const initialFormData: EventFormData = {
  fullName: "",
  email: "",
  number: "",
  address: "",
  college: "",
  parentsNumber: "",
  paymentPhoto: null,
  screenshotFile: null,
};

const countdownTarget = new Date("2026-05-11T23:59:00+05:45");

const getTimeRemaining = (targetDate: Date) => {
  const total = targetDate.getTime() - Date.now();

  if (total <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
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
  const [isDraggingScreenshot, setIsDraggingScreenshot] = useState(false);
  const screenshotInputRef = useRef<HTMLInputElement | null>(null);
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeRemaining(countdownTarget),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeRemaining(countdownTarget));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as Exclude<
      keyof EventFormData,
      "paymentPhoto" | "screenshotFile"
    >;

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

  const updateSelectedScreenshot = (file: File | null) => {
    setFormData((prev) => ({ ...prev, screenshotFile: file }));
    if (errors.screenshotFile) {
      setErrors((prev) => ({ ...prev, screenshotFile: "" }));
    }
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSelectedScreenshot(e.target.files?.[0] ?? null);
  };

  const handleScreenshotDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingScreenshot(true);
  };

  const handleScreenshotDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingScreenshot(false);
  };

  const handleScreenshotDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingScreenshot(false);

    const file = e.dataTransfer.files?.[0] ?? null;
    if (!file) return;

    updateSelectedScreenshot(file);

    if (screenshotInputRef.current) {
      const transfer = new DataTransfer();
      transfer.items.add(file);
      screenshotInputRef.current.files = transfer.files;
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

    const data = new FormData();
    const { paymentPhoto, screenshotFile, number, parentsNumber, ...fields } =
      validationResult.data;
    Object.entries(fields).forEach(([key, val]) => {
      if (val !== undefined) data.append(key, val);
    });
    data.append("phoneNumber", number);
    data.append("parentPhoneNumber", parentsNumber);
    data.append("essayFile", paymentPhoto);
    data.append("screenshotFile", screenshotFile);

    const result = await submitEssay(data);

    if (!result.success) {
      if (result.errors) {
        // map backend field names back to frontend field names
        const backendFieldMap: Record<string, keyof EventFormData> = {
          phoneNumber: "number",
          parentPhoneNumber: "parentsNumber",
          essayFile: "paymentPhoto",
        };
        const mappedErrors: Partial<Record<keyof EventFormData, string>> = {};
        for (const [key, messages] of Object.entries(result.errors)) {
          const frontendKey =
            backendFieldMap[key] ?? (key as keyof EventFormData);
          mappedErrors[frontendKey] = (messages as string[])[0];
        }
        setErrors(mappedErrors);
      }
      setSubmitMessage(
        result.message ?? "Something went wrong. Please try again.",
      );
      setIsSubmitting(false);
      return;
    }

    setSubmitMessage("Thank you! Your submission has been received.");
    setFormData(initialFormData);

    const fileInput = document.getElementById(
      "paymentPhoto",
    ) as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";

    const screenshotInput = document.getElementById(
      "screenshotFile",
    ) as HTMLInputElement | null;
    if (screenshotInput) screenshotInput.value = "";

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
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Calendar size={24} className="text-blue-500" />
                Important Date
              </h2>
              <div className="overflow-hidden rounded-3xl border border-blue-100 bg-linear-to-br from-white via-blue-50 to-zinc-100 shadow-sm">
                <div className="border-b border-blue-100 px-5 py-4 md:px-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold tracking-[0.18em] text-blue-600 uppercase">
                        Registration Deadline
                      </p>
                      <p className="mt-2 text-lg font-semibold text-zinc-900 md:text-xl">
                        {essayEvent.deadline}
                      </p>
                    </div>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      {timeLeft.total > 0 ? (
                        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                          Live
                        </span>
                      ) : (
                        <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
                          Closed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-5 md:px-6">
                  <div className="rounded-2xl bg-white px-4 py-5 text-center shadow-sm ring-1 ring-zinc-100 md:hidden">
                    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase">
                      Time Remaining
                    </p>
                    <div className="text-2xl font-bold tabular-nums tracking-tight text-zinc-900">
                      {String(timeLeft.days).padStart(2, "0")}:
                      {String(timeLeft.hours).padStart(2, "0")}:
                      {String(timeLeft.minutes).padStart(2, "0")}:
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <p className="mt-2 text-xs font-medium tracking-[0.16em] text-zinc-400 uppercase">
                      dd:hh:mm:ss
                    </p>
                  </div>

                  <div className="hidden grid-cols-4 gap-4 md:grid">
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hours", value: timeLeft.hours },
                      { label: "Minutes", value: timeLeft.minutes },
                      { label: "Seconds", value: timeLeft.seconds },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl bg-white px-4 py-4 text-center shadow-sm ring-1 ring-zinc-100"
                      >
                        <div className="text-3xl font-bold tabular-nums text-zinc-900">
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div className="mt-1 text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Award size={24} className="text-blue-500" />
                Prizes
              </h2>
              <ul className="space-y-3 text-md font-medium text-zinc-600">
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
                <Info size={24} className="text-blue-500" />
                Rules & Guidelines
              </h2>
              <ul className="space-y-3 text-md text-zinc-600">
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
                <p className="font-semibold text-zinc-800">
                  {essayEvent.entryFee}
                </p>
              </h2>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col gap-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <BookCheck size={24} className="text-blue-500" />
                Submission Guidelines
              </h2>
              <ul className="space-y-3 text-md text-zinc-600">
                {essayEvent.submissionGuidelines.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCheck className="mt-0.5 h-4 w-4 text-blue-500 shrink-0" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/90 p-8">
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
                      placeholder="98XXXXXXXX"
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
                      placeholder="98XXXXXXXX"
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

                  {errors.paymentPhoto && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.paymentPhoto}
                    </p>
                  )}
                </div>

                <div className="">
                  <Image
                    src={"/assets/qr.jpeg"}
                    alt="Lifepath"
                    height={600}
                    width={500}
                    className="object-contain"
                  />
                </div>

                <div>
                  <label
                    htmlFor="screenshotFile"
                    className="mb-1 block text-sm font-medium text-zinc-700"
                  >
                    Payment Screenshot
                  </label>

                  <div
                    onDragOver={handleScreenshotDragOver}
                    onDragLeave={handleScreenshotDragLeave}
                    onDrop={handleScreenshotDrop}
                    className={`relative mt-1 flex justify-center rounded-lg border-2 border-dashed px-6 pt-5 pb-6 transition-colors ${
                      errors.screenshotFile
                        ? "border-red-400"
                        : isDraggingScreenshot
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
                          htmlFor="screenshotFile"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            ref={screenshotInputRef}
                            id="screenshotFile"
                            name="screenshotFile"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleScreenshotChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <div className="text-xs text-zinc-500">
                        {formData.screenshotFile ? (
                          formData.screenshotFile.name
                        ) : (
                          <p className="text-xs tracking-wider">
                            (JPG, PNG, JPG, PNG — max 5MB)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {errors.screenshotFile && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.screenshotFile}
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
