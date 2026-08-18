# Project Builder Pro

Build a fully functional, production-quality, mobile-first web application called:

SOFTWOODS PROJECT ENQUIRY

Softwoods is a business that designs, manufactures and installs custom wood, stone and marble products for residential and commercial spaces.

The website is used when a potential customer has discussed a project with Softwoods and needs to provide detailed information for their project enquiry.

The application must feel premium, warm, modern, professional, approachable and visually pleasing.

It must NOT feel like:

- A government form
- A spreadsheet
- A boring questionnaire
- A database interface
- An intimidating technical form
- A generic template
- A checkout page

The experience should feel more like a guided project builder where the customer gradually describes what they want.

==================================================
IMPORTANT PRODUCT GOAL
==================================================

A customer may be working on MULTIPLE SPACES.

For example:

Kitchen
Bedroom

Inside EACH space, they may have MULTIPLE separate projects.

For example:

Kitchen
- Kitchen Cabinets
- Kitchen Island
- Built-in Coffee Station

Bedroom
- Built-in Wardrobe

Every individual project must have its OWN independent details.

For example:

Kitchen Cabinets
Material: Oak
Colour: Natural Oak
Accessories: Soft-close hinges

Kitchen Island
Material: Granite countertop with oak base
Colour: Dark grey and natural oak
Accessories: Built-in power sockets

Built-in Coffee Station
Material: Walnut veneer
Accessories: LED lighting

Built-in Wardrobe
Material: White oak
Accessories: Soft-close drawers

CRITICAL:

DO NOT create global project settings.

A material selected for Kitchen Cabinets must NEVER automatically apply to Kitchen Island.

A colour selected for one project must NEVER automatically apply to another project.

Every project must maintain its own independent state and data.

The user must be able to:

- Select multiple spaces
- Select multiple projects inside each space
- Add another project later
- Remove a project
- Edit one project without affecting another
- Select a custom "Other" space
- Select a custom "Other" project
- Upload files to individual projects
- Upload files that apply to the entire enquiry

==================================================
TECH STACK
==================================================

Build this as a modern, component-based web application.

Use:

- React
- TypeScript
- Vite
- Tailwind CSS

Use a clean, maintainable component structure.

Use appropriate icons from a professional icon library if needed.

Do not build one giant component containing the entire application.

Organise components logically.

Possible component structure:

components/
  WelcomeScreen
  CustomerDetails
  SpaceSelector
  SpaceSection
  ProjectSelector
  ProjectCard
  CustomSpaceInput
  CustomProjectInput
  FileUpload
  GeneralDetails
  ReviewScreen
  SuccessScreen
  ProgressIndicator

lib/
  api
  validation
  constants

types/
  enquiry

The exact structure can differ if there is a better implementation, but maintainability is important.

==================================================
DESIGN DIRECTION
==================================================

The visual identity should feel suitable for a high-quality custom interiors, wood, stone and marble company.

Use:

- Warm neutral backgrounds
- Off-white or cream surfaces
- Dark charcoal text
- Natural wood-inspired accent tones
- Subtle stone-inspired neutral colours
- Generous whitespace
- Clean modern typography
- Subtle shadows
- Professional icons
- Smooth, restrained transitions
- Clear visual hierarchy

Avoid:

- Neon colours
- Excessive gradients
- Excessive rounded "bubble" UI
- Excessive animation
- Overly playful design
- Large blocks of instructions
- Clutter
- Tiny text
- Dense form layouts

The site should feel premium but approachable.

A customer who does not know anything about construction or interior design should still feel comfortable completing the enquiry.

==================================================
MOBILE-FIRST REQUIREMENT
==================================================

This form will likely be opened from a phone through a link sent during a conversation.

The mobile experience is extremely important.

On mobile:

- Inputs must be easy to tap.
- Buttons must be large enough.
- Cards should stack cleanly.
- Multi-select options should remain easy to understand.
- File uploads should work with a phone's camera and photo library.
- Navigation should be simple.
- No horizontal scrolling.
- The review screen must remain readable.

Desktop should also look polished and professional.

==================================================
APPLICATION FLOW
==================================================

The experience should follow a guided flow:

