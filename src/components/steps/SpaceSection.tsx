import { Plus } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { projectOptionsFor } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { EnquiryStore } from "@/lib/useEnquiry";
import type { Space } from "@/types/enquiry";

interface Props {
  space: Space;
  store: EnquiryStore;
}

export function SpaceSection({ space, store }: Props) {
  const { addProject, updateProject, removeProject } = store;
  const options = projectOptionsFor(space.space_name);
  const chosen = space.projects.map((p) => p.project_type);

  return (
    <section className="space-y-5 rounded-2xl bg-secondary/50 p-4 sm:p-5">
      <header className="space-y-1">
        <h3 className="text-xs uppercase tracking-[0.2em] text-wood">
          {space.space_name || "Custom space"}
        </h3>
        <p className="text-lg text-foreground">What would you like us to work on?</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = chosen.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              disabled={selected}
              onClick={() => addProject(space.id, option)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4 py-2.5 text-sm transition-colors",
                selected
                  ? "cursor-default border-wood bg-wood-soft text-foreground"
                  : "border-border bg-card hover:border-wood",
              )}
            >
              {selected ? "✓ " : "+ "}
              {option}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => addProject(space.id, "")}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-dashed border-border bg-cream px-4 py-2.5 text-sm transition-colors hover:border-wood"
        >
          <Plus className="size-4" aria-hidden="true" />
          Other
        </button>
      </div>

      {space.projects.length > 0 && (
        <div className="space-y-3">
          {space.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              spaceName={space.space_name}
              isCustom={!options.includes(project.project_type)}
              onChange={(patch) => updateProject(space.id, project.id, patch)}
              onRemove={() => removeProject(space.id, project.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}