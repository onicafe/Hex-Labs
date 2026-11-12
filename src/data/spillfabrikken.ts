import { publicUrl } from "@/lib/utils";

// Estudo de caso da SpillFabrikken: a marca, a linha de jogos e uma página por jogo.
// Fontes: as artes e os arquivos de produção originais do Iésu, o relato dele sobre o processo
// e o catálogo público de spillfabrikken.no (datas de lançamento, número de cartas e números da editora,
// consultados em nov/2026).

export const sf = (n: number) => publicUrl(`projects/spillfabrikken-web/${n}.webp`);
export const sfDetail = (name: string) => publicUrl(`projects/spillfabrikken-web/detail/${name}.webp`);
export const sfOrig = (name: string) => publicUrl(`projects/spillfabrikken-web/orig/${name}.webp`);

export const STORE_URL = "https://spillfabrikken.no";
export const SOURCE_NOTE = "Fonte: catálogo de spillfabrikken.no, consultado em nov/2026.";

export interface Figure {
  src: string;
  caption?: string;
}

export interface Specs {
  contents?: string;
  players?: string;
  age?: string;
  time?: string;
}

export interface AnatomyPoint {
  /** Posição do marcador em % da largura e da altura da imagem. */
  x: number;
  y: number;
  label: string;
  text: string;
}

export interface Board {
  title: string;
  /** Rótulo curto acima do título (ex.: "Produção", "Lançamento"). */
  label?: string;
  text?: string;
  figures: Figure[];
  /** Quantas colunas a prancha usa em telas largas. */
  columns?: 1 | 2 | 3;
  /** Recorta todas as imagens na mesma proporção. */
  uniform?: boolean;
  /** Fundo claro, para arquivos técnicos em papel branco. */
  paper?: boolean;
}

export interface Variant {
  name: string;
  meaning: string;
  image: string;
  color: string;
  text: string;
}

export type Status = "live" | "cancelled" | "proposal";

export interface Game {
  slug: string;
  name: string;
  /** Tradução do nome. */
  meaning: string;
  tagline: string;
  taglinePt: string;
  category: string;
  accent: string;
  palette: string[];
  cover: string;
  summary: string;
  status?: { kind: Status; label: string };
  /** O que eu fiz neste jogo, em uma linha. */
  role: string;
  specs: Specs;
  /** Como se joga, a partir do verso da caixa e do catálogo da editora. */
  howToPlay: string[];
  /** Bastidores: decisões, contexto e o que aconteceu com o projeto. */
  story?: string[];
  credits?: string[];
  /** Máscara do logotipo, para a prancha de positivo e negativo. */
  logoMask?: string;
  /** Mostra o wireframe técnico da carta (só o Kryptert tem as cotas de produção). */
  blueprint?: boolean;
  boards: Board[];
  anatomy?: { image: string; points: AnatomyPoint[] };
  variants?: Variant[];
  gallery?: string[];
  storeUrl?: string;
}

