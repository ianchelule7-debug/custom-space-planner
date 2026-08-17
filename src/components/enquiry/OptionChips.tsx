import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionChipsProps {
  legend: string;
  options: readonly string[];
  value?: string | undefined;
  onChange: (value: string) => void;
  hint?: string;
  allowUnset?: boolean;
}

export function OptionChips({
  legend,
  options,
  value,
  onChange,
  hint,
  allowUnset = true,
}: OptionChipsProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-foreground">{legend}</legend>
      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(selected && allowUnset ? "" : option)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-cream text-foreground hover:border-wood hover:bg-wood-soft/40",
              )}
            >
              {selected && <Check className="size-4" aria-hidden="true" />}
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}