import { useEffect, useRef, useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { Field, inputClass } from "@/components/enquiry/Field";
import { OptionChips } from "@/components/enquiry/OptionChips";
import { FileUpload } from "@/components/enquiry/FileUpload";
import { INSTALLATION_OPTIONS } from "@/lib/constants";
import { toUploaded } from "@/lib/useEnquiry";
import { cn } from "@/lib/utils";
import type { Installation, Project } from "@/types/enquiry";

interface Props {
  project: Project;
  spaceName: string;
  isCustom: boolean;
  defaultOpen?: boolean;
  onChange: (patch: Partial<Project>) => void;
  onRemove: () => void;
}

export function ProjectCard({
  project,
  spaceName,
  isCustom,
  defaultOpen = true,
  onChange,
  onRemove,
}: Props) {
  const [open, setOpen] = useState(defaultOpen || isCustom);
  const customInputRef = useRef<HTMLInputElement>(null);
  const panelId = `project-panel-${project.id}`;
  const title = project.project_type || "Untitled project";

  useEffect(() => {
    if (isCustom && !project.project_type.trim()) {
      customInputRef.current?.focus();
    }
  }, [isCustom, project.project_type]);

  const textFields: Array<{ key: keyof Project; label: string; placeholder: string }> = [
    { key: "dimensions", label: "Approximate dimensions", placeholder: "e.g. About 4m x 3m, or “I don't know yet”" },
    { key: "material", label: "Preferred material", placeholder: "e.g. Oak, marble, or “Not sure, please advise”" },
    { key: "colour", label: "Preferred colour", placeholder: "e.g. Natural oak, dark grey" },
    { key: "finish", label: "Preferred finish", placeholder: "e.g. Matte, gloss, natural" },
    { key: "quantity", label: "Quantity", placeholder: "e.g. 1, two units, enough for the room" },
  ];

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <h4>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center gap-3 px-4 py-4 text-left"
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate text-base font-medium text-foreground">{title}</span>
            <span className="block text-xs text-muted-foreground">{spaceName || "Space"}</span>
          </span>
          <ChevronDown
            className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </h4>

      {open && (
        <div id={panelId} className="space-y-6 border-t border-border px-4 pb-5 pt-5">
          {isCustom && (
            <Field id={`type-${project.id}`} label="What would you like us to make or work on?">
              {(props) => (
                <input
                  {...props}
                  ref={customInputRef}
                  type="text"
                  value={project.project_type}
                  onChange={(e) => onChange({ project_type: e.target.value })}
                  onBlur={() => {
                    if (!project.project_type.trim()) {
                      onRemove();
                    }
                  }}
                  className={inputClass()}
                  placeholder="e.g. Built-in Coffee Station"
                />
              )}
            </Field>
          )}

          <Field
            id={`desc-${project.id}`}
            label="Tell us what you have in mind"
            hint="Describe the design, layout or features you'd like."
            optional
          >
            {(props) => (
              <textarea
                {...props}
                rows={4}
                value={project.project_description ?? ""}
                onChange={(e) => onChange({ project_description: e.target.value })}
                className={inputClass()}
                placeholder="Anything you can share helps"
              />
            )}
          </Field>

          {textFields.map(({ key, label, placeholder }) => (
            <Field key={key} id={`${key}-${project.id}`} label={label} optional>
              {(props) => (
                <input
                  {...props}
                  type="text"
                  value={(project[key] as string | undefined) ?? ""}
                  onChange={(e) => onChange({ [key]: e.target.value } as Partial<Project>)}
                  className={inputClass()}
                  placeholder={placeholder}
                />
              )}
            </Field>
          ))}

          <OptionChips
            legend="Do you need installation?"
            options={INSTALLATION_OPTIONS}
            value={project.installation}
            onChange={(v) => onChange({ installation: (v || undefined) as Installation | undefined })}
          />

          <Field
            id={`accessories-${project.id}`}
            label="Accessories or special features"
            hint="For example soft-close hinges, LED lighting, pull-out storage or hidden sockets."
            optional
          >
            {(props) => (
              <textarea
                {...props}
                rows={3}
                value={project.accessories ?? ""}
                onChange={(e) => onChange({ accessories: e.target.value })}
                className={inputClass()}
                placeholder="Describe anything extra you'd like"
              />
            )}
          </Field>

          <FileUpload
            compact
            id={`files-${project.id}`}
            label="Photos, drawings or inspiration"
            hint={`These files are saved with ${title} only.`}
            files={project.files}
            onAdd={(files) => onChange({ files: [...project.files, ...toUploaded(files)] })}
            onRemove={(fileId) => onChange({ files: project.files.filter((f) => f.id !== fileId) })}
          />

          <button
            type="button"
            onClick={onRemove}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Remove project
          </button>
        </div>
      )}
    </article>
  );
}