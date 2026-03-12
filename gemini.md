# Project Map (gemini.md)

**Status**: Protocol 0 - Initialization
**System Pilot**: Active

## 1. Discovery
- **North Star**: Website for a SaaS company and portfolio.
- **Integrations**: None for now.
- **Source of Truth**: Local file `src/data/projects.ts` (TypeScript constant).
- **Delivery Payload**: A CTA page.
- **Behavioral Rules**: Do not guess; ask before assuming.

## 2. Data Schema
*Derived from `src/data/projects.ts`*
- **Projects**: List of objects containing:
  - `id`: string
  - `title`: string
  - `category`: string
  - `description`: string
  - `image`: path string
  - `link`: url string (optional)

## 3. Architecture & SOPs
- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Routing**: React Router Dom
- **State**: QueryClient (TanStack Query) initialized in `App.tsx`

## 4. Maintenance Log
- **2026-01-24**:
    - **Initialization**: Established B.L.A.S.T. Protocol (`gemini.md`, `task.md`).
    - **Design**:
        - Changed primary accent color to Neon Lime Green (`hsl(73 100% 62%)`).
        - Refactored "Projects" section on Home from Grid to **Carousel**.
        - Updated Footer and Contact GitHub links to `Grupo-Hex`.
    - **Features**:
        - Added `newsUrl` to Project schema for external news coverage links.
        - Implemented automatic "Newest First" sorting logic.
    - **Content (Projects Populated)**:
        - **SpillFabrikken**: Revised details.
        - **PJe2**: Added with "Ver Notícia" button.
        - **Jovem Potiguar**: Added with "Ver Notícia" button.
        - **MyTreasure**: Added with Google Play link.
        - **Hosuto**: Added with private system notation.

## 5. How to Add a New Project
**Pattern**: Data-driven implementation via `src/data/projects.ts`.

1.  **Add Assets**: Place project image (PNG/JPG) in `src/assets/projects/`.
2.  **Update Data**: Open `src/data/projects.ts`.
3.  **Import Image**: Add import at the top: `import myProjectImg from "@/assets/projects/my-project.png";`
4.  **Add Entry**: Append a new object to the `projects` array:

```typescript
{
  slug: "unique-url-slug",
  image: myProjectImg,
  title: "Project Name",
  category: "Category Name",
  year: "2024",
  client: "Client Name",
  industry: "Industry Name",
  services: ["Service 1", "Service 2"],
  description: "Short summary.",
  challenge: "Problem description.",
  solution: "How we solved it.",
  liveUrl: "https://optional-link.com", // Optional
  gallery: [] // Optional array of image imports
}
```
**Note**: No new page creation is required. `src/pages/ProjectDetail.tsx` automatically renders based on the `slug`.
