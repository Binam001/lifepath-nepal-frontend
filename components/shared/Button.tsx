"use client";

import React from "react";
import Link from "next/link";
import * as Icons from "lucide-react";

interface ButtonProps {
  label: string | React.ReactNode;
  ariaLabel?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> | any;
  variant?: "solid" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: string | React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
  isLoading?: boolean;
}

const Button = ({
  label,
  ariaLabel,
  className,
  onClick,
  variant = "solid",
  size = "md",
  href,
  icon,
  type = "button",
  disabled = false,
  title,
  isLoading = false,
}: ButtonProps) => {
  const baseStyles =
    "w-fit rounded-full transition-all duration-500 cursor-pointer inline-flex items-center justify-center gap-2 group";

  const sizeStyles = {
    sm: "px-5 py-2 text-xs md:text-sm font-medium",
    md: "px-8 py-2.5 text-[3.5vw] md:text-[2vw] xl:text-[1vw]",
    lg: "px-8 py-4 text-[3.8vw] md:text-[2.2vw] xl:text-[1.05vw] font-semibold",
  };

  const variantStyles =
    variant === "solid"
      ? "bg-primary text-white hover:bg-primary/80 border-2 border-primary"
      : variant === "outline"
        ? "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white"
        : "bg-white text-gray-900 border-2 border-white";

  const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles[size]} ${className || ""} ${disabled || isLoading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`;

  const renderIcon = () => {
    if (isLoading) {
      return (
        <svg className="animate-spin h-5 w-5 text-current shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      );
    }
    if (!icon) return null;
    if (typeof icon === "string") {
      const LucideIcon = (Icons as any)[icon];
      if (LucideIcon) {
        return (
          <LucideIcon
            size={18}
            className="transition-transform group-hover:translate-x-1 shrink-0"
          />
        );
      }
      return null;
    }
    return icon;
  };

  const content = (
    <>
      <span>{label}</span>
      {renderIcon()}
    </>
  );

  const computedAriaLabel = ariaLabel || (typeof label === "string" ? label : undefined);

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        aria-label={computedAriaLabel}
        onClick={onClick}
        title={title}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={computedAriaLabel}
      className={combinedClassName}
      disabled={disabled || isLoading}
      title={title}
    >
      {content}
    </button>
  );
};

export default Button;
