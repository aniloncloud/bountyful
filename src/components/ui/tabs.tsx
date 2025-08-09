"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  className,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  className?: string;
  onChange?: (id: string) => void;
}) {
  const [active, setActive] = React.useState(tabs[0]?.id);
  return (
    <div className={cn("inline-flex rounded-lg border p-1 dark:border-neutral-800", className)}>
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
            )}
            onClick={() => {
              setActive(t.id);
              onChange?.(t.id);
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
