// This events page is for registration purpose only
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Info,
  Mail,
  User,
  BookOpen,
  Contact,
  LocateIcon,
  FileText,
  CheckCheck,
  Award,
  QrCode,
  Ticket,
  X,
  LockKeyholeIcon,
  LucideScrollText,
} from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useEventRegistrationMutation } from "@/hooks/useEventRegistrationMutation";

const e164PhoneRegex = /^\+[1-9]\d{7,14}$/;

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(6, "Full name must be at least 6 characters."),

  email: z.email("Enter a valid email."),

  number: z
    .string()
    .regex(
      e164PhoneRegex,
      "Must be a valid phone number with country code, like +9779812345678",
    ),

  address: z.string().trim().min(3, "Address is required."),

  parentsNumber: z
    .string()
    .regex(
      e164PhoneRegex,
      "Must be a valid phone number with country code, like +9779812345678",
    ),

  college: z.string().trim().min(2, "College name is required."),

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
  title: "Lifepath Essay Competition",
  description:
    "The Lifepath Essay Competition is an initiative created to inspire students at the +2 and Bachelor’s level to express their ideas, creativity, and critical thinking through the power of writing. It offers a meaningful platform for young minds to share their perspectives on important topics while showcasing and enhancing their writing abilities.",
  description2:
    "Through this event, Lifepath aims to inspire students to think deeply about their future, society, and personal growth while promoting the importance of thoughtful communication.",
  rules: [
    "Eligibility: The competition is open to students from +2 to Bachelor's levels.",
    "Original Work: All essays must be original work written by the participant.",
    "No AI Usage: The use of Artificial Intelligence (AI) tools such as ChatGPT or any AI writing software is strictly prohibited. Any essay found to be AI-generated or AI-plagiarized will be immediately disqualified.",
    "Word Limit: Each essay must contain 480 to 500 words only. Essays below 480 words or above 500 words will not be accepted.",
    "Competition Rounds: The competition will consist of multiple rounds, and each round will have a unique essay topic provided by the organizers.",
    "Topic Announcement: The essay topic will be distributed on May 13, 2026 with deadline.",
    "Fair Participation: Participants must submit their own independent work without copying from books, websites, or other sources.",
    "Organizer's Decision: The decision of the judges and organizers will be final.",
    "Language: English / Nepali",
  ],
  prizes: [
    "1st Prize: Rs. 50,000 + Certificate",
    // "All other participants: Digital Certificates",
    "Top 10 essays will be featured on our official blog",
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
  screenshotFile: File | null;
};

type SubmissionModalState = {
  isOpen: boolean;
  tone: "success" | "error";
  title: string;
  description: string;
  detail?: string;
};

