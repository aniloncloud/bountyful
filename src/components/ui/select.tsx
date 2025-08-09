import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-md border border-neutral-300 bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:border-neutral-700 dark:focus-visible:ring-white",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
