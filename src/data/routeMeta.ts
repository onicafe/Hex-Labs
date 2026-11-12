import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { brand, games } from "@/data/spillfabrikken";

// Título, descrição e imagem de prévia de cada rota pública.
// Usado no build de publicação (scripts/prerender.mjs) para gerar uma página por rota,
// assim cada link responde 200 e mostra a própria prévia no LinkedIn e no WhatsApp.

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image: "og-image.jpg" | "og-spillfabrikken.jpg";
}

const suffix = `${profile.name} · ${profile.title}`;

export const routeMeta = (): RouteMeta[] => [
  { path: "/", title: suffix, description: profile.seoDescription, image: "og-image.jpg" },
  { path: "/projects", title: `Projetos | ${suffix}`, description: "Estudos de caso com papel, processo e resultado.", image: "og-image.jpg" },
  { path: "/curriculo", title: `Currículo | ${suffix}`, description: `${profile.title}. Experiência, formação e ferramentas.`, image: "og-image.jpg" },
  {
    path: "/projects/spillfabrikken",
    title: `SpillFabrikken: oito jogos, do briefing à fábrica | ${profile.name}`,
    description: brand.summary,
    image: "og-spillfabrikken.jpg",
  },
  ...games.map((g) => ({
    path: `/projects/spillfabrikken/${g.slug}`,
    title: `${g.name} · SpillFabrikken | ${profile.name}`,
    description: g.summary,
    image: "og-spillfabrikken.jpg" as const,
  })),
  ...projects
    .filter((p) => p.slug !== "spillfabrikken")
    .map((p) => ({
      path: `/projects/${p.slug}`,
      title: `${p.title} | ${profile.name}`,
      description: p.summary,
      image: "og-image.jpg" as const,
    })),
];
