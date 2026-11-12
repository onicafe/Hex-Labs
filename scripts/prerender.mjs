// Depois do build de publicação, gera uma página HTML por rota pública:
// conteúdo já renderizado (para buscadores e prévias de link), título, descrição, prévia,
// endereço canônico e dados estruturados (JSON-LD). Também gera sitemap.xml, robots.txt, 404.html e .nojekyll.
// Uso: npm run build:pages (não publica nada; só prepara a pasta dist).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const dist = "dist";
const ssr = "dist-ssr";

const { render, routeMeta, canonicalUrl, profile } = await import(pathToFileURL(join(ssr, "entry-server.js")).href);
const SITE_URL = profile.siteUrl.replace(/\/$/, "");
const basePath = new URL(SITE_URL).pathname.replace(/\/$/, "");
const template = readFileSync(join(dist, "index.html"), "utf8");
// O 404 sai do modelo limpo, antes de qualquer conteúdo de rota.
writeFileSync(join(dist, "404.html"), template.replace("<head>", '<head>\n  <meta name="robots" content="noindex" />'));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const setMeta = (html, attr, key, value) => {
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  const re = new RegExp(`<meta ${attr}="${key}"[^>]*>`);
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `  ${tag}\n</head>`);
};
// JSON dentro de <script>: impede que "</script>" no texto feche a tag.
const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

const routes = routeMeta();
for (const route of routes) {
  const url = canonicalUrl(route.path);
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
  if (profile.googleSiteVerification) html = setMeta(html, "name", "google-site-verification", profile.googleSiteVerification);
  const head = [`<link rel="canonical" href="${url}" />`, ...route.schema.map(jsonLd)].map((t) => `  ${t}`).join("\n");
  html = html.replace(/<link rel="canonical"[^>]*>\s*/, "").replace("</head>", `${head}\n</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`);

  const out = route.path === "/" ? join(dist, "index.html") : join(dist, route.path, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((r) => `  <url><loc>${canonicalUrl(r.path)}</loc><lastmod>${today}</lastmod></url>`),
  "</urlset>",
  "",
].join("\n");
writeFileSync(join(dist, "sitemap.xml"), sitemap);
// Buscadores só leem o robots.txt na raiz do domínio. Ele passa a valer quando o site estiver na raiz
// (domínio próprio ou repositório onicafe.github.io); até lá, envie o sitemap pelo Search Console.
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nDisallow: ${basePath}/admin\nSitemap: ${SITE_URL}/sitemap.xml\n`);
writeFileSync(join(dist, ".nojekyll"), "");
rmSync(ssr, { recursive: true, force: true });
console.log(`prerender: ${routes.length} rotas com conteúdo, sitemap.xml e robots.txt em ${dist}/`);
