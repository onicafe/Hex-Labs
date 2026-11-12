// Depois do build de publicação, cria uma cópia de dist/index.html para cada rota pública,
// com título, descrição e imagem de prévia próprios. Também gera 404.html e .nojekyll.
// Uso: npm run build:pages (não publica nada; só prepara a pasta dist).
import { mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = (process.env.SITE_URL ?? "https://onicafe.github.io/Hex-Labs").replace(/\/$/, "");
const dist = "dist";
const ssr = "dist-ssr";

const { routeMeta } = await import(pathToFileURL(join(ssr, "routeMeta.js")).href);
const template = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const setMeta = (html, attr, key, value) => {
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  const re = new RegExp(`<meta ${attr}="${key}"[^>]*>`);
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `  ${tag}\n</head>`);
};

for (const route of routeMeta()) {
  const url = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const image = `${SITE_URL}/${route.image}`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`);
  html = setMeta(html, "name", "description", route.description);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);
  html = setMeta(html, "name", "twitter:image", image);
  html = html.replace(/<link rel="canonical"[^>]*>\s*/, "").replace("</head>", `  <link rel="canonical" href="${url}" />\n</head>`);

  const out = route.path === "/" ? join(dist, "index.html") : join(dist, route.path, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

copyFileSync(join(dist, "index.html"), join(dist, "404.html"));
writeFileSync(join(dist, ".nojekyll"), "");
rmSync(ssr, { recursive: true, force: true });
console.log(`prerender: ${routeMeta().length} rotas geradas em ${dist}/`);
