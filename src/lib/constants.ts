export const CONTACT_METHODS = [
  "WhatsApp",
  "Phone call",
  "Email",
  "Instagram",
  "No preference",
] as const;

export const INSTALLATION_OPTIONS = ["Yes", "No", "Not sure"] as const;

export const SPACES = [
  "Kitchen",
  "Bedroom",
  "Living Room",
  "Bathroom",
  "Dining Room",
  "Home Office",
  "Office / Commercial Space",
  "Reception Area",
  "Retail / Shop",
] as const;

export const OTHER = "Other";

export const PROJECTS_BY_SPACE: Record<string, string[]> = {
  Kitchen: [
    "Full Kitchen",
    "Kitchen Cabinets",
    "Kitchen Island",
    "Pantry / Storage",
    "Countertop",
    "Kitchen Shelving",
    "Kitchen Doors",
  ],
  Bedroom: [
    "Built-in Wardrobe",
    "Walk-in Wardrobe",
    "Freestanding Wardrobe",
    "Dressing Table",
    "Bedside Tables",
    "Bedroom Storage",
    "TV Unit",
  ],
  "Living Room": [
    "TV Unit",
    "Wall Panels",
    "Shelving",
    "Display Cabinet",
    "Coffee Table",
    "Sideboard",
    "Storage Cabinet",
  ],
  Bathroom: ["Vanity", "Bathroom Cabinet", "Countertop", "Shelving", "Storage"],
  "Dining Room": [
    "Dining Table",
    "Sideboard",
    "Display Cabinet",
    "Storage",
    "Wall Panels",
  ],
  "Home Office": [
    "Desk",
    "Built-in Desk",
    "Bookshelves",
    "Storage Cabinets",
    "Wall Panels",
    "Full Office Setup",
  ],
  "Office / Commercial Space": [
    "Reception Desk",
    "Office Desks",
    "Storage",
    "Boardroom Furniture",
    "Wall Panels",
    "Shelving",
    "Full Office Interior",
  ],
  "Reception Area": ["Reception Desk", "Wall Panels", "Storage", "Display Units"],
  "Retail / Shop": [
    "Display Cabinets",
    "Shelving",
    "Counters",
    "Payment Counter",
    "Wall Panels",
    "Storage",
    "Full Shop Fit-out",
  ],
};

/** Fallback list for custom ("Other") spaces. */
export const GENERIC_PROJECTS = [
  "Cabinetry",
  "Shelving",
  "Storage",
  "Countertop",
  "Wall Panels",
  "Custom Furniture",
];

export function projectOptionsFor(spaceName: string): string[] {
  return PROJECTS_BY_SPACE[spaceName] ?? GENERIC_PROJECTS;
}

export const STEPS = [
  "Your details",
  "Your spaces",
  "Project details",
  "Final details",
  "Review",
] as const;