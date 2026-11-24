import * as React from "react";
import { ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ChevronLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tone?: "blue" | "ink";
}

export function ChevronLink({
  tone = "blue",
  className,
  children,
  ...props
}: ChevronLinkProps) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-1 text-[14px] font-medium tracking-[-0.01em] cursor-pointer rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]",
        tone === "blue"
          ? "text-[var(--t-blue)] hover:text-[var(--t-blue-hover)]"
          : "text-[var(--t-ink)] hover:text-[var(--t-ink-secondary)]",
        className
      )}
      {...props}
    >
      <span className="group-hover:underline underline-offset-4">{children}</span>
      <ChevronRight className="h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--t-ease)] group-hover:translate-x-0.5" />
    </a>
  );
}
