"use client";

export function Card({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-zinc-200 pt-6 ${className}`}>
      <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-600 uppercase">
        {title}
      </p>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          {subtitle}
        </p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function RankedList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "up" | "down";
}) {
  const accent = tone === "up" ? "bg-green-500" : "bg-red-500";

  return (
    <Card title={title}>
      <div className="space-y-4">
        {items.slice(0, 5).map((item, index) => {
          const width = Math.max(34, 100 - index * 14);

          return (
            <div
              key={item}
              className={`grid grid-cols-[42px_1fr] gap-4 ${
                index === 0 ? "" : "border-t border-zinc-200 pt-4"
              }`}
            >
              <div className="text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
                0{index + 1}
              </div>
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-zinc-900">{item}</p>
                  <span className="text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                    {width}%
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-zinc-100">
                  <div
                    className={`h-2 rounded-full ${accent}`}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function InsightList({
  items,
}: {
  items: Array<{ title: string; text: string }>;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.title} className="border-l border-zinc-200 pl-4">
          <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