1. Welcome
2. Customer details
3. Select spaces
4. Add projects within each space
5. Configure each project independently
6. General project details
7. Review enquiry
8. Submit
9. Success confirmation

Use progressive disclosure.

Do not show the customer a huge list of every possible field at once.

Only reveal information when it becomes relevant.

==================================================
SCREEN 1 — WELCOME
==================================================

Create a welcoming opening screen.

Heading:

"Tell us about your project"

Supporting text:

"Share as much or as little detail as you have. You don't need to know every measurement, material or finish — just tell us what you have in mind."

Include a prominent button:

"Start your enquiry"

The design should immediately make the customer feel that this will be easy.

==================================================
SCREEN 2 — CUSTOMER DETAILS
==================================================

Collect:

Full name
Required

Phone number
Required

Email address
Optional

Preferred contact method

For preferred contact method, use a small number of selectable options:

- WhatsApp
- Phone call
- Email
- Instagram
- No preference

Only use selectable options where there are a limited number of sensible answers.

Use clear validation.

Do not overwhelm the customer with validation messages before they attempt to continue.

==================================================
SCREEN 3 — SELECT SPACES
==================================================

Ask:

"What spaces are you working on?"

Allow MULTIPLE spaces to be selected.

Use visually attractive cards or selectable tiles.

Do not use a boring traditional multi-select dropdown.

Include:

- Kitchen
- Bedroom
- Living Room
- Bathroom
- Dining Room
- Home Office
- Office / Commercial Space
- Reception Area
- Retail / Shop
- Other

The user must be able to select:

Kitchen + Bedroom

or:

Kitchen + Living Room + Bathroom

or any other combination.

When a space is selected, show a clear selected state.

For example:

✓ Kitchen

The customer can deselect a space.

==================================================
CUSTOM "OTHER" SPACE BEHAVIOUR
==================================================

If the customer selects:

Other

Immediately show a free-text input:

"What space are you working on?"

The customer can type anything.

Examples:

- Outdoor entertainment area
- Wine room
- Home bar
- Laundry room
- Rooftop terrace

Once entered, the custom space becomes a normal space.

It must behave exactly like Kitchen or Bedroom.

The customer must be able to add projects inside it.

Do not treat "Other" as a dead-end or limited category.

==================================================
PROJECT SELECTION
==================================================

After selecting spaces, show a section for every selected space.

For example:

KITCHEN

"What would you like us to work on?"

Allow MULTIPLE project types to be selected.

Include:

Kitchen:
- Full Kitchen
- Kitchen Cabinets
- Kitchen Island
- Pantry / Storage
- Countertop
- Kitchen Shelving
- Kitchen Doors
- Other

Bedroom:
- Built-in Wardrobe
- Walk-in Wardrobe
- Freestanding Wardrobe
- Dressing Table
- Bedside Tables
- Bedroom Storage
- TV Unit
- Other

Living Room:
- TV Unit
- Wall Panels
- Shelving
- Display Cabinet
- Coffee Table
- Sideboard
- Storage Cabinet
- Other

Bathroom:
- Vanity
- Bathroom Cabinet
- Countertop
- Shelving
- Storage
- Other

Dining Room:
- Dining Table
- Sideboard
- Display Cabinet
- Storage
- Wall Panels
- Other

Home Office:
- Desk
- Built-in Desk
- Bookshelves
- Storage Cabinets
- Wall Panels
- Full Office Setup
- Other

Office / Commercial Space:
- Reception Desk
- Office Desks
- Storage
- Boardroom Furniture
- Wall Panels
- Shelving
- Full Office Interior
- Other

Reception Area:
- Reception Desk
- Wall Panels
- Storage
- Display Units
- Other

Retail / Shop:
- Display Cabinets
- Shelving
- Counters
- Payment Counter
- Wall Panels
- Storage
- Full Shop Fit-out
- Other

==================================================
CUSTOM "OTHER" PROJECT BEHAVIOUR
==================================================

If the customer selects:

Other

Show a free-text input:

"What would you like us to make or work on?"

For example, inside Kitchen the customer could type:

"Built-in Coffee Station"

Once entered:

Built-in Coffee Station

must become a normal, independent project.

It should receive the exact same full project configuration card as Kitchen Cabinets or Kitchen Island.

For example:

Kitchen

