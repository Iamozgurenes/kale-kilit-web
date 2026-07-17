import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-transform duration-200 active:scale-95 sm:text-lg";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-accent text-navy shadow-lg shadow-accent/30 hover:bg-accent/90",
  secondary:
    "bg-white/10 text-white ring-1 ring-inset ring-white/30 hover:bg-white/20",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
