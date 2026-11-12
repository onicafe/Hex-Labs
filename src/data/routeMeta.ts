import { profile } from "@/data/profile";
import { dataFor } from "@/i18n/data";
import { localePath, type Lang } from "@/i18n";

// Título, descrição, imagem de prévia e dados estruturados (schema.org) de cada rota pública, nos dois idiomas.
// O build de publicação (scripts/prerender.mjs) gera uma página por rota com esses dados,
// e o SEOHead aplica os mesmos valores quando a navegação acontece dentro do site.

export interface RouteMeta {
  path: string;
  lang: Lang;
  /** A mesma página no outro idioma (para hreflang e para o seletor PT/EN). */
  alternate: string;
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

const metaFor = (lang: Lang): RouteMeta[] => {
  const { profile: p, projects, brand, games } = dataFor(lang);
  const en = lang === "en";
  const other: Lang = en ? "pt" : "en";
  const lp = (path: string) => localePath(lang, path);
  const tr = (pt: string, enText: string) => (en ? enText : pt);
  const inLanguage = en ? "en" : "pt-BR";

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: p.name,
    alternateName: p.alternateName,
    jobTitle: p.title,
    description: p.seoDescription,
    url: `${site}/`,
    image: `${site}/og-image.jpg`,
    email: `mailto:${p.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Natal", addressRegion: "RN", addressCountry: "BR" },
    sameAs: [p.linkedin, p.behance, p.github],
    knowsLanguage: ["pt-BR", "en"],
    knowsAbout: [
      "Game design",
      tr("Design de jogos de cartas", "Card game design"),
      tr("Design de embalagem", "Packaging design"),
      "Product design",
      "UX design",
      "UI design",
      tr("Prototipagem", "Prototyping"),
      "Godot",
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
    inLanguage,
    creator: { "@id": personId, "@type": "Person", name: p.name },
  });

  const suffix = `${p.name} · ${p.title}`;
  const home = { name: tr("Início", "Home"), path: lp("/") };
  const work = { name: tr("Projetos", "Projects"), path: lp("/projects") };
  const sfPath = lp("/projects/spillfabrikken");
  const sfCrumb = { name: "SpillFabrikken", path: sfPath };
  const route = (ptPath: string, rest: Omit<RouteMeta, "path" | "lang" | "alternate">): RouteMeta => ({
    path: lp(ptPath),
    lang,
    alternate: localePath(other, ptPath),
    ...rest,
    // Cada prévia tem uma versão em inglês com o mesmo nome e o sufixo -en.
    image: en ? rest.image.replace(/\.jpg$/, "-en.jpg") : rest.image,
  });

  return [
    route("/", {
      title: suffix,
      description: p.seoDescription,
      image: "og-image.jpg",
      schema: [person, { "@context": "https://schema.org", "@type": "WebSite", name: p.name, url: `${site}${en ? "/en/" : "/"}`, inLanguage, author: { "@id": personId } }],
    }),
    route("/projects", {
      title: `${tr("Projetos", "Projects")} | ${suffix}`,
      description: tr(
        "Estudos de caso de game design, product design e UX: papel, processo e resultado de cada projeto.",
        "Game design, product design and UX case studies: my role, the process and the outcome of each project.",
      ),
      image: "og-image.jpg",
      schema: [breadcrumb([home, work])],
    }),
    route("/curriculo", {
      title: `${tr("Currículo", "Résumé")} | ${suffix}`,
      description: tr(
        `Currículo de ${p.name}, ${p.title}. Experiência, formação, ferramentas e idiomas.`,
        `Résumé of ${p.name}, ${p.title}. Experience, education, tools and languages.`,
      ),
      image: "og-image.jpg",
      schema: [person, breadcrumb([home, { name: tr("Currículo", "Résumé"), path: lp("/curriculo") }])],
    }),
    route("/projects/spillfabrikken", {
      title: `${tr("SpillFabrikken: oito projetos de jogo, do briefing à arte final", "SpillFabrikken: eight game projects, from brief to print")} | ${p.name}`,
      description: brand.summary,
      image: "og-spillfabrikken.jpg",
      schema: [
        creativeWork({ path: sfPath, name: "SpillFabrikken", description: brand.summary, year: "2020", about: tr("Game design e embalagem de jogos de festa", "Party game design and packaging") }),
        breadcrumb([home, work, sfCrumb]),
      ],
    }),
    ...games.map((g) => {
      const ptPath = `/projects/spillfabrikken/${g.slug}`;
      return route(ptPath, {
        title: `${g.name} · SpillFabrikken | ${p.name}`,
        description: g.summary,
        image: "og-spillfabrikken.jpg",
        schema: [
          creativeWork({ path: lp(ptPath), name: `${g.name} (SpillFabrikken)`, description: g.summary, image: g.cover, about: tr("Jogo de cartas", "Card game") }),
          breadcrumb([home, work, sfCrumb, { name: g.name, path: lp(ptPath) }]),
        ],
      });
    }),
    ...projects
      .filter((project) => project.slug !== "spillfabrikken")
      .map((project) => {
        const ptPath = `/projects/${project.slug}`;
        return route(ptPath, {
          title: `${project.title} | ${p.name}`,
          description: project.summary,
          image: project.ogImage ?? "og-image.jpg",
          schema: [
            creativeWork({ path: lp(ptPath), name: project.title, description: project.summary, image: project.image, year: project.year, about: project.category }),
            breadcrumb([home, work, { name: project.title, path: lp(ptPath) }]),
          ],
        });
      }),
  ];
};

export const routeMeta = (): RouteMeta[] => [...metaFor("pt"), ...metaFor("en")];

/** Metadados da rota atual; aceita caminhos com ou sem barra no fim. */
export const findRouteMeta = (pathname: string) => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return routeMeta().find((r) => r.path === clean);
};
