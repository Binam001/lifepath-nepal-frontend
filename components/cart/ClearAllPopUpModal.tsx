import React from "react";
import { AlertTriangle } from "lucide-react";

interface ClearAllPopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClearAllPopUpModal({
  isOpen,
  onClose,
  onConfirm,
}: ClearAllPopUpModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-300"
      data-lenis-prevent
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden z-10 p-6 animate-in zoom-in-95 duration-200 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-rose-50 border border-rose-100">
          <AlertTriangle className="h-6 w-6 text-rose-600" />
        </div>
        
        <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
          Clear Shopping Cart?
        </h3>
        
        <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
          Are you sure you want to remove all items from your cart? This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-zinc-200 text-zinc-700 font-semibold hover:bg-zinc-50 transition-colors text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors text-sm cursor-pointer"
          >
            Yes, Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
