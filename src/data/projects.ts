import spillfabrikken from "@/assets/projects/spillfabrikken.webp";
import hosuto from "@/assets/projects/hosuto.webp";
import prism1 from "@/assets/projects/prism/1.webp";
import prism2 from "@/assets/projects/prism/2.webp";
import prism4 from "@/assets/projects/prism/4.webp";
import prism5 from "@/assets/projects/prism/5.webp";
import prism6 from "@/assets/projects/prism/6.webp";
import prism7 from "@/assets/projects/prism/7.webp";
import prism8 from "@/assets/projects/prism/8.webp";
import prism9 from "@/assets/projects/prism/9.webp";

import { publicUrl } from "@/lib/utils";

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

/** Uma prancha dentro de uma seção do estudo de caso. */
export type Board =
  | { kind: "phones"; figures: CaseImage[]; steps?: boolean }
  | { kind: "grid"; figures: CaseImage[]; columns?: 1 | 2 | 3 | 4; paper?: boolean; ink?: boolean; uniform?: boolean; contain?: boolean }
  | { kind: "compare"; before: CaseImage; after: CaseImage; labels?: [string, string] }
  | { kind: "anatomy"; image: string; alt: string; points: { x: number; y: number; label: string; text: string }[] }
  | { kind: "steps"; steps: { title: string; text: string }[] }
  | { kind: "palette"; colors: string[] };

