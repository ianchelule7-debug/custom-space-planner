import { CheckCircle2 } from "lucide-react";

export function SuccessScreen() {
  return (
    <section className="space-y-6 py-8 text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-wood-soft">
        <CheckCircle2 className="size-8 text-wood" aria-hidden="true" />
      </span>
      <h1 className="text-3xl text-foreground">Thank you — we've received your project enquiry.</h1>
      <p className="mx-auto max-w-md text-muted-foreground">
        Our team will review the information you've shared and follow up if any further details are
        needed.
      </p>
    </section>
  );
}