- Kitchen Cabinets
- Kitchen Island
- Built-in Coffee Station

The Built-in Coffee Station must have its own:

- Description
- Dimensions
- Material
- Colour
- Finish
- Quantity
- Installation
- Accessories
- Project-specific files

Do not treat custom projects differently after they have been created.

==================================================
PROJECT MANAGEMENT
==================================================

Each selected project should appear as its own card or clearly separated section.

For example:

KITCHEN PROJECTS

[ Kitchen Cabinets ]

[ Kitchen Island ]

[ Built-in Coffee Station ]

The user should be able to:

- Expand or edit a project
- Remove a project
- Add another project to that space

Include a clear:

"+ Add another project"

button within each space.

Removing Kitchen Island must NOT remove Kitchen Cabinets.

Removing a space should ask for confirmation if projects inside it contain data.

==================================================
PROJECT DETAILS
==================================================

Every individual project receives its OWN independent configuration.

For each project, collect:

1. Project type
Automatically determined from the selected project or custom project name.

2. Project description

Use a large free-text field.

Label:

"Tell us what you have in mind"

Optional helper text:

"Describe the design, layout or features you'd like."

This must be free text.

3. Approximate dimensions

Use a free-text field.

Do NOT force a rigid format.

The customer may enter:

"Approximately 4m x 3m"

"About 2 metres wide"

"I don't know yet"

"One wall is about 4 metres"

Do not require precise measurements.

4. Preferred material

FREE TEXT.

Do not restrict this to a predefined dropdown.

Examples:

- Oak
- White oak
- MDF with veneer
- Marble
- Granite
- Something similar to the photo
- Not sure, please advise

5. Preferred colour

FREE TEXT.

6. Preferred finish

FREE TEXT.

Examples:

- Matte
- Gloss
- Natural
- Smooth
- Not sure

7. Quantity

FREE TEXT.

Examples:

- 1
- Two units
- Enough for the entire room
- Not sure

8. Installation

Use limited selectable options because there are only a few meaningful choices:

- Yes
- No
- Not sure

Do not use free text here.

9. Accessories / special features

Use FREE TEXT.

Examples:

- Soft-close hinges
- LED lighting
- Pull-out storage
- Hidden power sockets
- Custom handles
- Cable management

The customer should be able to describe multiple features in one field.

Do not limit accessories to predefined choices.

10. Project-specific photos/files

Allow uploads directly within each project card.

The customer should understand that these files apply specifically to that project.

==================================================
PROJECT CARD EXAMPLE
==================================================

For example:

KITCHEN CABINETS

Tell us what you have in mind:
[ Large text field ]

Approximate dimensions:
[ Free text input ]

Preferred material:
[ Free text input ]

Preferred colour:
[ Free text input ]

Preferred finish:
[ Free text input ]

Quantity:
[ Free text input ]

Do you need installation?

( Yes ) ( No ) ( Not sure )

Accessories or special features:
[ Free text area ]

Photos, drawings or inspiration:
[ Upload area ]

[ Remove project ]

------------------------------------------------

KITCHEN ISLAND

Must have a completely separate and independent set of fields.

------------------------------------------------

BUILT-IN COFFEE STATION

Must have a completely separate and independent set of fields.

==================================================
IMPORTANT INPUT DESIGN RULE
==================================================

Use this principle throughout the application:

If there are only a few sensible answers:
Use clear selectable options.

Examples:

Installation:
- Yes
- No
- Not sure

Preferred contact method:
- WhatsApp
- Phone
- Email
- Instagram
- No preference

If customers may reasonably have many different answers:
Use free-text input.

Examples:

- Material
- Colour
- Finish
- Dimensions
- Accessories
- Project description
- Timeline
- Budget
- Other spaces
- Other projects

Do NOT unnecessarily turn flexible information into restrictive dropdown menus.

==================================================
GENERAL PROJECT LOCATION
==================================================

After all spaces and projects have been configured, collect:

Town / City

Free text.

Area / Neighbourhood

Free text.

Both should be optional unless validation requirements are explicitly configured later.

==================================================
TIMELINE
==================================================

Ask:

"When would you ideally like the project completed?"

Use a FREE TEXT input.

Examples:

- Before December
- Around October 2026
- In about 3 months
- Before Christmas

