"use client";

import * as React from "react";
import { CornerDownLeft, Search, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  group: string;
  keywords?: string[];
  shortcut?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onSelect: () => void;
}

export interface TonalCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
}

export function TonalCommand({
  open,
  onOpenChange,
  items,
  placeholder = "Search components, demos, or actions...",
  emptyMessage = "No matching results.",
}: TonalCommandProps) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const optionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);
  const listboxId = React.useId();

  const { grouped, flatItems } = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = q
      ? items.filter((item) => {
          const hay = [
            item.label,
            item.description ?? "",
            item.group,
            ...(item.keywords ?? []),
          ]
            .join(" ")
            .toLowerCase();
          return hay.includes(q);
        })
      : items;

    const map = new Map<string, CommandItem[]>();
    for (const item of matched) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    const entries = Array.from(map.entries());
    const ordered = entries.flatMap(([, list]) => list);
    return { grouped: entries, flatItems: ordered };
  }, [items, query]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    optionRefs.current[activeIndex]?.scrollIntoView?.({ block: "nearest" });
  }, [activeIndex, open]);

  if (!open) return null;

  const activeOption = flatItems[activeIndex];
  const activeDescendantId = activeOption
    ? `${listboxId}-opt-${activeIndex}`
    : undefined;

  const runItem = (item: CommandItem) => {
    onOpenChange(false);
    item.onSelect();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onOpenChange(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (flatItems.length > 0) {
        setActiveIndex((i) => (i + 1) % flatItems.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flatItems.length > 0) {
        setActiveIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = flatItems[activeIndex];
      if (target) runItem(target);
    } else if (e.key === "Tab") {
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  let flatIdx = -1;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-start justify-center pt-[12vh] px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={handleKeyDown}
        className="w-full max-w-lg rounded-[24px] bg-[var(--t-elevated)] text-[var(--t-ink)] border border-[var(--t-border-subtle)] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)] overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--t-border-subtle)]">
          <Search
            aria-hidden="true"
            className="h-4 w-4 text-[var(--t-ink-muted)] shrink-0"
          />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listboxId}
            aria-activedescendant={activeDescendantId}
            aria-autocomplete="list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="flex-1 bg-transparent text-[14.5px] text-[var(--t-ink)] placeholder:text-[var(--t-ink-muted)] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="h-6 w-6 rounded-full hover:bg-[var(--t-surface-muted)] grid place-items-center text-[var(--t-ink-muted)] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center rounded-md bg-[var(--t-surface)] border border-[var(--t-border-subtle)] px-1.5 py-0.5 text-[11px] font-mono text-[var(--t-ink-muted)]">
            ESC
          </kbd>
        </div>

        <div
          id={listboxId}
          role="listbox"
          aria-label="Command results"
          className="max-h-[360px] overflow-y-auto p-2 flex flex-col gap-2"
        >
          {grouped.length === 0 ? (
            <div className="py-10 text-center text-[13.5px] text-[var(--t-ink-muted)]">
              {emptyMessage}
            </div>
          ) : (
            grouped.map(([group, groupItems]) => (
              <div key={group} className="flex flex-col gap-0.5">
                <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[var(--t-ink-muted)]">
                  {group}
                </div>
                {groupItems.map((item) => {
                  flatIdx += 1;
                  const idx = flatIdx;
                  const active = idx === activeIndex;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      id={`${listboxId}-opt-${idx}`}
                      ref={(el) => {
                        optionRefs.current[idx] = el;
                      }}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => runItem(item)}
                      className={cn(
                        "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-[14px] text-left cursor-pointer transition-colors",
                        active
                          ? "bg-[var(--t-blue-tint)] text-[var(--t-blue-hover)]"
                          : "text-[var(--t-ink)] hover:bg-[var(--t-surface)]"
                      )}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        {Icon && (
                          <Icon className="h-4 w-4 shrink-0 opacity-80" />
                        )}
                        <span className="min-w-0">
                          <span className="block text-[13.5px] font-medium truncate">
                            {item.label}
                          </span>
                          {item.description && (
                            <span
                              className={cn(
                                "block text-[12px] truncate",
                                active
                                  ? "text-[var(--t-blue-hover)]/80"
                                  : "text-[var(--t-ink-muted)]"
                              )}
                            >
                              {item.description}
                            </span>
                          )}
                        </span>
                      </span>
                      {item.shortcut ? (
                        <kbd className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--t-bg)]/80 border border-[var(--t-border-subtle)] text-[var(--t-ink-muted)] shrink-0">
                          {item.shortcut}
                        </kbd>
                      ) : active ? (
                        <CornerDownLeft className="h-3.5 w-3.5 shrink-0 opacity-75" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