export const brand = {
  name: "SpillFabrikken",
  meaning: "“A fábrica de jogos”",
  location: "Trondheim, Noruega",
  period: "Abr 2020 – Set 2021",
  role: "Único designer da editora (remoto)",
  summary:
    "Editora norueguesa de jogos de cartas e de festa. Numa equipe enxuta, fui o único designer: recebia o conceito de cada jogo, desenhava cartas e caixas, ajudava a definir as regras e entregava a arte final para a fábrica. Em um ano e meio, a linha ganhou oito projetos de jogo.",
  impact: [
    { value: "1 milhão+", label: "jogos vendidos pela editora" },
    { value: "3 anos", label: "o Kryptert como jogo de cartas mais vendido da Noruega" },
    { value: "7", label: "jogos que desenhei seguem à venda" },
  ],
  impactNote:
    "Números divulgados pela própria editora em spillfabrikken.no (consultado em nov/2026). Os dois primeiros se referem à SpillFabrikken como um todo, não só ao meu trabalho.",
  myRole: [
    "Como único designer, respondia por toda a produção visual: identidade, cartas, caixas, manuais, mockups, anúncios e peças do site.",
    "As regras eram divididas com a editora: parte chegava pronta, parte eu propunha, e algumas das minhas propostas entraram nos jogos.",
    "Os textos das cartas vinham da editora, com sugestões minhas.",
    "Coordenei dois colaboradores externos: um modelador 3D, que indiquei e que trabalhou comigo em alguns projetos, e uma ilustradora.",
  ],
  process: [
    { title: "Briefing", text: "A editora mandava o conceito do jogo: a ideia, o público e, às vezes, as regras." },
    { title: "Protótipo no Photoshop", text: "Primeiras versões da caixa e da carta em mockup, para acertar a direção visual com a editora." },
    { title: "Cartas e caixa", text: "Com o número de cartas definido, eu falava direto com a fábrica na China, que mandava as dimensões e a faca de corte da caixa." },
    { title: "Arte final no Illustrator", text: "A arte aprovada era refeita em vetor, encaixada na faca da fábrica, incluindo o interior da caixa." },
    { title: "Carta por carta", text: "Em jogos de 300 a 400 cartas, eu montava pranchas com várias cartas e diagramava cada texto individualmente." },
    { title: "Prova e produção", text: "A fábrica fazia uma amostra de teste. Depois da aprovação, o jogo ia para a produção em larga escala." },
  ],
  pace: "O ritmo era rápido: algumas caixas ficaram prontas em um fim de semana.",
  palette: ["#e1251b", "#1b1b1b", "#f2f2f2", "#9e9e9e"],
  logoFiles: {
    light: [
      { src: sfOrig("logo-sym-red-light"), caption: "Símbolo" },
      { src: sfOrig("logo-word-light"), caption: "Assinatura" },
      { src: sfOrig("logo-sf-light"), caption: "Monograma SF" },
      { src: sfOrig("logo-sym-mono-light"), caption: "Símbolo em uma cor" },
    ] as Figure[],
    dark: [
      { src: sfOrig("logo-sym-red-dark"), caption: "Símbolo, negativo" },
      { src: sfOrig("logo-word-dark"), caption: "Assinatura, negativo" },
      { src: sfOrig("logo-sf-dark"), caption: "Monograma, negativo" },
      { src: sfOrig("logo-sym-mono-dark"), caption: "Símbolo em uma cor, negativo" },
    ] as Figure[],
  },
  identity: [
    { src: sf(2), caption: "Construção: esboço e linhas-guia do logotipo" },
    { src: sf(3), caption: "Símbolo inspirado no naipe de ouros dos baralhos" },
    { src: sf(4), caption: "Variações do símbolo com as iniciais SP·FK" },
    { src: sf(6), caption: "Redução: 100%, 50% e 10%" },
    { src: sf(7), caption: "Aplicação em papel" },
    { src: sf(1), caption: "Capa da apresentação do logotipo" },
  ] as Figure[],
  /** Elementos que se repetem em todas as caixas da linha. */
  packagingSystem: [
    { label: "Faixa de informações", text: "Ícones de idade, tempo e número de jogadores, sempre na mesma ordem no verso." },
    { label: "Assinatura", text: "“Av SpillFabrikken” na frente e o logotipo na lateral ou no rodapé." },
    { label: "Bloco institucional", text: "Endereço em Trondheim, e-mail de atendimento e país de produção no rodapé do verso." },
    { label: "Chamada para a loja", text: "“Besøk SpillFabrikken.no for flere morsomme spill” (visite o site para mais jogos)." },
  ],
  packagingFigures: [
    { src: sf(54), caption: "Kryptert" },
    { src: sf(31), caption: "Jentekveld" },
    { src: sf(43), caption: "Gutta stemning" },
  ] as Figure[],
  production: [
    { src: sfOrig("kryptert-dieline"), caption: "Kryptert: faca da caixa de duas peças (447 × 295 mm e 521,5 × 330,25 mm), com a arte encaixada" },
    { src: sfOrig("kryptert-cards-red"), caption: "Kryptert: gabarito de cartas para a fábrica, 63 × 88 mm, cantos R3, frente e verso" },
    { src: sfOrig("dielines-meme-jul"), caption: "Facas do Lag en Meme e do Kryptert Juleversjon, com as cotas da fábrica" },
    { src: sfOrig("jentekveld-box-reference"), caption: "Jentekveld: referência da faca com a arte aplicada" },
  ] as Figure[],
  cardSystem: [
    { src: sf(45), caption: "Modelo de carta com faixa de cor por categoria" },
    { src: sf(46), caption: "O mesmo modelo em outras cores" },
    { src: sf(47), caption: "Gjør eller Drikk (350 cartas, à venda) e Jeg har aldri" },
    { src: sf(44), caption: "Flopp eller Fakta e Pek På" },
  ] as Figure[],
  web: [
    { src: sfOrig("site-banner"), caption: "Banner da página inicial da loja" },
    { src: sfOrig("site-mobile"), caption: "Página do Kryptert no celular" },
    { src: sfOrig("site-buy"), caption: "Chamada de compra" },
    { src: sfOrig("site-rules"), caption: "Página de regras" },
    { src: sfOrig("site-checkout"), caption: "Selo de confiança: “timesvis med underholdning”" },
    { src: sfOrig("site-header-v6"), caption: "Banner da loja: “Norges morsomste spill!”" },
  ] as Figure[],
  campaigns: [
    { src: sfOrig("ad-easter-kryptert"), caption: "Påskesalg (promoção de Páscoa): Kryptert" },
    { src: sfOrig("ad-easter-jentekveld"), caption: "Påskesalg: Jentekveld" },
    { src: sfOrig("ad-easter-meme"), caption: "Påskesalg: Lag en Meme" },
    { src: sfOrig("ad-easter-story"), caption: "Påskesalg no formato 4:5" },
    { src: sfOrig("ad-valentine-square"), caption: "Dia dos Namorados, 1:1" },
    { src: sfOrig("ad-valentine-stories"), caption: "Dia dos Namorados, stories" },
  ] as Figure[],
  campaignBanners: [
    { src: sfOrig("ad-easter-banner"), caption: "Påskesalg: banner do site" },
    { src: sfOrig("ad-valentine-header"), caption: "Dia dos Namorados: banner do site" },
  ] as Figure[],
};

