import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
  align?: "left" | "center" | "right";
}

export default function PageTitle({
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  containerClassName,
  align = "center",
}: PageTitleProps) {
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "left"
        ? "text-left"
        : "text-right";

  return (
    <div
      className={`${alignClass} ${containerClassName || "max-w-3xl mx-auto"}`}
    >
      <h1
        className={
          titleClassName ||
          "text-2xl md:text-4xl font-semibold text-blue-500 mb-4"
        }
      >
        {title}
      </h1>
      {subtitle && (
        <p className={subtitleClassName || "text-lg text-zinc-700"}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
