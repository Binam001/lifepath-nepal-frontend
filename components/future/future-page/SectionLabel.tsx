export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[13.5px] font-bold uppercase tracking-widest text-blue-600">
      {children}
    </p>
  );
}