DO NOT include:

- ASAP
- As soon as possible
- Urgent
- Within 1 month
- 1–3 months

Also include:

"I'm not sure yet"

as a selectable option.

If the customer selects:

"I'm not sure yet"

then either:

- Clear and disable the timeline text field

OR

- Store the timeline as "Not sure"

The interface must make it clear that only one of these choices is active.

==================================================
BUDGET
==================================================

Ask:

"Do you have an approximate budget in mind?"

Use a FREE TEXT input.

The customer might enter:

- KES 500,000
- Around 1 million
- Between 500k and 800k
- Flexible depending on the design

Also include limited alternative options:

- I'd prefer to discuss this
- I'm not sure yet

Do not invent budget ranges.

Do not force customers into predefined price brackets.

==================================================
GENERAL FILE UPLOADS
==================================================

In addition to project-specific uploads, include:

"Additional photos, drawings or documents"

Supporting text:

"Upload anything that applies to your overall project, such as floor plans, drawings or general inspiration."

Allow:

- Images
- PDFs
- Drawings
- Documents
- Floor plans

Use a polished drag-and-drop area on desktop.

On mobile, support:

- Camera
- Photo library
- File selection

Show selected files.

Allow the customer to remove files before submission.

==================================================
ANYTHING ELSE
==================================================

Include a final open-ended section:

"Anything else you'd like us to know?"

Use a large optional text area.

Do not restrict what the customer can write.

==================================================
REVIEW SCREEN
==================================================

Before submission, show a clear and attractive summary.

Do NOT simply display raw JSON.

Organise the summary visually.

Example:

YOUR PROJECT ENQUIRY

CUSTOMER
Sarah Wanjiku
0712 XXX XXX

--------------------------------

KITCHEN

Kitchen Cabinets
Material: Oak
Installation: Yes

[ Edit ]

Kitchen Island
Material: Granite countertop with oak base
Installation: Yes

[ Edit ]

Built-in Coffee Station
Material: Walnut veneer
Installation: Not sure

[ Edit ]

--------------------------------

BEDROOM

Built-in Wardrobe
Material: White oak
Installation: Yes

[ Edit ]

--------------------------------

LOCATION

Nairobi
Karen

TIMELINE

Before December 2026

BUDGET

Around KES 800,000–1,000,000

ANYTHING ELSE

We may add more rooms later.

The customer must be able to edit individual sections without losing information from other sections.

==================================================
SUBMISSION
==================================================

The final button must say:

"Submit Project Enquiry"

When clicked:

- Validate required fields.
- Prevent duplicate submissions while processing.
- Show a clear loading state.
- Disable the submit button while the request is in progress.
- Handle network errors gracefully.
- Do not falsely claim success.

==================================================
SUCCESS SCREEN
==================================================

After the server/webhook confirms success, show:

"Thank you — we've received your project enquiry."

Supporting text:

"Our team will review the information you've shared and follow up if any further details are needed."

Do not promise a specific response time.

Include a simple confirmation icon or visual.

==================================================
ERROR HANDLING
==================================================

If submission fails:

Show a clear message such as:

"We couldn't submit your enquiry right now. Please check your connection and try again."

Do not erase the customer's form data.

Allow them to retry.

If possible, preserve entered information in browser state during the current session.

==================================================
EXACT DATA MODEL
==================================================

The application must internally store the enquiry in a structure equivalent to this TypeScript model:

interface Project {
  project_type: string;
  project_description?: string;
  dimensions?: string;
  material?: string;
  colour?: string;
  finish?: string;
  quantity?: string;
  installation?: "Yes" | "No" | "Not sure";
  accessories?: string;
  files?: UploadedFile[];
}

interface Space {
  space_name: string;
  projects: Project[];
}

interface Enquiry {
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
}

Use the exact JSON field names below when submitting normal form data.

==================================================
EXACT JSON SUBMISSION PAYLOAD
==================================================

When the customer submits the enquiry, the structured enquiry data must be equivalent to:

