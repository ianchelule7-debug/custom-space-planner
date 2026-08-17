import { useCallback, useState } from "react";
import type { Enquiry, Project, Space, UploadedFile } from "@/types/enquiry";

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export const emptyEnquiry = (): Enquiry => ({
  name: "",
  phone: "",
  email: "",
  preferred_contact_method: "",
  location_city: "",
  location_area: "",
  timeline: "",
  budget: "",
  anything_else: "",
  projects: [],
  generalFiles: [],
});

export const makeProject = (projectType: string): Project => ({
  id: uid(),
  project_type: projectType,
  project_description: "",
  dimensions: "",
  material: "",
  colour: "",
  finish: "",
  quantity: "",
  accessories: "",
  files: [],
});

export const makeSpace = (spaceName: string): Space => ({
  id: uid(),
  space_name: spaceName,
  projects: [],
});

export const toUploaded = (files: File[]): UploadedFile[] =>
  files.map((file) => ({ id: uid(), file, name: file.name, size: file.size }));

export function projectHasData(p: Project): boolean {
  return Boolean(
    p.project_description?.trim() ||
      p.dimensions?.trim() ||
      p.material?.trim() ||
      p.colour?.trim() ||
      p.finish?.trim() ||
      p.quantity?.trim() ||
      p.accessories?.trim() ||
      p.installation ||
      p.files.length,
  );
}

export function useEnquiry() {
  const [enquiry, setEnquiry] = useState<Enquiry>(emptyEnquiry);

  const setField = useCallback(<K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setEnquiry((prev) => ({ ...prev, [key]: value }));
  }, []);

  const addSpace = useCallback((spaceName: string) => {
    setEnquiry((prev) => ({ ...prev, projects: [...prev.projects, makeSpace(spaceName)] }));
  }, []);

  const renameSpace = useCallback((spaceId: string, spaceName: string) => {
    setEnquiry((prev) => ({
      ...prev,
      projects: prev.projects.map((s) => (s.id === spaceId ? { ...s, space_name: spaceName } : s)),
    }));
  }, []);

  const removeSpace = useCallback((spaceId: string) => {
    setEnquiry((prev) => ({ ...prev, projects: prev.projects.filter((s) => s.id !== spaceId) }));
  }, []);

  const addProject = useCallback((spaceId: string, projectType: string) => {
    setEnquiry((prev) => ({
      ...prev,
      projects: prev.projects.map((s) =>
        s.id === spaceId ? { ...s, projects: [...s.projects, makeProject(projectType)] } : s,
      ),
    }));
  }, []);

  const updateProject = useCallback(
    (spaceId: string, projectId: string, patch: Partial<Project>) => {
      setEnquiry((prev) => ({
        ...prev,
        projects: prev.projects.map((s) =>
          s.id === spaceId
            ? {
                ...s,
                projects: s.projects.map((p) => (p.id === projectId ? { ...p, ...patch } : p)),
              }
            : s,
        ),
      }));
    },
    [],
  );

  const removeProject = useCallback((spaceId: string, projectId: string) => {
    setEnquiry((prev) => ({
      ...prev,
      projects: prev.projects.map((s) =>
        s.id === spaceId ? { ...s, projects: s.projects.filter((p) => p.id !== projectId) } : s,
      ),
    }));
  }, []);

  const addGeneralFiles = useCallback((files: File[]) => {
    setEnquiry((prev) => ({ ...prev, generalFiles: [...prev.generalFiles, ...toUploaded(files)] }));
  }, []);

  const removeGeneralFile = useCallback((fileId: string) => {
    setEnquiry((prev) => ({
      ...prev,
      generalFiles: prev.generalFiles.filter((f) => f.id !== fileId),
    }));
  }, []);

  return {
    enquiry,
    setField,
    addSpace,
    renameSpace,
    removeSpace,
    addProject,
    updateProject,
    removeProject,
    addGeneralFiles,
    removeGeneralFile,
  };
}

export type EnquiryStore = ReturnType<typeof useEnquiry>;