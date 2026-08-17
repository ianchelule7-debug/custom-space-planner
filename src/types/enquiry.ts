export type Installation = "Yes" | "No" | "Not sure";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export interface Project {
  id: string;
  project_type: string;
  project_description?: string;
  dimensions?: string;
  material?: string;
  colour?: string;
  finish?: string;
  quantity?: string;
  installation?: Installation;
  accessories?: string;
  files?: UploadedFile[];
}

export interface Space {
  id: string;
  space_name: string;
  projects: Project[];
}

export interface Enquiry {
  name: string;
  phone: string;
  email?: string;
  preferred_contact_method?: string;
  location_city?: string;
  location_area?: string;
  timeline?: string;
  budget?: string;
  anything_else?: string;
  projects: Space[];
  generalFiles: UploadedFile[];
}

export interface ProjectPayload {
  project_type: string;
  project_description: string | undefined;
  dimensions: string | undefined;
  material: string | undefined;
  colour: string | undefined;
  finish: string | undefined;
  quantity: string | undefined;
  installation: Installation | undefined;
  accessories: string | undefined;
}

/** Shape sent to n8n (no client-only ids / File objects). */
export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string | undefined;
  preferred_contact_method: string | undefined;
  location_city: string | undefined;
  location_area: string | undefined;
  timeline: string | undefined;
  budget: string | undefined;
  anything_else: string | undefined;
  projects: Array<{
    space_name: string;
    projects: ProjectPayload[];
  }>;
}