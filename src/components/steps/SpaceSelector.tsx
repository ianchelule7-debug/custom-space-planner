import { Check, Plus, Trash2 } from "lucide-react";
import { OTHER, SPACES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { projectHasData, type EnquiryStore } from "@/lib/useEnquiry";
import { Field, inputClass } from "@/components/enquiry/Field";

interface Props {
  store: EnquiryStore;
  error?: string | undefined;
}

export function SpaceSelector({ store, error }: Props) {
  const { enquiry, addSpace, removeSpace, renameSpace } = store;
  const selectedNames = enquiry.projects.map((s) => s.space_name);
  const customSpaces = enquiry.projects.filter(
    (s) => !(SPACES as readonly string[]).includes(s.space_name),
  );

  const confirmRemove = (spaceId: string, label: string) => {
    const space = enquiry.projects.find((s) => s.id === spaceId);
    const hasData = space?.projects.some(projectHasData) ?? false;
    if (hasData && !window.confirm(`Remove ${label} and the project details inside it?`)) return;
    removeSpace(spaceId);
  };

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl text-foreground">What spaces are you working on?</h2>
        <p className="text-muted-foreground">Choose as many as you need.</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {SPACES.map((space) => {
          const existing = enquiry.projects.find((s) => s.space_name === space);
          const selected = Boolean(existing);
          return (
            <button
              key={space}
              type="button"
              aria-pressed={selected}
              onClick={() => (existing ? confirmRemove(existing.id, space) : addSpace(space))}
              className={cn(
                "flex min-h-20 flex-col justify-between rounded-xl border p-4 text-left transition-all",
                selected
                  ? "border-wood bg-wood-soft/50 shadow-soft"
                  : "border-border bg-card hover:border-wood/60 hover:shadow-soft",
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full border",
                  selected ? "border-wood bg-wood text-primary-foreground" : "border-border",
                )}
                aria-hidden="true"
              >
                {selected && <Check className="size-3.5" />}
              </span>
              <span className="mt-3 text-sm font-medium leading-snug">{space}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => addSpace("")}
          className="flex min-h-20 flex-col justify-between rounded-xl border border-dashed border-border bg-cream/60 p-4 text-left transition-colors hover:border-wood"
        >
          <Plus className="size-5 text-wood" aria-hidden="true" />
          <span className="mt-3 text-sm font-medium leading-snug">Other space</span>
        </button>
      </div>

      {customSpaces.length > 0 && (
        <div className="space-y-4">
          {customSpaces.map((space, i) => (
            <div
              key={space.id}
              className="rounded-xl border border-border bg-card p-4 shadow-soft"
            >
              <Field
                id={`custom-space-${space.id}`}
                label={customSpaces.length > 1 ? `Custom space ${i + 1}` : "What space are you working on?"}
              >
                {(props) => (
                  <input
                    {...props}
                    type="text"
                    value={space.space_name}
                    autoFocus={!space.space_name}
                    onChange={(e) => renameSpace(space.id, e.target.value)}
                    className={inputClass()}
                    placeholder="e.g. Outdoor entertainment area"
                  />
                )}
              </Field>
              <button
                type="button"
                onClick={() => confirmRemove(space.id, space.space_name || "this space")}
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="size-4" aria-hidden="true" />
                Remove space
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedNames.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {selectedNames.length} space{selectedNames.length > 1 ? "s" : ""} selected
        </p>
      )}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <p className="sr-only">{OTHER}</p>
    </section>
  );
}