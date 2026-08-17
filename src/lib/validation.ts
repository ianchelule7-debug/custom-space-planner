import type { Enquiry } from "@/types/enquiry";

export interface DetailsErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export function validateDetails(e: Pick<Enquiry, "name" | "phone" | "email">): DetailsErrors {
  const errors: DetailsErrors = {};
  const name = e.name.trim();
  const phone = e.phone.trim();
  const email = (e.email ?? "").trim();

  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!phone) errors.phone = "We need a phone number to reach you.";
  else if (!/^[+()\-\s\d]{7,20}$/.test(phone)) errors.phone = "Please enter a valid phone number.";

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > 255) {
    errors.email = "That email address is too long.";
  }

  return errors;
}

export function validateSpaces(enquiry: Enquiry): string | null {
  if (enquiry.projects.length === 0) return "Please choose at least one space.";
  if (enquiry.projects.some((s) => !s.space_name.trim()))
    return "Please name your custom space.";
  return null;
}

export function validateProjects(enquiry: Enquiry): string | null {
  const total = enquiry.projects.reduce((n, s) => n + s.projects.length, 0);
  if (total === 0) return "Please add at least one project.";
  if (enquiry.projects.some((s) => s.projects.some((p) => !p.project_type.trim())))
    return "Please name your custom project.";
  return null;
}

export function canSubmit(enquiry: Enquiry): string | null {
  const details = validateDetails(enquiry);
  const firstDetail = details.name ?? details.phone ?? details.email;
  if (firstDetail) return firstDetail;
  return validateSpaces(enquiry) ?? validateProjects(enquiry);
}