{
  "name": "Sarah Wanjiku",
  "phone": "0712345678",
  "email": "sarah@example.com",
  "preferred_contact_method": "WhatsApp",

  "location_city": "Nairobi",
  "location_area": "Karen",

  "timeline": "Before December 2026",
  "budget": "KES 800,000–1,000,000",
  "anything_else": "We may add more rooms later.",

  "projects": [
    {
      "space_name": "Kitchen",
      "projects": [
        {
          "project_type": "Kitchen Cabinets",
          "project_description": "Cabinets along two walls with plenty of storage",
          "dimensions": "Approximately 4m x 3m",
          "material": "Oak",
          "colour": "Natural oak",
          "finish": "Matte",
          "quantity": "1",
          "installation": "Yes",
          "accessories": "Soft-close hinges and LED lighting"
        },
        {
          "project_type": "Kitchen Island",
          "project_description": "Large island with seating for four",
          "dimensions": "2.4m x 1m",
          "material": "Oak base with granite countertop",
          "colour": "Natural oak and dark grey",
          "finish": "Matte",
          "quantity": "1",
          "installation": "Yes",
          "accessories": "Built-in power sockets"
        },
        {
          "project_type": "Built-in Coffee Station",
          "project_description": "Built-in coffee area with storage",
          "dimensions": "1.5m x 2.2m",
          "material": "Oak veneer",
          "colour": "Dark walnut",
          "finish": "Matte",
          "quantity": "1",
          "installation": "Not sure",
          "accessories": "LED lighting and pull-out drawer"
        }
      ]
    },
    {
      "space_name": "Bedroom",
      "projects": [
        {
          "project_type": "Built-in Wardrobe",
          "project_description": "Floor-to-ceiling wardrobe",
          "dimensions": "3m x 2.5m",
          "material": "White oak",
          "colour": "Light natural oak",
          "finish": "Matte",
          "quantity": "1",
          "installation": "Yes",
          "accessories": "LED lighting and soft-close drawers"
        }
      ]
    }
  ]
}

==================================================
CRITICAL DATA RULES
==================================================

The projects field must remain an array.

Each selected space must become one object inside the projects array.

Each space object must contain:

space_name

and:

projects

The projects field inside each space must also remain an array.

Every project inside that array must have its own independent values.

For example:

projects[0].projects[0].material

must not automatically overwrite:

projects[0].projects[1].material

Do not flatten all projects into one shared object.

Do not combine project details.

Do not merge multiple projects into one project.

==================================================
FILE HANDLING
==================================================

Files must remain associated with the correct project.

For example:

Kitchen Cabinets
→ cabinet inspiration images

Kitchen Island
→ island inspiration images

Built-in Coffee Station
→ coffee station inspiration images

There must also be support for general enquiry files.

Do not accidentally attach every file to every project.

Design the code so that files can later be uploaded to Supabase Storage.

However, do NOT expose Supabase service-role keys or other secrets in the browser.

For the first implementation, structure the submission so the normal enquiry data and files can be sent to an n8n webhook.

Use an appropriate method such as multipart/form-data when actual files are included.

The structured enquiry JSON may be included as a JSON string in the multipart request, with files included separately.

Include metadata that clearly identifies whether each uploaded file belongs to:

- A specific project

or:

- The general enquiry

==================================================
N8N WEBHOOK INTEGRATION
==================================================

The application must submit the completed enquiry to an n8n Webhook using HTTP POST.

The webhook URL must NOT be hard-coded throughout the application.

Use an environment variable:

VITE_N8N_WEBHOOK_URL

For example:

const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

If the webhook URL is missing:

Do NOT pretend the submission worked.

Instead show a clear development/configuration error explaining that the submission endpoint has not been configured.

==================================================
N8N EXPECTED FLOW
==================================================

The intended backend flow is:

Customer completes form
↓
Customer clicks Submit Project Enquiry
↓
Website validates data
↓
Website sends the exact structured enquiry data to:
VITE_N8N_WEBHOOK_URL
↓
n8n Webhook receives submission
↓
n8n validates/processes the data
↓
n8n creates ONE row in Supabase
↓
Supabase table: enquiries
↓
The following top-level fields map directly:

name
phone
email
preferred_contact_method
location_city
location_area
timeline
budget
anything_else
projects

The projects value must be stored in Supabase as JSONB.

The website should NOT directly write the enquiry row to Supabase.

The workflow is:

Website
↓
n8n Webhook
↓
Supabase

