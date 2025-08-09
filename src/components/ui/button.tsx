import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

const variants: Record<string, string> = {
  default:
    "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800",
  outline:
    "border border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900",
  ghost: "hover:bg-neutral-100 dark:hover:bg-neutral-900",
};

const sizes: Record<string, string> = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  lg: "h-11 px-6",
  xl: "h-12 px-8 text-base",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {leftIcon ? <span className="mr-2">{leftIcon}</span> : null}
        {children}
        {rightIcon ? <span className="ml-2">{rightIcon}</span> : null}
      </button>
    );
  }
);
Button.displayName = "Button";
