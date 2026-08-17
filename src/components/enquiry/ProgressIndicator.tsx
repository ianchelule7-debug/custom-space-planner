import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/constants";

export function ProgressIndicator({ current }: { current: number }) {
  return (
    <nav aria-label="Progress" className="space-y-2">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Step {current + 1} of {STEPS.length} · {STEPS[current]}
      </p>
      <ol className="flex gap-1.5" role="list">
        {STEPS.map((step, i) => (
          <li key={step} className="flex-1">
            <span className="sr-only">{step}</span>
            <span
              aria-current={i === current ? "step" : undefined}
              className={cn(
                "block h-1 rounded-full transition-colors",
                i < current ? "bg-wood" : i === current ? "bg-primary" : "bg-border",
              )}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}