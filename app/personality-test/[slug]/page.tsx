"use client";

import { useParams } from "next/navigation";
import MBTITest from "@/components/personality-test/MBTI-test";
import OmegaverseTest from "@/components/personality-test/Omegaverse-test";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PersonalityQuizPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "";

  if (slug === "mbti") {
    return <MBTITest />;
  }

  if (slug === "omegaverse") {
    return <OmegaverseTest />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-zinc-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl border border-zinc-200 p-8 text-center shadow-lg">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="text-red-600" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Test Not Found</h1>
        <p className="text-zinc-600 mb-6">
          The assessment path you are trying to access does not exist or has been moved.
        </p>
        <Link
          href="/personality-test"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft size={16} /> Back to Assessments
        </Link>
      </div>
    </div>
  );
}
