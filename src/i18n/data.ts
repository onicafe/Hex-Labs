import { useLang, type Lang } from "./index";
import { profile } from "@/data/profile";
import { profileEn } from "@/data/en/profile";
import { projects } from "@/data/projects";
import { projectsEn } from "@/data/en/projects";
import { brand, games, extras } from "@/data/spillfabrikken";
import { brand as brandEn, games as gamesEn, extras as extrasEn } from "@/data/en/spillfabrikken";
import { resume } from "@/data/resume";
import { resumeEn } from "@/data/en/resume";

// Conteúdo do site no idioma pedido. Imagens, slugs e números são os mesmos nas duas versões.
export const dataFor = (lang: Lang) =>
  lang === "en"
    ? { profile: profileEn, projects: projectsEn, brand: brandEn, games: gamesEn, extras: extrasEn, resume: resumeEn }
    : { profile, projects, brand, games, extras, resume };

export const useData = () => dataFor(useLang());
