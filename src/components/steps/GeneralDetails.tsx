import { Field, inputClass } from "@/components/enquiry/Field";
import { FileUpload } from "@/components/enquiry/FileUpload";
import { cn } from "@/lib/utils";
import type { EnquiryStore } from "@/lib/useEnquiry";

const TIMELINE_UNSURE = "Not sure";
const BUDGET_DISCUSS = "I'd prefer to discuss this";
const BUDGET_UNSURE = "I'm not sure yet";

function Toggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border px-4 py-2.5 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card hover:border-wood",
      )}
    >
      {label}
    </button>
  );
}

export function GeneralDetails({ store }: { store: EnquiryStore }) {
  const { enquiry, setField, addGeneralFiles, removeGeneralFile } = store;

  const timelineUnsure = enquiry.timeline === TIMELINE_UNSURE;
  const budgetPreset = enquiry.budget === BUDGET_DISCUSS || enquiry.budget === BUDGET_UNSURE;

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl text-foreground">A few final details</h2>
        <p className="text-muted-foreground">All optional — share whatever you know.</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="city" label="Town / City" optional>
          {(props) => (
            <input
              {...props}
              type="text"
              value={enquiry.location_city ?? ""}
              onChange={(e) => setField("location_city", e.target.value)}
              className={inputClass()}
              placeholder="e.g. Nairobi"
            />
          )}
        </Field>
        <Field id="area" label="Area / Neighbourhood" optional>
          {(props) => (
            <input
              {...props}
              type="text"
              value={enquiry.location_area ?? ""}
              onChange={(e) => setField("location_area", e.target.value)}
              className={inputClass()}
              placeholder="e.g. Karen"
            />
          )}
        </Field>
      </div>

      <div className="space-y-3">
        <Field id="timeline" label="When would you ideally like the project completed?" optional>
          {(props) => (
            <input
              {...props}
              type="text"
              disabled={timelineUnsure}
              value={timelineUnsure ? "" : (enquiry.timeline ?? "")}
              onChange={(e) => setField("timeline", e.target.value)}
              className={cn(inputClass(), timelineUnsure && "opacity-50")}
              placeholder="e.g. Before December, or around October 2026"
            />
          )}
        </Field>
        <Toggle
          label="I'm not sure yet"
          active={timelineUnsure}
          onClick={() => setField("timeline", timelineUnsure ? "" : TIMELINE_UNSURE)}
        />
      </div>

      <div className="space-y-3">
        <Field id="budget" label="Do you have an approximate budget in mind?" optional>
          {(props) => (
            <input
              {...props}
              type="text"
              disabled={budgetPreset}
              value={budgetPreset ? "" : (enquiry.budget ?? "")}
              onChange={(e) => setField("budget", e.target.value)}
              className={cn(inputClass(), budgetPreset && "opacity-50")}
              placeholder="e.g. Around KES 800,000, or flexible depending on the design"
            />
          )}
        </Field>
        <div className="flex flex-wrap gap-2">
          {[BUDGET_DISCUSS, BUDGET_UNSURE].map((option) => (
            <Toggle
              key={option}
              label={option}
              active={enquiry.budget === option}
              onClick={() => setField("budget", enquiry.budget === option ? "" : option)}
            />
          ))}
        </div>
      </div>

      <FileUpload
        id="general-files"
        label="Additional photos, drawings or documents"
        hint="Upload anything that applies to your overall project, such as floor plans, drawings or general inspiration."
        files={enquiry.generalFiles}
        onAdd={addGeneralFiles}
        onRemove={removeGeneralFile}
      />

      <Field id="anything-else" label="Anything else you'd like us to know?" optional>
        {(props) => (
          <textarea
            {...props}
            rows={4}
            value={enquiry.anything_else ?? ""}
            onChange={(e) => setField("anything_else", e.target.value)}
            className={inputClass()}
            placeholder="Share anything that might help us understand your project"
          />
        )}
      </Field>
    </section>
  );
}