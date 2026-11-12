import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { brand, games } from "@/data/spillfabrikken";

// Título, descrição, imagem de prévia e dados estruturados (schema.org) de cada rota pública.
// O build de publicação (scripts/prerender.mjs) gera uma página por rota com esses dados,
// e o SEOHead aplica os mesmos valores quando a navegação acontece dentro do site.

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  /** Arquivo em public/ usado como prévia no LinkedIn, WhatsApp etc. */
  image: string;
  /** Blocos JSON-LD da página. */
  schema: Record<string, unknown>[];
}

const site = profile.siteUrl.replace(/\/$/, "");
const origin = new URL(site).origin;
/** Endereço canônico: sempre com barra no fim, que é como o GitHub Pages serve cada pasta. */
export const canonicalUrl = (path: string) => (path === "/" ? `${site}/` : `${site}${path}/`);
const absolute = (src?: string) => (src ? (src.startsWith("http") ? src : `${origin}${src}`) : undefined);

const personId = `${site}/#person`;

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  alternateName: profile.alternateName,
  jobTitle: profile.title,
  description: profile.seoDescription,
  url: `${site}/`,
  image: `${site}/og-image.jpg`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Natal", addressRegion: "RN", addressCountry: "BR" },
  sameAs: [profile.linkedin, profile.behance, profile.github],
  knowsLanguage: ["pt-BR", "en"],
  knowsAbout: [
    "Game design",
    "Design de jogos de cartas",
    "Design de embalagem",
    "Product design",
    "UX design",
    "UI design",
    "Prototipagem",
    "React",
    "Flutter",
  ],
};

const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: canonicalUrl(item.path) })),
});

const creativeWork = (opts: { path: string; name: string; description: string; image?: string; year?: string; about?: string }) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: opts.name,
  description: opts.description,
  url: canonicalUrl(opts.path),
  image: absolute(opts.image),
  dateCreated: opts.year?.match(/\d{4}/)?.[0],
  about: opts.about,
  inLanguage: "pt-BR",
  creator: { "@id": personId, "@type": "Person", name: profile.name },
});

const suffix = `${profile.name} · ${profile.title}`;
const home = { name: "Início", path: "/" };
const work = { name: "Projetos", path: "/projects" };
const sfCrumb = { name: "SpillFabrikken", path: "/projects/spillfabrikken" };

export const routeMeta = (): RouteMeta[] => [
  {
    path: "/",
    title: suffix,
    description: profile.seoDescription,
    image: "og-image.jpg",
    schema: [
      person,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: profile.name,
        url: `${site}/`,
        inLanguage: "pt-BR",
        author: { "@id": personId },
      },
    ],
  },
  {
    path: "/projects",
    title: `Projetos | ${suffix}`,
    description: "Estudos de caso de game design, product design e UX: papel, processo e resultado de cada projeto.",
    image: "og-image.jpg",
    schema: [breadcrumb([home, work])],
  },
  {
    path: "/curriculo",
    title: `Currículo | ${suffix}`,
    description: `Currículo de ${profile.name}, ${profile.title}. Experiência, formação, ferramentas e idiomas.`,
    image: "og-image.jpg",
    schema: [person, breadcrumb([home, { name: "Currículo", path: "/curriculo" }])],
  },
  {
    path: "/projects/spillfabrikken",
    title: `SpillFabrikken: oito jogos, do briefing à fábrica | ${profile.name}`,
    description: brand.summary,
    image: "og-spillfabrikken.jpg",
    schema: [
      creativeWork({ path: "/projects/spillfabrikken", name: "SpillFabrikken", description: brand.summary, year: "2020", about: "Game design e embalagem de jogos de festa" }),
      breadcrumb([home, work, sfCrumb]),
    ],
  },
  ...games.map((g) => {
    const path = `/projects/spillfabrikken/${g.slug}`;
    return {
      path,
      title: `${g.name} · SpillFabrikken | ${profile.name}`,
      description: g.summary,
      image: "og-spillfabrikken.jpg",
      schema: [
        creativeWork({ path, name: `${g.name} (SpillFabrikken)`, description: g.summary, image: g.cover, about: "Jogo de cartas" }),
        breadcrumb([home, work, sfCrumb, { name: g.name, path }]),
      ],
    };
  }),
  ...projects
    .filter((p) => p.slug !== "spillfabrikken")
    .map((p) => {
      const path = `/projects/${p.slug}`;
      return {
        path,
        title: `${p.title} | ${profile.name}`,
        description: p.summary,
        image: p.ogImage ?? "og-image.jpg",
        schema: [
          creativeWork({ path, name: p.title, description: p.summary, image: p.image, year: p.year, about: p.category }),
          breadcrumb([home, work, { name: p.title, path }]),
        ],
      };
    }),
];

/** Metadados da rota atual; aceita caminhos com ou sem barra no fim. */
export const findRouteMeta = (pathname: string) => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return routeMeta().find((r) => r.path === clean);
};
