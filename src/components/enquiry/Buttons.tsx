import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 disabled:opacity-60",
  secondary:
    "border border-border bg-card text-foreground hover:bg-secondary disabled:opacity-60",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary",
};

export function Button({ variant = "primary", fullWidth, className, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-base font-medium transition-colors disabled:cursor-not-allowed",
        variants[variant],
        fullWidth && "w-full",
        className,
      )}
    />
  );
}