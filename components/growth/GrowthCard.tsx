"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GrowthCardProps {
  id: string;
  type: "advice" | "solution" | "quote";
  title: string;
  content: string;
  author: string;
  image: string;
  onClick: (id: string) => void;
}

const GrowthCard: React.FC<GrowthCardProps> = ({
  id,
  type,
  title,
  content,
  author,
  image,
  onClick,
}) => {
  const badgeColors = {
    advice: "bg-blue-100 text-blue-700",
    solution: "bg-green-100 text-green-700",
    quote: "bg-purple-100 text-purple-700",
  };

  return (
    <motion.div
      layoutId={`card-${id}`}
      className="break-inside-avoid mb-4 group cursor-pointer relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-xl hover:shadow-black/5"
      onClick={() => onClick(id)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative aspect-auto min-h-[200px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={600}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${badgeColors[type]}`}>
            {type}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-4">
          {content}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500 italic">
            — {author}
          </span>
          <button className="text-xs font-bold text-zinc-900 dark:text-zinc-100 underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GrowthCard;
