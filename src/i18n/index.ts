import { useLocation } from "react-router-dom";

// Idiomas do site. O português fica na raiz (/projects/pje) e o inglês sob /en (/en/projects/pje).
export type Lang = "pt" | "en";

export const langFromPath = (pathname: string): Lang => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt");

export const useLang = (): Lang => langFromPath(useLocation().pathname);

/** Caminhos que mudam de nome entre os idiomas (o resto só ganha o prefixo /en). */
const ptToEn: Record<string, string> = { "/curriculo": "/resume" };
const enToPt: Record<string, string> = Object.fromEntries(Object.entries(ptToEn).map(([pt, en]) => [en, pt]));

/** Converte um caminho em português ("/projects/pje", "/curriculo", "/#contact") para o idioma pedido. */
export const localePath = (lang: Lang, path: string) => {
  if (lang === "pt") return path;
  const [base, hash] = path.split("#");
  const mapped = ptToEn[base] ?? base;
  const out = mapped === "/" || mapped === "" ? "/en" : `/en${mapped}`;
  return hash ? `${out}#${hash}` : out;
};

/** Caminho equivalente no outro idioma, para o seletor PT/EN. */
export const switchLangPath = (pathname: string) => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (langFromPath(clean) === "en") {
    const rest = clean.slice(3) || "/";
    return enToPt[rest] ?? rest;
  }
  return localePath("en", clean);
};

/** Funções do idioma atual: `lp` monta links e `tr` escolhe o texto. */
export const useI18n = () => {
  const lang = useLang();
  return {
    lang,
    lp: (path: string) => localePath(lang, path),
    tr: (pt: string, en: string) => (lang === "en" ? en : pt),
  };
};
