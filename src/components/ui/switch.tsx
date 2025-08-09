"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Switch({ checked, onChange, label, className }: { checked?: boolean; onChange?: (v: boolean) => void; label?: string; className?: string }) {
  const [isOn, setIsOn] = React.useState(!!checked);
  React.useEffect(() => setIsOn(!!checked), [checked]);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={() => {
        setIsOn((prev) => {
          const next = !prev;
          onChange?.(next);
          return next;
        });
      }}
      className={cn(
        "inline-flex items-center rounded-full border border-neutral-300 p-0.5 transition-colors dark:border-neutral-700",
        isOn ? "bg-black dark:bg-white" : "bg-white dark:bg-black",
        className
      )}
    >
      <span
        className={cn(
          "h-5 w-5 transform rounded-full bg-white shadow transition-transform dark:bg-black",
          isOn ? "translate-x-5" : "translate-x-0"
        )}
      />
      {label && <span className="ml-2 text-sm">{label}</span>}
    </button>
  );
}
