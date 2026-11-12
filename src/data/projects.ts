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

export type Engagement = "Voluntário" | "Fundador" | "Freelance" | "Contratado" | "Projeto autoral";

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
  | { kind: "palette"; colors: string[] }
  | { kind: "video"; src: string; poster: string; caption?: string };

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
  /** Vídeo curto e mudo, em loop, usado no lugar da capa (case e destaque da home). */
  loop?: { src: string; poster: string };
}


const pjeImg = (n: number, caption?: string): CaseImage => ({ src: publicUrl(`projects/pje2-mobile/${n}.webp`), caption });
const jpImg = (n: number, caption?: string): CaseImage => ({ src: publicUrl(`projects/jovem-potiguar/image${n}.webp`), caption });
const lh = (name: string) => publicUrl(`projects/lan-house/${name}.webp`);
const lhImg = (name: string, caption: string): CaseImage => ({ src: lh(name), caption });
const mtLogo = (n: number, caption: string): CaseImage => ({ src: publicUrl(`projects/my-treasure/logo-${n}.webp`), caption });
const nexusImg = (n: number, caption?: string): CaseImage => ({ src: publicUrl(`projects/nexus-imobiliaria/image${n}.webp`), caption });

export const projects: Project[] = [
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
  {
    slug: "lan-house-simulator",
    title: "Lan House Simulator",
    category: "Game design · Jogo 3D para PC",
    year: "2026",
    client: "Projeto autoral",
    image: lh("pv-lan-cheia"),
    ogImage: "og-lan-house.jpg",
    accent: "#b45309",
    platform: "PC · Godot 4",
    featured: true,
    engagement: "Projeto autoral",
    role: "Game designer e diretor de arte",
    summary:
      "Simulador em primeira pessoa de uma lan house brasileira, recriada na garagem em que eu tive a minha, em Pedro Velho (RN), como ela era em 2012. Dentro dele roda um segundo jogo: o Pingado Pro, o programa do caixa, em pixel art. Em desenvolvimento.",
    credits:
      "Projeto autoral, em desenvolvimento. Eu defino o design, as regras, a direção de arte e o nível de fidelidade; jogo cada versão e mando as correções. A programação é feita com agentes de IA (Claude Code) sob a minha direção. Recursos de terceiros, todos com licença livre: pessoas da Microsoft Rocketbox (MIT), texturas do ambientCG (CC0), modelos do Objaverse (CC0 e CC BY, com créditos no jogo), ruas do OpenStreetMap (ODbL), vozes geradas no próprio PC com o Kokoro (Apache 2.0) e sons de ambiente em domínio público.",
    problem:
      "Transformar uma memória, a lan house de bairro, num jogo de gerenciamento com clientes que parecem gente e num lugar que quem viveu aquela época reconhece.",
    overview: {
      challenge:
        "Transformar uma memória, a lan house de bairro, num jogo de gerenciamento que dê vontade de jogar: clientes que parecem gente de verdade e um lugar que quem viveu aquela época reconhece.",
      contribution:
        "Game design, economia e regras de satisfação, direção de arte, roteiro das falas e o design do Pingado Pro. Cada versão passa por mim jogando e por robôs que jogam um dia inteiro pela interface.",
      outcome:
        "Versão jogável no PC, com dois cenários, ciclo de dia e noite, clientes com sete necessidades, contas mensais e o Pingado Pro completo. Ainda sem data de lançamento.",
    },
    metrics: [
      { value: "2012", label: "Pedro Velho (RN) refeita casa por casa a partir de fotos de 2012 e do OpenStreetMap" },
      { value: "7", label: "necessidades por cliente: fome, conforto, bexiga, energia, diversão, social e higiene" },
      { value: "2 em 1", label: "um jogo de gerenciamento em pixel art rodando dentro do monitor 3D" },
    ],
    metricsNote: "Contagens do próprio jogo, documentadas no README do projeto.",
    sections: [
      {
        label: "Conceito",
        title: "A minha antiga lan house, virada jogo",
        text: [
          "Você é o dono. O cliente chega, olha a fila e decide se espera. No caixa, você libera a máquina, acerta o tempo e liga os adicionais. Durante a sessão, ele come, vai ao banheiro, pede mais meia hora, reclama da máquina suja ou da tela azul. Na saída, paga e leva a fama da lan para o bairro. No dia 30, chegam o aluguel e a internet.",
          "O ciclo é curto e se repete o dia inteiro, então cada etapa precisa ter uma decisão e um retorno claro.",
        ],
        boards: [
          {
            kind: "steps",
            steps: [
              { title: "Chegada", text: "O cliente olha o tamanho da fila. Se achar grande demais, vai embora." },
              { title: "Fila", text: "O balão mostra o humor. Quem espera demais reclama e desiste." },
              { title: "Liberar", text: "No Pingado Pro: escolher a máquina, acertar o tempo, ligar os adicionais." },
              { title: "Sessão", text: "Necessidades caem, surgem pedidos e problemas: tela azul, sujeira, fome." },
              { title: "Saída", text: "Paga, dá gorjeta ou sai insatisfeito e espalha no boca a boca." },
              { title: "Fim do mês", text: "Aluguel e internet. A fama decide quantos clientes vêm amanhã." },
            ],
          },
          {
            kind: "grid",
            columns: 2,
            figures: [
              lhImg("pv-lan-cheia-corredor", "A garagem com os PCs dos dois lados, começando na entrada"),
              lhImg("pv-mesa-na-entrada", "Clientes indo até a mesa do dono, com o humor no balão"),
            ],
          },
        ],
      },
      {
        label: "Lugar",
        title: "Pedro Velho, 2012, casa por casa",
        text: [
          "O cenário principal é a rua da minha antiga lan, em Pedro Velho (RN), como ela aparece nas fotos do Street View de março de 2012. As fotos servem só de referência: as medidas vêm delas e do OpenStreetMap, e as texturas são de bibliotecas livres.",
          "Cada casa do nosso lado da rua foi refeita uma a uma, com a calçada, a altura e a rampa de cada lote. A área é andável até depois da Praça 14 de Julho, com a cigarreira, o ponto de mototáxi e a Igreja de São Francisco.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 3,
            uniform: true,
            figures: [
              lhImg("pv-fachada", "A esquina da lan, com o PARE e as bicicletas na calçada"),
              lhImg("pv-2012-casa-166", "A casa amarela 166, de alpendre e janelas em arco"),
              lhImg("pv-2012-cigarreira", "A cigarreira de alvenaria no fim do canteiro"),
              lhImg("pv-2012-rua-carros", "A rua com os carros parados, como nas fotos de 2012"),
              lhImg("pv-praca-14-de-julho", "Praça 14 de Julho, elevada, com mureta de pedra"),
              lhImg("pv-igreja", "Igreja de São Francisco, ao fim do caminho"),
            ],
          },
        ],
      },
      {
        label: "Luz e clima",
        title: "Do amanhecer à noite, a luz conta a hora",
        text: [
          "O sol da manhã passa por cima do isopor colado nas frestas, as nuvens deixam sombra na rua e, à noite, só as lâmpadas amarelas no fio e os monitores iluminam a garagem. A luz rebatida vem de iluminação global em tempo real (SDFGI). Onde ela não alcança, há luzes suaves posicionadas à mão e conferidas pela luminância dos prints.",
          "Entre um dia e outro, a noite passa do lado de fora em alguns planos, até o sol nascer e o galo cantar.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 3,
            uniform: true,
            figures: [
              lhImg("pv-amanhecer", "Amanhecer, na cena entre um dia e outro"),
              lhImg("pv-frestas-manha", "Luz da manhã entrando pelas frestas"),
              lhImg("pv-sombra-de-nuvem", "Sombra de nuvem passando pela fachada"),
              lhImg("pv-lampadas-incandescentes", "As duas lâmpadas incandescentes do começo do jogo"),
              lhImg("pv-isopor", "O isopor nas frestas: a luz só vaza pelas bordas"),
              lhImg("pv-noite", "A rua à noite"),
            ],
          },
        ],
      },
      {
        label: "Pessoas",
        title: "Clientes com vontade própria",
        text: [
          "Cada cliente tem sete medidores e, às vezes, um jeito de ser: o faminto, o de bexiga fraca, a reclamona que não senta em máquina suja, o limpinho e a turma gamer, que chega em grupo, grita e incomoda quem está do lado. Pedidos ignorados viram insatisfação, e a insatisfação vira fama perdida.",
          "Todo mundo fala, com voz gerada no próprio PC e legenda colorida pela emoção. O visual das pessoas é de PS2 de propósito (malha simplificada, textura de 15 bits e animação a 15 quadros por segundo), o que dá mais apelo emocional e um leve estranhamento.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 2,
            figures: [
              lhImg("pv-npcs-ps2", "Clientes no balcão, com o humor de cada um no balão"),
              lhImg("clientes-jogando", "Sessão em andamento, na lan do centro"),
              lhImg("cliente-comendo", "Comer leva tempo: a sessão corre enquanto o cliente come"),
              lhImg("balao-humor", "Humor da fila em tempo real"),
            ],
          },
        ],
      },
      {
        label: "Jogo dentro do jogo",
        title: "Pingado Pro 3.0, o programa do caixa",
        text: [
          "O programa que libera as máquinas é um jogo de gerenciamento à parte, no estilo dos jogos de 1999 a 2003. Ele roda no monitor 3D do caixa, em 507 por 441 pixels ampliados, com fonte pixel própria, efeito de tubo de imagem e a loja visível em volta da tela.",
          "O mapa isométrico é a mesma lan do 3D vista de cima: cada pessoa está onde está de verdade, com as roupas do seu modelo, e balões mostram fome, sono ou raiva. Há radar em fósforo verde, cartão de comandos como nos jogos de estratégia, retrato em vídeo do cliente escolhido e metas do dia.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 2,
            figures: [
              lhImg("pingado-no-monitor", "O Pingado Pro no monitor do caixa, com a loja em volta"),
              lhImg("pingado-liberar", "Mapa isométrico: escolher a máquina e liberar"),
              lhImg("pingado-pessoa", "Cliente escolhido, com retrato em vídeo e medidores"),
              lhImg("pingado-metas", "Metas do dia cumpridas"),
              lhImg("pingado-aba-jogos", "Aba de jogos: coleção, vitrine e o que a clientela pediu"),
              lhImg("pingado-noite", "À noite, as lâmpadas e os monitores iluminam o mapa"),
            ],
          },
        ],
      },
      {
        label: "Mecânicas",
        title: "Problemas de lan que viram jogo",
        text: [
          "A tela azul se resolve indo até a máquina e segurando o botão do gabinete: soltar na faixa verde reinicia, soltar cedo não adianta e segurar demais faz o Windows verificar o disco. Quem come deixa lixo, quem passa suja o chão, e máquina suja irrita o próximo cliente. Jogos novos chegam pela loja e precisam ser instalados máquina por máquina.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 2,
            figures: [
              lhImg("reiniciar-no-dedo", "Reinício no dedo, no botão do gabinete"),
              lhImg("maquina-com-lixo", "Máquina com lixo: o próximo cliente reclama"),
              lhImg("capas-nas-maquinas", "Capas dos jogos nas telas de quem está jogando"),
              lhImg("pv-fornecedor-previa-3d", "Fornecedor, com a prévia em 3D do item"),
            ],
          },
        ],
      },
      {
        label: "Processo",
        title: "Fidelidade se mede, não se discute",
        text: [
          "Para cada trecho da rua, o print do jogo é comparado com a foto de 2012, lado a lado e no mesmo ângulo: polígono da calçada, telhado, grades, postes, até a rua abaulada. Só depois de bater, o trabalho segue para o próximo trecho.",
          "A jogabilidade passa por testes automáticos: um robô joga um dia inteiro pela interface, em velocidade acelerada, e outro modo mede tremor e brilho da imagem parada. Foi assim que apareceu um piscar no forro que nenhum print isolado mostrava.",
        ],
        boards: [
          {
            kind: "steps",
            steps: [
              { title: "Referência", text: "Foto de 2012 e traçado do OpenStreetMap." },
              { title: "Medida", text: "Larguras, alturas e recuos tirados da foto e do mapa." },
              { title: "Construção", text: "Casa, calçada e telhado montados por código." },
              { title: "Print no mesmo ângulo", text: "Câmera do jogo posicionada como a da foto." },
              { title: "Comparação", text: "Lado a lado, item por item, até bater." },
              { title: "Teste jogando", text: "Robô e jogo de verdade, antes da próxima rodada." },
            ],
          },
        ],
      },
    ],
    result: [
      "Versão jogável no PC, com dois cenários (Pedro Velho e uma lan de centro), ciclo de dia e noite, contas mensais e o Pingado Pro completo.",
      "Próximos passos: sotaque nordestino nas vozes, balanceamento da economia ao longo de vários meses e uma versão executável para testes com jogadores.",
    ],
    tools: ["Godot 4", "GDScript", "Claude Code", "Kokoro (vozes)", "OpenStreetMap", "Street View (referência)"],
  },
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
      "Redesign da interface do app que magistrados da Justiça Federal usam para revisar e assinar minutas. Atuei como designer voluntário, a convite de um integrante da equipe de residência do TRF5.",
    credits:
      "O projeto foi conduzido por uma equipe de residência ligada ao TRF5, responsável pela refatoração do código em Flutter, pela nova arquitetura e pela integração com a API do CNJ. Fui convidado por um integrante da equipe para desenhar a interface e a experiência de uso, e minha colaboração está registrada no TCC dele. Nomes e CPFs que apareciam nas telas foram borrados.",
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
      { value: "50%+", label: "menos cliques nos fluxos principais" },
      { value: "347", label: "inconformidades de código corrigidas pela equipe de engenharia na refatoração" },
    ],
    metricsNote:
      "Resultados do projeto inteiro, registrados no TCC de um integrante da equipe. A refatoração é da equipe de engenharia; a minha parte foi a interface.",
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
      outcome: "O app chegou a ser publicado na Google Play. Hoje ele não está mais disponível na loja.",
    },
    sections: [
      {
        label: "Conceito",
        title: "Uma vitrine de coleções, com o valor à mostra ou não",
        text: [
          "O app é uma rede social com feed interativo. Cada usuário registra seus itens, e a soma do valor deles vira o valor do perfil, que alimenta um ranking entre colecionadores. Cada post é configurável: dá para esconder o preço, expor a peça numa vitrine pública ou abrir um leilão com lances.",
          "O conceito visual partiu da ideia de exclusividade: preto, dourado e fotografia com cara de revista. O nome provisório do projeto era MyTreasure; nos slides de apresentação, o app aparece como Prism.",
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
    result: ["O app chegou a ser publicado na Google Play; hoje não está mais disponível na loja.", "Marca com oito combinações de cor, pensada para o ícone do app e para as telas escuras."],
    tools: ["Figma"],
  },
  {
    slug: "hosuto",
    title: "Hosuto — gestão hoteleira",
    category: "Product Design · Dashboard",
    year: "2022",
    client: "Dione Solutions (Tóquio, Japão)",
    image: hosuto,
    featured: false,
    role: "Product Designer",
    summary: "Dashboard para as equipes de uma rede de 12 hotéis gerenciarem reservas, limpeza, cozinha e estoque.",
    problem:
      "O trabalho num hotel é presencial e corrido. A ferramenta digital precisava ajudar sem atrapalhar: informação fácil de ler e organizada conforme o que cada equipe precisa ver.",
    accent: "#ea580c",
    overview: {
      challenge: "O trabalho num hotel é presencial e corrido. A ferramenta precisava ajudar sem atrapalhar, mostrando a cada equipe só o que ela precisa ver.",
      contribution: "Desenhei o painel de gestão de uma rede de 12 hotéis, organizado pela rotina de reservas, limpeza, cozinha e estoque.",
      outcome: "Usado pelas equipes da rede, com ganho de 30% em eficiência. Sistema interno, sem acesso público.",
    },
    process: [
      {
        title: "Uma tela por necessidade",
        text: "Organizei o painel pela rotina de cada equipe (reservas, limpeza, cozinha e estoque), com a informação mais usada de cada função à vista, para que cada pessoa encontre rápido o que é dela.",
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
    engagement: "Fundador",
    role: "Fundador",
    summary:
      "Estúdio de produtos digitais com IA, fundado em 2026. Conduzo o design, o desenvolvimento e a prospecção, e construo produtos próprios que mostram o que o estúdio entrega: a Rede Imobiliária e o Lexus System.",
    problem:
      "Um estúdio novo precisa provar o que sabe fazer. Em vez de esperar o primeiro cliente, construí produtos completos e uso cada um como vitrine.",
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
      "Atuo em todas as frentes: pesquisa, design, código e relacionamento com potenciais clientes.",
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
    featured: true,
    engagement: "Fundador",
    role: "Fundador da Hex Labs: design e desenvolvimento",
    summary:
      "Plataforma imobiliária com painel para corretores e busca com mapa para o público. É a Rede Imobiliária, SaaS white-label que desenvolvo na Hex Labs.",
    problem:
      "Corretores de todas as idades precisam cadastrar e atualizar imóveis sem depender de alguém de tecnologia. Do outro lado, quem procura imóvel quer ver a localização e os arredores sem se perder em informação demais.",
    accent: "#2563eb",
    overview: {
      challenge: "Corretores de todas as idades precisam cadastrar e atualizar imóveis sem depender de alguém de tecnologia; quem procura imóvel quer ver a localização e os arredores sem se perder em informação.",
      contribution: "Pesquisa e jornada, personas, painel da corretora, níveis de permissão da equipe, busca com mapa e o desenvolvimento em Next.js e Supabase.",
      outcome: "Produto construído de ponta a ponta, da pesquisa ao código, como vitrine da Hex Labs.",
    },
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
        text: "Cadastrar imóvel é a tarefa mais frequente da corretora, por isso o botão de novo imóvel é o destaque do painel. A ficha de cadastro tem prévia do anúncio, as edições entram no ar ao salvar e a página de analytics mostra horários, dispositivos e imóveis mais vistos.",
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
    ],
    tools: ["Figma", "Photoshop", "Next.js (App Router)", "React 19", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion", "Leaflet", "Recharts"],
    gallery: [17, 22, 4, 32, 16].map((n) => publicUrl(`projects/nexus-imobiliaria/image${n}.webp`)),
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);
