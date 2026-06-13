"use client";

import { RNode } from "../frontend/data";
import { NodeStatus } from "./useProgress";

interface Props {
  node: RNode;
  status: NodeStatus;
  onClick: (id: string) => void;
}

export default function RoadmapNode({ node, status, onClick }: Props) {
  const { variant, flavor } = node;

  let base =
    "absolute select-none transition-all duration-200 font-semibold flex items-center justify-center text-center";
  let shadow = "";
  let style: React.CSSProperties = {
    left: node.x,
    top: node.y,
    width: node.w,
    height: node.h,
  };

  // ---- Phase header (non-interactive) ----
  if (variant === "title") {
    base +=
      " rounded-xl text-white text-2xl md:text-3xl font-extrabold tracking-tight bg-primary cursor-default";
    shadow = "shadow-[6px_6px_0_#1e3a8a]";
    style = { ...style };
    return (
      <div className={`${base} ${shadow}`} style={style}>
        <span className="px-2 leading-tight">{node.title}</span>
      </div>
    );
  }

  if (variant === "phase") {
    return (
      <div
        className="absolute rounded-md border-y-[3px] border-primary bg-linear-to-r from-blue-50 via-white to-blue-50 px-4 py-2 text-center text-sm font-bold uppercase tracking-wider text-blue-900 shadow-sm"
        style={style}
      >
        <span className="px-2">{node.title}</span>
      </div>
    );
  }

  if (variant === "primary") {
    const bg =
      flavor === "optional" ? "bg-primary text-white" : "bg-primary text-white";
    base += ` rounded-md text-xl py-2 px-4 cursor-pointer ${bg}`;
    shadow = "shadow-[4px_4px_0_#0c1e3e]";
  } else {
    // secondary subtopic boxes
    const palette =
      flavor === "alternative"
        ? "bg-sky-50 border-sky-300 text-sky-900"
        : flavor === "optional"
          ? "bg-zinc-50 border-zinc-300 text-zinc-600 border-dashed"
          : "bg-white border-blue-800 text-blue-950";
    base += ` rounded-md border-[2px] text-lg whitespace-nowrap py-1.5 px-3 cursor-pointer ${palette}`;
    shadow = "shadow-[3px_3px_0_#1e3a8a]";
  }

  // Status overlays
  let statusOverlay = "";
  if (status === "done") {
    statusOverlay =
      "!bg-emerald-200 !border-emerald-600 line-through !text-emerald-900";
  } else if (status === "learning") {
    statusOverlay = "ring-4 ring-amber-400";
  } else if (status === "skipped") {
    statusOverlay = "opacity-50 line-through";
  }

  return (
    <button
      type="button"
      onClick={() => onClick(node.id)}
      className={`${base} ${shadow} ${statusOverlay} hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#1e3a8a] active:translate-y-0 active:shadow-[2px_2px_0_#1e3a8a]`}
      style={{
        left: node.x,
        top: node.y,
        width: node.w,
        padding: "12px 0",
      }}
    >
      <span className="px-2 leading-tight">{node.title}</span>
    </button>
  );
}