const initialFormData: EventFormData = {
  fullName: "",
  email: "",
  number: "+977",
  address: "",
  college: "",
  parentsNumber: "+977",
  //   paymentPhoto: null,
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
  const [submissionModal, setSubmissionModal] = useState<SubmissionModalState>({
    isOpen: false,
    tone: "success",
    title: "",
    description: "",
  });
  // const [isDraggingFile, setIsDraggingFile] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingScreenshot, setIsDraggingScreenshot] = useState(false);
  const screenshotInputRef = useRef<HTMLInputElement | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeRemaining(countdownTarget),
  );
  const { executeRecaptcha } = useGoogleReCaptcha();
  const eventRegistrationMutation = useEventRegistrationMutation();

  const openSubmissionModal = (modal: SubmissionModalState) => {
    setSubmissionModal(modal);
  };

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
    const fieldName = name as Exclude<keyof EventFormData, "screenshotFile">;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  // const updateSelectedFile = (file: File | null) => {
  //   setFormData((prev) => ({ ...prev, paymentPhoto: file }));

  //   if (errors.paymentPhoto) {
  //     setErrors((prev) => ({ ...prev, paymentPhoto: "" }));
  //   }
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   updateSelectedFile(e.target.files?.[0] ?? null);
  // };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDraggingFile(true);
  // };

  // const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDraggingFile(false);
  // };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDraggingFile(false);

  //   const file = e.dataTransfer.files?.[0] ?? null;
  //   if (!file) return;

  //   updateSelectedFile(file);

  //   if (fileInputRef.current) {
  //     const transfer = new DataTransfer();
  //     transfer.items.add(file);
  //     fileInputRef.current.files = transfer.files;
  //   }
  // };

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
      return;
    }

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

    let recaptchaToken = "";

    try {
      recaptchaToken = await executeRecaptcha("event_registration_submit");
    } catch {
      openSubmissionModal({
        isOpen: true,
        tone: "error",
        title: "Verification Failed",
        description:
          "We could not verify your submission with reCAPTCHA. Please try again.",
      });
      return;
    }

    const result = await eventRegistrationMutation.mutateAsync({
      payload: validationResult.data,
      recaptchaToken,
    });

    if (!result.success) {
      let modalTitle = "Submission Failed";
      let modalDescription =
        result.message ?? "Something went wrong. Please try again.";

      if (result.errors) {
        // map backend field names back to frontend field names
        const backendFieldMap: Record<string, keyof EventFormData> = {
          number: "number",
          parentsNumber: "parentsNumber",
          email: "email",
        };
        const mappedErrors: Partial<Record<keyof EventFormData, string>> = {};
        for (const [key, messages] of Object.entries(result.errors)) {
          const frontendKey =
            backendFieldMap[key] ?? (key as keyof EventFormData);
          mappedErrors[frontendKey] = (messages as string[])[0];
        }
        setErrors(mappedErrors);
      }

      // surface duplicate email as an inline field error
      const msg: string = result.message ?? "";
      if (
        msg.toLowerCase().includes("email") &&
        msg.toLowerCase().includes("already")
      ) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered.",
        }));
        modalTitle = "Email Already Registered";
        modalDescription =
          "A registration with this email already exists for this event.";
      }

      openSubmissionModal({
        isOpen: true,
        tone: "error",
        title: modalTitle,
        description: modalDescription,
        detail:
          modalTitle === "Email Already Registered"
            ? "Use a different email address or contact us if you believe this is a mistake."
            : "Please review the form fields and try again. If the issue continues, contact us.",
      });
      return;
    }

    openSubmissionModal({
      isOpen: true,
      tone: "success",
      title: "Application Submitted!",
      description:
        "Thank you for registering for the National Essay Competition 2026.",
      detail:
        "We have received your application and payment. You will be notified about the next steps via email after your payment is confirmed.",
    });
    setFormData(initialFormData);

    const screenshotInput = document.getElementById(
      "screenshotFile",
    ) as HTMLInputElement | null;
    if (screenshotInput) screenshotInput.value = "";
  };

  return (
    <main className="min-h-screen bg-zinc-50 pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-0">
        <div className="w-full relative flex flex-col">
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
          <div className="relative mt-4 md:mt-0 md:absolute md:bottom-6 md:right-6 bg-white md:bg-white/95 md:backdrop-blur-md p-5 md:p-4 md:px-5 rounded-3xl shadow-sm md:shadow-xl border border-zinc-200 md:border-white/20 flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 z-10 w-full md:w-auto">
            <div className="w-full md:w-auto text-center md:text-left">
              <p className="text-[10px] font-bold tracking-wider text-blue-600 uppercase mb-0.5">
                Registration Deadline
              </p>
              <p className="text-base font-black text-zinc-800">
                {essayEvent.deadline}
              </p>
            </div>

            {timeLeft.total > 0 ? (
              <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-zinc-200 md:border-zinc-200/60 md:pl-6 w-full md:w-auto justify-center md:justify-start">
                <div className="flex flex-col gap-1.5 md:gap-1 text-center items-center md:items-start w-full md:w-auto">
                  <div className="text-[10px] font-bold tracking-wider text-red-500 uppercase flex items-center justify-center md:justify-start gap-1.5 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Ends In
                  </div>

                  <div className="flex items-start justify-center md:justify-start gap-1 sm:gap-1.5 md:gap-2 mt-0.5">
                    {[
                      { label: "d", value: timeLeft.days },
                      { label: "h", value: timeLeft.hours },
                      { label: "m", value: timeLeft.minutes },
                      { label: "s", value: timeLeft.seconds },
                    ].map((item, index, arr) => (
                      <div key={item.label} className="flex items-start">
                        <div className="flex flex-col items-center min-w-[20px] sm:min-w-[24px] md:min-w-[28px]">
                          <span className="text-base sm:text-lg md:text-xl font-bold tabular-nums text-zinc-900 leading-none">
                            {String(item.value).padStart(2, "0")}
                          </span>
                          <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase mt-1">
                            {item.label}
                          </span>
                        </div>
                        {index < arr.length - 1 && (
                          <span className="text-base sm:text-lg md:text-xl font-bold text-zinc-400 mx-0.5 sm:mx-1 leading-none -mt-px">
                            :
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-zinc-200 md:border-zinc-200/60 md:pl-6 w-full md:w-auto text-center md:text-left">
                <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white inline-block">
                  Closed
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 md:mt-12 max-w-7xl px-2">
          <h1 className="text-3xl md:text-3xl font-semibold  text-blue-500 tracking-tight mb-4">
            {essayEvent.title}
          </h1>
          <div className="space-y-4 text-zinc-600 text-[15px] md:text-lg leading-relaxed">
            <p>{essayEvent.description}</p>
            <p>{essayEvent.description2}</p>
          </div>
        </div>

        <div className="mt-8  grid gap-10 md:mt-12 md:grid-cols-2">
          {/* Left: Details */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Award size={24} className="text-blue-500" />
                Prizes
              </h2>
              <ul className="space-y-4 text-md font-medium text-zinc-600">
                {essayEvent.prizes.map((prize, index) => {
                  const isFirstPrize =
                    prize.toLowerCase().includes("1st prize") ||
                    prize.includes("50,000");
                  return (
                    <li key={index} className="flex items-start gap-3">
                      {isFirstPrize ? (
                        <div className="w-full relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-500 to-blue-400 p-[2px] shadow-sm">
                          <div className="flex items-center gap-4 rounded-[14px] bg-white px-5 py-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-2xl shadow-inner">
                              🏆
                            </div>
                            <div>
                              <p className="text-xs font-bold tracking-[0.15em] text-blue-600 cursor-default uppercase mb-1">
                                Grand Prize
                              </p>
                              <p className="text-xl font-black text-zinc-900">
                                {prize.split(":")[1]
                                  ? prize.split(":")[1].trim()
                                  : prize}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3 pt-2">
                          <CheckCheck className="mt-1 h-5 w-5 text-blue-500 shrink-0" />
                          <span className="leading-relaxed">{prize}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
              <LucideScrollText size={24} className="text-blue-500" />
              Title
            </h2>
            <div className="group relative flex flex-col items-center justify-center py-4 overflow-hidden rounded-[2rem] border border-blue-400  mb-8 select-none">
              <div
                className="absolute inset-0 flex flex-col p-8 md:p-10 blur-xl opacity-90 pointer-events-none"
                aria-hidden="true"
              >
                <div className="h-10 w-3/4 bg-gray-500 rounded-lg mb-6 ">
                  This is a protected content.
                </div>
                {/* <div className="space-y-4 mix-blend-multiply">
                  <div className="h-5 w-full bg-blue-800 rounded-md"></div>
                  <div className="h-5 w-5/6 bg-blue-800 rounded-md"></div>
                  <div className="h-5 w-4/5 bg-blue-800 rounded-md"></div>
                </div> */}
              </div>

              <div className="cursor-pointer group-hover:scale-103 transform duration-500 relative z-10 flex flex-col items-center text-center    rounded-3xl   max-w-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white mb-4 ">
                  <LockKeyholeIcon size={24} />
                </div>
                <p className="text-xl md:text-xl font-bold text-zinc-900  leading-tight">
                  Reveals on <br className="sm:hidden" /> May 13, 2026
                </p>
                <p className="text-sm font-medium text-zinc-500 ">
                  The essay details will be distributed directly to registered
                  participants.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Info size={24} className="text-blue-500" />
                Rules & Guidelines
              </h2>
              <ul className="space-y-2 text-md text-zinc-600">
                {essayEvent.rules.map((rule, index) => {
                  const parts = rule.split(":");
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCheck className="mt-1 h-5 w-5 text-blue-500 shrink-0" />
                      <span className="leading-relaxed">
                        {parts.length > 1 ? (
                          <>
                            <span className="font-bold text-zinc-800">
                              {parts[0]}:
                            </span>
                            {parts.slice(1).join(":")}
                          </>
                        ) : (
                          rule
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-4 rounded-3xl  ">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500 text-white ">
                  <Ticket size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase mb-0.5">
                    {essayEvent.entryFee.split(":")[0]}
                  </p>
                  <p className="text-xl font-black text-zinc-900">
                    {essayEvent.entryFee.split(":")[1]
                      ? essayEvent.entryFee.split(":")[1].trim()
                      : essayEvent.entryFee}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col gap-4   rounded-2xl sm:p-4">
            <div className="bg-blue-50 rounded-3xl sm:p-4">
              <div className="rounded-2xl border border-zinc-200 bg-white/90 p-4 sm:p-8">
                <h2 className="mb-6 text-2xl font-semibold text-zinc-800">
                  Register Here
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
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
                          // autoFocus
                          className="placeholder-gray-400 w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
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
                          className="placeholder-gray-400 w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
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
                          inputMode="tel"
                          id="number"
                          name="number"
                          placeholder="+9779812345678"
                          value={formData.number}
                          onChange={handleInputChange}
                          className=" placeholder-gray-400 w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                        />
                      </div>
                      {errors.number && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.number}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="parentsNumber"
                        className="mb-1 block text-sm font-medium text-zinc-700 truncate"
                      >
                        Parent/Guardian Number
                      </label>
                      <div className="relative">
                        <Contact
                          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
                          size={18}
                        />
                        <input
                          type="tel"
                          inputMode="tel"
                          id="parentsNumber"
                          name="parentsNumber"
                          placeholder="+9779812345678"
                          value={formData.parentsNumber}
                          onChange={handleInputChange}
                          className="placeholder-gray-400 w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                        />
                      </div>
                      {errors.parentsNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.parentsNumber}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
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
                          className="placeholder-gray-400 w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                        />
                      </div>
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="college"
                        className="mb-1 block text-sm font-medium text-zinc-700"
                      >
                        College/University{" "}
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
                          className="placeholder-gray-400 w-full rounded-lg border border-zinc-300 py-2.5 pr-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div>
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
                    className={`relative mt-1 flex justify-center rounded-lg border-2 border-dashed px-6 pt-5 pb-6 transition-colors ${errors.paymentPhoto ? "border-red-400" : isDraggingFile ? "border-blue-500 bg-blue-50" : "border-zinc-300"}`}
                  >
                    <div className="space-y-1 text-center">
                      <FileText
                        className="mx-auto h-10 w-10 text-zinc-400"
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
                      <p className="text-xs text-zinc-500">
                        {formData.paymentPhoto
                          ? formData.paymentPhoto.name
                          : "(PDF only)"}
                      </p>
                    </div>
                  </div>
                  {errors.paymentPhoto && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.paymentPhoto}
                    </p>
                  )}
                </div> */}

                  {/* QR Code */}
                  <div className="flex flex-col sm:flex-row  items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
                    <p className="flex-1 text-sm tracking-tight sm:tracking-normal text-zinc-600">
                      Scan QR to pay{" "}
                      <span className="font-semibold text-green-600">
                        NPR 500
                      </span>{" "}
                      entry fee
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowQR(true)}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      <QrCode size={16} />
                      View QR
                    </button>
                  </div>

                  {/* QR Modal */}
                  {showQR && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                      onClick={() => setShowQR(false)}
                    >
                      <div
                        className="relative rounded-2xl bg-white p-6 shadow-xl max-w-sm w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setShowQR(false)}
                          className="absolute top-3 right-3 rounded-full p-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
                        >
                          <X size={20} />
                        </button>
                        <p className="mb-4 text-center text-sm font-semibold text-zinc-700">
                          Scan to pay NPR 500
                        </p>
                        <Image
                          src="/assets/qr.jpeg"
                          alt="Payment QR Code"
                          width={300}
                          height={300}
                          className="mx-auto rounded-lg object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => setShowQR(false)}
                          className="mt-4 w-full rounded-full bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}

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
                      className={`relative mt-1 flex justify-center rounded-lg border-2 border-dashed px-6 pt-5 pb-6 transition-colors ${errors.screenshotFile ? "border-red-400" : isDraggingScreenshot ? "border-blue-500 bg-blue-50" : "border-zinc-300"}`}
                    >
                      <div className="space-y-1 text-center">
                        <FileText
                          className="mx-auto h-10 w-10 text-zinc-400"
                          strokeWidth={1}
                        />
                        <div className="flex items-center justify-center text-sm text-zinc-600">
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
                          <p className="pl-1 hidden sm:block">
                            or drag and drop
                          </p>
                        </div>
                        <p className="text-xs text-zinc-500">
                          {formData.screenshotFile
                            ? formData.screenshotFile.name
                            : "(JPG, PNG, WEBP — max 5MB)"}
                        </p>
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
                    disabled={eventRegistrationMutation.isPending}
                    className="flex w-full justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
                  >
                    {eventRegistrationMutation.isPending
                      ? "Submitting..."
                      : "Submit Application"}
                  </button>
                </form>

                {submissionModal.isOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
                      <div
                        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                          submissionModal.tone === "success"
                            ? "bg-green-100"
                            : "bg-red-100"
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
                      <p className="mb-1 text-zinc-600 text-sm">
                        {submissionModal.description}
                      </p>
                      {submissionModal.detail ? (
                        <p className="mb-6 text-zinc-500 text-sm">
                          {submissionModal.detail}
                        </p>
                      ) : null}
                      <a
                        href="mailto:lifepathnepal@gmail.com"
                        className="mb-4 flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors"
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
                        className="w-full rounded-full bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                      >
                        {submissionModal.tone === "success" ? "Done" : "Close"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
