import * as React from "react";
import { ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TonalInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  variant?: "default" | "pill";
  leadingIcon?: React.ReactNode;
}

export const TonalInput = React.forwardRef<HTMLInputElement, TonalInputProps>(
  (
    {
      label,
      hint,
      error,
      variant = "default",
      leadingIcon,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-msg`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[12.5px] font-medium text-[var(--t-ink-secondary)]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leadingIcon && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 text-[var(--t-ink-muted)] flex items-center"
            >
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            aria-describedby={error || hint ? messageId : undefined}
            className={cn(
              "w-full text-[14px] text-[var(--t-ink)] placeholder:text-[var(--t-ink-muted)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed",
              variant === "pill"
                ? "rounded-full bg-[var(--t-surface-cool)] border border-transparent py-2 pr-4 focus:border-[var(--t-ring,var(--t-blue))] focus:bg-[var(--t-bg)] focus-visible:ring-[var(--t-ring,var(--t-blue))]/35"
                : "rounded-[12px] bg-[var(--t-bg)] border border-[var(--t-border)] py-2.5 pr-3.5 focus:border-[var(--t-ring,var(--t-blue))] focus-visible:ring-[var(--t-ring,var(--t-blue))]/35",
              leadingIcon ? "pl-10" : variant === "pill" ? "pl-4" : "pl-3.5",
              error &&
                "border-[var(--t-danger,#c5221f)] focus:border-[var(--t-danger,#c5221f)] focus-visible:ring-[var(--t-danger,#c5221f)]/35",
              className
            )}
            {...props}
          />
        </div>
        {(error || hint) && (
          <p
            id={messageId}
            role={error ? "alert" : undefined}
            className={cn(
              "text-[12px] leading-snug",
              error
                ? "text-[var(--t-danger,#c5221f)]"
                : "text-[var(--t-ink-muted)]"
            )}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);
TonalInput.displayName = "TonalInput";

export interface TonalSelectOption {
  value: string;
  label: string;
}

export interface TonalSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options?: TonalSelectOption[];
}

export const TonalSelect = React.forwardRef<HTMLSelectElement, TonalSelectProps>(
  ({ label, hint, error, options, id, className, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const messageId = `${selectId}-msg`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-[12.5px] font-medium text-[var(--t-ink-secondary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? true : undefined}
            aria-describedby={error || hint ? messageId : undefined}
            className={cn(
              "w-full appearance-none rounded-[12px] border border-[var(--t-border)] bg-[var(--t-bg)] px-3.5 py-2.5 pr-9 text-[14px] text-[var(--t-ink)] transition-all duration-200 focus:border-[var(--t-ring,var(--t-blue))] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--t-ring,var(--t-blue))]/35 disabled:opacity-50",
              error &&
                "border-[var(--t-danger,#c5221f)] focus:border-[var(--t-danger,#c5221f)] focus-visible:ring-[var(--t-danger,#c5221f)]/35",
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--t-ink-muted)]"
          />
        </div>
        {(error || hint) && (
          <p
            id={messageId}
            role={error ? "alert" : undefined}
            className={cn(
              "text-[12px] leading-snug",
              error
                ? "text-[var(--t-danger,#c5221f)]"
                : "text-[var(--t-ink-muted)]"
            )}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);
TonalSelect.displayName = "TonalSelect";

export interface TonalTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const TonalTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TonalTextareaProps
>(({ label, hint, error, id, className, rows = 3, ...props }, ref) => {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;
  const messageId = `${textareaId}-msg`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-[12.5px] font-medium text-[var(--t-ink-secondary)]"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={cn(
          "w-full rounded-[14px] border border-[var(--t-border)] bg-[var(--t-bg)] px-3.5 py-2.5 text-[14px] text-[var(--t-ink)] placeholder:text-[var(--t-ink-muted)] transition-all duration-200 focus:border-[var(--t-ring,var(--t-blue))] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--t-ring,var(--t-blue))]/35 disabled:opacity-50 resize-y",
          error &&
            "border-[var(--t-danger,#c5221f)] focus:border-[var(--t-danger,#c5221f)] focus-visible:ring-[var(--t-danger,#c5221f)]/35",
          className
        )}
        {...props}
      />
      {(error || hint) && (
        <p
          id={messageId}
          role={error ? "alert" : undefined}
          className={cn(
            "text-[12px] leading-snug",
            error
              ? "text-[var(--t-danger,#c5221f)]"
              : "text-[var(--t-ink-muted)]"
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
});
TonalTextarea.displayName = "TonalTextarea";
