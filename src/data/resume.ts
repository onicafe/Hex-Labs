// Conteúdo do currículo (/curriculo), alinhado ao CV de out/2026. A versão em inglês fica em src/data/en/resume.ts.

export interface ResumeEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  /** Link interno para o estudo de caso (caminho em português; o site converte para o idioma da página). */
  link?: string;
}

export interface Resume {
  summary: string;
  tools: { group: string; items: string[] }[];
  experience: ResumeEntry[];
  /** Projetos autorais e trabalho voluntário, separados da experiência remunerada. */
  side: ResumeEntry[];
  education: { course: string; inst: string; year: string }[];
  certifications: string[];
  languages: string[];
}

export const resume: Resume = {
  summary:
    "Product & Game Designer com 8 anos de experiência em design. Fui o único designer da editora norueguesa SpillFabrikken, onde levei jogos de cartas do conceito à arte final para a fábrica, e desenhei produtos digitais para a Dione Solutions, de Tóquio. Como voluntário, desenhei interfaces para o TRF5 e para o programa Jovem Potiguar. Em 2026 fundei a Hex Labs, onde projeto e desenvolvo produtos próprios. Trabalho em português e inglês.",
  tools: [
    { group: "Design", items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Bibliotecas de componentes", "Prototipagem"] },
    { group: "Jogos e produção", items: ["Design de cartas e regras", "Embalagem e facas", "Arte final para gráfica", "Godot"] },
    { group: "Desenvolvimento", items: ["React", "TypeScript", "Tailwind CSS", "Flutter", "Supabase"] },
    { group: "Pesquisa e processo", items: ["Jornadas e fluxos", "Testes de usabilidade", "Acessibilidade"] },
    { group: "IA e automação", items: ["Agentes de IA (Claude Code)", "n8n", "Azure", "AWS"] },
  ],
  experience: [
    {
      role: "Fundador",
      company: "Hex Labs · Natal, RN",
      period: "Mar 2026 – atual",
      bullets: [
        "Fundei um estúdio de produtos digitais com IA. Conduzo design, desenvolvimento e prospecção.",
        "Construí o site e o CMS da empresa (React, TypeScript, Tailwind, Supabase), com blog e painel administrativo.",
        "Desenvolvo a Rede Imobiliária, SaaS white-label com descrições de imóveis geradas por IA, e o Lexus System, gestão para escritórios de advocacia.",
      ],
      link: "/projects/hex-labs",
    },
    {
      role: "Communications Specialist",
      company: "TAP Air Portugal · Lisboa, Portugal",
      period: "Fev 2023 – Ago 2023",
      bullets: [
        "Gerenciei o CMS da companhia para rastreamento de dados e automação de processos.",
        "Dei suporte e manutenção aos sistemas, garantindo a integridade das informações operacionais.",
      ],
    },
    {
      role: "Product Designer",
      company: "Dione Solutions · Tóquio, Japão (remoto)",
      period: "Fev 2022 – Mai 2023",
      bullets: [
        "Defini o design system e desenhei as telas principais de um sistema de gestão hoteleira pensado para uma rede de 12 hotéis (reservas, limpeza, cozinha e estoque).",
        "Projetei o MyTreasure, rede social para colecionadores com posts configuráveis e módulo de lances, e propus a marca do app.",
        "Produzi materiais de apresentação e gerenciei redes sociais.",
      ],
      link: "/projects/my-treasure",
    },
    {
      role: "Product & Game Designer",
      company: "SpillFabrikken · Trondheim, Noruega (remoto)",
      period: "Abr 2020 – Set 2021",
      bullets: [
        "Único designer da editora: oito projetos de jogo de cartas e de festa, do conceito e do protótipo à arte final para a fábrica na China.",
        "Criei a identidade visual, as embalagens e o material de divulgação, reduzindo componentes para baixar peso e custo.",
        "Coordenei colaboradores externos (ilustração e renders 3D) e fui o ponto de contato com a fábrica.",
      ],
      link: "/projects/spillfabrikken",
    },
    {
      role: "Designer Gráfico",
      company: "SESAP-RN · Natal, RN",
      period: "Abr 2019 – Jul 2019",
      bullets: ["Criei campanhas de saúde pública, newsletters e identidades de eventos."],
    },
    {
      role: "Designer de Produto (freelancer, em paralelo)",
      company: "Oni · Remoto",
      period: "Jun 2018 – Jun 2023",
      bullets: ["Projetos de UI/UX, design gráfico e identidade visual para clientes no Brasil e no exterior."],
    },
  ],
  side: [
    {
      role: "Game designer e diretor de arte (projeto autoral)",
      company: "Lan House Simulator · Godot 4",
      period: "2026 – em desenvolvimento",
      bullets: [
        "Simulador 3D em primeira pessoa de uma lan house brasileira, com um jogo de gerenciamento em pixel art rodando no monitor do caixa.",
        "Defino design, regras, economia e direção de arte; a programação é feita com agentes de IA sob a minha direção.",
      ],
      link: "/projects/lan-house-simulator",
    },
    {
      role: "Customer Experience (voluntário)",
      company: "AIESEC no Brasil · Remoto",
      period: "Mar 2025 – Dez 2025",
      bullets: ["Acompanhei participantes internacionais em projetos com empresas parceiras, em português e inglês."],
    },
    {
      role: "UI/UX Designer (voluntário)",
      company: "PJe2 Mobile, TRF5 · Remoto",
      period: "2024",
      bullets: [
        "Desenhei a interface do redesign do app de magistrados da Justiça Federal, a convite da equipe de residência do TRF5. Trabalho citado em TCC.",
        "Cerca de metade das interações nas tarefas principais, numa comparação tela a tela com o app herdado. A equipe de engenharia resolveu os 347 alertas do analisador de código.",
      ],
      link: "/projects/pje",
    },
    {
      role: "UI/UX Designer (voluntário)",
      company: "Jovem Potiguar, Governo do RN e IFRN · Natal, RN",
      period: "2024",
      bullets: [
        "Desenhei o fluxo de pré-inscrição de jovens do CadÚnico em cursos de qualificação do IFRN, da jornada do usuário ao teste de acessibilidade.",
      ],
      link: "/projects/jovem-potiguar",
    },
    {
      role: "Designer (projeto autoral)",
      company: "Conceitos DualSense · Twitter",
      period: "Abr 2020",
      bullets: [
        "Série de conceitos de fã para o controle do PS5, publicada no Twitter e no Reddit na semana da revelação, na época como @itsalastor e echodaine.",
        "Destacada por Forbes, Game Informer, Tom's Guide, Screen Rant e Wccftech.",
      ],
      link: "/projects/dualsense",
    },
  ],
  education: [
    { course: "Bacharelado em Ciência da Computação", inst: "Universidade Potiguar", year: "2024 – atual (em pausa)" },
    { course: "Pós-graduação em Desenvolvimento de Metaverso", inst: "Centro Universitário UNA", year: "2023" },
    { course: "Game Design e Desenvolvimento de Jogos (curso)", inst: "EBAC — Escola Britânica de Artes Criativas e Tecnologia", year: "2022" },
    { course: "Pós-graduação em Marketing Digital", inst: "Faculdade Metropolitana", year: "2020" },
    { course: "Bacharelado em Design Gráfico", inst: "Universidade Potiguar", year: "2017 – 2019" },
  ],
  certifications: [
    "Microsoft Certified: Azure Fundamentals",
    "Análise Avançada de Imagens e Texto com IA na AWS (NEXA)",
    "Explorando uma Carreira em Design de Experiência do Usuário",
  ],
  languages: ["Português (nativo)", "Inglês (bilíngue)"],
};
