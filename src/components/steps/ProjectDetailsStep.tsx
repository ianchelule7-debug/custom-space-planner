import { SpaceSection } from "./SpaceSection";
import type { EnquiryStore } from "@/lib/useEnquiry";

interface Props {
  store: EnquiryStore;
  error?: string | undefined;
}

export function ProjectDetailsStep({ store, error }: Props) {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl text-foreground">Your projects</h2>
        <p className="text-muted-foreground">
          Add each piece you'd like us to work on. Every project keeps its own details.
        </p>
      </header>

      <div className="space-y-6">
        {store.enquiry.projects.map((space) => (
          <SpaceSection key={space.id} space={space} store={store} />
        ))}
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}