export interface CaseSection {
  /** Rótulo curto (ex.: "Navegação"). */
  label: string;
  title: string;
  text?: string[];
  boards?: Board[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  /** Vazio quando o ano não está confirmado. */
  year?: string;
  client: string;
  /** Sem imagem, o card mostra uma capa tipográfica. */
  image?: string;
  /** Prévia do link (arquivo em public/). Sem ela, usa og-image.jpg. */
  ogImage?: string;
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
  /** Formato simples: etapas com texto e imagens. Usado quando não há `sections`. */
  process?: CaseStep[];
  result: string[];
  tools?: string[];
  links?: ProjectLink[];
  gallery?: string[];
  /** Mostra a galeria como telas de celular. */
  galleryPhones?: boolean;

  // Formato completo de estudo de caso (campos opcionais).
  /** Cor do projeto, usada em rótulos, números e fundos das pranchas. */
  accent?: string;
  platform?: string;
  /** Desafio, o que eu fiz e resultado, em uma ou duas frases cada. */
  overview?: { challenge: string; contribution: string; outcome: string };
  metrics?: { value: string; label: string }[];
  /** De onde vêm os números. */
  metricsNote?: string;
  sections?: CaseSection[];
  learnings?: string[];
}


const pjeImg = (n: number, caption?: string): CaseImage => ({ src: publicUrl(`projects/pje2-mobile/${n}.webp`), caption });
const jpImg = (n: number, caption?: string): CaseImage => ({ src: publicUrl(`projects/jovem-potiguar/image${n}.webp`), caption });
const mtLogo = (n: number, caption: string): CaseImage => ({ src: publicUrl(`projects/my-treasure/logo-${n}.webp`), caption });
const nexusImg = (n: number, caption?: string): CaseImage => ({ src: publicUrl(`projects/nexus-imobiliaria/image${n}.webp`), caption });

export const projects: Project[] = [
  {
    slug: "pje",
    title: "PJe2 Mobile",
    category: "UI/UX · App mobile",
    year: "2024",
    client: "TRF5 — Tribunal Regional Federal da 5ª Região",
    image: publicUrl("projects/pje2-mobile/cover.webp"),
    ogImage: "og-pje.jpg",
    accent: "#178f86",
    platform: "App mobile (Flutter)",
    featured: true,
    engagement: "Voluntário",
    role: "UI/UX Designer (voluntário)",
    summary:
      "Redesign do app que magistrados da Justiça Federal usam para revisar e assinar minutas. Colaborei de forma voluntária com a interface, ajudando um amigo que fazia parte da equipe oficial do projeto no TRF5.",
    credits:
      "O projeto foi conduzido por uma equipe de residência ligada ao TRF5. Meu amigo, que integrava essa equipe, apresentou o trabalho no TCC dele e registrou minha colaboração. A refatoração do código em Flutter, a nova arquitetura e a integração com a API do CNJ são trabalho da equipe. Minha contribuição foi na interface e na experiência de uso. Nomes e CPFs que apareciam nas telas foram borrados.",
    problem:
      "O PJe2 Mobile já existia, mas a versão herdada era difícil de usar e de manter. A navegação dependia de um menu gaveta escondido, os filtros aceitavam só uma opção por vez e erros apareciam em diálogos que interrompiam o fluxo.",
    overview: {
      challenge:
        "Deixar mais rápido e mais seguro o trabalho de quem revisa e assina minutas no celular, num app herdado com navegação escondida, filtros limitados e erros que interrompiam o fluxo.",
      contribution:
        "Como voluntário, desenhei a interface: login e pareamento, tela inicial, lista e filtros de processos, ações em lote, minuta e os componentes, dentro dos padrões visuais do Judiciário.",
      outcome:
        "A equipe implementou a nova interface em Flutter. Nos fluxos principais, o número de cliques caiu mais de 50%.",
    },
    metrics: [
      { value: "347", label: "inconformidades de código corrigidas na refatoração" },
      { value: "50%+", label: "menos cliques nos fluxos principais" },
      { value: "67 · 280", label: "warnings e hints apontados na análise do app herdado" },
    ],
    metricsNote:
      "Números do projeto inteiro, registrados no TCC de um integrante da equipe. O código e a refatoração são da equipe; a minha parte foi a interface.",
    sections: [
      {
        label: "Contexto",
        title: "Um app de trabalho para quem assina dezenas de processos por dia",
        text: [
          "O PJe2 Mobile é o app em que magistrados da Justiça Federal revisam, conferem e assinam minutas longe do computador. Para quem passa por dezenas de processos, cada toque a mais pesa.",
          "A equipe começou por um documento de análise técnica: casos de uso, requisitos e uma revisão do código, que apontou 67 warnings e 280 hints. Dessa análise saíram os problemas de navegação e de fluxo que a nova interface precisava resolver.",
        ],
        boards: [
          {
            kind: "grid",
            paper: true,
            uniform: true,
            contain: true,
            columns: 3,
            figures: [
              pjeImg(1, "Método da equipe: análise do app atual, estudo de soluções, design e protótipo, implementação"),
              pjeImg(3, "Fluxograma do login: primeiro acesso, biometria, autenticação e pareamento"),
              pjeImg(2, "Arquitetura em camadas (view, controller e model) adotada pela equipe na refatoração"),
            ],
          },
        ],
      },
      {
        label: "Acesso",
        title: "Entrar rápido, sem abrir mão da segurança",
        text: [
          "O login virou um fluxo curto: o app identifica a pessoa pelo CPF, valida o campo enquanto ela digita e oferece biometria. Quando a conta pede um segundo fator, o código entra numa tela própria. O pareamento com o PJe Web ganhou um passo a passo ilustrado para gerar o QR code.",
        ],
        boards: [
          {
            kind: "phones",
            steps: true,
            figures: [
              pjeImg(4, "Identificação pelo CPF"),
              pjeImg(5, "Senha, com a opção de biometria"),
              pjeImg(7, "Código de autenticação em dois fatores"),
              pjeImg(6, "Pareamento por QR code, com instruções"),
            ],
          },
        ],
      },
      {
        label: "Navegação",
        title: "A tela inicial mostra tudo de uma vez",
        text: [
          "O menu gaveta saiu. A vara em que o magistrado está atuando fica sempre visível no topo e troca com um toque, sem sair da tela. Os atalhos de trabalho (minutar, atos do magistrado, preparar documentos, lavrar acórdão e busca processual) viraram uma lista direta, com contadores de pendências.",
          "Ajuda, etiquetas e saída ficam num menu de ajustes, e sair da conta pede confirmação.",
        ],
        boards: [
          {
            kind: "phones",
            figures: [
              pjeImg(9, "Tela inicial: localização no topo e atalhos com contador"),
              pjeImg(32, "Troca de localização sem sair da tela"),
              pjeImg(33, "Menu de ajustes"),
              pjeImg(36, "Confirmação antes de sair da conta"),
            ],
          },
        ],
      },
      {
        label: "Lista de processos",
        title: "Ler a fila de processos de relance",
        text: [
          "Na lista, cada processo mostra a data, o tipo de ato e o estado em poucos sinais visuais. Os filtros passaram a aceitar várias opções ao mesmo tempo, com um contador de quantos estão ativos, e a seleção ganhou atalhos por gesto: pressionar e segurar, ou arrastar.",
          "Com processos selecionados, assinar, conferir e favoritar em lote ficam na barra superior.",
        ],
        boards: [
          {
            kind: "anatomy",
            image: publicUrl("projects/pje2-mobile/17.webp"),
            alt: "Lista de processos do PJe2 Mobile com marcadores numerados",
            points: [
              { x: 66, y: 8.3, label: "Contador", text: "Quantos processos estão na lista." },
              { x: 92, y: 13.5, label: "Busca", text: "Sempre no topo, sem abrir outra tela." },
              { x: 34, y: 19, label: "Filtro rápido", text: "Mostra o filtro ativo e, quando há mais de um, quantos (+1, +2)." },
              { x: 84, y: 19, label: "Painel de filtros", text: "Várias opções ao mesmo tempo: titular, substituto, urgente, sigiloso, conferidos, favoritos." },
              { x: 76, y: 35, label: "Conferido", text: "Marca de processo que já passou pela conferência." },
              { x: 82, y: 28.5, label: "Favorito", text: "Favoritar direto na lista, sem abrir o processo." },
              { x: 4, y: 82, label: "Barra de estado", text: "Verde-azulado no fluxo normal, vermelho quando o ato é urgente." },
            ],
          },
          {
            kind: "phones",
            figures: [
              pjeImg(39, "Filtros com várias opções marcadas"),
              pjeImg(18, "Filtro ativo com contador (+1) e seleção parcial"),
              pjeImg(40, "Seleção em lote: assinar, conferir e favoritar na barra superior"),
            ],
          },
        ],
      },
      {
        label: "Processo e minuta",
        title: "Ações sensíveis com uma camada de proteção",
        text: [
          "No processo, etiquetas, detalhes e documentos ficam numa leitura só, e as ações (assinar, conferir, favoritar, etiquetas e lembretes) ficam reunidas num menu.",
          "A minuta abre em modo leitura, com fundo cinza, e só fica editável depois de uma ação explícita. Assinar pede confirmação, e salvar mostra um aviso na tela.",
        ],
        boards: [
          {
            kind: "phones",
            figures: [
              pjeImg(41, "Detalhes do processo, com etiquetas e documentos"),
              pjeImg(44, "Menu de ações do processo"),
              pjeImg(42, "Minuta em modo leitura"),
              pjeImg(43, "Aviso depois de salvar"),
            ],
          },
        ],
      },
      {
        label: "Componentes",
        title: "Peças reaproveitáveis, no padrão do Judiciário",
        text: [
          "As telas seguem as cores da identidade visual da PDPJ-Br e a tipografia e os ícones do UIKit PJe. Os mockups foram feitos no Adobe XD e depois migrados para o Figma. Cada elemento que se repete no app virou um componente, com seus estados: card de processo, chips de filtro, barra de seleção, diálogos e menus.",
        ],
        boards: [
          {
            kind: "grid",
            paper: true,
            uniform: true,
            contain: true,
            columns: 3,
            figures: [
              pjeImg(19, "Card de processo urgente, com etiquetas"),
              pjeImg(20, "Card selecionado"),
              pjeImg(23, "Chip de filtro com contador"),
              pjeImg(26, "Barra de seleção em lote"),
              pjeImg(27, "Diálogo de assinatura"),
              pjeImg(12, "Diálogo de saída"),
              pjeImg(22, "Painel de filtros"),
              pjeImg(30, "Menu de ações"),
              pjeImg(11, "Menu de ajustes"),
            ],
          },
        ],
      },
    ],
    result: [
      "Nova interface implementada pela equipe no app, com login por biometria, pareamento guiado, filtros múltiplos e assinatura em lote mais direta.",
      "O trabalho foi documentado no TCC de um integrante da equipe, com registro da minha colaboração.",
      "Resultados do projeto como um todo, não só da minha parte: o app migrou para Flutter (Clean Architecture e BLoC), as 347 inconformidades de código apontadas na análise foram corrigidas e os fluxos principais passaram a exigir mais de 50% menos cliques.",
      "Como próximo passo, o TCC recomenda testes de usabilidade com magistrados e métricas como SUS e taxa de sucesso por tarefa.",
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
    galleryPhones: true,
    gallery: [34, 35, 38, 13, 14, 15, 16, 8].map((n) => publicUrl(`projects/pje2-mobile/${n}.webp`)),
  },
  {
    slug: "jovem-potiguar",
    title: "Jovem Potiguar",
    category: "UX/UI · Plataforma de inscrição",
    year: "2024",
    client: "IFRN e SETHAS — Governo do Rio Grande do Norte",
    image: publicUrl("projects/jovem-potiguar/cover.webp"),
    ogImage: "og-jovem-potiguar.jpg",
    accent: "#5e2a86",
    platform: "Plataforma web",
    featured: true,
    engagement: "Voluntário",
    role: "UI/UX Designer (voluntário)",
    summary:
      "Plataforma de inscrição que leva jovens do CadÚnico a cursos de qualificação do IFRN. Como voluntário, desenhei o fluxo de inscrição, da jornada do usuário ao teste de acessibilidade.",
    credits:
      "O programa é uma parceria entre o IFRN e a Secretaria de Estado do Trabalho, da Habitação e da Assistência Social (SETHAS). Atuei como voluntário no design da plataforma de inscrição.",
    problem:
      "O público são jovens de baixa renda, muitos usando celulares simples e com pouca experiência em sistemas públicos. Se o cadastro trava, a pessoa perde a vaga.",
    overview: {
      challenge:
        "Levar jovens do CadÚnico, muitos com celulares simples e pouca experiência com sistemas públicos, até a pré-inscrição em cursos do IFRN sem que travassem no caminho.",
      contribution:
        "Como voluntário, desenhei a plataforma de inscrição: jornada, fluxograma, wireframes, testes de usabilidade, guia visual, telas finais e revisão de acessibilidade.",
      outcome:
        "A plataforma foi usada nas inscrições do programa. Numa das edições, o IFRN abriu 840 vagas em cursos de qualificação pelo Jovem Potiguar.",
    },
    metrics: [
      { value: "840", label: "vagas em cursos de qualificação numa das edições do programa" },
      { value: "9", label: "etapas de processo, da jornada do usuário ao teste de acessibilidade" },
      { value: "AA · AAA", label: "níveis de contraste aprovados no teste da paleta" },
    ],
    metricsNote: "As 840 vagas vêm da notícia do IFRN. As etapas e o teste de contraste estão documentados nas pranchas abaixo.",
    sections: [
      {
        label: "Processo",
        title: "Nove etapas, da jornada à acessibilidade",
        text: ["Cada etapa gerou uma entrega usada pela etapa seguinte."],
        boards: [
          {
            kind: "steps",
            steps: [
              { title: "Jornada do usuário", text: "Os caminhos de quem entra na plataforma, inclusive os que terminam em erro." },
              { title: "Protótipo do usuário", text: "Telas em baixa fidelidade ligadas entre si, da lista de cursos à confirmação." },
              { title: "Fluxograma", text: "Cada decisão do cadastro, com as regras do programa anotadas." },
              { title: "Wireframe", text: "A inscrição dividida em passos curtos, com instruções ao longo do caminho." },
              { title: "Teste de usabilidade", text: "Relatórios de um projeto anterior da SETHAS e testes com quem não conhecia o protótipo." },
              { title: "Mood board de UI", text: "Referências do gov.br e de outros serviços públicos que o público já usa." },
              { title: "Guia de estilo", text: "Paleta, componentes e avisos do programa, em fundo claro e escuro." },
              { title: "Mockups", text: "As telas finais, da página inicial ao formulário de pré-inscrição." },
              { title: "Teste de acessibilidade", text: "Revisão de contraste pensando em daltonismo e baixa visão, antes de publicar." },
            ],
          },
        ],
      },
      {
        label: "Pesquisa",
        title: "Onde a pessoa pode travar?",
        text: [
          "O ponto de partida foi a jornada do usuário, incluindo os caminhos que terminam em erro: idade fora da faixa do programa, CPF fora do CadÚnico ou uma pré-inscrição repetida. Depois vieram o fluxograma, com as regras do programa anotadas tela a tela, e um protótipo de baixa fidelidade ligando as telas.",
          "O processo de seleção por trás da plataforma, da base de dados da SETHAS até a lista de alunos enviada ao IFRN, também foi mapeado.",
        ],
        boards: [
          { kind: "grid", ink: true, columns: 1, figures: [jpImg(13, "Jornada do usuário: da lista de cursos à confirmação por e-mail, com os caminhos de erro")] },
          { kind: "grid", paper: true, columns: 1, figures: [jpImg(1, "Fluxograma da tela inicial à pré-inscrição, com as regras de negócio anotadas")] },
          {
            kind: "grid",
            ink: true,
            columns: 2,
            figures: [
              jpImg(16, "Protótipo de baixa fidelidade: lista de cursos, informações, pré-inscrição e confirmação"),
              jpImg(15, "Mapa do processo de seleção dos alunos, da SETHAS ao IFRN"),
            ],
          },
        ],
      },
      {
        label: "Wireframes",
        title: "Do wireframe à tela final",
        text: [
          "A inscrição foi dividida em passos curtos, com instruções ao longo do caminho, para que ninguém precise adivinhar o que fazer a seguir. Na página do curso, as informações vêm primeiro e o formulário de pré-inscrição logo abaixo, na mesma leitura.",
        ],
        boards: [
          {
            kind: "compare",
            before: jpImg(6, "Wireframe da página do curso"),
            after: jpImg(17, "Página do curso com o formulário de pré-inscrição"),
          },
          {
            kind: "grid",
            uniform: true,
            contain: true,
            columns: 2,
            figures: [
              jpImg(4, "Wireframe da lista de cursos"),
              jpImg(2, "Filtros por turno, área e município"),
              jpImg(14, "Modal para buscar o cartão do candidato"),
              jpImg(8, "Modal de confirmação dos dados"),
            ],
          },
        ],
      },
      {
        label: "Guia visual",
        title: "As cores do programa, com cara de serviço público",
        text: [
          "O mood board partiu de serviços públicos que o público já conhece, como o gov.br, para que a plataforma parecesse familiar. O guia visual reuniu a paleta do programa e os componentes, como o cartão de pré-inscrição e os avisos, em fundo claro e escuro.",
        ],
        boards: [
          { kind: "palette", colors: ["#582D7E", "#B54880", "#DCCA36", "#16BB74", "#A28DB0", "#BCA6C1", "#E0D4A4", "#C6C8CD", "#F5F5F7"] },
          {
            kind: "grid",
            columns: 2,
            figures: [jpImg(10, "Mood board com referências do gov.br"), jpImg(7, "Cartão de pré-inscrição, avisos e paleta")],
          },
          {
            kind: "grid",
            columns: 2,
            figures: [jpImg(3, "Tela inicial com o cronograma do ciclo"), jpImg(11, "Tela inicial em fundo escuro")],
          },
        ],
      },
      {
        label: "Acessibilidade",
        title: "Contraste testado antes de publicar",
        text: [
          "Antes da publicação, as telas passaram por uma revisão de contraste pensando em daltonismo e baixa visão. No teste da paleta sobre a tela inicial, a combinação avaliada passou nos níveis AA e AAA.",
        ],
        boards: [{ kind: "grid", ink: true, columns: 1, figures: [jpImg(12, "Teste de contraste da paleta sobre a tela inicial")] }],
      },
    ],
    result: [
      "A plataforma foi usada nas inscrições do programa. Numa das edições, o IFRN abriu 840 vagas em cursos de qualificação pelo Jovem Potiguar.",
    ],
    learnings: [
      "Usar UX para aproximar o que a instituição quer do que o público consegue fazer.",
      "Conduzir testes de usabilidade para pegar problemas cedo.",
      "Acessibilidade importa mesmo em formulários que parecem simples.",
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
    slug: "my-treasure",
    title: "MyTreasure",
    category: "Product Design · App social",
    year: "2022–2023",
    client: "Dione Solutions (Tóquio, Japão)",
    image: publicUrl("projects/my-treasure/cover.webp"),
    ogImage: "og-my-treasure.jpg",
    accent: "#c9973a",
    platform: "App mobile (Android)",
    featured: true,
    role: "Product Designer",
    summary:
      "Rede social para colecionadores: cada pessoa registra seus itens, acompanha o valor da coleção e pode expor, leiloar ou negociar peças. Fiz o design do produto e as propostas de logotipo.",
    problem:
      "Cada colecionador quer mostrar coisas diferentes. Uns querem acompanhar o valor da coleção em segredo, outros querem uma vitrine pública com lances.",
    overview: {
      challenge:
        "Cada colecionador quer mostrar coisas diferentes: uns acompanham o valor da coleção em segredo, outros querem uma vitrine pública com lances. O app precisava atender os dois sem virar dois produtos.",
      contribution:
        "Defini os modos de uso, desenhei as telas do feed, dos leilões, do chat de negociação e do perfil, e propus a marca: um M em forma de joia, com variações em ouro, prata e branco.",
      outcome: "O app foi publicado na Google Play.",
    },
    sections: [
      {
        label: "Conceito",
        title: "Uma vitrine de coleções, com o valor à mostra ou não",
        text: [
          "O app é uma rede social com feed interativo. Cada usuário registra seus itens, e a soma do valor deles vira o valor do perfil, que alimenta um ranking entre colecionadores. Cada post é configurável: dá para esconder o preço, expor a peça numa vitrine pública ou abrir um leilão com lances.",
          "O conceito visual partiu da ideia de exclusividade: preto, dourado e fotografia com cara de revista. Nos slides de apresentação, o app aparece com o nome Prism.",
        ],
        boards: [
          {
            kind: "grid",
            ink: true,
            columns: 2,
            figures: [
              { src: prism2, caption: "Conceito: paixões compartilhadas e exclusividade" },
              { src: prism6, caption: "Coleção avaliada: o valor dos itens vira o valor do perfil" },
            ],
          },
        ],
      },
      {
        label: "Marca",
        title: "Um símbolo, oito combinações",
        text: [
          "Propus um símbolo que junta a letra M a uma joia, com um brilho no canto. Testei o símbolo em ouro, prata e branco sobre grafite, e em grafite sobre ouro, com e sem o nome por extenso, pensando no ícone do app e nas telas escuras.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 4,
            figures: [
              mtLogo(1, "Ouro sobre grafite, com nome"),
              mtLogo(2, "Prata sobre grafite, com nome"),
              mtLogo(3, "Branco sobre grafite, com nome"),
              mtLogo(4, "Grafite sobre ouro, com nome"),
              mtLogo(5, "Ouro, só o símbolo"),
              mtLogo(6, "Prata, só o símbolo"),
              mtLogo(7, "Branco, só o símbolo"),
              mtLogo(8, "Grafite sobre ouro, só o símbolo"),
            ],
          },
        ],
      },
      {
        label: "Telas",
        title: "Do feed ao leilão",
        text: [
          "O post público mostra a peça, os lances mais altos, o tempo restante e os comentários. Quem recebe um lance negocia pelo chat e decide ali mesmo se vende ou mantém a oferta. O histórico de lances fica aberto, e o perfil mostra o patrimônio e os atalhos para meus lances e lances recebidos.",
        ],
        boards: [
          {
            kind: "grid",
            ink: true,
            columns: 2,
            figures: [
              { src: prism1, caption: "Post público em modo leilão: lances mais altos, tempo restante e comentários" },
              { src: prism5, caption: "Chat de negociação: vender ou manter a oferta" },
              { src: prism7, caption: "Histórico de lances aberto a todos" },
              { src: prism9, caption: "Perfil com patrimônio, meus lances e lances recebidos" },
              { src: prism4, caption: "Login" },
              { src: prism8, caption: "Busca" },
            ],
          },
        ],
      },
    ],
    result: ["App publicado na Google Play.", "Marca com oito combinações de cor, pensada para o ícone do app e para as telas escuras."],
    tools: ["Figma", "Design Thinking"],
    links: [{ label: "Ver na Google Play", url: "https://play.google.com/store/apps/details?id=com.my_treasure_app" }],
  },
  {
    slug: "hosuto",
    title: "Hosuto — gestão hoteleira",
    category: "Product Design · Dashboard",
    year: "2022",
    client: "Dione Solutions (Tóquio, Japão)",
    image: hosuto,
    featured: true,
    role: "Product Designer",
    summary: "Dashboard para as equipes de uma rede de 12 hotéis gerenciarem reservas, limpeza, cozinha e estoque.",
    problem:
      "O trabalho num hotel é presencial e corrido. A ferramenta digital precisava ajudar sem atrapalhar: informação fácil de ler e organizada conforme o que cada equipe precisa ver.",
    process: [
      {
        title: "Uma tela por necessidade",
        text: "Compactei as informações e distribuí os itens conforme a rotina de cada equipe, para que cada pessoa encontre rápido o que é da sua função.",
      },
    ],
    result: [
      "Usado pelas equipes de uma rede de 12 hotéis, com ganho de 30% em eficiência.",
      "Sistema de uso interno, não disponível publicamente.",
    ],
    tools: ["Figma"],
    gallery: Array.from({ length: 11 }, (_, i) => publicUrl(`projects/hosuto/${i + 1}.webp`)),
  },
  {
    slug: "hex-labs",
    title: "Hex Labs",
    category: "Empresa que fundei",
    year: "2026",
    client: "Hex Labs",
    image: publicUrl("projects/nexus-imobiliaria/hero.webp"),
    engagement: "Fundador",
    role: "Fundador",
    summary:
      "Estúdio de produtos digitais com IA que fundei. Conduzo o design, o desenvolvimento e a prospecção de clientes. Para atrair os primeiros, estou criando dois produtos próprios: a Rede Imobiliária e o Lexus System.",
    problem:
      "Uma empresa nova não tem portfólio para mostrar. Em vez de esperar o primeiro cliente, decidi construir produtos completos para nichos que eu conhecia, e usá-los como prova do que a empresa sabe fazer.",
    process: [
      {
        title: "Site e CMS da empresa",
        text: "Construí o site e o CMS da Hex Labs em React, TypeScript, Tailwind e Supabase, com blog e painel administrativo.",
      },
      {
        title: "Rede Imobiliária (Nexus Imobiliária)",
        text: "SaaS white-label para imobiliárias, com descrições de imóveis geradas por IA: painel para corretores cadastrarem e editarem imóveis, busca com mapa para o público, analytics dos anúncios e controle de permissões por equipe. O estudo de caso completo está na página da Nexus Imobiliária.",
        images: [nexusImg(31, "Painel do corretor"), nexusImg(18, "Busca com mapa")],
      },
      {
        title: "Lexus System (antigo EcoLaw)",
        text: "Sistema de gestão para escritórios de advocacia: acompanhamento de processos, prazos, honorários e um portal para o cliente. Ainda em desenvolvimento.",
      },
    ],
    result: [
      "A Rede Imobiliária está construída e documentada como estudo de caso.",
      "O Lexus System está em desenvolvimento.",
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
    image: publicUrl("projects/nexus-imobiliaria/hero.webp"),
    engagement: "Fundador",
    role: "Fundador da Hex Labs: design e desenvolvimento",
    summary:
      "Plataforma imobiliária com painel para corretores e busca com mapa para o público. É a Rede Imobiliária, SaaS white-label que desenvolvo na Hex Labs.",
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
    gallery: [17, 22, 4, 32, 16].map((n) => publicUrl(`projects/nexus-imobiliaria/image${n}.webp`)),
  },
  {
    slug: "spillfabrikken",
    title: "SpillFabrikken",
    category: "Product e Game Design · 8 jogos",
    year: "2020–2021",
    client: "SpillFabrikken (Trondheim, Noruega)",
    image: spillfabrikken,
    featured: true,
    role: "Product e Game Designer",
    summary:
      "Identidade visual, cartas, regras e embalagens de uma linha de jogos de festa noruegueses, do Kryptert e suas quatro edições ao Tipsy e ao Paranoia.",
    // A página desta marca é própria (src/pages/SpillFabrikken.tsx); os campos abaixo só servem de resumo.
    problem: "Criar uma linha de jogos com personalidades diferentes que, juntos, parecessem da mesma editora.",
    process: [{ title: "Do conceito à caixa", text: "Identidade, game design, cartas, embalagem e renders." }],
    result: ["Oito jogos, um sistema de embalagem comum e quatro edições do Kryptert."],
    tools: ["Illustrator", "Photoshop", "Renders 3D"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);
