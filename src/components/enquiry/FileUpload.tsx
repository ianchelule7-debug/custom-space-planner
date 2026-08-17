import { useRef, useState } from "react";
import { Paperclip, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UploadedFile } from "@/types/enquiry";

interface FileUploadProps {
  id: string;
  label: string;
  hint?: string;
  files: UploadedFile[];
  onAdd: (files: File[]) => void;
  onRemove: (fileId: string) => void;
  compact?: boolean;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({ id, label, hint, files, onAdd, onRemove, compact }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          onAdd(Array.from(e.dataTransfer.files));
        }}
        className={cn(
          "rounded-xl border border-dashed bg-cream/60 text-center transition-colors",
          compact ? "p-4" : "p-6",
          dragging ? "border-wood bg-wood-soft/40" : "border-border",
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple
          accept="image/*,application/pdf,.doc,.docx,.dwg,.heic"
          className="sr-only"
          onChange={(e) => {
            onAdd(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
        <Upload className="mx-auto size-5 text-wood" aria-hidden="true" />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 min-h-11 rounded-lg px-3 text-sm font-medium text-primary underline underline-offset-4"
        >
          Choose photos or documents
        </button>
        <p className="text-xs text-muted-foreground">
          Take a photo, pick from your library, or drag files here
        </p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
            >
              <Paperclip className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate text-sm">{f.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{formatSize(f.size)}</span>
              <button
                type="button"
                onClick={() => onRemove(f.id)}
                aria-label={`Remove file ${f.name}`}
                className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}