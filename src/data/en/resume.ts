import type { Resume } from "../resume";

export const resumeEn: Resume = {
  summary:
    "Product & Game Designer with 8 years of design experience. I was the sole designer at the Norwegian publisher SpillFabrikken, taking card games from concept to print-ready artwork for the factory, and I designed digital products for Dione Solutions in Tokyo. As a volunteer, I designed interfaces for Brazil's Federal Regional Court (TRF5) and for the Jovem Potiguar youth program. In 2026 I founded Hex Labs, where I design and build our own products. I work in Portuguese and English.",
  tools: [
    { group: "Design", items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Component libraries", "Prototyping"] },
    { group: "Games and production", items: ["Card and rules design", "Packaging and dielines", "Print-ready artwork", "Godot"] },
    { group: "Development", items: ["React", "TypeScript", "Tailwind CSS", "Flutter", "Supabase"] },
    { group: "Research and process", items: ["Journeys and flows", "Usability testing", "Accessibility"] },
    { group: "AI and automation", items: ["AI agents (Claude Code)", "n8n", "Azure", "AWS"] },
  ],
  experience: [
    {
      role: "Founder",
      company: "Hex Labs · Natal, Brazil",
      period: "Mar 2026 – present",
      bullets: [
        "Founded an AI-driven digital product studio. I lead design, development and business development.",
        "Built the company website and CMS (React, TypeScript, Tailwind, Supabase), with a blog and an admin panel.",
        "Building Rede Imobiliária, a white-label real estate SaaS with AI-written listing descriptions, and Lexus System, practice management for law firms.",
      ],
      link: "/projects/hex-labs",
    },
    {
      role: "Communications Specialist",
      company: "TAP Air Portugal · Lisbon, Portugal",
      period: "Feb 2023 – Aug 2023",
      bullets: [
        "Managed the company's CMS for data tracking and process automation.",
        "Supported and maintained the systems, keeping operational information accurate.",
      ],
    },
    {
      role: "Product Designer",
      company: "Dione Solutions · Tokyo, Japan (remote)",
      period: "Feb 2022 – May 2023",
      bullets: [
        "Defined the design system and designed the main screens of a hotel management system built for a chain of 12 hotels (bookings, housekeeping, kitchen and inventory).",
        "Designed MyTreasure, a social network for collectors with configurable posts and a bidding module, and proposed the app's brand.",
        "Produced presentation materials and managed social media.",
      ],
      link: "/projects/my-treasure",
    },
    {
      role: "Product & Game Designer",
      company: "SpillFabrikken · Trondheim, Norway (remote)",
      period: "Apr 2020 – Sep 2021",
      bullets: [
        "Sole designer at the publisher: eight card and party game projects, from concept and prototype to print-ready artwork for the factory in China.",
        "Created the visual identity, packaging and marketing materials, cutting components to reduce weight and cost.",
        "Coordinated outside collaborators (illustration and 3D renders) and was the main contact with the factory.",
      ],
      link: "/projects/spillfabrikken",
    },
    {
      role: "Graphic Designer",
      company: "SESAP-RN (state health department) · Natal, Brazil",
      period: "Apr 2019 – Jul 2019",
      bullets: ["Created public health campaigns, newsletters and event identities."],
    },
    {
      role: "Product Designer (freelance, in parallel)",
      company: "Oni · Remote",
      period: "Jun 2018 – Jun 2023",
      bullets: ["UI/UX, graphic design and visual identity projects for clients in Brazil and abroad."],
    },
  ],
  side: [
    {
      role: "Game designer and art director (personal project)",
      company: "Lan House Simulator · Godot 4",
      period: "2026 – in development",
      bullets: [
        "First-person 3D simulator of a Brazilian LAN house, with a pixel-art management game running on the front desk monitor.",
        "I own the design, rules, economy and art direction; the programming is done with AI agents under my direction.",
      ],
      link: "/projects/lan-house-simulator",
    },
    {
      role: "Customer Experience (volunteer)",
      company: "AIESEC in Brazil · Remote",
      period: "Mar 2025 – Dec 2025",
      bullets: ["Supported international participants in projects with partner companies, in Portuguese and English."],
    },
    {
      role: "UI/UX Designer (volunteer)",
      company: "PJe2 Mobile, TRF5 · Remote",
      period: "2024",
      bullets: [
        "Designed the interface for the redesign of the federal judges' app, invited by the TRF5 residency team. The work is cited in a thesis.",
        "About half the interactions in the main tasks, in a screen-by-screen comparison with the legacy app. The engineering team resolved the 347 code analyzer warnings and hints.",
      ],
      link: "/projects/pje",
    },
    {
      role: "UI/UX Designer (volunteer)",
      company: "Jovem Potiguar, State of Rio Grande do Norte and IFRN · Natal, Brazil",
      period: "2024",
      bullets: [
        "Designed the pre-registration flow that brings low-income young people to IFRN training courses, from user journey to accessibility testing.",
      ],
      link: "/projects/jovem-potiguar",
    },
    {
      role: "Designer (personal project)",
      company: "DualSense concepts · Twitter",
      period: "Apr 2020",
      bullets: [
        "A series of fan concepts for the PS5 controller, posted on Twitter and Reddit the week of the reveal, at the time as @itsalastor and echodaine.",
        "Featured by Forbes, Game Informer, Tom's Guide, Screen Rant, and Wccftech.",
      ],
      link: "/projects/dualsense",
    },
  ],
  education: [
    { course: "B.Sc. in Computer Science", inst: "Universidade Potiguar", year: "2024 – present (on hold)" },
    { course: "Postgraduate degree in Metaverse Development", inst: "Centro Universitário UNA", year: "2023" },
    { course: "Game Design and Game Development (course)", inst: "EBAC — British School of Creative Arts and Technology", year: "2022" },
    { course: "Postgraduate degree in Digital Marketing", inst: "Faculdade Metropolitana", year: "2020" },
    { course: "B.A. in Graphic Design", inst: "Universidade Potiguar", year: "2017 – 2019" },
  ],
  certifications: [
    "Microsoft Certified: Azure Fundamentals",
    "Advanced Image and Text Analysis with AI on AWS (NEXA)",
    "Exploring a Career in User Experience Design",
  ],
  languages: ["Portuguese (native)", "English (bilingual)"],
};
