import { Paperclip, Pencil } from "lucide-react";
import type { Enquiry, Project } from "@/types/enquiry";

interface Props {
  enquiry: Enquiry;
  onEditStep: (step: number) => void;
}

function Row({ label, value }: { label: string; value?: string | undefined }) {
  if (!value?.trim()) return null;
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-sm text-muted-foreground sm:w-40">{label}</dt>
      <dd className="break-words text-sm text-foreground">{value}</dd>
    </div>
  );
}

function SectionHeader({
  title,
  onEdit,
  editLabel,
}: {
  title: string;
  onEdit: () => void;
  editLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-xs uppercase tracking-[0.2em] text-wood">{title}</h3>
      <button
        type="button"
        onClick={onEdit}
        aria-label={editLabel}
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary"
      >
        <Pencil className="size-3.5" aria-hidden="true" />
        Edit
      </button>
    </div>
  );
}

function ProjectSummary({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="font-medium text-foreground">{project.project_type || "Untitled project"}</p>
      <dl className="mt-2 space-y-1.5">
        <Row label="Description" value={project.project_description} />
        <Row label="Dimensions" value={project.dimensions} />
        <Row label="Material" value={project.material} />
        <Row label="Colour" value={project.colour} />
        <Row label="Finish" value={project.finish} />
        <Row label="Quantity" value={project.quantity} />
        <Row label="Installation" value={project.installation} />
        <Row label="Accessories" value={project.accessories} />
      </dl>
      {project.files.length > 0 && (
        <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Paperclip className="size-3.5" aria-hidden="true" />
          {project.files.length} file{project.files.length > 1 ? "s" : ""} attached
        </p>
      )}
    </div>
  );
}

export function ReviewScreen({ enquiry, onEditStep }: Props) {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl text-foreground">Your project enquiry</h2>
        <p className="text-muted-foreground">
          Have a quick look before you send it. You can edit any section.
        </p>
      </header>

      <div className="space-y-4">
        <SectionHeader title="Customer" onEdit={() => onEditStep(0)} editLabel="Edit your details" />
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="font-medium text-foreground">{enquiry.name}</p>
          <dl className="mt-2 space-y-1.5">
            <Row label="Phone" value={enquiry.phone} />
            <Row label="Email" value={enquiry.email} />
            <Row label="Preferred contact" value={enquiry.preferred_contact_method} />
          </dl>
        </div>
      </div>

      {enquiry.projects.map((space) => (
        <div key={space.id} className="space-y-4">
          <SectionHeader
            title={space.space_name || "Custom space"}
            onEdit={() => onEditStep(2)}
            editLabel={`Edit projects in ${space.space_name || "custom space"}`}
          />
          {space.projects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects added yet.</p>
          ) : (
            <div className="space-y-3">
              {space.projects.map((project) => (
                <ProjectSummary key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="space-y-4">
        <SectionHeader
          title="Final details"
          onEdit={() => onEditStep(3)}
          editLabel="Edit final details"
        />
        <div className="rounded-xl border border-border bg-card p-4">
          <dl className="space-y-1.5">
            <Row label="Town / City" value={enquiry.location_city} />
            <Row label="Area" value={enquiry.location_area} />
            <Row label="Timeline" value={enquiry.timeline} />
            <Row label="Budget" value={enquiry.budget} />
            <Row label="Anything else" value={enquiry.anything_else} />
          </dl>
          {enquiry.generalFiles.length > 0 && (
            <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Paperclip className="size-3.5" aria-hidden="true" />
              {enquiry.generalFiles.length} general file
              {enquiry.generalFiles.length > 1 ? "s" : ""} attached
            </p>
          )}
        </div>
      </div>
    </section>
  );
}