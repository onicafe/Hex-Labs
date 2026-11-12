import { publicUrl } from "@/lib/utils";

// Dados pessoais usados na home, no currículo, no rodapé e no SEO.
export const profile = {
  name: "Iésu Jafé",
  /** Grafia sem acento, para quem busca "Iesu Jafe". */
  alternateName: "Iesu Jafe",
  /** Endereço público do site, sem barra no fim. Ao trocar de domínio, mude só aqui. */
  siteUrl: "https://onicafe.github.io/Hex-Labs",
  /** Código da tag HTML do Google Search Console (só o valor de content). Vazio = sem tag. */
  googleSiteVerification: "",
  title: "Product & Game Designer",
  /** Especialidades, abaixo do título. */
  focus: "UX/UI, design de jogos e produtos digitais",
  location: "Natal, RN — Brasil",
  availability: "Disponível para remoto",
  email: "jafe.iesu@gmail.com",
  phoneLabel: "(84) 99903-4089",
  phoneHref: "https://wa.me/5584999034089",
  linkedin: "https://www.linkedin.com/in/iesujafe/",
  github: "https://github.com/onicafe/",
  behance: "https://behance.net/iesujafe",
  cvPdfUrl: publicUrl("Iesu-Jafe-CV.pdf"),
  /** Versão do CV com foco em jogos. */
  cvGamesPdfUrl: publicUrl("Iesu-Jafe-CV-Jogos.pdf"),
  seoDescription:
    "Portfólio de Iésu Jafé, Product & Game Designer em Natal, RN. Estudos de caso da SpillFabrikken (Kryptert, Jentekveld, Tipsy), do Lan House Simulator, do PJe2 Mobile (TRF5), do Jovem Potiguar e da Dione Solutions.",
  /** Números da faixa de destaque da home. Todos conferidos no CV ou no catálogo da SpillFabrikken. */
  highlights: [
    { value: "8", label: "anos em design, desde 2018" },
    { value: "7", label: "jogos que desenhei, à venda na Noruega" },
    { value: "4", label: "países onde trabalhei: Brasil, Japão, Noruega e Portugal" },
    { value: "PT · EN", label: "trabalho em português e inglês" },
  ],
};