const live = (label: string) => ({ kind: "live" as const, label });

export const games: Game[] = [
  {
    slug: "kryptert",
    name: "Kryptert",
    meaning: "“Criptografado”",
    tagline: "Ett spill som får deg til å snakke",
    taglinePt: "Um jogo que faz você falar",
    category: "Jogo de cartas de festa · 4 edições",
    accent: "#e1352f",
    palette: ["#d83030", "#e8941c", "#1e1e1e", "#f2f2f2", "#3c6c48"],
    cover: sf(49),
    status: live("À venda desde abr/2020"),
    role: "Cartas, caixa, arte final para a fábrica, mockups e peças de lançamento",
    summary:
      "O primeiro jogo da editora. Cada carta traz uma frase que não faz sentido escrita, mas que, lida em voz alta, vira uma expressão conhecida. Segundo a SpillFabrikken, é o jogo de cartas mais vendido da Noruega há três anos seguidos. O mesmo sistema de carta e caixa rendeu uma família de edições: Natal, +18 e família.",
    specs: { contents: "400 cartas em 3 categorias e 1 ampulheta", players: "2–20+", age: "16+", time: "20–40 min" },
    howToPlay: [
      "Um jogador lê em voz alta a frase cifrada da carta, como “tha koffe redd akk”.",
      "Quem ouve tenta descobrir o que a frase quer dizer pelo som: neste caso, tacofredag (sexta do taco).",
      "Em times ou individualmente, ganha quem decifrar mais cartas antes de a ampulheta acabar.",
    ],
    story: [
      "A ideia original do jogo veio da editora. As edições seguintes nasceram de brainstorms entre nós.",
      "Algumas vieram das próprias cartas: escrevemos frases +18 que não couberam na edição original e decidimos transformá-las num pacote extra só com elas.",
      "As cartas foram diagramadas uma a uma, a partir das listas de frases que a editora mandava, e enviadas à fábrica em gabaritos com sangria e cantos arredondados.",
    ],
    logoMask: sfDetail("logo-kryptert"),
    blueprint: true,
    anatomy: {
      image: sfDetail("kryptert-anatomia"),
      // Marcadores na margem de cada elemento, para não cobrir o texto da carta.
      points: [
        { x: 41.8, y: 8.9, label: "Aba", text: "Nome do jogo na cor da categoria, para separar o baralho de relance." },
        { x: 6.4, y: 32.2, label: "Resposta", text: "A expressão decifrada, em tipografia pesada e centralizada." },
        { x: 65.9, y: 61.2, label: "Dica", text: "Faixa “hint” na cor da categoria, para destravar a rodada." },
        { x: 39.1, y: 72, label: "Comentário", text: "Uma linha de humor que dá personalidade a cada carta." },
        { x: 13.3, y: 91.9, label: "Selo", text: "Ícone da categoria. O jogo tem três: Grov, Fest e Aktuelt." },
      ],
    },
    boards: [
      {
        label: "Uso",
        title: "Frente e verso, na mão",
        text: "A frente mostra só a frase cifrada, em cor sólida e letra grande, para ser lida de longe. O verso traz a resposta. “Teki laff ula” vira tequila-fylla (porre de tequila) e “Er mann full løs veg” vira Herman Flesvig, um humorista norueguês.",
        figures: [
          { src: sfOrig("kryptert-hand-1"), caption: "Frente: “Teki laff ula”" },
          { src: sfOrig("kryptert-hand-1-back"), caption: "Verso: Tequila-fylla" },
          { src: sfOrig("kryptert-hand-3"), caption: "Frente: “Er mann full løs veg”" },
          { src: sfOrig("kryptert-hand-3-back"), caption: "Verso: Herman Flesvig" },
        ],
        columns: 2,
      },
      {
        label: "Produção",
        title: "Arquivos para a fábrica",
        text: "Gabaritos de cartas por categoria e a faca da caixa de duas peças, já com a arte encaixada. A faca passou por cinco revisões com a fábrica até a versão final.",
        figures: [
          { src: sfOrig("kryptert-dieline"), caption: "Faca da caixa: as duas peças planificadas, 447 × 295 mm e 521,5 × 330,25 mm (versão 1.5)" },
          { src: sfOrig("kryptert-cards-red"), caption: "Gabarito das cartas vermelhas: frente e verso" },
          { src: sfOrig("kryptert-cards-black"), caption: "Gabarito das cartas pretas" },
          { src: sfOrig("kryptert-cards-orange"), caption: "Gabarito das cartas laranja" },
        ],
        columns: 1,
        paper: true,
      },
      {
        label: "Embalagem",
        title: "Caixa de duas peças",
        text: "Tampa vermelha com padrão de linhas que lembra um código embaralhado. Por dentro, a caixa é preta, com a frase “BRA SPILL!” (bom jogo!).",
        figures: [
          { src: sfOrig("kryptert-box-open-inside"), caption: "Interior: “BRA SPILL!”" },
          { src: sfOrig("kryptert-box-open"), caption: "Base e tampa" },
          { src: sf(51), caption: "Frente" },
          { src: sf(54), caption: "Verso com exemplo de jogada" },
        ],
        columns: 2,
        uniform: true,
      },
      {
        label: "Lançamento",
        title: "Peças de lançamento",
        text: "Cartão de agradecimento que ia dentro da caixa, com cupom de desconto para a próxima compra, capa de Facebook e um filtro para redes sociais com uma frase cifrada.",
        figures: [
          { src: sfOrig("kryptert-thanks-front"), caption: "Cartão de agradecimento: frente" },
          { src: sfOrig("kryptert-thanks-back"), caption: "Cartão de agradecimento: verso" },
          { src: sfOrig("kryptert-fb-cover"), caption: "Capa de Facebook" },
          { src: sfOrig("kryptert-filter"), caption: "Filtro para redes sociais: “Fø huls om fan”" },
        ],
        columns: 2,
      },
    ],
    variants: [
      {
        name: "Kryptert",
        meaning: "Original · abr/2020",
        image: sf(50),
        color: "#d83030",
        text: "400 cartas em vermelho, branco e preto, com padrão de linhas de código.",
      },
      {
        name: "Juleversjon",
        meaning: "Natal · nov/2020",
        image: sf(64),
        color: "#9c303c",
        text: "150 cartas. A mesma caixa com laço, flocos de neve e faixa verde; as cartas ganham bordas nevadas.",
      },
      {
        name: "Politisk ukorrekt",
        meaning: "+18",
        image: sf(69),
        color: "#a81824",
        text: "Nasceu das cartas +18 que não couberam na original. Foi lançada como Kryptert Ekstremversjon.",
      },
      {
        name: "Familieversjon",
        meaning: "Família · jul/2021",
        image: sf(75),
        color: "#60a8c0",
        text: "200 cartas para jogar com pais e avós, com padrão geométrico em cores claras.",
      },
    ],
    gallery: [53, 50, 66, 67, 68, 70, 71, 72, 73, 74, 76, 77, 78, 65].map(sf),
    storeUrl: `${STORE_URL}/products/kryptert`,
  },
  {
    slug: "paranoia",
    name: "Paranoia",
    meaning: "“Paranoia”",
    tagline: "The game to put all friendships to test",
    taglinePt: "O jogo para colocar todas as amizades à prova",
    category: "Jogo de cartas de festa",
    accent: "#c84bff",
    palette: ["#111111", "#cc00fc", "#2fd0ff", "#ff4d5e", "#f2f2f2"],
    cover: sf(9),
    status: { kind: "cancelled", label: "Projeto cancelado" },
    role: "Direção visual, logotipo, cartas e caixa",
    summary:
      "Jogo de perguntas do tipo “quem aqui é mais provável de…”, com cartas de verdade e de castigo. O projeto foi cancelado e a ideia virou outro jogo da editora. Aqui fica a direção visual que desenvolvi.",
    specs: { players: "3–20", age: "16+", time: "20–40 min" },
    howToPlay: [
      "As cartas fazem perguntas como “Who's the most likely to commit a crime?” (quem é mais provável de cometer um crime?).",
      "As cartas Sannhet (verdade) trazem perguntas e desafios de revelação.",
      "As cartas Taper (perdedor) trazem o castigo de quem perde a rodada.",
    ],
    story: [
      "Explorei duas direções: uma estética de falha digital (glitch) em fundo preto e outra com escorridos vermelhos, mais próxima do terror.",
      "O jogo não chegou a ser lançado com este nome. Mostro aqui o trabalho de direção visual.",
    ],
    logoMask: sfDetail("logo-paranoia"),
    boards: [
      {
        label: "Exploração",
        title: "Duas direções visuais",
        text: "A mesma caixa em dois climas: glitch digital e escorridos vermelhos, mais próximo do terror.",
        figures: [
          { src: sf(9), caption: "Direção 1: glitch" },
          { src: sfOrig("paranoia-drip"), caption: "Direção 2: escorridos" },
        ],
        columns: 2,
        uniform: true,
      },
      {
        label: "Cartas",
        title: "Cartas",
        text: "Cada tipo de carta tem uma cor sólida no verso. O lado da pergunta é sempre branco e tem a mesma diagramação.",
        figures: [
          { src: sf(11), caption: "Versos com o logotipo" },
          { src: sf(13), caption: "Sannhet (verdade)" },
          { src: sf(14), caption: "Taper (perdedor)" },
          { src: sf(12), caption: "Carta de pergunta" },
        ],
        columns: 2,
      },
    ],
    gallery: [8, 15, 16, 17].map(sf),
  },
  {
    slug: "tipsy",
    name: "Tipsy",
    meaning: "“Altinho”, e também a torre que tomba",
    tagline: "Trekk, bygg, drikk, gjenta!",
    taglinePt: "Puxe, construa, beba, repita!",
    category: "Jogo de torre de blocos",
    accent: "#e2412c",
    palette: ["#e2412c", "#1e1e1e", "#d9b48a", "#3fb3a8", "#f2c94c"],
    cover: sf(19),
    status: live("À venda desde nov/2021"),
    role: "Desenho de cada bloco, caixa, manual e direção dos renders 3D",
    summary:
      "Torre de blocos para jogo de bebida: 51 blocos de madeira, cada um com um desafio impresso. Foi o projeto mais diferente da linha, porque saímos das cartas para um objeto físico.",
    specs: { contents: "51 blocos com desafios e manual de regras", age: "18+" },
    howToPlay: [
      "Monte a torre e, na sua vez, puxe um bloco.",
      "Cumpra o desafio impresso no bloco.",
      "Coloque o bloco no topo e passe a vez, sem derrubar a torre. A mão fica menos firme a cada rodada.",
    ],
    story: [
      "Desenhei cada bloco à mão no Illustrator, com cor e ícone próprios para cada desafio.",
      "Fizemos duas versões: uma vermelha e mais adulta, que foi para a Noruega, e outra mais leve, em tons claros, com outro slogan.",
      "O nome brinca com a ambiguidade de “tipsy”: estar altinho e a torre que balança.",
    ],
    credits: ["Renders 3D: modelador parceiro, em Blender, a partir das minhas instruções. Eu indiquei, briefei e coordenei o trabalho."],
    boards: [
      {
        label: "Exploração",
        title: "Duas versões",
        text: "A vermelha, “Trekk, bygg, drikk, gjenta!”, chegou à loja. A clara, “Bygge, mislykkes, drikk. Gjenta!” (construir, errar, beber, repetir), tem um tom mais leve.",
        figures: [
          { src: sf(19), caption: "Versão vermelha" },
          { src: sf(63), caption: "Versão clara" },
        ],
        columns: 2,
        uniform: true,
      },
      {
        label: "Componentes",
        title: "Blocos e ações",
        text: "Cada desafio tem uma cor e um ícone, impressos na lateral do bloco.",
        figures: [
          { src: sf(22), caption: "Os blocos com os desafios impressos" },
          { src: sf(62), caption: "Vista superior dos blocos" },
        ],
        columns: 2,
      },
      {
        label: "Impressos",
        title: "Manual de regras",
        text: "Folheto dobrado com a lista de desafios por cor.",
        figures: [
          { src: sf(20), caption: "Capa e regras" },
          { src: sf(21), caption: "Lista de desafios por cor" },
        ],
        columns: 2,
      },
      {
        label: "Divulgação",
        title: "Renders 3D",
        text: "Cenas da torre caindo, usadas na divulgação.",
        figures: [
          { src: sf(23), caption: "Torre em queda" },
          { src: sf(24), caption: "Blocos no ar" },
        ],
        columns: 2,
      },
    ],
    gallery: [18].map(sf).concat(sfOrig("tipsy-flat")),
    storeUrl: `${STORE_URL}/products/tipsy`,
  },
  {
    slug: "jentekveld",
    name: "Jentekveld",
    meaning: "“Noite das garotas”",
    tagline: "Perfekte spillet for jentekvelder",
    taglinePt: "O jogo perfeito para noites das garotas",
    category: "Jogo de cartas de festa",
    accent: "#f08cb8",
    palette: ["#f7c6db", "#fbe3ee", "#1b1b1b", "#d4af37", "#8fd3e8"],
    cover: sf(27),
    status: live("À venda desde mar/2021"),
    role: "Caixa, cartas das 4 categorias, manual de regras e anúncios",
    summary:
      "Jogo para noites entre amigas, com quatro categorias de carta, uma bolinha e uma ampulheta. A identidade parte do universo de beleza feminina: mármore rosa e logotipo manuscrito.",
    specs: { contents: "350 cartas, 1 ampulheta de 30 s e 1 bolinha", players: "2–30+", age: "18+", time: "20–180 min" },
    howToPlay: [
      "“Dropp gutta, det er tid for Jentekveld!”: deixe os garotos de lado, é hora da noite das garotas.",
      "As cartas se dividem em Dilemma (dilema), Fem Fingre (cinco dedos), 100 Spørsmål (100 perguntas) e Hot Seat.",
      "Sem pontos nem vencedor: é só fazer o que a carta manda.",
    ],
    story: [
      "Quem trouxe a ideia se inspirou em produtos de beleza femininos noruegueses, em especial nas embalagens com textura de mármore.",
      "Recriei a textura de mármore em vetor e construí sobre ela um visual sofisticado, pensado para o público feminino.",
    ],
    logoMask: sfDetail("logo-jentekveld"),
    boards: [
      {
        label: "Produção",
        title: "A caixa planificada",
        text: "As seis faces da arte final montadas na planificação: frente, verso, laterais, topo e fundo.",
        figures: [{ src: sfOrig("jentekveld-box-net"), caption: "Faces reais da arte final na planificação da caixa" }],
        columns: 1,
        paper: true,
      },
      {
        label: "Sistema",
        title: "Categorias de carta",
        text: "Cada categoria tem um verso próprio: mármore rosa, azul, branco com dourado e preto com dourado. O lado do texto mantém o mesmo cabeçalho manuscrito.",
        figures: [
          { src: sfOrig("jentekveld-cards-reference"), caption: "Folha de referência das cartas: frentes e versos com cotas" },
          { src: sf(28), caption: "Dilemma e Fem Fingre" },
          { src: sf(29), caption: "100 Spørsmål e Hot Seat" },
        ],
        columns: 1,
      },
      {
        label: "Impressos",
        title: "Manual de regras",
        text: "Folha A4 com uma faixa de cor para cada categoria, na mesma cor do verso das cartas.",
        figures: [{ src: sfOrig("jentekveld-rules"), caption: "Regler (regras), formato A4" }],
        columns: 1,
        paper: true,
      },
      {
        label: "Divulgação",
        title: "Anúncios",
        figures: [
          { src: sfOrig("ad-jentekveld-1x1"), caption: "Campanha de 20% de desconto" },
          { src: sfOrig("ad-easter-jentekveld"), caption: "Promoção de Páscoa" },
        ],
        columns: 2,
        uniform: true,
      },
    ],
    gallery: [25, 26, 30, 31].map(sf),
    storeUrl: `${STORE_URL}/products/jentekveld`,
  },
  {
    slug: "lag-en-meme",
    name: "Lag en Meme",
    meaning: "“Faça um meme”",
    tagline: "Et spill for oss som elsker memes",
    taglinePt: "Um jogo para quem ama memes",
    category: "Jogo de cartas de festa",
    accent: "#2fc9d6",
    palette: ["#30ccd8", "#1890b4", "#2b2f33", "#ffffff", "#f2c94c"],
    cover: sf(32),
    status: live("À venda desde nov/2020"),
    role: "Caixa, cartas de texto e de imagem e suporte",
    summary:
      "Cada jogador monta um meme combinando uma das suas frases com a imagem da rodada. O suporte deixa a imagem em pé no centro da mesa, em destaque.",
    specs: { contents: "250 cartas de texto, 45 cartas de imagem e 1 suporte", players: "3–20+", age: "16+", time: "30–90 min" },
    howToPlay: [
      "Uma carta de imagem fica no suporte, no centro da mesa.",
      "Cada jogador escolhe, entre as suas cartas de texto, a legenda mais engraçada para a imagem.",
      "O juiz da rodada escolhe o melhor meme e dá o ponto. O papel de juiz passa no sentido horário. Vence quem juntar 10 cartas.",
    ],
    logoMask: sfDetail("logo-lag-en-meme"),
    boards: [
      {
        label: "Componentes",
        title: "Cartas e suporte",
        text: "A carta de imagem fica em pé no suporte, e as cartas de texto ficam na mão dos jogadores.",
        figures: [
          { src: sf(34), caption: "Carta de imagem no suporte e carta de texto" },
          { src: sf(35), caption: "Caixa, suporte e cartas" },
        ],
        columns: 2,
      },
      {
        label: "Produção",
        title: "Facas da caixa",
        text: "Faces da caixa planificadas sobre a faca da fábrica, com as cotas.",
        figures: [{ src: sfOrig("dielines-meme-jul"), caption: "Facas do Lag en Meme (azul) e do Kryptert Juleversjon (vermelho)" }],
        columns: 1,
        paper: true,
      },
    ],
    gallery: [33].map(sf).concat(sfOrig("ad-easter-meme")),
    storeUrl: `${STORE_URL}/products/lag-en-meme`,
  },
  {
    slug: "gutta-stemning",
    name: "Gutta stemning",
    meaning: "“Clima dos caras”",
    tagline: "Lørdager er for gutta",
    taglinePt: "Sábados são dos caras",
    category: "Jogo de cartas de festa",
    accent: "#f5a623",
    palette: ["#1b1b1b", "#f5a623", "#ffffff", "#a8e4fc"],
    cover: sf(41),
    role: "Caixa e identidade",
    summary:
      "A versão para os amigos: cerveja, pizza e cartas com desafios e histórias. Caixa preta e laranja, com um logotipo de tom bem-humorado.",
    specs: { contents: "400 cartas em 4 categorias", players: "2–20+", age: "18+", time: "20–40 min" },
    howToPlay: [
      "“Sett igjen dama hjemme, nå skal gutta samles!”: deixe a namorada em casa, agora os caras vão se reunir.",
      "Sem regras complicadas: faça o que a carta manda.",
      "Tire uma carta por vez, cumpra a tarefa e aproveite a noite.",
    ],
    boards: [
      {
        label: "Embalagem",
        title: "Caixa",
        figures: [
          { src: sf(42), caption: "Frente" },
          { src: sf(43), caption: "Verso" },
        ],
        columns: 2,
      },
    ],
  },
  {
    slug: "ikke-lov-a-le",
    name: "Ikke lov å le",
    meaning: "“Proibido rir”",
    tagline: "Ler du, taper du!",
    taglinePt: "Riu, perdeu!",
    category: "Jogo de cartas · parceria com a VGTV",
    accent: "#e07a7f",
    palette: ["#b9525a", "#e07a7f", "#4fd1c5", "#2b2b2b", "#f2b84b"],
    cover: sf(59),
    status: { kind: "proposal", label: "Proposta de embalagem" },
    role: "Proposta de caixa e de cartas por categoria",
    summary:
      "Jogo baseado na série “Ikke lov å le”, do Mads Hansen, na VGTV, em que humoristas tentam fazer os outros rirem. Quem rir perde. As cartas se dividem em quatro desafios, cada um com uma cor: Stand-up, Imitasjon (imitação), Challenges e Jodel (canto tirolês).",
    specs: { contents: "400 cartas", players: "2–20+", age: "8+", time: "20–40 min" },
    howToPlay: [
      "Na sua vez, tire uma carta e faça o desafio: stand-up, uma imitação, um desafio ou um canto tirolês.",
      "Os outros jogadores tentam não rir.",
      "Quem rir perde a rodada.",
    ],
    story: [
      "Foi uma parceria entre a editora e a VGTV. Com um terceiro envolvido, o processo mudou: as decisões passavam também pela emissora.",
      "Aqui está a minha proposta de embalagem. O jogo chegou às lojas em outubro de 2022, com outra caixa.",
    ],
    logoMask: sfDetail("logo-ikke-lov-a-le"),
    boards: [
      {
        label: "Sistema",
        title: "Categorias",
        text: "Quatro cores para quatro tipos de desafio, impressas no verso das cartas.",
        figures: [{ src: sfDetail("ikke-lov-kategorier"), caption: "Stand-up, Imitasjon, Challenges e Jodel" }],
        columns: 1,
      },
    ],
  },
  {
    slug: "troll-laks-brunost-viking-taco",
    name: "Troll, Laks, Brunost, Viking, Taco!",
    meaning: "“Troll, salmão, queijo marrom, viking, taco!”",
    tagline: "Perfekte spillet for både store og små",
    taglinePt: "O jogo perfeito para grandes e pequenos",
    category: "Jogo de cartas infantil",
    accent: "#a46ad8",
    palette: ["#8e44ad", "#f4a6c1", "#7fd3e0", "#b8e0a0", "#f6e27a"],
    cover: sfDetail("troll-laks-linha"),
    status: live("À venda desde nov/2021"),
    role: "Caixa, cartas e coordenação da ilustração e do 3D",
    summary:
      "Releitura de um jogo de reflexo conhecido, com a cultura norueguesa: troll, salmão, brunost (o queijo marrom típico), viking, alce, orca e o taco das sextas-feiras. Pensado para crianças.",
    specs: { contents: "64 cartas", players: "2–10", age: "3+", time: "10 min" },
    howToPlay: [
      "Cada jogador põe uma carta na mesa, na sua vez, dizendo uma palavra da sequência: troll, laks, brunost, viking, taco.",
      "Quando a carta bate com a palavra dita, todos correm para pôr a mão no monte.",
      "O último a bater leva as cartas. Vence quem se livrar das suas primeiro.",
    ],
    credits: [
      "Ilustrações dos personagens: ilustradora parceira, coordenada por mim.",
      "Render 3D: modelador parceiro, coordenado por mim.",
    ],
    boards: [
      {
        label: "Personagens",
        title: "Personagens",
        text: "Cada carta mostra um personagem, com o nome escrito duas vezes para ser lido de qualquer lado da mesa, e uma cor de fundo própria.",
        figures: [
          { src: sfDetail("troll-laks-linha"), caption: "Caixa e cartas de personagem" },
          { src: sf(58), caption: "Carta do Viking" },
        ],
        columns: 2,
      },
    ],
    storeUrl: `${STORE_URL}/products/tlbvt`,
  },
];

export const extras: (Figure & { text: string })[] = [
  {
    src: sf(39),
    caption: "Frisbit",
    text: "Frisbee com caixa e etiqueta, uma ideia da editora para sair das cartas. Produzido com a mesma fábrica, pelo mesmo processo. O lançamento não foi confirmado.",
  },
  {
    src: sf(61),
    caption: "Favobiten",
    text: "Embalagem de um snack de chocolate dentro de uma mini casquinha. O modelador fez o render 3D de cada casquinha, e eu estilizei os renders como ilustração na embalagem.",
  },
  {
    src: sf(40),
    caption: "Harm & Hegseth Ultimate Quiz",
    text: "Quiz em parceria com a VGTV. Não chegou a ser produzido.",
  },
];

export const getGame = (slug: string | undefined) => games.find((g) => g.slug === slug);
