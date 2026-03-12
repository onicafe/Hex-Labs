import polare from "@/assets/projects/polare.png";
import sigrh from "@/assets/projects/sigrh.png";
import ucr from "@/assets/projects/ucr-intelbras.jpg";
import bonno from "@/assets/projects/bonno.png";
import tertuliano from "@/assets/projects/tertuliano.png";
import enade from "@/assets/projects/enade.png";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
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

export interface Project {
  slug: string;
  image: string;
  title: string;
  category: string;
  year: string;
  client: string;
  industry: string;
  services: string[];
  description: string;
  challenge: string;
  solution: string;
  liveUrl?: string;
  newsUrl?: string;
  caseStudyUrl?: string;
  gallery?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

const projectsData: Project[] = [
  {
    slug: "polare-portal",
    image: polare, // Placeholder
    title: "Polare Portal Público",
    category: "Sistema Institucional",
    year: "2022",
    client: "UFRN",
    industry: "Educação / Governo",
    services: ["Desenvolvimento Front-end", "Java", "Arquitetura de Sistemas"],
    description: "Portal público para o sistema Polare da UFRN, facilitando o acesso a informações e serviços institucionais.",
    challenge: "Necessidade de integrar diversos serviços institucionais em uma interface unificada e acessível.",
    solution: "Desenvolvimento de uma interface robusta utilizando Angular e PrimeNG, focada na usabilidade e acessibilidade.",
    liveUrl: "https://polare.sti.ufrn.br/",
  },
  {
    slug: "sigrh-portal",
    image: sigrh, // Placeholder
    title: "SIGRH Portal Público",
    category: "Sistema Institucional",
    year: "2020",
    client: "UFRN",
    industry: "Educação / Governo",
    services: ["Desenvolvimento Front-end", "Integração Java", "Acessibilidade"],
    description: "Portal público do Sistema Integrado de Gestão de Recursos Humanos da UFRN.",
    challenge: "Modernizar o acesso às informações de recursos humanos com foco em transparência e facilidade de uso.",
    solution: "Implementação de portal responsivo integrado ao backend Java, garantindo alta disponibilidade.",
    liveUrl: "https://sigrh.ufrn.br/publico/home",
  },
  {
    slug: "intelbras-ucr",
    image: ucr, // Placeholder
    title: "Software Intelbras UCR",
    category: "Desenvolvimento de Software",
    year: "2021",
    client: "Intelbras",
    industry: "Tecnologia / IoT",
    services: ["React", "IoT", "Sistemas em Tempo Real"],
    description: "Software de gravação UCR - Gravador de chamadas Intelbras. Solução avançada para gravação de chamadas com alta qualidade em ambientes corporativos",
    challenge: "Criar uma interface intuitiva para gravação de chamadas em tempo real, garantindo mais segurança para o cliente, em conjunto com uma central UnniTI.",
    solution: "Desenvolvimento com React e Context API para gerenciamento de estado eficiente, superando desafios de latência e UX.",
    liveUrl: "https://www.intelbras.com/pt-br/grave-chamadas-com-alta-qualidade-em-ambientes-corporativos-ucr",
  },
  {
    slug: "tertuliano-advocacia",
    image: tertuliano, // Placeholder
    title: "Tertuliano Pinheiro Advocacia",
    category: "Site Empresarial",
    year: "2023",
    client: "Tertuliano Pinheiro",
    industry: "Direito",
    services: ["Web Design", "Desenvolvimento", "SEO"],
    description: "Website institucional para escritório de advocacia, transmitindo profissionalismo e confiança.",
    challenge: "Estabelecer uma presença digital sólida que reflita a seriedade e excelência do escritório.",
    solution: "Design moderno e responsivo, otimizado para SEO e conversão de contatos.",
    liveUrl: "https://tpadvocaciarn.com.br/",
  },
  {
    slug: "bonno-personalizados",
    image: bonno, // Placeholder
    title: "Bonno Personalizados",
    category: "E-commerce / Site Empresarial",
    year: "2023",
    client: "Bonno",
    industry: "Varejo",
    services: ["Web Design", "E-commerce"],
    description: "Plataforma digital para empresa de produtos personalizados.",
    challenge: "Apresentar um catálogo variado de produtos personalizados de forma atraente.",
    solution: "Interface visualmente rica focada na exibição de produtos e facilidade de contato.",
    liveUrl: "https://bonnopersonalizados.com/",
  },
  {
    slug: "enade-ufrn",
    image: enade, // Placeholder
    title: "Enade UFRN",
    category: "Site Institucional",
    year: "2022",
    client: "UFRN",
    industry: "Educação",
    services: ["Desenvolvimento Front-end", "Arquitetura da Informação"],
    description: "Portal informativo sobre o Enade para alunos e coordenadores da UFRN.",
    challenge: "Centralizar informações críticas sobre o exame de forma clara e objetiva.",
    solution: "Portal informativo com navegação intuitiva e design alinhado à identidade da instituição.",
    liveUrl: "https://enade.ufrn.br/",
  },
  {
    slug: "spillfabrikken",
    image: spillfabrikken,
    title: "SpillFabrikken",
    category: "Design de Produto",
    year: "2022",
    client: "SpillFabrikken",
    industry: "Jogos",
    services: ["Web/UI", "UX Design", "AR/VR", "3D", "Prototipagem", "Lead"],
    description: "Desenvolvimento de prototipagem inicial até produto final e material de divulgação.",
    challenge: "Desenvolver um material atrativo para todos os públicos. O material precisava ser, além de econômico para evitar o excesso de peças na entrega do produto, aumento o peso e o custo.",
    solution: "Psicologia das cores e mecânicas modernas de gamificação tornaram todos os jogos elaborados com altas taxas de venda.",
    liveUrl: "https://www.spillfabrikken.com/",
  },
  {
    slug: "pje",
    image: pje,
    title: "PJe2 Mobile",
    category: "Design de UI/UX",
    year: "2024",
    client: "Tribunal Regional Federal da 5ª Região",
    industry: "Direito",
    services: ["Experiência de Usuário", "Interface de Usuário", "Desenvolvimento para Dispositivos Móveis"],
    description:
      "O PJe2.X Mobile é a ferramenta oficial de trabalho para magistrados da Justiça Federal (TRF5), integrada à base de dados do Conselho Nacional de Justiça (CNJ). O projeto consistiu na refatoração completa e no redesign da aplicação, migrando de um código legado instável para uma arquitetura escalável em Flutter. Nosso objetivo foi elevar a maturidade da engenharia de software e alinhar a interface aos padrões nacionais da PDPJ-Br, otimizando a rotina de assinaturas de sentenças.",
    challenge:
      "A versão legada apresentava barreiras críticas em performance e usabilidade. A análise estática revelou 347 inconformidades de código (incluindo loops infinitos) e a lógica de negócios estava acoplada à interface. Além disso, a navegação fragmentada e o uso de menus ocultos elevavam a carga cognitiva, forçando magistrados a trocas constantes de contexto para acessar dados vitais.",
    solution:
      "Estruturamos a modernização em dois pilares: Engenharia (Clean Architecture) e UX Eficiente. Adotamos uma estrutura Layer-first com Service & Repository para desacoplar 100% da lógica, e migramos o estado para BLoC. Otimizamos o storage reduzindo a persistência para apenas 4 campos essenciais. Na interface, eliminamos o menu gaveta e unificamos visualizações, acelerando a tomada de decisão com feedbacks em tempo real.",
    liveUrl: "https://www.trf5.jus.br/",
    newsUrl:
      "https://www.trf1.jus.br/trf1/noticias/novo-aplicativo-para-dispositivos-moveis-do-pje-facilitara-consulta-e-trara-novas-funcionalidades-",
    caseStudyUrl:
      "https://docs.google.com/document/d/e/2PACX-1vQotRMSwYoOB3EgNSNWMB_PHTUKnb4sbBtSBmYNj5Qsg1PXLu20ELZCw1H45K7SPAVLKyvEhHUUw2u5/pub",
    stats: [
      { label: "Issues Corrigidas", value: "347" },
      { label: "Dívida Técnica", value: "Zero" },
      { label: "Redução de Cliques", value: "50%+" },
    ],
  },
  {
    slug: "jovem-potiguar",
    image: jovempotiguar,
    title: "Jovem Potiguar",
    category: "Design de UI/UX",
    year: "2024",
    client: "Secretaria de Estado do Trabalho, da Habitação e da Assistência Social",
    industry: "Educação, Governamental",
    services: ["Interface de Usuário", "Experiência de Usuário", "Design Gráfico"],
    description: "O projeto foi elaborado em uma parceria entre o Instituto Federal do Rio Grande do Norte e a SETHAS (Secretaria de Estado do Trabalho, da Habitação e da Assistência Social) com o intuito de trazer jovens do CadÚnico para formações em cursos técnicos do IFRN.",
    challenge: "Acessibilidade e Usabilidade para que todos os usuários tenham capacidade de conseguir realizar a inscrição com sucesso",
    solution: "Ao quebrarmos os passos e fornecendo instruções ao longo do caminho, o usuário teria mais facilidade independentemente do dispositivo utilizado",
    liveUrl: "https://www.instagram.com/jovempotiguar/",
    newsUrl: "https://g1.globo.com/rn/rio-grande-do-norte/noticia/2024/09/20/projeto-jovem-potiguar-classifica-estudantes-de-escolas-publicas-para-intercambio-na-europa.ghtml",
  },
  {
    slug: "my-treasure",
    image: prism,
    title: "Rede Social: MyTreasure",
    category: "Engenharia de Produto",
    year: "2023",
    client: "Dione Solutions",
    industry: "Redes Sociais",
    services: [
      "Interface de Usuário",
      "Experiência de Usuário",
      "Design Gráfico",
      "Design Thinking",
    ],
    description:
      "Este projeto nasceu para transformar a maneira como colecionadores gerenciam seus ativos. O foco foi criar uma interface que equilibra o rastreamento financeiro preciso com uma experiência visual imersiva.\n\nO diferencial está na flexibilidade: o usuário tem controle total sobre a exposição dos seus dados. Seja para monitorar o ROI (retorno sobre investimento) de itens privados ou para transformar a coleção em um catálogo vitrine com sistema de lances, o design prioriza a autonomia e a clareza visual.",
    challenge:
      'O desafio foi criar um sistema de "posts" altamente configuráveis, onde a interface se adapta à necessidade do usuário, seja ocultando preços para privacidade ou ativando módulos de negociação para mercado.',
    solution:
      "Uma rede social interativa, responsiva e de fácil uso, permitindo que a socialização digital ocorra com menos obstáculos possíveis",
    liveUrl: "https://play.google.com/store/apps/details?id=com.my_treasure_app",
    gallery: [
      prism1,
      prism2,
      prism3,
      prism4,
      prism5,
      prism6,
      prism7,
      prism8,
      prism9,
    ],
  },
  {
    slug: "hosuto",
    image: hosuto,
    title: "Dashboard de Gerenciamento Hotelar",
    category: "Sistema Administrativo",
    year: "2022",
    client: "Dione Solutions",
    industry: "Hotelaria",
    services: [
      "Interface de Usuário",
      "Experiência de Usuário",
      "Design Gráfico",
      "Design Thinking",
    ],
    description:
      "Um dashboard elaborado para o uso de diversas equipes dentro de uma rede de hoteis, permitindo melhor gerecimento de limpeza, organização, reservas, cozinha e estoque.\n\n*Nota: O sistema é privado e não está disposto publicamente.*",
    challenge:
      "Oferecer ferramentas que, digitalmente, ajudem um serviço presencial",
    solution:
      "Uma interface fácil de leitura, compactando informações e dispondo de itens de acordo com as necessidades da equipe",
    stats: [
      { label: "Hotéis", value: "12" },
      { label: "Eficiência", value: "+30%" },
    ],
  },
];

export const projects = projectsData.sort((a, b) => Number(b.year) - Number(a.year));
