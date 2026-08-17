import type { Enquiry, EnquiryPayload, UploadedFile } from "@/types/enquiry";

export class ConfigurationError extends Error {}

const clean = (v?: string) => {
  const t = (v ?? "").trim();
  return t.length ? t : undefined;
};

export function buildPayload(enquiry: Enquiry): EnquiryPayload {
  return {
    name: enquiry.name.trim(),
    phone: enquiry.phone.trim(),
    email: clean(enquiry.email),
    preferred_contact_method: clean(enquiry.preferred_contact_method),
    location_city: clean(enquiry.location_city),
    location_area: clean(enquiry.location_area),
    timeline: clean(enquiry.timeline),
    budget: clean(enquiry.budget),
    anything_else: clean(enquiry.anything_else),
    projects: enquiry.projects.map((space) => ({
      space_name: space.space_name.trim(),
      projects: space.projects.map((p) => ({
        project_type: p.project_type.trim(),
        project_description: clean(p.project_description),
        dimensions: clean(p.dimensions),
        material: clean(p.material),
        colour: clean(p.colour),
        finish: clean(p.finish),
        quantity: clean(p.quantity),
        installation: p.installation,
        accessories: clean(p.accessories),
      })),
    })),
  };
}

interface FileMeta {
  field: string;
  filename: string;
  scope: "project" | "general";
  space_name?: string;
  project_type?: string;
}

export async function submitEnquiry(enquiry: Enquiry): Promise<void> {
  const webhookUrl = import.meta.env['VITE_N8N_WEBHOOK_URL'] as string | undefined;
  if (!webhookUrl) {
    throw new ConfigurationError(
      "The submission endpoint has not been configured. Set VITE_N8N_WEBHOOK_URL to enable enquiry submissions.",
    );
  }

  const payload = buildPayload(enquiry);
  const attachments: Array<{ meta: FileMeta; file: UploadedFile }> = [];
  let index = 0;

  enquiry.projects.forEach((space) => {
    space.projects.forEach((project) => {
      (project.files ?? []).forEach((f) => {
        attachments.push({
          file: f,
          meta: {
            field: `file_${index++}`,
            filename: f.name,
            scope: "project",
            space_name: space.space_name,
            project_type: project.project_type,
          },
        });
      });
    });
  });
  enquiry.generalFiles.forEach((f) => {
    attachments.push({
      file: f,
      meta: { field: `file_${index++}`, filename: f.name, scope: "general" },
    });
  });

  let response: Response;
  try {
    if (attachments.length) {
      const form = new FormData();
      form.append("data", JSON.stringify(payload));
      form.append("files_metadata", JSON.stringify(attachments.map((a) => a.meta)));
      attachments.forEach((a) => form.append(a.meta.field, a.file.file, a.file.name));
      response = await fetch(webhookUrl, { method: "POST", body: form });
    } else {
      response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
  } catch {
    throw new Error(
      "We couldn't submit your enquiry right now. Please check your connection and try again.",
    );
  }

  if (!response.ok) {
    throw new Error(
      "We couldn't submit your enquiry right now. Please check your connection and try again.",
    );
  }

  const text = await response.text();
  if (text) {
    try {
      const body = JSON.parse(text) as { success?: boolean; message?: string };
      if (body && body.success === false) {
        throw new Error(body.message || "Your enquiry could not be processed. Please try again.");
      }
    } catch (err) {
      if (err instanceof Error && err.message && !text.trim().startsWith("<")) {
        if (!/^Unexpected|^JSON/.test(err.message)) throw err;
      }
    }
  }
}