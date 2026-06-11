"use client";

import { useEffect } from "react";
import Confetti from "react-confetti";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Eye,
  Leaf,
  ListChecks,
  Handshake,
  BookOpen,
  Lightbulb,
  Zap,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { getPersonalityType } from "../../data/MBTI-data";
import ComparisonCTA from "./components/ComparisonCTA";
import { useResponsive } from "@/hooks/useMediaQuery";

interface MBTIResultSectionProps {
  result: string;
  showConfetti: boolean;
  windowSize: { width: number; height: number };
  handleRetake: () => void;
}

export default function MBTIResultSection({
  result,
  showConfetti,
  windowSize,
  handleRetake,
}: MBTIResultSectionProps) {
  const personality = getPersonalityType(result);
  const { isSmallerDevice } = useResponsive();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!personality) return null;

  return (
    <div className="min-h-screen pt-16 pb-12 bg-zinc-50">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <section
        className="bg-white border-b"
        style={{
          backgroundImage: "url(/404/404.png)",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleRetake}
              className="px-4 py-2 bg-white/30 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-full transition-all cursor-pointer flex items-center gap-2 w-fit"
            >
              <ArrowLeft size={16} />
              Retake Test
            </button>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="size-8 md:size-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle
                size={isSmallerDevice ? 20 : 28}
                className="text-green-600"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-100">
                  {personality.name}
                </h1>
                <div className="px-4 py-1.5 bg-primary text-white text-lg sm:text-xl font-bold rounded-lg animate-bounce">
                  {result}
                </div>
              </div>
              <p className="text-lg text-zinc-50 leading-relaxed font-medium">
                {personality.tagline}
              </p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-2xl rounded-xl p-6 md:p-8 mb-6 border border-zinc-200">
            <p className="text-lg md:text-2xl text-zinc-800 font-semibold mb-4">
              {personality.description}
            </p>
            <p className="text-base md:text-lg text-zinc-800 leading-relaxed">
              {personality.detailedDescription}
            </p>
          </div>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs h-full flex flex-col">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              Your Key Strengths
            </h2>
            <div className="space-y-3">
              {personality.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-green-600 shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <p className="text-base text-zinc-800 leading-relaxed">
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 md:p-8 border border-zinc-200 shadow-xs h-full flex flex-col">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              Areas for Growth
            </h2>
            <div className="space-y-3">
              {personality.weaknesses.map((weakness, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-base text-zinc-800 leading-relaxed">
                    {weakness}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200 shadow-xs">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            How You Work Best
          </h2>
          <p className="text-base text-zinc-700 leading-relaxed">
            {personality.workStyle}
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 md:p-8 mb-6 border border-zinc-200 shadow-xs">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            Recommended Careers For You
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {personality.careers.map((career, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-zinc-50 rounded-lg border border-zinc-200 hover:border-blue-300 transition-all"
              >
                <CheckCircle size={16} className="text-blue-600 shrink-0" />
                <span className="text-sm font-medium text-zinc-800">
                  {career}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200 mb-8">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">
            Your 8 Cognitive Functions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Eye size={18} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">Se</h3>
              <p className="text-xs text-zinc-600">Experience</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Leaf size={18} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">Ne</h3>
              <p className="text-xs text-zinc-600">Possibilities</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <ListChecks size={18} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">Te</h3>
              <p className="text-xs text-zinc-600">Order</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Handshake size={18} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">Fe</h3>
              <p className="text-xs text-zinc-600">Harmony</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen size={18} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">Si</h3>
              <p className="text-xs text-zinc-600">Memory</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lightbulb size={18} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">Ni</h3>
              <p className="text-xs text-zinc-600">Insight</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap size={18} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">Ti</h3>
              <p className="text-xs text-zinc-600">Logic</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border border-zinc-200">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart size={18} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">Fi</h3>
              <p className="text-xs text-zinc-600">Values</p>
            </div>
          </div>
        </div>
        {/* Comparison CTA Dashboard Banner */}
        <ComparisonCTA />

        <section className="bg-blue-600 rounded-xl p-6 md:p-8 text-center text-white mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Ready to Turn Insight into Action?
          </h2>
          <p className="text-base text-blue-50 mb-6">
            Explore courses designed for {personality.name} personalities like
            you.
          </p>
          <Link href="/job-training">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all cursor-pointer inline-flex items-center gap-2">
              Explore Courses
              <ArrowRight size={18} />
            </button>
          </Link>
        </section>

        <div className="inline-flex items-center justify-center w-full pb-2">
          <Link
            href="/mbti-book"
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-md font-bold rounded-full transition-all shadow-lg hover:shadow-xl cursor-pointer"
          >
            Learn about MBTI
          </Link>
        </div>
      </article>
    </div>
  );
}
