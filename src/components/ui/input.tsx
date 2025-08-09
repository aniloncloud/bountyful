import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:focus-visible:ring-white",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
