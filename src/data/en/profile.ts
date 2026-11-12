import { profile } from "../profile";

// Campos de texto do perfil em inglês; contatos e links vêm do perfil em português.
export const profileEn: typeof profile = {
  ...profile,
  focus: "UX/UI, game design and digital products",
  location: "Natal, Brazil",
  availability: "Open to remote work",
  seoDescription:
    "Portfolio of Iésu Jafé, Product & Game Designer based in Natal, Brazil. Case studies for SpillFabrikken (Kryptert, Jentekveld, Tipsy), Lan House Simulator, PJe2 Mobile (TRF5), Jovem Potiguar and Dione Solutions.",
  highlights: [
    { value: "8", label: "years in design, since 2018" },
    { value: "7", label: "games I designed, on sale in Norway" },
    { value: "4", label: "countries I've worked in: Brazil, Japan, Norway and Portugal" },
    { value: "PT · EN", label: "I work in Portuguese and English" },
  ],
};
