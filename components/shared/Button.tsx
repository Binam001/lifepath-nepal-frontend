"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  label: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "solid" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  label,
  className,
  onClick,
  variant = "solid",
  size = "md",
  href,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    "w-fit rounded-full transition-all duration-500 cursor-pointer inline-flex items-center justify-center gap-2 group";

  const sizeStyles = {
    sm: "px-5 py-2 text-xs md:text-sm font-medium",
    md: "px-8 py-2.5 text-[3.5vw] md:text-[2vw] xl:text-[1vw] font-medium",
    lg: "px-8 py-4 text-[3.8vw] md:text-[2.2vw] xl:text-[1.05vw] font-semibold",
  };

  const variantStyles =
    variant === "solid"
      ? "bg-primary text-white hover:bg-primary/80 border-2 border-primary"
      : variant === "outline"
        ? "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white"
        : "bg-white text-gray-900 border-2 border-white";

  const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles[size]} ${className || ""}`;

  const content = (
    <>
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={label}
      className={combinedClassName}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
