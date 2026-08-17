import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/enquiry/Buttons";
import { ProgressIndicator } from "@/components/enquiry/ProgressIndicator";
import { WelcomeScreen } from "@/components/steps/WelcomeScreen";
import { CustomerDetails } from "@/components/steps/CustomerDetails";
import { SpaceSelector } from "@/components/steps/SpaceSelector";
import { ProjectDetailsStep } from "@/components/steps/ProjectDetailsStep";
import { GeneralDetails } from "@/components/steps/GeneralDetails";
import { ReviewScreen } from "@/components/steps/ReviewScreen";
import { SuccessScreen } from "@/components/steps/SuccessScreen";
import { useEnquiry } from "@/lib/useEnquiry";
import { submitEnquiry } from "@/lib/api";
import {
  validateDetails,
  validateProjects,
  validateSpaces,
  type DetailsErrors,
} from "@/lib/validation";

type Stage = "welcome" | "form" | "success";

export function EnquiryFlow() {
  const store = useEnquiry();
  const { enquiry } = store;

  const [stage, setStage] = useState<Stage>("welcome");
  const [step, setStep] = useState(0);
  const [detailErrors, setDetailErrors] = useState<DetailsErrors>({});
  const [stepError, setStepError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const goTo = (next: number) => {
    setStepError(null);
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateCurrent = (): boolean => {
    if (step === 0) {
      const errors = validateDetails(enquiry);
      setDetailErrors(errors);
      return Object.keys(errors).length === 0;
    }
    if (step === 1) {
      const error = validateSpaces(enquiry);
      setStepError(error);
      return !error;
    }
    if (step === 2) {
      const error = validateProjects(enquiry);
      setStepError(error);
      return !error;
    }
    return true;
  };

  const next = () => {
    if (!validateCurrent()) return;
    goTo(Math.min(step + 1, 4));
  };

  const handleSubmit = async () => {
    const errors = validateDetails(enquiry);
    const structural = validateSpaces(enquiry) ?? validateProjects(enquiry);
    if (Object.keys(errors).length) {
      setDetailErrors(errors);
      setSubmitError("Please complete your contact details before submitting.");
      goTo(0);
      return;
    }
    if (structural) {
      setSubmitError(structural);
      goTo(structural === validateSpaces(enquiry) ? 1 : 2);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitEnquiry(enquiry);
      setStage("success");
      if (typeof window !== "undefined") window.scrollTo({ top: 0 });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We couldn't submit your enquiry right now. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (stage === "welcome") {
    return (
      <Shell>
        <WelcomeScreen onStart={() => setStage("form")} />
      </Shell>
    );
  }

  if (stage === "success") {
    return (
      <Shell>
        <SuccessScreen />
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="space-y-8">
        <ProgressIndicator current={step} />

        {step === 0 && <CustomerDetails store={store} errors={detailErrors} />}
        {step === 1 && <SpaceSelector store={store} error={stepError ?? undefined} />}
        {step === 2 && <ProjectDetailsStep store={store} error={stepError ?? undefined} />}
        {step === 3 && <GeneralDetails store={store} />}
        {step === 4 && <ReviewScreen enquiry={enquiry} onEditStep={goTo} />}

        {submitError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
          >
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p>{submitError}</p>
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <Button
            variant="secondary"
            onClick={() => (step === 0 ? setStage("welcome") : goTo(step - 1))}
            disabled={submitting}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>

          {step < 4 ? (
            <Button onClick={next}>
              Continue
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {submitting ? "Submitting…" : "Submit Project Enquiry"}
            </Button>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </main>
  );
}