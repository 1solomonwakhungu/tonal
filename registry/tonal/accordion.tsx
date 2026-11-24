"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface AccordionItemData {
  question: string;
  answer: string;
}

export function TonalAccordion({
  items,
  defaultOpenIndex = 0,
  className,
}: {
  items: AccordionItemData[];
  defaultOpenIndex?: number | null;
  className?: string;
}) {
  const baseId = React.useId();
  const [openIndex, setOpenIndex] = React.useState<number | null>(
    defaultOpenIndex
  );
  const panelRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    panelRefs.current.forEach((el, idx) => {
      if (el) {
        el.inert = openIndex !== idx;
      }
    });
  }, [openIndex, items.length]);

  return (
    <div
      className={cn(
        "divide-y divide-[var(--t-border-subtle)] border-y border-[var(--t-border-subtle)]",
        className
      )}
    >
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `${baseId}-trigger-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;
        return (
          <div key={item.question}>
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer group rounded-[8px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--t-blue)]"
            >
              <span className="text-[16px] font-medium tracking-[-0.015em] text-[var(--t-ink)] group-hover:text-[var(--t-blue)] transition-colors">
                {item.question}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-5 w-5 shrink-0 text-[var(--t-ink-muted)] transition-transform duration-250 [transition-timing-function:var(--t-ease)]",
                  isOpen && "rotate-180 text-[var(--t-ink)]"
                )}
              />
            </button>
            <div
              ref={(el) => {
                panelRefs.current[idx] = el;
              }}
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-all duration-250 [transition-timing-function:var(--t-ease)]",
                isOpen
                  ? "grid-rows-[1fr] pb-5 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-[14.5px] leading-[1.6] text-[var(--t-ink-secondary)] max-w-2xl">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
