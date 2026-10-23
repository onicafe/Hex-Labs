import polare from "@/assets/projects/polare.png";
import sigrh from "@/assets/projects/sigrh.png";
import ucr from "@/assets/projects/ucr-intelbras.jpg";
import bonno from "@/assets/projects/bonno.png";
import tertuliano from "@/assets/projects/tertuliano.png";
import enade from "@/assets/projects/enade.png";
import spillfabrikken from "@/assets/projects/spillfabrikken.png";
import pje from "@/assets/projects/pje.png";
import jovempotiguar from "@/assets/projects/jovempotiguar.png";
import prism from "@/assets/projects/prism.png";
import hosuto from "@/assets/projects/hosuto.jpg";
import prism1 from "@/assets/projects/prism/1.png";
import prism2 from "@/assets/projects/prism/2.png";
import prism3 from "@/assets/projects/prism/3.png";
import prism4 from "@/assets/projects/prism/4.png";
import prism5 from "@/assets/projects/prism/5.png";
import prism6 from "@/assets/projects/prism/6.png";
import prism7 from "@/assets/projects/prism/7.png";
import prism8 from "@/assets/projects/prism/8.png";
import prism9 from "@/assets/projects/prism/9.png";

// Fonte única dos projetos exibidos no site. As páginas públicas não dependem do Supabase.

export type Engagement = "Voluntário" | "Fundador" | "Freelance" | "Contratado";

export interface CaseImage {
  src: string;
  caption?: string;
}

