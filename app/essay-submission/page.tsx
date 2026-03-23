"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  CheckCheck,
  CheckCircle2,
  FileText,
  FileWarning,
  Info,
  UploadCloud,
} from "lucide-react";
import { z } from "zod";
import { submitEssay } from "@/lib/api";

const essaySubmission = {
  title: "Essay Submission Portal",
  description:
    "Upload your final essay through the official website portal. Please review the submission guidelines before sending your file.",
  description2:
    "Only PDF files are accepted. Make sure the file is readable, properly formatted, and ready for final evaluation before you submit it.",
  guidelines: [
    "Participants must upload their essay in PDF format only through the website submission portal.",
    "Submissions sent through email or other platforms will not be accepted.",
    "Students must ensure that their PDF file is properly formatted and readable before submission.",
  ],
  checklist: [
    "Accepted file type: PDF only.",
    "Maximum upload size: 5MB.",
    "Final review: Check file name, formatting, and readability before uploading.",
  ],
};

const formSchema = z.object({
  essayFile: z
    .instanceof(File, { message: "Essay PDF is required." })
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed.",
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File must be 5MB or smaller.",
    ),
});

type FormState = {
  essayFile: File | null;
};

const initialFormState: FormState = {
  essayFile: null,
};

export default function EssaySubmissionPage() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [error, setError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateSelectedFile = (file: File | null) => {
    setFormData({ essayFile: file });
    setError("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSubmitMessage("");

    const validationResult = formSchema.safeParse(formData);

    if (!validationResult.success) {
      setError(validationResult.error.issues[0]?.message ?? "Invalid file.");
      setIsSubmitting(false);
      return;
    }

    const payload = new FormData();
    payload.append("essayFile", validationResult.data.essayFile);

    const result = await submitEssay(payload);

    if (!result.success) {
      const backendError =
        Array.isArray(result.errors?.essayFile) && result.errors.essayFile[0]
          ? result.errors.essayFile[0]
          : result.message;

      setError(backendError ?? "Something went wrong. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setSubmitMessage("Your essay has been submitted successfully.");
    setFormData(initialFormState);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-zinc-50 pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-0">
        <div className="w-full relative">
          <Image
            src="/assets/essay_small.jpeg"
            alt="Essay Submission"
            height={400}
            width={1300}
            priority
            className="h-50 w-full rounded-4xl bg-blue-200 object-cover md:hidden"
          />
          <Image
            src="/assets/essay_big.jpeg"
            alt="Essay Submission"
            height={400}
            width={1300}
            priority
            className="hidden h-100 w-full rounded-4xl bg-blue-200 object-cover md:block"
          />
          <div className="relative mt-4 md:mt-0 md:absolute md:bottom-6 md:right-6 bg-white md:bg-white/95 md:backdrop-blur-md p-5 md:p-4 md:px-5 rounded-3xl shadow-sm md:shadow-xl border border-zinc-200 md:border-white/20 flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 z-10 w-full md:w-auto">
            <div className="w-full md:w-auto text-center md:text-left">
              <p className="text-[10px] font-bold tracking-wider text-blue-600 uppercase mb-0.5">
                Submission Format
              </p>
              <p className="text-base font-black text-zinc-800">PDF Only</p>
            </div>

            <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-zinc-200 md:border-zinc-200/60 md:pl-6 w-full md:w-auto justify-center md:justify-start">
              <div className="flex flex-col gap-1 text-center items-center md:items-start w-full md:w-auto">
                <div className="text-[10px] font-bold tracking-wider text-green-600 uppercase">
                  Portal Status
                </div>
                <span className="  py-1 text-xs font-semibold text-green-700 ">
                  Open for Submission
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 max-w-7xl px-2">
          <h1 className="text-3xl md:text-3xl font-bold text-blue-500 tracking-tight mb-4">
            {essaySubmission.title}
          </h1>
          <div className="space-y-4 text-zinc-600 text-[15px] md:text-lg leading-relaxed">
            <p>{essaySubmission.description}</p>
            <p>{essaySubmission.description2}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <Info size={24} className="text-blue-500" />
                Submission Guidelines
              </h2>
              <ul className="space-y-4 text-md text-zinc-600">
                {essaySubmission.guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCheck className="mt-1 h-5 w-5 text-blue-500 shrink-0" />
                    <span className="leading-relaxed">{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold text-zinc-800">
                <FileText size={24} className="text-blue-500" />
                Upload Checklist
              </h2>
              <ul className="space-y-4 text-md text-zinc-600">
                {essaySubmission.checklist.map((item, index) => {
                  const parts = item.split(":");
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
                          item
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-amber-400 px-5 py-4">
              <p className="text-[11px] font-bold tracking-wider text-zinc-700 uppercase mb-1">
                Important
              </p>
              <p className="text-base font-semibold text-zinc-900 leading-relaxed">
                Submit only your final essay file. Once uploaded, review the
                confirmation message to ensure the submission completed.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="rounded-2xl border border-zinc-200 bg-white/90 p-8">
              <h2 className="mb-2 text-2xl font-semibold text-zinc-800">
                Submit Here
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-zinc-500">
                Upload your essay PDF using the form below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="essayFile"
                    className="mb-1 block text-sm font-medium text-zinc-700"
                  >
                    Upload Your Essay
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative mt-1 flex justify-center rounded-lg border-2 border-dashed px-6 pt-5 pb-6 transition-colors ${
                      error
                        ? "border-red-400"
                        : isDraggingFile
                          ? "border-blue-500 bg-blue-50"
                          : "border-zinc-300"
                    }`}
                  >
                    <div className="space-y-1 text-center">
                      <UploadCloud
                        className="mx-auto h-10 w-10 text-zinc-400"
                        strokeWidth={1}
                      />
                      <div className="flex text-sm text-zinc-600">
                        <label
                          htmlFor="essayFile"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            ref={fileInputRef}
                            id="essayFile"
                            name="essayFile"
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-zinc-500">
                        {formData.essayFile
                          ? formData.essayFile.name
                          : "(PDF only, max 5MB)"}
                      </p>
                    </div>
                  </div>
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {isSubmitting ? "Submitting..." : "Submit Essay"}
                </button>

                {submitMessage && (
                  <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                    <p>{submitMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
