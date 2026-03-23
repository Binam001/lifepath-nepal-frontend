"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface GrowthLightboxProps {
  id: string | null;
  data: {
    id: string;
    type: "advice" | "solution" | "quote";
    title: string;
    content: string;
    author: string;
    image: string;
    date?: string;
  } | null;
  onClose: () => void;
}

const GrowthLightbox: React.FC<GrowthLightboxProps> = ({ id, data, onClose }) => {
  if (!id || !data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/20 dark:bg-black/20 backdrop-blur-3xl"
        onClick={onClose}
      >
        <motion.div
          layoutId={`card-${id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-black rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all duration-300"
          >
            <X size={20} />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-square md:aspect-auto h-64 md:h-[600px]">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 md:hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {data.type}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">{data.title}</h2>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="hidden md:block mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                  {data.type}
                </span>
              </div>
              
              <h2 className="hidden md:block text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
                {data.title}
              </h2>
              
              <p className="text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8">
                {data.content}
              </p>

              <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{data.author}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">{data.date || "Lifepath Reflection"}</p>
                  </div>
                  <button className="px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-sm font-bold transition-transform hover:scale-105 active:scale-95">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GrowthLightbox;