export interface CaseStep {
  title: string;
  text?: string;
  images?: CaseImage[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  image: string;
  featured?: boolean;
  /** Tipo de vínculo. Fica vazio quando não está confirmado. */
  engagement?: Engagement;
  /** Meu papel no projeto, em uma linha. */
  role: string;
  /** Resumo de uma ou duas frases, usado nos cards. */
  summary: string;
  /** Quem fez o quê, quando o trabalho não foi só meu. */
  credits?: string;
  problem: string;
  process: CaseStep[];
  result: string[];
  tools?: string[];
  links?: ProjectLink[];
  gallery?: string[];
}

const spillGallery = "1.jpg 2.jpg 3.jpg 4.jpg 5.jpg 6.jpg 7.jpg 8.png 9.png 10.png 11.png 12.png 13.png 14.png 15.png 16.png 17.png 18.png 19.png 20.png 21.png 22.png 23.png 24.png 25.gif 26.jpg 27.jpg 28.jpg 29.jpg 30.png 31.png 32.png 33.png 34.jpg 35.jpg 36.png 37.png 38.png 39.png 40.png 41.png 42.png 43.png 44.png 45.png 46.png 47.png 48.png 49.png 50.png 51.png 52.png 53.png 54.png 55.png 56.png 57.png 58.png 59.png 60.png 61.png 62.png 63.png 64.png 65.png 66.png 67.png 68.gif 69.png 70.png 71.png 72.png 73.png 74.gif 75.png 76.png 77.png 78.png"
  .split(" ")
  .map((file) => `/projects/spillfabrikken/${file}`);

const pjeImg = (n: number, caption?: string): CaseImage => ({ src: `/projects/pje2-mobile/${n}.jpg`, caption });
const jpImg = (n: number, caption?: string): CaseImage => ({ src: `/projects/jovem-potiguar/image${n}.png`, caption });
const nexusImg = (n: number, caption?: string): CaseImage => ({ src: `/projects/nexus-imobiliaria/image${n}.png`, caption });

export const projects: Project[] = [
  {
    slug: "pje",
    title: "PJe2 Mobile",
    category: "UI/UX · App mobile",
    year: "2024",
    client: "TRF5 — Tribunal Regional Federal da 5ª Região",
    image: pje,
    featured: true,
    engagement: "Voluntário",
    role: "Colaborador voluntário em UI/UX",
    summary:
      "Redesign do app que magistrados da Justiça Federal usam para revisar e assinar minutas. Colaborei de forma voluntária com a interface, ajudando um amigo que fazia parte da equipe oficial do projeto no TRF5.",
    credits:
      "O projeto foi conduzido por uma equipe de residência ligada ao TRF5. Meu amigo, que integrava essa equipe, apresentou o trabalho no TCC dele e registrou minha colaboração. A refatoração do código em Flutter, a nova arquitetura e a integração com a API do CNJ são trabalho da equipe. Minha contribuição foi na interface e na experiência de uso.",
    problem:
      "O PJe2 Mobile já existia, mas a versão herdada era difícil de usar e de manter. A navegação dependia de um menu gaveta escondido, os filtros aceitavam só uma opção por vez e erros apareciam em diálogos que interrompiam o fluxo. A análise estática feita pela equipe encontrou 67 warnings e 280 hints no código. Para um magistrado que precisa assinar dezenas de processos, cada passo a mais custa tempo.",
    process: [
      {
        title: "Entender o que já existia",
        text: "A equipe estudou a documentação da residência anterior e produziu um documento de análise técnica com casos de uso, requisitos e uma revisão do código. Foi daí que saíram os problemas de navegação e de fluxo que a nova interface precisava resolver.",
      },
      {
        title: "Redesenhar dentro dos padrões do Judiciário",
        text: "As telas seguem as cores da identidade visual da PDPJ-Br e a tipografia e os ícones do UIKit PJe. Os mockups foram feitos no Adobe XD e depois migrados para o Figma.",
        images: [pjeImg(3, "Novo fluxo de login: seleção de usuário, validação de CPF em tempo real e opção de biometria")],
      },
      {
        title: "Tirar passos do caminho",
        text: "O menu gaveta saiu e a localização passou a ficar sempre visível na tela inicial. Os filtros passaram a aceitar várias opções ao mesmo tempo, com um contador de quantos estão ativos. A seleção de processos ganhou atalhos por gesto (pressionar e segurar, ou arrastar) e a assinatura em lote foi para a barra superior.",
        images: [
          pjeImg(9, "Nova tela inicial, sem menu gaveta"),
          pjeImg(10),
          pjeImg(17, "Lista de processos com status, etiquetas e prioridade por cor"),
          pjeImg(18),
        ],
      },
      {
        title: "Evitar erros em ações sensíveis",
        text: "A minuta abre em modo leitura (fundo cinza) e só fica editável depois de uma ação explícita. Sair da conta pede confirmação. O pareamento de dispositivos ganhou um passo a passo ilustrado para gerar o QR code no PJe Web.",
        images: [
          pjeImg(6, "Pareamento de dispositivo com instruções passo a passo"),
          pjeImg(7),
          pjeImg(8),
          pjeImg(28, "Detalhes do processo e edição de minuta"),
          pjeImg(29),
          pjeImg(30),
        ],
      },
    ],
    result: [
      "Nova interface implementada pela equipe no app, com login por biometria, pareamento guiado, filtros múltiplos e assinatura em lote mais direta.",
      "O trabalho foi documentado no TCC de um integrante da equipe, com registro da minha colaboração.",
      "Não houve medição formal de tempo por tarefa. O próprio TCC recomenda, como próximo passo, testes de usabilidade com magistrados e métricas como SUS e taxa de sucesso.",
    ],
    tools: ["Adobe XD", "Figma", "Illustrator", "Photoshop"],
    links: [
      {
        label: "Ler o TCC com o estudo completo",
        url: "https://docs.google.com/document/d/e/2PACX-1vQotRMSwYoOB3EgNSNWMB_PHTUKnb4sbBtSBmYNj5Qsg1PXLu20ELZCw1H45K7SPAVLKyvEhHUUw2u5/pub",
      },
      {
        label: "Notícia sobre o novo app do PJe",
        url: "https://www.trf1.jus.br/trf1/noticias/novo-aplicativo-para-dispositivos-moveis-do-pje-facilitara-consulta-e-trara-novas-funcionalidades-",
      },
    ],
    gallery: Array.from({ length: 15 }, (_, i) => `/projects/pje2-mobile/${i + 31}.jpg`),
  },
  {
    slug: "jovem-potiguar",
    title: "Jovem Potiguar",
    category: "UX/UI · Plataforma de inscrição",
    year: "2024",
    client: "IFRN e SETHAS — Governo do Rio Grande do Norte",
    image: jovempotiguar,
    featured: true,
    engagement: "Voluntário",
    role: "UX/UI Designer (voluntário)",
    summary:
      "Plataforma de inscrição que leva jovens do CadÚnico a cursos de qualificação do IFRN. Trabalhei como voluntário na pesquisa, nos fluxos e nas telas.",
    credits:
      "O programa é uma parceria entre o IFRN e a Secretaria de Estado do Trabalho, da Habitação e da Assistência Social (SETHAS). Atuei como voluntário no design da plataforma de inscrição.",
    problem:
      "O público são jovens de baixa renda, muitos usando celulares simples e com pouca experiência em sistemas públicos. Se o cadastro trava, a pessoa perde a vaga. A interface precisava funcionar bem em telas pequenas, dar todas as informações necessárias sem sobrecarregar e parecer familiar para quem já usa o CadÚnico.",
    process: [
      {
        title: "Mapear a jornada",
        text: "O ponto de partida foi a jornada do usuário, um protótipo inicial e o fluxograma das telas de cadastro, analisados tela a tela para achar onde as pessoas poderiam travar.",
        images: [jpImg(9, "Processo de trabalho"), jpImg(1, "Jornada do usuário"), jpImg(13, "Fluxograma das telas de cadastro")],
      },
      {
        title: "Wireframes",
        text: "A inscrição foi dividida em passos curtos, com instruções ao longo do caminho, para que ninguém precise adivinhar o que fazer a seguir.",
        images: [jpImg(4), jpImg(14), jpImg(8), jpImg(6)],
      },
      {
        title: "Teste de usabilidade",
        text: "Em duas etapas: primeiro, relatórios de usabilidade de um projeto anterior da SETHAS com telas e público parecidos; depois, testes internos com pessoas que não tinham visto o protótipo, usando cadastros de teste para passar por todos os cenários.",
        images: [jpImg(15, "Teste de usabilidade")],
      },
      {
        title: "Guia visual, mockups e acessibilidade",
        text: "Com os wireframes aprovados, vieram o mood board, o guia visual e as telas finais. Antes de publicar, todas as telas passaram por uma revisão de contraste para daltonismo e baixa visão.",
        images: [jpImg(10, "Mood board"), jpImg(11, "Tela inicial"), jpImg(17, "Informações do curso e pré-cadastro"), jpImg(3, "Resultados"), jpImg(12, "Teste de acessibilidade")],
      },
    ],
    result: [
      "A plataforma foi usada nas inscrições do programa. Numa das edições, o IFRN abriu 840 vagas em cursos de qualificação pelo Jovem Potiguar.",
      "O que aprendi: a usar UX para aproximar o que a instituição quer do que o público consegue fazer, a conduzir testes de usabilidade para pegar problemas cedo, e que acessibilidade importa mesmo em formulários que parecem simples.",
    ],
    tools: ["Figma", "Adobe XD", "Photoshop"],
    links: [
      { label: "Página do programa (FUNCERN)", url: "https://funcern.br/projetos/programa-jovem-potiguar/" },
      {
        label: "Notícia do IFRN: 840 vagas",
        url: "https://portal.ifrn.edu.br/campus/reitoria/noticias/jovem-potiguar-abertas-as-inscricoes-para-840-vagas-em-cursos-de-qualificacao-no-rn/",
      },
      {
        label: "Notícia do G1 sobre o programa",
        url: "https://g1.globo.com/rn/rio-grande-do-norte/noticia/2024/09/20/projeto-jovem-potiguar-classifica-estudantes-de-escolas-publicas-para-intercambio-na-europa.ghtml",
      },
    ],
  },
  {
    slug: "intelbras-ucr",
    title: "Intelbras UCR",
    category: "Front-end · Software de gravação de chamadas",
    year: "2021",
    client: "Intelbras",
    image: ucr,
    featured: true,
    role: "Desenvolvedor front-end",
    summary:
      "Interface do UCR, o gravador de chamadas corporativo da Intelbras que trabalha junto com a central UnniTI.",
    problem:
      "Empresas usam o UCR para gravar e consultar chamadas em tempo real. A interface precisava ser simples para quem opera no dia a dia e confiável para quem depende das gravações por segurança.",
    process: [
      {
        title: "Interface em React",
        text: "Desenvolvi a interface em React, com Context API para o estado da aplicação. O foco foi manter a tela responsiva com dados chegando em tempo real, sem atrasos perceptíveis para quem usa.",
      },
    ],
    result: ["O UCR é um produto comercializado pela Intelbras para ambientes corporativos."],
    tools: ["React", "Context API", "TypeScript"],
    links: [
      {
        label: "Página do produto na Intelbras",
        url: "https://www.intelbras.com/pt-br/grave-chamadas-com-alta-qualidade-em-ambientes-corporativos-ucr",
      },
    ],
  },
  {
    slug: "ufrn",
    title: "Portais da UFRN",
    category: "Front-end · Sistemas institucionais",
    year: "2020–2022",
    client: "UFRN — Universidade Federal do Rio Grande do Norte",
    image: polare,
    featured: true,
    role: "Desenvolvedor front-end",
    summary:
      "Portais públicos de três sistemas da UFRN: Polare, SIGRH e Enade. Interfaces usadas por servidores, alunos e pelo público em geral.",
    problem:
      "Sistemas institucionais concentram muita informação e são usados por perfis muito diferentes. O desafio comum aos três portais foi organizar esse conteúdo de forma clara e acessível, integrada aos sistemas Java que já existiam na universidade.",
    process: [
      {
        title: "Polare — portal público",
        text: "Interface em Angular com PrimeNG para reunir serviços institucionais num só lugar, com atenção a usabilidade e acessibilidade.",
        images: [{ src: polare, caption: "Polare" }],
      },
      {
        title: "SIGRH — portal público",
        text: "Portal responsivo do Sistema Integrado de Gestão de Recursos Humanos, integrado ao back-end Java, com foco em transparência.",
        images: [{ src: sigrh, caption: "SIGRH" }],
      },
      {
        title: "Enade UFRN",
        text: "Portal informativo para alunos e coordenadores, com arquitetura da informação pensada para encontrar rápido o que importa sobre o exame.",
        images: [{ src: enade, caption: "Enade UFRN" }],
      },
    ],
    result: ["Os três portais estão no ar e são mantidos pela UFRN."],
    tools: ["Angular", "PrimeNG", "Java (integração)", "HTML/CSS"],
    links: [
      { label: "Polare", url: "https://polare.sti.ufrn.br/" },
      { label: "SIGRH", url: "https://sigrh.ufrn.br/publico/home" },
      { label: "Enade UFRN", url: "https://enade.ufrn.br/" },
    ],
  },
  {
    slug: "my-treasure",
    title: "MyTreasure",
    category: "Product Design · App social",
    year: "2023",
    client: "Dione (Japão)",
    image: prism,
    featured: true,
    role: "Product Designer",
    summary:
      "App para colecionadores gerenciarem suas coleções, acompanharem o valor dos itens e, se quiserem, exporem ou negociarem peças.",
    problem:
      "Cada colecionador quer mostrar coisas diferentes. Uns querem acompanhar o retorno financeiro em segredo, outros querem uma vitrine pública com lances. O desafio foi criar posts configuráveis, em que a interface se adapta à escolha do usuário: esconde preços para quem quer privacidade ou ativa a negociação para quem quer vender.",
    process: [
      {
        title: "Do conceito às telas",
        text: "Usei Design Thinking para definir os modos de uso (privado, vitrine e negociação) e desenhei a interface para equilibrar o acompanhamento financeiro com uma experiência visual da coleção.",
      },
    ],
    result: ["App publicado na Google Play."],
    tools: ["Figma", "Design Thinking"],
    links: [{ label: "Ver na Google Play", url: "https://play.google.com/store/apps/details?id=com.my_treasure_app" }],
    gallery: [prism1, prism2, prism3, prism4, prism5, prism6, prism7, prism8, prism9],
  },
  {
    slug: "hosuto",
    title: "Hosuto — gestão hoteleira",
    category: "Product Design · Dashboard",
    year: "2022",
    client: "Dione (Japão)",
    image: hosuto,
    role: "Product Designer",
    summary: "Dashboard para as equipes de uma rede de hotéis gerenciarem limpeza, reservas, cozinha e estoque.",
    problem:
      "O trabalho num hotel é presencial e corrido. A ferramenta digital precisava ajudar sem atrapalhar: informação fácil de ler e organizada conforme o que cada equipe precisa ver.",
    process: [
      {
        title: "Uma tela por necessidade",
        text: "Compactei as informações e distribuí os itens conforme a rotina de cada equipe, para que cada pessoa encontre rápido o que é da sua função.",
      },
    ],
    result: ["Sistema de uso interno, não disponível publicamente."],
    tools: ["Figma"],
    gallery: Array.from({ length: 11 }, (_, i) => `/projects/hosuto/${i + 1}.png`),
  },
  {
    slug: "hex-labs",
    title: "Hex Labs",
    category: "Empresa que fundei",
    year: "2026",
    client: "Hex Labs",
    image: "/projects/nexus-imobiliaria/hero.png",
    engagement: "Fundador",
    role: "Fundador",
    summary:
      "Empresa de design e desenvolvimento de software que fundei. Para atrair os primeiros clientes, criei dois produtos próprios: a Rede Imobiliária e o EcoLaw.",
    problem:
      "Uma empresa nova não tem portfólio para mostrar. Em vez de esperar o primeiro cliente, decidi construir produtos completos para nichos que eu conhecia, e usá-los como prova do que a empresa sabe fazer.",
    process: [
      {
        title: "Rede Imobiliária (Nexus Imobiliária)",
        text: "Plataforma para imobiliárias: painel para corretores cadastrarem e editarem imóveis, busca com mapa para o público, analytics dos anúncios e controle de permissões por equipe. O estudo de caso completo está na página da Nexus Imobiliária.",
        images: [nexusImg(31, "Painel do corretor"), nexusImg(18, "Busca com mapa")],
      },
      {
        title: "EcoLaw",
        text: "Sistema de gestão para escritórios de advocacia: acompanhamento de processos, prazos, honorários e um portal para o cliente. Ainda em desenvolvimento.",
      },
    ],
    result: [
      "A Rede Imobiliária está construída e documentada como estudo de caso.",
      "O EcoLaw está em desenvolvimento.",
      "A experiência de fundar a empresa me fez cuidar de tudo, da pesquisa ao código e à conversa com potenciais clientes.",
    ],
    tools: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Figma"],
    links: [{ label: "Estudo de caso: Nexus Imobiliária", url: "/projects/nexus-imobiliaria" }],
  },
  {
    slug: "nexus-imobiliaria",
    title: "Nexus Imobiliária",
    category: "Produto da Hex Labs · Pesquisa, design e código",
    year: "2026",
    client: "Hex Labs (produto próprio)",
    image: "/projects/nexus-imobiliaria/hero.png",
    engagement: "Fundador",
    role: "Fundador da Hex Labs: produto e design",
    summary:
      "Plataforma imobiliária com painel para corretores e busca com mapa para o público. É a Rede Imobiliária, um dos produtos que criei na Hex Labs.",
    problem:
      "Corretores de todas as idades precisam cadastrar e atualizar imóveis sem depender de alguém de tecnologia. Do outro lado, quem procura imóvel quer ver a localização e os arredores sem se perder em informação demais.",
    process: [
      {
        title: "Pesquisa e jornada",
        text: "O trabalho começou pela jornada de quem compra ou aluga e de quem anuncia. Depois vieram o protótipo e o fluxograma de como as interfaces se conectam.",
        images: [nexusImg(11, "Processo de trabalho"), nexusImg(26, "Jornada do usuário"), nexusImg(21, "Fluxograma")],
      },
      {
        title: "Personas",
        text: "Três personas guiaram o design: Márcia, corretora; Karla, que procura um apartamento; e Pablo, que quer alugar a casa dele. Como os outros dois dependem do trabalho da Márcia, o design começou pelo painel dela.",
      },
      {
        title: "Painel da corretora",
        text: "O botão de novo imóvel se destaca por ser a ação principal. A ficha de cadastro tem prévia do anúncio, as edições entram no ar ao salvar e a página de analytics mostra horários, dispositivos e imóveis mais vistos.",
        images: [nexusImg(31, "Dashboard"), nexusImg(20, "Cadastro de imóvel"), nexusImg(14, "Analytics")],
      },
      {
        title: "Equipe e permissões",
        text: "Três níveis de acesso: equipe (vê o desempenho e sugere edições), corretor (também gerencia imóveis) e gerente (também adiciona colaboradores). Um histórico mostra as últimas ações de cada um.",
        images: [nexusImg(19, "Equipe"), nexusImg(13, "Histórico")],
      },
      {
        title: "Busca para o público",
        text: "A busca aparece logo na entrada do site. Os resultados vêm com um mapa da localização dos imóveis, e a página do imóvel leva direto ao WhatsApp do corretor.",
        images: [nexusImg(7, "Busca"), nexusImg(18, "Mapa"), nexusImg(30, "Página do imóvel")],
      },
    ],
    result: [
      "Produto construído de ponta a ponta, da pesquisa ao código, como vitrine da Hex Labs.",
      "Stack: Next.js (App Router), React 19, TypeScript, Supabase (PostgreSQL, Auth, Storage), Tailwind CSS, Framer Motion, Leaflet e Recharts.",
    ],
    tools: ["Figma", "Photoshop", "Next.js", "Supabase", "Tailwind CSS", "Framer Motion", "Leaflet", "Recharts"],
    gallery: [17, 22, 4, 32, 16].map((n) => `/projects/nexus-imobiliaria/image${n}.png`),
  },
  {
    slug: "spillfabrikken",
    title: "SpillFabrikken",
    category: "Product & Game Design",
    year: "2021",
    client: "SpillFabrikken (Trondheim, Noruega)",
    image: spillfabrikken,
    role: "Product & Game Designer",
    summary: "Jogos de tabuleiro e experiências interativas, do protótipo ao produto final e ao material de divulgação.",
    problem:
      "Os jogos precisavam atrair públicos de todas as idades e, ao mesmo tempo, ser econômicos de produzir: cada peça a mais aumenta peso e custo da entrega.",
    process: [
      {
        title: "Protótipo ao produto",
        text: "Participei da concepção, dos protótipos interativos e da produção visual, usando cor e mecânicas de gamificação para deixar os jogos claros e atraentes com o mínimo de componentes.",
      },
    ],
    result: ["Jogos publicados pela SpillFabrikken."],
    tools: ["Illustrator", "Photoshop", "3D", "Prototipagem"],
    links: [{ label: "Site da SpillFabrikken", url: "https://www.spillfabrikken.com/" }],
    gallery: spillGallery,
  },
  {
    slug: "tertuliano-advocacia",
    title: "Tertuliano Pinheiro Advocacia",
    category: "Site institucional",
    year: "2023",
    client: "Tertuliano Pinheiro Advocacia",
    image: tertuliano,
    role: "Web design e desenvolvimento",
    summary: "Site institucional para um escritório de advocacia.",
    problem: "O escritório precisava de uma presença digital que transmitisse seriedade e facilitasse o contato.",
    process: [{ title: "Design e SEO", text: "Layout responsivo, otimizado para busca e para levar o visitante ao contato." }],
    result: ["Site no ar."],
    links: [{ label: "Ver site", url: "https://tpadvocaciarn.com.br/" }],
  },
  {
    slug: "bonno-personalizados",
    title: "Bonno Personalizados",
    category: "Site empresarial",
    year: "2023",
    client: "Bonno",
    image: bonno,
    role: "Web design",
    summary: "Site para uma empresa de produtos personalizados.",
    problem: "Apresentar um catálogo variado de forma atraente e facilitar o pedido de orçamento.",
    process: [{ title: "Vitrine de produtos", text: "Interface visual focada nos produtos e num caminho curto até o contato." }],
    result: ["Site no ar."],
    links: [{ label: "Ver site", url: "https://bonnopersonalizados.com/" }],
  },
];

// Slugs antigos que viraram um único estudo de caso.
export const slugAliases: Record<string, string> = {
  "polare-portal": "ufrn",
  "sigrh-portal": "ufrn",
  "enade-ufrn": "ufrn",
};

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string | undefined) => {
  if (!slug) return undefined;
  const resolved = slugAliases[slug] ?? slug;
  return projects.find((p) => p.slug === resolved);
};