==================================================
SUPABASE DATABASE STRUCTURE
==================================================

The existing Supabase table is:

enquiries

Columns:

id
name
phone
email
preferred_contact_method
location_city
location_area
timeline
budget
anything_else
projects
status
created_at
updated_at

The website submission field names must exactly match the relevant Supabase/n8n field names.

Do not create a separate database schema in the frontend.

==================================================
WEBHOOK RESPONSE HANDLING
==================================================

The application should wait for a response from n8n.

Expected successful response:

HTTP 200 or 201.

Example response:

{
  "success": true,
  "message": "Enquiry submitted successfully"
}

Only show the success screen after receiving a successful response.

If the response indicates failure:

Show an error.

Do not clear the form.

==================================================
PROGRESS INDICATOR
==================================================

Include a subtle progress indicator.

Do not make it feel like a stressful exam or checkout process.

It should simply help the customer understand where they are.

Possible stages:

Your details
↓
Your spaces
↓
Project details
↓
Final details
↓
Review

Allow the customer to go back.

Preserve all entered information.

==================================================
ACCESSIBILITY
==================================================

Ensure:

- Proper labels
- Keyboard accessibility
- Visible focus states
- Good colour contrast
- Error messages associated with fields
- Buttons have descriptive labels
- File upload controls are accessible

==================================================
FORM VALIDATION
==================================================

Required:

- Full name
- Phone number
- At least one space
- At least one project overall

Optional:

- Email
- Preferred contact method
- Dimensions
- Material
- Colour
- Finish
- Quantity
- Timeline
- Budget
- Accessories
- Files
- Anything else

Do not force customers to know technical details.

The philosophy is:

Collect useful information without creating unnecessary friction.

==================================================
STATE MANAGEMENT
==================================================

The application must preserve all entered data while the user moves between steps.

If a customer goes:

Kitchen
→ adds Kitchen Cabinets
→ enters Oak

then:

goes back
→ adds Bedroom
→ Built-in Wardrobe

the Oak material for Kitchen Cabinets must still exist.

If they return to the Kitchen Island, its details must remain unchanged.

Removing one project must only remove that project's data.

==================================================
IMPORTANT EXAMPLE
==================================================

A customer must be able to do exactly this:

Step 1:

Select:

Kitchen
Bedroom

Step 2:

Inside Kitchen select:

Kitchen Cabinets
Kitchen Island
Other

For Other, type:

Built-in Coffee Station

Step 3:

Configure:

Kitchen Cabinets
Material: Oak
Accessories: Soft-close hinges

Kitchen Island
Material: Granite
Accessories: Power sockets

Built-in Coffee Station
Material: Walnut
Accessories: LED lighting

Step 4:

Inside Bedroom select:

Built-in Wardrobe

Configure:

Material: White oak
Accessories: Soft-close drawers

Step 5:

Submit all of this as ONE enquiry.

The submitted JSON must preserve all four projects separately.

==================================================
FINAL QUALITY REQUIREMENTS
==================================================

Before considering the application complete:

1. Test selecting multiple spaces.
2. Test selecting multiple projects inside one space.
3. Test selecting Kitchen and Bedroom simultaneously.
4. Test the Other space flow.
5. Test the Other project flow.
6. Test creating Built-in Coffee Station as a custom project.
7. Confirm it gets the same project detail fields as predefined projects.
8. Confirm every project's material remains independent.
9. Confirm every project's accessories remain independent.
10. Confirm removing one project does not affect another.
11. Confirm all data remains intact when moving backward and forward.
12. Test the review screen.
13. Test mobile layouts.
14. Test validation.
15. Test submission loading state.
16. Test successful webhook response.
17. Test failed webhook response.
18. Confirm the website does not claim success unless the webhook confirms success.
19. Confirm the JSON structure exactly matches the defined submission structure.
20. Ensure the final code is clean, maintainable and fully functional.

Build the complete application, not a static mockup.

Use realistic placeholder content where needed, but do not invent Softwoods-specific prices, delivery times, guarantees or policies.

The final result should be a polished, functional Softwoods Project Enquiry website that customers can comfortably complete from a phone or desktop.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5f4392cd-d966-495a-a417-4fd6a7870fa8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
