import { publicUrl } from "@/lib/utils";

// Estudo de caso da SpillFabrikken: a marca, a linha de jogos e uma página por jogo.
// Especificações (idade, tempo, jogadores, conteúdo) foram transcritas dos versos das caixas.

export const sf = (n: number) => publicUrl(`projects/spillfabrikken-web/${n}.webp`);
export const sfDetail = (name: string) => publicUrl(`projects/spillfabrikken-web/detail/${name}.webp`);

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
  text?: string;
  figures: Figure[];
  /** Quantas colunas a prancha usa em telas largas. */
  columns?: 1 | 2 | 3;
}

export interface Variant {
  name: string;
  meaning: string;
  image: string;
  color: string;
  text: string;
}

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
  specs: Specs;
  /** Como se joga, a partir do texto do verso da caixa. */
  howToPlay: string[];
  boards: Board[];
  anatomy?: { image: string; points: AnatomyPoint[] };
  variants?: Variant[];
  gallery?: string[];
}

export const brand = {
  name: "SpillFabrikken",
  meaning: "“A fábrica de jogos”",
  location: "Trondheim, Noruega",
  period: "Abr 2020 – Set 2021",
  role: "Product e Game Designer (remoto)",
  summary:
    "Editora norueguesa de jogos de cartas e de festa. Desenvolvi jogos do conceito e protótipo até a produção, e criei a identidade visual, as embalagens e o material de divulgação da linha.",
  deliverables: ["Identidade visual", "Game design", "Cartas e regras", "Embalagens", "Renders 3D e mockups", "Material de divulgação"],
  palette: ["#e1251b", "#1b1b1b", "#f2f2f2", "#9e9e9e"],
  identity: [
    { src: sf(1), caption: "Apresentação do logotipo" },
    { src: sf(2), caption: "Construção: esboço e linhas-guia do logotipo" },
    { src: sf(3), caption: "Símbolo inspirado no naipe de ouros dos baralhos" },
    { src: sf(4), caption: "Variações do símbolo com as iniciais SP·FK" },
    { src: sf(5), caption: "Assinatura horizontal em fundo claro e escuro" },
    { src: sf(6), caption: "Redução: 100%, 50% e 10%" },
    { src: sf(7), caption: "Aplicação em papel" },
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
  cardSystem: [
    { src: sf(45), caption: "Modelo de carta com faixa de cor por categoria" },
    { src: sf(46), caption: "O mesmo modelo em outras cores" },
    { src: sf(47), caption: "Gjør eller Drikk e Jeg har aldri" },
    { src: sf(44), caption: "Flopp eller Fakta e Pek På" },
  ] as Figure[],
};

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
    summary:
      "Cada carta traz uma frase que não faz sentido escrita, mas que, lida em voz alta, vira uma palavra ou expressão conhecida. Os jogadores decifram o máximo de cartas antes de o tempo acabar. O mesmo sistema de carta e caixa rendeu uma família de quatro edições: original, Natal, +18 e família.",
    specs: { contents: "400 cartas e 1 timer", players: "2–20+", age: "16+", time: "20–40 min" },
    howToPlay: [
      "Um jogador lê em voz alta a frase cifrada da carta, como “tha koffe redd akk”.",
      "Quem ouve tenta descobrir o que a frase quer dizer pelo som: neste caso, tacofredag (sexta do taco).",
      "Em times ou individualmente, ganha quem decifrar mais cartas antes de o timer acabar.",
    ],
    anatomy: {
      image: sfDetail("kryptert-anatomia"),
      // Marcadores na margem de cada elemento, para não cobrir o texto da carta.
      points: [
        { x: 41.8, y: 8.9, label: "Aba", text: "Nome do jogo na cor da categoria, para separar o baralho de relance." },
        { x: 6.4, y: 32.2, label: "Resposta", text: "A expressão decifrada, em tipografia pesada e centralizada." },
        { x: 65.9, y: 61.2, label: "Dica", text: "Faixa “hint” na cor da categoria, para destravar a rodada." },
        { x: 39.1, y: 72, label: "Comentário", text: "Uma linha de humor que dá personalidade a cada carta." },
        { x: 13.3, y: 91.9, label: "Selo", text: "Ícone de categoria: +18, frases faladas ou festa." },
      ],
    },
    boards: [
      {
        title: "Frente e verso",
        text: "A frente mostra só a frase cifrada, em cor sólida e letra grande, para ser lida de longe. O verso traz a resposta, a dica e o comentário. As três cartas abaixo são as mesmas nas duas imagens: “Sekk sleik ett øy” vira sexleketøy (brinquedo erótico), “Ful aha rik es kjula” vira fylla har ikke skylda (a bebedeira não tem culpa) e “Big mæhkmed fra is” vira big mac med fries.",
        figures: [
          { src: sf(55), caption: "Frente: a frase cifrada" },
          { src: sf(56), caption: "Verso: resposta, dica e comentário" },
        ],
        columns: 2,
      },
      {
        title: "Embalagem",
        text: "Caixa vermelha com padrão de linhas que lembra um código embaralhado. O verso explica o jogo com um exemplo que o leitor pode testar ali mesmo, em voz alta.",
        figures: [
          { src: sf(51), caption: "Frente" },
          { src: sf(54), caption: "Verso com exemplo de jogada" },
          { src: sf(52), caption: "Caixa aberta" },
          { src: sf(49), caption: "Render da caixa" },
        ],
        columns: 2,
      },
    ],
    variants: [
      {
        name: "Kryptert",
        meaning: "Edição original",
        image: sf(50),
        color: "#d83030",
        text: "Vermelho, branco e preto, com padrão de linhas de código.",
      },
      {
        name: "Juleversjon",
        meaning: "Edição de Natal",
        image: sf(64),
        color: "#9c303c",
        text: "A mesma caixa com laço, flocos de neve e faixa verde. As cartas ganham bordas nevadas.",
      },
      {
        name: "Politisk ukorrekt",
        meaning: "Politicamente incorreto, +18",
        image: sf(69),
        color: "#a81824",
        text: "Caixa preta com faixa vermelha, para quem gosta de humor ácido.",
      },
      {
        name: "Familieversjon",
        meaning: "Edição para a família",
        image: sf(75),
        color: "#60a8c0",
        text: "Padrão geométrico em cores claras, com frases para jogar em família.",
      },
    ],
    gallery: [53, 50, 66, 67, 68, 70, 71, 72, 73, 74, 76, 77, 78, 65].map(sf),
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
    summary:
      "Jogo de perguntas do tipo “quem aqui é mais provável de…”, com cartas de verdade e de castigo. A identidade usa uma estética de falha digital (glitch) em fundo preto, que traduz a sensação de desconfiança do jogo.",
    specs: { players: "3–20", age: "16+", time: "20–40 min" },
    howToPlay: [
      "As cartas fazem perguntas como “Who's the most likely to commit a crime?” (quem é mais provável de cometer um crime?).",
      "As cartas Sannhet (verdade) trazem perguntas e desafios de revelação.",
      "As cartas Taper (perdedor) trazem o castigo de quem perde a rodada.",
    ],
    boards: [
      {
        title: "Embalagem",
        text: "Caixa preta com o logotipo em letras deslocadas em RGB e uma onda de pontos na base. A lateral repete o nome na vertical, para a caixa ser reconhecida na prateleira.",
        figures: [
          { src: sf(9), caption: "Frente e lateral" },
          { src: sf(8), caption: "Render em perspectiva" },
        ],
        columns: 2,
      },
      {
        title: "Cartas",
        text: "Cada tipo de carta tem uma cor sólida no verso. O lado da pergunta é sempre branco e com a mesma diagramação.",
        figures: [
          { src: sf(11), caption: "Versos com o logotipo" },
          { src: sf(13), caption: "Sannhet (verdade)" },
          { src: sf(14), caption: "Taper (perdedor)" },
          { src: sf(12), caption: "Carta de pergunta" },
        ],
        columns: 2,
      },
    ],
    gallery: [15, 16, 17].map(sf),
  },
  {
    slug: "tipsy",
    name: "Tipsy",
    meaning: "“Altinho”",
    tagline: "Trekk, bygg, drikk, gjenta!",
    taglinePt: "Puxe, construa, beba, repita!",
    category: "Jogo de torre de blocos",
    accent: "#e2412c",
    palette: ["#e2412c", "#1e1e1e", "#d9b48a", "#3fb3a8", "#f2c94c"],
    cover: sf(19),
    summary:
      "Torre de blocos de madeira em que cada bloco traz uma ação impressa. Quem puxa o bloco cumpre o que está escrito e o coloca no topo. O manual organiza todas as ações por cor, para que cada bloco seja reconhecido de relance.",
    specs: { contents: "Blocos de madeira impressos, manual de regras" },
    howToPlay: [
      "Monte a torre e, na sua vez, puxe um bloco.",
      "Cumpra a ação impressa no bloco, como tomar goles ou fazer um desafio.",
      "Coloque o bloco no topo da torre e passe a vez. Repita até a torre cair.",
    ],
    boards: [
      {
        title: "Blocos e ações",
        text: "Cada ação tem uma cor e um ícone próprios, impressos na lateral do bloco.",
        figures: [
          { src: sf(22), caption: "Os blocos com as ações impressas" },
          { src: sf(62), caption: "Vista superior dos blocos" },
        ],
        columns: 2,
      },
      {
        title: "Manual de regras",
        text: "Folheto dobrado com a lista de ações por cor.",
        figures: [
          { src: sf(20), caption: "Capa e regras" },
          { src: sf(21), caption: "Lista de ações por cor" },
        ],
        columns: 2,
      },
      {
        title: "Renders 3D",
        text: "Cenas da torre caindo, usadas na divulgação.",
        figures: [
          { src: sf(23), caption: "Torre em queda" },
          { src: sf(24), caption: "Blocos no ar" },
        ],
        columns: 2,
      },
    ],
    gallery: [18, 63].map(sf),
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
    summary:
      "Jogo para noites entre amigas, com quatro tipos de carta. A embalagem usa mármore rosa e um logotipo manuscrito, mais próximos de uma marca de beleza do que de um jogo de festa.",
    specs: { players: "2–30+", age: "18+", time: "20–180 min" },
    howToPlay: [
      "“Dropp gutta, det er tid for Jentekveld!”: deixe os garotos de lado, é hora da noite das garotas.",
      "As cartas se dividem em Dilemma (dilema), Fem Fingre (cinco dedos), 100 Spørsmål (100 perguntas) e Hot Seat.",
      "Segredos, limites e desafios, para uma noite inteira de jogo.",
    ],
    boards: [
      {
        title: "Categorias de carta",
        text: "Cada categoria tem um verso próprio: mármore rosa, azul, branco com dourado e preto com dourado. O lado do texto mantém o mesmo cabeçalho manuscrito.",
        figures: [
          { src: sf(28), caption: "Dilemma e Fem Fingre" },
          { src: sf(29), caption: "100 Spørsmål e Hot Seat" },
        ],
        columns: 2,
      },
      {
        title: "Embalagem",
        figures: [
          { src: sf(30), caption: "Frente" },
          { src: sf(31), caption: "Verso" },
        ],
        columns: 2,
      },
    ],
    gallery: [25, 26].map(sf),
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
    summary:
      "Os jogadores combinam cartas de texto com a imagem da rodada para montar o melhor meme. Além das cartas, o jogo tem um suporte para deixar a imagem em pé no centro da mesa.",
    specs: { contents: "250 cartas de texto, 45 cartas de imagem, 1 suporte", players: "3–20+", age: "16+", time: "30–90 min" },
    howToPlay: [
      "Uma carta de imagem fica no suporte, no centro da mesa.",
      "Cada jogador escolhe, entre as suas cartas de texto, a legenda mais engraçada para a imagem.",
      "O juiz da rodada escolhe o melhor meme e dá o ponto. O papel de juiz passa no sentido horário. Vence quem juntar 10 cartas.",
    ],
    boards: [
      {
        title: "Componentes",
        text: "A carta de imagem fica em pé no suporte, e as cartas de texto ficam na mão dos jogadores.",
        figures: [
          { src: sf(34), caption: "Carta de imagem no suporte e carta de texto" },
          { src: sf(35), caption: "Caixa, suporte e cartas" },
        ],
        columns: 2,
      },
    ],
    gallery: [33].map(sf),
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
    summary:
      "A versão para os amigos: cerveja, pizza e cartas com desafios e histórias. Caixa preta e laranja, com um logotipo em tom de paródia.",
    specs: { contents: "400 cartas em 4 categorias", players: "2–20+", age: "18+", time: "20–40 min" },
    howToPlay: [
      "“Sett igjen dama hjemme, nå skal gutta samles!”: deixe a namorada em casa, agora os caras vão se reunir.",
      "Sem regras complicadas: faça o que a carta manda.",
      "Tire uma carta por vez, cumpra a tarefa e aproveite a noite.",
    ],
    boards: [
      {
        title: "Embalagem",
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
    category: "Jogo de cartas para todas as idades",
    accent: "#e07a7f",
    palette: ["#b9525a", "#e07a7f", "#4fd1c5", "#2b2b2b", "#f2b84b"],
    cover: sf(59),
    summary:
      "Quem rir perde. As cartas se dividem em quatro categorias de desafio, cada uma com uma cor: Stand-up, Imitasjon (imitação), Challenges e Jodel (canto tirolês).",
    specs: { contents: "400 cartas", players: "2–20+", age: "8+", time: "20–40 min" },
    howToPlay: [
      "Na sua vez, tire uma carta e faça o desafio: uma piada, uma imitação, um desafio ou um canto.",
      "Os outros jogadores tentam não rir.",
      "Quem rir perde a rodada.",
    ],
    boards: [
      {
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
    tagline: "Av SpillFabrikken",
    taglinePt: "Um jogo infantil com ícones da Noruega",
    category: "Jogo de cartas infantil",
    accent: "#a46ad8",
    palette: ["#8e44ad", "#f4a6c1", "#7fd3e0", "#b8e0a0", "#f6e27a"],
    cover: sfDetail("troll-laks-linha"),
    summary:
      "Jogo de cartas para crianças com personagens ilustrados do imaginário norueguês: troll, salmão, brunost (o queijo marrom típico), viking, alce e orca, mais o taco das sextas-feiras.",
    specs: { contents: "64 cartas", players: "2–10", age: "3+", time: "10 min" },
    howToPlay: [
      "Cada carta mostra um personagem, com o nome escrito duas vezes para ser lido de qualquer lado da mesa.",
      "Cada personagem tem uma cor de fundo própria.",
    ],
    boards: [
      {
        title: "Personagens",
        figures: [
          { src: sfDetail("troll-laks-linha"), caption: "Caixa e cartas de personagem" },
          { src: sf(58), caption: "Carta do Viking" },
        ],
        columns: 2,
      },
    ],
  },
];

export const extras: Figure[] = [
  { src: sf(36), caption: "Frisbit: etiqueta e disco" },
  { src: sf(39), caption: "Frisbit: caixa “Laget i Norge” (feito na Noruega)" },
  { src: sf(40), caption: "Harm & Hegseth Ultimate Quiz, em parceria com a VGTV" },
  { src: sf(61), caption: "Favobiten: embalagem de snack de chocolate" },
];

export const getGame = (slug: string | undefined) => games.find((g) => g.slug === slug);
