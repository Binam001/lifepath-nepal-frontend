"use client";

import { useRouter } from "next/navigation";

export default function JumpToPage({
  bookSlug,
  currentPage,
  totalPages,
}: {
  bookSlug: string;
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-zinc-400">Page</span>
      <div className="relative">
        <select
          value={currentPage}
          onChange={(e) => {
            router.push(`/books/${bookSlug}/read?page=${e.target.value}`);
          }}
          className="appearance-none rounded-md border border-zinc-200 bg-white px-3 py-1 pr-6 text-sm text-zinc-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-400" />
      </div>
      <span className="text-sm text-zinc-400">of {totalPages}</span>
    </div>
  );
}
