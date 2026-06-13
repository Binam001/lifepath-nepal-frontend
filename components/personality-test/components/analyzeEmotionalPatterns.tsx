"use client";

import {
  Flame,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckCircle2,
} from "lucide-react";

interface AnalyzeEmotionalPatternsProps {
  selfReportAnswers: Record<number, number>;
  scenarioAnswers: Record<number, string>;
}

export default function AnalyzeEmotionalPatterns({
  selfReportAnswers,
  scenarioAnswers,
}: AnalyzeEmotionalPatternsProps) {
  // Helper to safely get answers with neutral defaults
  const getSelfReportVal = (id: number) => selfReportAnswers[id] ?? 3;
  const getScenarioOpt = (id: number) => scenarioAnswers[id] ?? "b";

  // --- 1. Calculate Stress Triggers ---
  // A: Sudden Changes & Pressure
  const q7Val = getSelfReportVal(7); // Frustrated when things don't go as planned
  const s101Opt = getScenarioOpt(101); // Deadline moved up
  let s101Impact = 3;
  if (s101Opt === "b") s101Impact = 5; // force work (high burnout/stress risk)
  if (s101Opt === "a") s101Impact = 3; // talk to colleague
  if (s101Opt === "c") s101Impact = 1; // take break
  const changeStressScore = Math.min(
    100,
    Math.round(((q7Val + s101Impact) / 10) * 100),
  );

  // B: Ambiguity & Vague Feedback
  const s104Opt = getScenarioOpt(104); // unacceptable work email, no details
  let s104Impact = 3;
  if (s104Opt === "b") s104Impact = 5; // reply & defend
  if (s104Opt === "c") s104Impact = 3; // forward to manager
  if (s104Opt === "a") s104Impact = 1; // respond calmly & meet
  const s111Opt = getScenarioOpt(111); // repetitive client adjustments
  let s111Impact = 3;
  if (s111Opt === "b") s111Impact = 5; // argue process managed
  if (s111Opt === "c") s111Impact = 3; // make changes and talk to team
  if (s111Opt === "a") s111Impact = 1; // address feedback calmly
  const ambiguityStressScore = Math.min(
    100,
    Math.round(((s104Impact + s111Impact) / 10) * 100),
  );

  // C: Interpersonal Friction & Overload
  const s112Opt = getScenarioOpt(112); // junior mistake extra work
  let s112Impact = 3;
  if (s112Opt === "a") s112Impact = 5; // handle yourself, complain to manager (extra overload)
  if (s112Opt === "b") s112Impact = 3; // tell them to fix quickly
  if (s112Opt === "c") s112Impact = 1; // sit & help fix
  const s113Opt = getScenarioOpt(113); // team arguing delayed project
  let s113Impact = 3;
  if (s113Opt === "b") s113Impact = 5; // take sides (confrontational stress)
  if (s113Opt === "c") s113Impact = 3; // let them handle
  if (s113Opt === "a") s113Impact = 1; // facilitate resolution
  const conflictStressScore = Math.min(
    100,
    Math.round(((s112Impact + s113Impact) / 10) * 100),
  );

  // --- 2. Calculate Criticism Persona ---
  const q8Val = getSelfReportVal(8); // recover quickly after strong criticism
  const s106Opt = getScenarioOpt(106); // poor performance review before weekend

  let criticismPersona = {
    title: "Adaptive Responder",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-600",
    description:
      "You maintain a healthy balance between listening to feedback and maintaining your confidence. You work to correct errors and adjust your behavior, although highly negative reviews can occasionally throw you off-balance temporarily.",
  };

  if (s106Opt === "c" && q8Val >= 3) {
    criticismPersona = {
      title: "The Reflective Processor",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconColor: "text-blue-600",
      description:
        "You view criticism as structured, informative feedback rather than a personal threat. You prefer to step back, analyze the input objectively, and formulate a calm, strategic response. This prevents impulsive defensiveness and keeps professional relationships highly constructive.",
    };
  } else if (s106Opt === "b" || (s106Opt === "c" && q8Val < 3)) {
    criticismPersona = {
      title: "The Active Clarifier",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-600",
      description:
        "When criticized, you feel an immediate urge to clarify, resolve, or address the issue head-on to dissolve discomfort. While highly proactive, ensuring you take a brief breath before replying can prevent your quick responses from being misperceived as defensive.",
    };
  } else if (s106Opt === "a") {
    criticismPersona = {
      title: "The Sensitive Internalizer",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      gradient: "from-rose-500/10 to-pink-500/10",
      iconColor: "text-rose-600",
      description:
        "You care deeply about the quality of your work, which means professional critiques can easily feel personal and overwhelm you. You tend to absorb negativity and worry about your abilities. Building tools to separate your self-worth from work outputs is your key growth area.",
    };
  }

  // --- 3. Determine Calming & Productivity Coping Mechanisms ---
  const q10Val = getSelfReportVal(10); // pause and think before replying
  const s107Opt = getScenarioOpt(107); // long project planning

  const copingTips = [];

  // Tip 1: Pausing/Centering
  if (s101Opt === "c" || q10Val >= 4) {
    copingTips.push({
      title: "Mindful Tactical Pauses",
      desc: "When pressure spikes, you instinctively benefit from brief physical breaks or drafting responses as drafts before sending. Continue using this method to clear cortisol spikes.",
    });
  } else {
    copingTips.push({
      title: "Introduce 2-Minute Breathing Gaps",
      desc: "You tend to rush to resolve stress immediately. Practicing a deliberate 2-minute delay before replying or acting on emotional events prevents mental exhaustion and protects your energy.",
    });
  }

  // Tip 2: Soundboarding
  if (s101Opt === "a" || s104Opt === "c") {
    copingTips.push({
      title: "Peer-to-Peer Venting & Soundboarding",
      desc: "Speaking out loud with a trusted coworker acts as your emotional safety valve. Discussing stressful situations clears confusion and brings immediate perspective back to your goals.",
    });
  } else {
    copingTips.push({
      title: "Collaborative Task Alignment",
      desc: "When workload stress builds up, avoid trying to bear it entirely alone. Ask for clear guidance, delegate small pieces, or verify details early with your team to stay aligned.",
    });
  }

  // Tip 3: Analytical Deconstruction
  if (s107Opt === "a" || s112Opt === "c") {
    copingTips.push({
      title: "Micro-Task Deconstruction",
      desc: "Your primary productivity anchor is planning. Breaking large, overwhelming goals into simple, weekly lists allows you to channel nervous energy into high-quality actions.",
    });
  } else {
    copingTips.push({
      title: "Logical Diagnostics Check",
      desc: "When a project goes wrong, sit down and make a written list of what is under your control versus what is out of your control. This logical parsing keeps anxiety low.",
    });
  }

  const getSeverityLabel = (score: number) => {
    if (score >= 75)
      return {
        text: "High Vulnerability",
        color: "text-red-650 bg-red-50 border-red-100",
      };
    if (score >= 45)
      return {
        text: "Moderate",
        color: "text-amber-700 bg-amber-50 border-amber-100",
      };
    return {
      text: "Low Vulnerability",
      color: "text-emerald-700 bg-emerald-50 border-emerald-100",
    };
  };

  const changeLabel = getSeverityLabel(changeStressScore);
  const ambiguityLabel = getSeverityLabel(ambiguityStressScore);
  const conflictLabel = getSeverityLabel(conflictStressScore);

  return (
    <section className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200 shadow-sm space-y-8">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
          <TrendingUp size={22} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
            Your Emotional Behavior & Response Blueprint
          </h2>
          <p className="text-sm text-zinc-650 mt-1.5 leading-relaxed">
            Inferred behavior dynamics based on your self-ratings and realistic
            decision choices under pressure.
          </p>
        </div>
      </div>

      {/* Row-wise layout of the three insights */}
      <div className="flex flex-col gap-6">
        {/* ROW 1: Stress & Frustration Triggers */}
        <div className="bg-linear-to-r from-zinc-50 to-zinc-100/50 p-5 md:p-6 rounded-2xl border border-zinc-200 flex flex-col gap-6 items-start lg:items-center">
          <div className="w-full space-y-2.5">
            <div className="flex items-center gap-2 text-red-650 font-bold">
              <Flame size={18} />
              <span className="text-lg xl:text-xl font-extrabold uppercase tracking-wide">
                Stress & Frustration Triggers
              </span>
            </div>
            <p className="text-xs xl:text-sm text-zinc-600 leading-relaxed">
              These factors represent areas where unexpected workplace friction
              has the highest impact on your cognitive load.
            </p>
          </div>

          <div className="w-full space-y-6">
            {/* Trigger A */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs xl:text-sm font-bold text-zinc-700">
                <span>Sudden Plan Changes & Rush Deadlines</span>
                <span
                  className={`px-2 py-0.5 rounded-full border text-[10px] xl:text-xs ${changeLabel.color}`}
                >
                  {changeLabel.text} ({changeStressScore}%)
                </span>
              </div>
              <div className="w-full bg-zinc-200/80 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${changeStressScore}%` }}
                ></div>
              </div>
            </div>

            {/* Trigger B */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs xl:text-sm font-bold text-zinc-700">
                <span>Vague Requirements & Client Ambiguity</span>
                <span
                  className={`px-2 py-0.5 rounded-full border text-[10px] xl:text-xs ${ambiguityLabel.color}`}
                >
                  {ambiguityLabel.text} ({ambiguityStressScore}%)
                </span>
              </div>
              <div className="w-full bg-zinc-200/80 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${ambiguityStressScore}%` }}
                ></div>
              </div>
            </div>

            {/* Trigger C */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs xl:text-sm font-bold text-zinc-700">
                <span>Interpersonal Disputes & Errors by Others</span>
                <span
                  className={`px-2 py-0.5 rounded-full border text-[10px] xl:text-xs ${conflictLabel.color}`}
                >
                  {conflictLabel.text} ({conflictStressScore}%)
                </span>
              </div>
              <div className="w-full bg-zinc-200/80 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${conflictStressScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: How You React to Criticism */}
        <div className="bg-linear-to-r from-zinc-50 to-zinc-100/50 p-5 md:p-6 rounded-2xl border border-zinc-200 flex flex-col gap-6 items-start">
          <div className="w-full space-y-2.5 shrink-0">
            <div className="flex items-center gap-2 text-amber-600 font-bold">
              <MessageSquare size={18} />
              <span className="text-base xl:text-xl font-extrabold uppercase tracking-wide">
                Reaction to Criticism
              </span>
            </div>
            <p className="text-xs xl:text-sm text-zinc-600 leading-relaxed">
              Your cognitive and behavioral response style when receiving direct
              corrections or negative evaluations.
            </p>
          </div>

          <div
            className={`w-full3 p-5 rounded-xl border border-zinc-200/60 bg-linear-to-r ${criticismPersona.gradient} flex flex-col sm:flex-row gap-4 items-start`}
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${criticismPersona.badgeColor}`}
                >
                  {criticismPersona.title}
                </span>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed font-medium">
                {criticismPersona.description}
              </p>
            </div>
          </div>
        </div>

        {/* ROW 3: What Helps You Stay Calm & Productive */}
        <div className="bg-linear-to-r from-zinc-50 to-zinc-100/50 p-5 md:p-6 rounded-2xl border border-zinc-200 flex flex-col gap-6 items-start">
          <div className="w-full space-y-2.5 shrink-0">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <ShieldCheck size={18} />
              <span className="text-base xl:text-xl font-extrabold uppercase tracking-wide">
                Calm & Focus Catalyst
              </span>
            </div>
            <p className="text-xs xl:text-sm text-zinc-600 leading-relaxed">
              These methods are your most effective behavioral anchors to
              maintain high-quality focus and recover from emotional strain.
            </p>
          </div>

          <div className="w-full grid sm:grid-cols-3 gap-3">
            {copingTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-zinc-150 shadow-xs hover:border-emerald-250 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start gap-1.5 text-emerald-700 font-bold text-xs xl:text-sm">
                    <CheckCircle2
                      size={15}
                      className="mt-[2px] text-emerald-500"
                    />
                    <span>{tip.title}</span>
                  </div>
                  <p className="text-xs xl:text-sm text-zinc-650 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
