import { Hammer, Ruler, Sparkles } from "lucide-react";
import { Button } from "@/components/enquiry/Buttons";

const points = [
  { icon: Ruler, text: "No measurements or technical terms needed" },
  { icon: Hammer, text: "Add as many spaces and projects as you like" },
  { icon: Sparkles, text: "Share photos or inspiration if you have any" },
];

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.22em] text-wood">Softwoods</p>
        <h1 className="text-4xl leading-tight text-foreground sm:text-5xl">
          Tell us about your project
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Share as much or as little detail as you have. You don't need to know every measurement,
          material or finish — just tell us what you have in mind.
        </p>
      </div>

      <ul className="space-y-3">
        {points.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-3 text-sm text-foreground/80">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-wood-soft">
              <Icon className="size-4 text-wood" aria-hidden="true" />
            </span>
            <span className="pt-1.5">{text}</span>
          </li>
        ))}
      </ul>

      <Button onClick={onStart} fullWidth className="sm:w-auto">
        Start your enquiry
      </Button>
    </section>
  );
}