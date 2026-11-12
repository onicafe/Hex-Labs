import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateSEO } from "@/lib/seo";
import { canonicalUrl, findRouteMeta } from "@/data/routeMeta";
import { profile } from "@/data/profile";

// Aplica o título, a descrição e a prévia de cada rota quando a navegação acontece dentro do site.
// Os mesmos valores vão para o HTML gerado no build (scripts/prerender.mjs).
const SEOHead = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/blog/")) return;
    const meta = findRouteMeta(pathname);
    if (!meta) {
      updateSEO(pathname.startsWith("/blog") ? "Blog" : undefined);
      return;
    }
    updateSEO(meta.title, meta.description, `${profile.siteUrl}/${meta.image}`, true);
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl(meta.path);
    document.documentElement.lang = meta.lang === "en" ? "en" : "pt-BR";
    for (const [hreflang, path] of [
      [meta.lang === "en" ? "en" : "pt-BR", meta.path],
      [meta.lang === "en" ? "pt-BR" : "en", meta.alternate],
    ] as const) {
      let alt = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!alt) {
        alt = document.createElement("link");
        alt.rel = "alternate";
        alt.hreflang = hreflang;
        document.head.appendChild(alt);
      }
      alt.href = canonicalUrl(path);
    }
  }, [pathname]);

  return null;
};

export default SEOHead;
