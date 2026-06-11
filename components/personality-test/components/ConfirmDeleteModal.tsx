"use client";

import React from "react";
import { Trash2, X } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Saved Result?",
  message = "Are you sure you want to delete your saved assessment progress and results? This action cannot be undone.",
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-zinc-200 shadow-2xl z-10 transform transition-all scale-100 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors p-1.5 hover:bg-zinc-150 rounded-full cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Warning Icon */}
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-5 border border-red-100">
            <Trash2 size={26} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-zinc-900 mb-2">{title}</h3>

          {/* Description */}
          <p className="text-sm text-zinc-500 leading-relaxed mb-6">
            {message}
          </p>

          {/* Actions */}
          <div className="flex w-full gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-full transition-all active:scale-95 cursor-pointer text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all active:scale-95 cursor-pointer text-sm shadow-md shadow-red-600/10"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
