import { publicUrl } from "@/lib/utils";

// Dados pessoais usados na home, no currículo, no rodapé e no SEO.
export const profile = {
  name: "Iésu Jafé",
  title: "Product Designer · UX Engineer · IA aplicada",
  location: "Natal, RN — Brasil",
  availability: "Disponível para remoto",
  email: "jafe.iesu@gmail.com",
  phoneLabel: "(84) 99903-4089",
  phoneHref: "https://wa.me/5584999034089",
  linkedin: "https://www.linkedin.com/in/iesujafe/",
  github: "https://github.com/onicafe/",
  behance: "https://behance.net/iesujafe",
  // Coloque o PDF do currículo em public/ (ex.: public/cv-iesu-jafe.pdf) e preencha o caminho aqui.
  // Enquanto estiver vazio, o botão "Baixar CV" leva à página de currículo, que tem opção de salvar em PDF.
  cvPdfUrl: publicUrl("Iesu-Jafe-CV.pdf"),
  seoDescription:
    "Portfólio de Iésu Jafé, Product Designer e UX Engineer em Natal, RN. Estudos de caso de projetos para TRF5, Jovem Potiguar (IFRN/Governo do RN), Dione Solutions e SpillFabrikken.",
};
