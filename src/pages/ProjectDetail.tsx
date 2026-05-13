import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Loader2, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { updateSEO } from "@/lib/seo";

interface ProjectDetails {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  industry: string;
  services: string[];
  description: string;
  challenge: string;
  solution: string;
  stats: { label: string; value: string }[];
  show_gallery: boolean;
  gallery: string[];
  main_image: string;
  live_url: string;
  news_url: string;
  case_study_url: string;
  tools?: string[];
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [adjacentProjects, setAdjacentProjects] = useState<{ prev: any; next: any }>({ prev: null, next: null });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && !target.closest('.no-lightbox')) {
        const src = (target as HTMLImageElement).src;
        setSelectedImage(src);
      }
    };

    // Add click listeners to images after content is loaded
    const timer = setTimeout(() => {
      const contentArea = document.querySelector('.project-content-area');
      if (contentArea) {
        contentArea.addEventListener('click', handleImageClick);
        const images = contentArea.querySelectorAll('img');
        images.forEach(img => {
          img.style.cursor = 'pointer';
          img.classList.add('transition-all', 'duration-300', 'hover:opacity-90');
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      const contentArea = document.querySelector('.project-content-area');
      if (contentArea) {
        contentArea.removeEventListener('click', handleImageClick);
      }
    };
  }, [project, loading]);

  useEffect(() => {
    const fetchProjectAndAdjacents = async () => {
      setLoading(true);
      try {
        // Fetch current project
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error && slug !== 'nexus-imobiliaria') {
          throw error;
        }

        let projectData = data as ProjectDetails;

        // Local override for PJe2 Mobile
        if (slug === 'pje') {
          projectData = {
            ...projectData,
            title: "PJe2 Mobile",
            category: "UI/UX Design",
            year: "2024",
            client: "Justiça Federal / TRF5",
            industry: "Jurídica",
            services: ["EXPERIÊNCIA DE USUÁRIO", "INTERFACE DE USUÁRIO", "DESIGN SYSTEM", "TESTES A/B"],
            tools: ["ADOBE XD", "FIGMA", "ILLUSTRATOR", "PHOTOSHOP"],
            main_image: "https://pztkmsfxkqwbnhgjjlfu.supabase.co/storage/v1/object/public/media/project_1773330515456_b1h8cl.png",
            description: `<p class="font-bold text-primary mb-2">PLATAFORMA DE ELABORAÇÃO, CONSULTA E AJUSTES PROCESSUAIS</p>
<p>PJE2 MOBILE UI/UX DESIGN</p>`,
            challenge: `
<h1 class="text-3xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">VISÃO GERAL DO PROJETO</h1>
<p class="text-muted-foreground leading-relaxed mb-6">O PJe (Processo Judicial Eletrônico) é uma das ferramentas mais importantes no sistema jurídico atual e parte do processo de modernização da Justiça Federal. Com essa ferramenta, magistrados, advogados e outras pessoas podem acessar a um banco de dados processual e, com ferramentas internas, fazer atualizações e consultas processuais.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">O PROBLEMA</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Mesmo sendo uma plataforma moderna, havia a necessidade de uma versão mobile que oferecesse uma compatibilidade para os sistemas atuais, para expandir seus alcances além de sua versão web 2.0.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">O OBJETIVO</h3>
<p class="text-muted-foreground leading-relaxed mb-6">A elaboração de tal aplicativo com interfaces e fluxos mais modernizados, utilizando de sistemas e técnicas mais elaboradas e compreensíveis para o público utilizando de metodologias de UI/UX.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">DESAFIOS</h3>
<ul class="space-y-4 mb-6">
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Refatorar, corrigir bugs e atualizar documentação do sistema anteriormente desenvolvido pela equipe anterior, de forma a estabelecer uma base de conhecimento para elaboração do próximo.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">O sistema dispõe de muitas ferramentas e, mesmo em sua versão web 2.0, possui muitas informações dispostas, o que pode dificultar o uso da plataforma por usuários com pouca literalidade tecnológica.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Necessidade de atualização do Sistema de Autenticação com intuito de facilitar a utilização do aplicativo por magistrados e reduzir as barreiras que, muitas vezes, consomem tempo útil do usuário, sem fragilizar a segurança do sistema</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Carência de pesquisas de uso que possam auxiliar na modularização de etapas baseado em uso de determinados setores, cargos e outros usos mais comuns da plataforma</span>
  </li>
</ul>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">SOLUÇÃO</h3>
<p class="text-muted-foreground leading-relaxed mb-6">A elaboração de uma pesquisa que auxiliasse no desenvolvimento nos permitiu fazer um teste A/B com usuários existentes da plataforma onde testamos novas modificações e, com tais dados, aplicamos novas telas ao design final de nosso projeto. Refizemos os fluxos baseado nos principais usuários da plataforma e separamos os itens com baixo uso no intuito de reduzir o número de cliques/toques e facilitar a interação Usuário > Sistema.</p>
`,
            solution: `
<h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">METODOLOGIA DE PESQUISA</h2>
<p class="text-muted-foreground leading-relaxed mb-6">Primeiramente, realizamos a análise inicial para compreender o estado atual do aplicativo e identificar problemas e áreas de melhoria. Isso envolveu o estudo detalhado da documentação existente e a revisão do código-fonte e da arquitetura do aplicativo, resultando na criação de um documento de análise técnica.</p>
<p class="text-muted-foreground leading-relaxed mb-6">Em seguida, identificamos soluções viáveis para os problemas encontrados. Realizamos uma revisão de literatura, estudamos casos similares para identificar boas práticas e abordagens bem-sucedidas, e promovemos discussões colaborativas para explorar possíveis soluções tecnológicas e de design.</p>
<p class="text-muted-foreground leading-relaxed mb-6">Na etapa seguinte, realizamos o desenvolvimento do design e planejamento da nova versão do aplicativo incluindo o desenvolvimento de mockups alinhados à identidade visual da PDPJ-Br (DOCUMENTO, 2022) e UIKit.PJe.JUS (MANUAL, 2019), além do desenho de uma nova arquitetura utilizando padrões de projeto service e repository e o gerenciamento de estado com o package bloc.</p>
<p class="text-muted-foreground leading-relaxed mb-6">Durante a implementação, aplicamos boas práticas de programação com effective dart (EFFECTIVE, 2011), integrando os diferentes módulos e componentes do sistema e utilizando o package bloc (PUB, 2018) para garantir uma boa separação de responsabilidades e modularização.</p>
<p class="text-muted-foreground leading-relaxed mb-6">Por fim, realizamos uma análise comparativa entre a nova proposta e a versão antiga do aplicativo. Avaliamos as melhorias propostas em relação à versão antiga, comparando funcionalidades.</p>
<img src="/projects/pje2-mobile/1.jpg" alt="" class="w-full rounded-lg shadow-md my-8" />

<h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">ORGANIZAÇÃO DO PROJETO</h2>
<p class="text-muted-foreground leading-relaxed mb-6">Tendo como objetivo principal entregar uma nova implementação do sistema, utilizando-se dos princípios das boas práticas de programação e padrões de projeto, almejando uma melhor manutenibilidade, bem como uma nova interface de usuário, para melhoria da usabilidade, particionamos este trabalho em 4 seções, sendo elas:</p>
<ul class="space-y-4 mb-6">
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Contextualização e motivação do trabalho, como também a delimitação do assunto tratado, os objetivos gerais e específicos da pesquisa e a metodologia.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Processos de análise e desenvolvimento do projeto, fazendo um paralelo entre o estado inicial e a proposta de refatoração.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Conclusão e sugestão de futuras implementações e melhorias.</span>
  </li>
</ul>

<h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">MATERIAIS E METODOLOGIAS</h2>
<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">Effective Dart;</h3>
<p class="text-muted-foreground leading-relaxed mb-6">O Effective Dart (2011) oferece quatro guias: estilização, documentação, uso e design, com recomendações "Faça/Não Faça/Prefira/Evite/Considere" para escrever código Dart consistente, bem documentado e de alto desempenho.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">Model-View-Controller (MVC)</h3>
<p class="text-muted-foreground leading-relaxed mb-6">MVC (Model-View-Controller) é um padrão em design de software comumente usado para implementar interfaces de usuário, dados e lógica de controle. O padrão enfatiza a separação entre a lógica de negócios do software e a exibição. Sendo dividida em três partes, descritas como:</p>
<ul class="list-disc pl-5 space-y-4 mb-6 text-muted-foreground leading-relaxed">
  <li>Modelo (Model): Essa é a parte da aplicação que manipula os dados e a lógica de negócio, fazendo o gerenciamento das informações e regras da aplicação.</li>
  <li>Visualização (View): Este componente corresponde a camada de apresentação. É o que os usuários enxergam e interagem; ele exibe os dados do Modelo.</li>
  <li>Controlador (Controller): O controlador (controller) age como um intermediário entre o Model e a View. Ele processa todos os inputs, manipulando os dados do modelo e realizando atualizações nas Views quando necessárias.</li>
</ul>
<p class="text-muted-foreground leading-relaxed mb-6">Essa separação de responsabilidades proporciona uma melhor divisão do trabalho, proporcionando diversos benefícios para o desenvolvimento de software, como manutenção facilitada, uniformidade na estrutura de software, entre outros.</p>
<img src="/projects/pje2-mobile/2.jpg" alt="" class="w-full rounded-lg shadow-md my-8" />

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">Padrão Repository - Repository Pattern</h3>
<p class="text-muted-foreground leading-relaxed mb-6">O padrão Repository cria uma camada de abstração entre domínio e persistência que expõe uma interface tipo coleção para acessar objetos, centralizando a lógica de consultas e melhorando separação de responsabilidades, reutilização e testabilidade.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">Gerenciamento de estado - Package Bloc</h3>
<p class="text-muted-foreground leading-relaxed mb-6">O padrão Service encapsula a lógica de negócio numa camada intermediária entre UI/controladores e persistência, realizando validações e processamento para promover reutilização, manutenção e clara separação de responsabilidades.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">Framework Flutter</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Conforme a documentação do Flutter (2017), o Flutter é um kit de ferramentas de UI, da Google, de código aberto para criação de aplicativos, compilados nativamente para dispositivos móveis, web, desktop e incorporados a partir de uma única base de código. Dessa forma, a reutilização de elementos já padronizados nos permite acelerar e facilitar o processo de desenvolvimento e utilizar a personalização de elementos em páginas ou telas onde isso se torne mais oportuno ou necessário, evitando a utilização exacerbada de memória.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">Android Studio</h3>
<p class="text-muted-foreground leading-relaxed mb-6">O Android Studio é uma IDE para desenvolvimento Android que oferece emuladores rápidos, ferramentas de teste abrangentes e Lint para identificar problemas de desempenho/usabilidade/compatibilidade, além de suportar projetos Flutter.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">Adobe Xd</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Adobe Xd é uma ferramenta de design de experiência do usuário para aplicativos web e móveis, desenvolvida e publicada pela Adobe Systems. Esse aplicativo permite que os designers de experiência de usuário criar wireframes, protótipos interativos e designs de alta fidelidade, tudo dentro de um único aplicativo, permitindo melhor integração e facilidade em aplicação de testes com suas ferramentas de exportação e animações integradas.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">Figma</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Similar ao Xd, também é uma ferramenta para elaboração de designs focada em experiência e interface de usuário, mas sua tecnologia mais moderna e voltada para áreas mais tecnológicas permite maior integração multisistêmica e exportação de materiais com mais facilidade tanto para o desenvolvedor quanto para o desenvolvedor quanto para o designer. Posteriormente, nossos materiais foram exportados do Xd para o Figma para melhor compatibilidade.</p>

<h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">DOCUMENTO DE ANÁLISE TÉCNICA</h2>
<p class="text-muted-foreground leading-relaxed mb-6">Com o estudo da documentação do Pje 2.x mobile, fornecida pela equipe da residência anterior, elaboramos um documento de análise técnica onde encontram-se os diagramas de Caso de Uso, requisitos funcionais e não funcionais, a arquitetura, sua interface, como também uma análise detalhada do código recebido.</p>
<p class="text-muted-foreground leading-relaxed mb-6">Das funcionalidades implementadas, incluem-se :</p>
<ul class="space-y-4 mb-6">
  <li class="flex items-start gap-3"><span class="text-green-500 font-bold">•</span><span class="text-muted-foreground leading-relaxed">Edição e assinatura de minutas;</span></li>
  <li class="flex items-start gap-3"><span class="text-green-500 font-bold">•</span><span class="text-muted-foreground leading-relaxed">Assinatura de processos em lote;</span></li>
  <li class="flex items-start gap-3"><span class="text-green-500 font-bold">•</span><span class="text-muted-foreground leading-relaxed">Visualização de documentos;</span></li>
  <li class="flex items-start gap-3"><span class="text-green-500 font-bold">•</span><span class="text-muted-foreground leading-relaxed">Copiar minuta;</span></li>
  <li class="flex items-start gap-3"><span class="text-green-500 font-bold">•</span><span class="text-muted-foreground leading-relaxed">Alterar localização;</span></li>
  <li class="flex items-start gap-3"><span class="text-green-500 font-bold">•</span><span class="text-muted-foreground leading-relaxed">Pareamento de dispositivos;</span></li>
  <li class="flex items-start gap-3"><span class="text-green-500 font-bold">•</span><span class="text-muted-foreground leading-relaxed">Autenticação do magistrado;</span></li>
  <li class="flex items-start gap-3"><span class="text-green-500 font-bold">•</span><span class="text-muted-foreground leading-relaxed">Filtragem de processos;</span></li>
  <li class="flex items-start gap-3"><span class="text-green-500 font-bold">•</span><span class="text-muted-foreground leading-relaxed">Listagem de processos no perfil de magistrado.</span></li>
</ul>

<p class="text-muted-foreground leading-relaxed mb-6">Na análise da arquitetura, identificou-se o uso de hibridização, combinando as estruturas MVC e Cliente-Servidor. Observou-se uma clara separação do front-end, com o framework Flutter adotando uma arquitetura limpa. Este realiza requisições HTTP através de bibliotecas da linguagem Dart para o back-end, a API REST do CNJ, que por sua vez acessa um banco de dados PostgreSQL.</p>
<p class="text-muted-foreground leading-relaxed mb-6">Da análise do código, começando pela estrutura de pastas, como ilustrado na Figura 3, identificamos oito diretórios principais: components, data, domain, models, pages, presentation, provider e repositories. Esta organização reflete as camadas de apresentação, dados, serviços e controle.</p>

<blockquote class="border-l-4 border-primary pl-6 py-4 my-8 bg-secondary/30 rounded-r-lg italic text-muted-foreground">
  "Foram identificados trechos de código inativo, duplicações (entidades e bancos), salvamento indevido de variáveis voláteis e loops que causam atualizações contínuas, indicando necessidade de refinamento. Há incongruências de nomenclatura e mistura de responsabilidades (serviços/estado acessados diretamente nas views), falta de modularização e documentação de endpoints críticos, e baixa legibilidade por funções mal nomeadas. Uma análise com Dart Analysis revelou 67 warnings e 280 hints, principalmente variáveis não usadas e nomes fora do padrão lowerCamelCase."
</blockquote>

<h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">IMPLEMENTAÇÃO E DESENVOLVIMENTO</h2>
<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">ESTRUTURA DE PASTAS</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Optou-se pela abordagem layer-first para organizar o projeto, com pastas: app (UI e widgets por contexto), config (injeção de dependência, temas, constantes, erros), models (classes de domínio imutáveis, equatable, método empty e copyWith), providers (ponte entre UI e serviços/Blocs), repositories (acesso a dados e transformação) e services (lógica de negócio orquestrando repositórios), promovendo modularidade e separação de responsabilidades.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">ARMAZENAMENTO DE DADOS LOCAL</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Reduziu-se a quantidade de variáveis persistidas para evitar reescritas frequentes; só CPF, senha, e-mail e código de pareamento são salvos localmente com alterações mínimas, enquanto demais campos são mantidos em cache para melhorar desempenho.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">MODELS</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Refatoradas para imutabilidade: atributos finais, remoção de getters/setters, uso de equatable, método estático de objeto vazio e implementação de copyWith para criar variantes modificadas.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">SERVICES E REPOSIORIES</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Separaram-se responsabilidades retirando lógica de views/providers: repositórios cuidam de requisições e acesso a dados locais com tratamento de erros (try / Sentry), enquanto serviços executam a lógica de negócio e chamam repositórios, resultando em código mais modular, testável e seguro.</p>

<h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">INTERFACE DE USUÁRIO</h2>
<p class="text-muted-foreground leading-relaxed mb-6">Com a definição da estrutura de pastas, separação de responsabilidades, e refatoração dos métodos de armazenamento e serviços, foi necessário realizar uma remodelagem completa das telas existentes. Dessa forma, com o objetivo de alcançar uma boa modularização e separação da lógica de negócios, como também uma melhor usabilidade e estética para o aplicativo, utilizamos essa oportunidade para desenvolver uma nova interface de usuário com base nas cores do documentos de identidade visual da PDPJ-Br (DOCUMENTO, 2022) e a tipografia e ícones da UIKit.PJe.JUS (MANUAL, 2019), implementando novas funcionalidades ao longo do processo de desenvolvimento.</p>
<p class="text-muted-foreground leading-relaxed mb-6">A seguir, apresentamos as funcionalidades do aplicativo, realizando um comparativo da interface de usuário com a versão anterior.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">AUTENTICAÇÃO DE USUÁRIO</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Sendo a segurança e a usabilidade elementos essenciais, o processo de autenticação de usuários assume um papel crítico nos sistemas computacionais. Nesse contexto, realizamos a incorporação de tecnologias como a autenticação por biometria ou Face ID, visando fortalecer a segurança e a experiência do usuário. Adicionalmente, realizamos a implementação de funcionalidades, como o ocultamento e a visualização de senha,através dos ícones de um olho fechado e um olho aberto ao final do campo de senha, juntamente com recursos como formatação e validação do campo de CPF em tempo real, alterando a cor da caixa de CPF em caso de invalidade, que contribuem para uma autenticação mais robusta e amigável ao usuário.</p>

<h4 class="text-lg font-semibold mt-8 mb-4 text-foreground uppercase">NOVO FLUXO DE LOGIN</h4>
<img src="/projects/pje2-mobile/3.jpg" alt="" class="max-w-[300px] mx-auto rounded-lg shadow-md my-8" />
<p class="text-muted-foreground leading-relaxed mb-6">Apresentamos uma visão atualizada da nova interface de autenticação do usuário. Esta atualização inclui a introdução da página de seleção de usuário, projetada para se adequar ao novo fluxo de interação, e a página de login. Além das mudanças já mencionadas, foram implementadas melhorias significativas no aspecto estético do aplicativo. Destaca-se a harmonização do sistema de cores com o da PDPJ, juntamente com o uso de uma foto da sede do TRF5 como plano de fundo para as áreas de login e seleção de usuário, e remoção do Dialog de erro, substituído pelas mensagens acima do campo de CPF em cor chamativa.</p>
<p class="text-muted-foreground leading-relaxed mb-6">Outras melhorias incluíram a remoção dos botões de certificado digital, que não são utilizados, e a substituição do botão "novo acesso?" pelo botão "Ler QR code", visando facilitar o entendimento para os usuários menos experientes. Adicionalmente, foi acrescentado um checkbox na página de login, permitindo aos usuários habilitar o uso de biometria para acessos futuros.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <div>
    <img src="/projects/pje2-mobile/4.jpg" alt="" class="w-full rounded-lg shadow-md" />
  </div>
  <div>
    <img src="/projects/pje2-mobile/5.jpg" alt="" class="w-full rounded-lg shadow-md" />
  </div>
</div>
<p class="text-sm text-muted-foreground italic mb-8">ALT TEXT: Nova Interface de autenticação.</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">PAREAMENTO DE DISPOSITIVOS</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Assim como a autenticação, o pareamento de dispositivos é um elemento crucial para a segurança do sistema, onde a usabilidade desempenha um papel fundamental na promoção de uma experiência do usuário eficaz. Com esse objetivo em mente, desenvolvemos novas telas com foco na melhoria da experiência do usuário.</p>
<p class="text-muted-foreground leading-relaxed mb-6">Na interface anterior, da leitura do QR Code, introduzimos um carrossel com elementos interativos, como gifs, agrupados a instruções de passo a passo com intuito de facilitar a geração do QR code no PJe Web. Além disso, ao centro, temos a página de confirmação de dois fatores, sendo agora possível a visualização do endereço de e-mail ao qual o código de dois fatores foi enviado e a possibilidade de reenvio do código, embora esta ainda não tenha sido implementada pela API. Por fim, à direita temos a área de seleção de usuários, que uma vez verificada a validação do pareamento, somos direcionados a essa área, agora com um campo acima da seleção confirmando o registro do dispositivo ao usuário.</p>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
  <img src="/projects/pje2-mobile/6.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/7.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/8.jpg" alt="" class="w-full rounded-lg shadow-md" />
</div>
<p class="text-sm text-muted-foreground italic mb-8">ALT TEXT: TELAS PARA PAREAMENTO DE DISPOSITIVO</p>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">LOCALIZAÇÃO, LOGOUT E SOBRE</h3>
<p class="text-muted-foreground leading-relaxed mb-6">Buscando uma interface comunicativa na página inicial, removemos o antigo "drawer menu" e incorporamos suas funcionalidades diretamente à nova tela. Dessa forma, o campo de Localização agora permanece visível ao usuário, melhorando a experiência daqueles que utilizam mais de um localizador e permitindo rápida identificação do perfil em uso. Para facilitar a troca de localizador, ao clicar no campo de Localização, um menu é exibido.</p>
<p class="text-muted-foreground leading-relaxed mb-6">Adicionalmente, introduzimos uma mensagem de boas-vindas ao usuário, com o intuito de deixar a interface mais amigável, composta por "Olá, [nome do usuário]" e o CPF logo abaixo, antes localizado ao final da tela. Também foi incluído um marcador que exibe o número de processos disponíveis para assinatura na função de ato de magistrado para que o usuário esteja ciente da existência de novos processos. Como também, um botão com ícone de três pontos na vertical, para ajustes, que abre o menu de ajustes, com as opções de Ajuda, Sobre, Etiquetas e Sair.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <img src="/projects/pje2-mobile/9.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/10.jpg" alt="" class="w-full rounded-lg shadow-md" />
</div>
<p class="text-sm text-muted-foreground italic mb-8">ALT TEXT: NOVA PÁGINA INICIAL</p>

<p class="text-muted-foreground leading-relaxed mb-6">No menu de ajustes, ao clicar em Sair, foi adicionado um diálogo pedindo a confirmação do usuário para finalizar a sessão. Essa verificação foi adicionada com o intuito de evitar cliques acidentais, dessa forma melhorando a experiência do usuário.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <img src="/projects/pje2-mobile/11.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/12.jpg" alt="" class="w-full rounded-lg shadow-md" />
</div>
<p class="text-sm text-muted-foreground italic mb-8">ALT TEXT: MENU DE AJUSTES E MODAL DE CONFIRMAÇÃO</p>

<h4 class="text-lg font-semibold mt-8 mb-4 text-foreground uppercase">SOBRE, AJUDA, TERMOS DE USO E FAQ</h4>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
  <img src="/projects/pje2-mobile/13.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/14.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/15.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/16.jpg" alt="" class="w-full rounded-lg shadow-md" />
</div>

<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">ATO DE MAGISTRADO</h3>
<p class="text-muted-foreground leading-relaxed mb-6">No contexto do aplicativo, o ato de magistrado envolve diversas funcionalidades essenciais para o gerenciamento eficiente dos processos judiciais por parte dos magistrados. As funcionalidades existentes incluem:</p>

<ul class="space-y-4 mb-6">
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Editar e assinar minutas: Permite ao magistrado revisar e assinar minutas de despachos, decisões e sentenças.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Assinar processos em lote: Facilita a assinatura de múltiplos processos simultaneamente, aumentando a eficiência.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Visualização de documentos: Permite ao magistrado acessar e ler documentos relacionados aos processos.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Copiar minuta: Habilita a cópia de minutas, o que pode agilizar a produção de documentos similares.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Listagem e filtragem de processos: Permite ao magistrado visualizar uma lista de processos e aplicar filtros para encontrar processos específicos de maneira rápida e eficiente.</span>
  </li>
</ul>

<p class="text-muted-foreground leading-relaxed mb-6">E das funcionalidades adicionadas incluem:</p>
<ul class="space-y-4 mb-6 text-muted-foreground leading-relaxed">
  <li>Favoritar e conferir processos: Permite ao magistrado adicionar ou remover o processo de favoritos e/ou conferidos para realizar ações posteriores.</li>
  <li>Gerenciar etiquetas e lembretes de processos: Permite ao magistrado adicionar e/ou remover etiquetas e lembretes aos processos organizar, auxiliando a organizar e lembrar de tarefas ou prazos importantes.</li>
</ul>

<p class="text-muted-foreground leading-relaxed mb-6">A seguir, detalharemos as diferenças página por página, uma vez que as funcionalidades se repetem, o que pode tornar confusa a explicação por funcionalidade.</p>

<h4 class="text-lg font-semibold mt-8 mb-4 text-foreground uppercase">PÁGINA DE ATO DE MAGISTRADO</h4>
<p class="text-muted-foreground leading-relaxed mb-6">Nessa interface, podemos observar a listagem de processos, a quantidade de itens na lista, o filtro aplicado e é possibilidade de realizar as seguintes ações:</p>

<ul class="space-y-4 mb-6">
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Selecionar processos: Cada item da lista possui um checkbox. Ao clicar no checkbox, o processo é adicionado à lista de seleção para realizar ações em lote ou individuais.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Abrir processos: Ao clicar em um processo da lista, somos redirecionados à página de detalhes do processo específico.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Aplicar filtros na listagem: Ao escrever na barra de pesquisa ou clicar em um dos botões de filtros, aplicamos a filtragem à lista de processos.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Assinar processos selecionados: Quando um ou mais processos são selecionados, um botão de assinatura aparece. Ao clicar nele, o magistrado pode realizar a assinatura desses processos de forma individual ou em lote, conforme necessário.</span>
  </li>
</ul>

<p class="text-muted-foreground leading-relaxed mb-6">As telas desenvolvidas visam aprimorar a visualização de informações, garantindo que as informações listadas sejam significativas, facilmente acessíveis e legíveis, e fornecer as funcionalidades de forma intuitiva.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <img src="/projects/pje2-mobile/17.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/18.jpg" alt="" class="w-full rounded-lg shadow-md" />
</div>

<p class="text-muted-foreground leading-relaxed mb-6">Para a melhor visualização das informações dos processos, optamos por remover o texto Nº do processo uma vez que não é significativo. E adicionar campos para referenciar alguns dos status do processo, sendo esses os campos de data, etiquetas, os ícones de “double check”, utilizado para o status de conferido e os ícones provenientes do PJe Web de um olho riscado vermelho, para o status de sigiloso e o de um losango verde com uma seta para cima, como status de prioritário. Também acrescentamos um botão em estrela para a funcionalidade de favorito. Ao final do número do processo, foram adicionadas as letras T ou S, nomenclatura já utilizada pelos servidores para diferenciar entre processos pertencentes ao Juiz Federal Titular e Juiz Federal Substituto.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <img src="/projects/pje2-mobile/19.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/20.jpg" alt="" class="w-full rounded-lg shadow-md" />
</div>

<p class="text-muted-foreground leading-relaxed mb-6">Para melhorar a experiência do usuário e a eficiência no gerenciamento dos processos, implementamos um sistema de codificação por cores, ocultando o checkbox tradicional para o modo de seleção e utilizando no modo inicial, contêineres coloridos para indicar a classificação dos processos. Atualmente, temos duas classificações principais: urgente e normal.</p>

<p class="text-muted-foreground leading-relaxed mb-6">Os processos classificados como urgentes são destacados com um contêiner preenchido em vermelho, chamando a atenção imediata do magistrado para a necessidade de ação prioritária. Já os processos classificados como normais são indicados com um contêiner preenchido em verde, a cor principal, sugerindo que o processo está dentro do fluxo regular de trabalho.</p>

<p class="text-muted-foreground leading-relaxed mb-6">Para mudar os modos da página de ato de magistrado, foram desenvolvidas duas funcionalidades para ativar o modo de seleção. A primeira é o clique de pressionamento longo, onde o usuário mantém o item pressionado. A segunda é o gesto de arrastar o item da esquerda para a direita, ativando assim o modo de seleção. Para desativar o modo de seleção, basta arrastar um item da direita para a esquerda ou clicar no botão de voltar na barra de aplicativos (appbar).</p>

<p class="text-muted-foreground leading-relaxed mb-6">No modo de seleção, os contêineres coloridos são substituídos por checkboxes, e ao clicar neles, os processos são adicionados à lista de seleção para a realização de ações em lote ou individuais. Além disso, mudamos a cor do fundo dos itens selecionados para diferenciá-los dos não selecionados, proporcionando uma visualização mais clara e eficiente dos processos escolhidos.</p>

<p class="text-muted-foreground leading-relaxed mb-6">Em relação ao appbar, observamos a nova interface padrão da página de ato do magistrado à esquerda, na qual mantivemos a barra de pesquisa, removemos o ícone de microfone, uma vez que os teclados dos celulares fornecem uma funcionalidade idêntica para escrita de texto por voz, e reformulamos a forma de visualização dos filtros, filtros ativos e número dos processos.</p>

<img src="/projects/pje2-mobile/21.jpg" alt="" class="max-w-[400px] mx-auto rounded-lg shadow-md my-8" />

<p class="text-muted-foreground leading-relaxed mb-6">Anteriormente, os filtros eram apresentados em uma lista horizontal, exigindo que o usuário arrastasse para visualizar todas as opções e permitindo a seleção de apenas um filtro por vez. Na nova interface, substituímos essa lista por um ícone de filtro, que abre o menu de filtros ao ser clicado, sendo possível ativar mais de um filtro simultaneamente, com a quantidade de filtros aplicados sendo exibida. O primeiro valor filtrado é seguido por “+n”, onde “n” indica a quantidade de filtros ocultos, caso haja mais filtros aplicados do que a tela pode mostrar.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <img src="/projects/pje2-mobile/22.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/23.jpg" alt="" class="w-full rounded-lg shadow-md" />
</div>

<p class="text-muted-foreground leading-relaxed mb-6">Podemos observar os dois possíveis estados de visualização da quantidade de processos. O primeiro estado, à esquerda, exibe a quantidade total de processos quando nenhum filtro está aplicado. O segundo estado, à direita, é utilizado quando há algum filtro ativo, seguindo o formato "N de M", onde "N" representa o número de processos filtrados e visíveis, e "M" é o número total de processos do usuário, conforme exibido na opção sem filtros.</p>

<img src="/projects/pje2-mobile/24.jpg" alt="" class="max-w-[400px] mx-auto rounded-lg shadow-md my-8" />

<p class="text-muted-foreground leading-relaxed mb-6">Adicionalmente, realocamos o botão de assinatura para o modo de seleção na appbar, juntamente com as novas funcionalidades de conferido e favorito. Dessa forma, é possível realizar assinaturas, conferências e marcar como favorito tanto em lote quanto individualmente.</p>

<p class="text-muted-foreground leading-relaxed mb-6">Também podemos ver o botão de selecionar todos e a quantidade de processos selecionados. A quantidade é exibida no formato "N de M", onde "N" representa o número de processos selecionados e "M" é o número total de processos na lista.</p>

<img src="/projects/pje2-mobile/25.jpg" alt="" class="max-w-[400px] mx-auto rounded-lg shadow-md my-8" />

<p class="text-muted-foreground leading-relaxed mb-6">E também observamos a nova caixa de confirmação para assinatura.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <img src="/projects/pje2-mobile/26.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/27.jpg" alt="" class="w-full rounded-lg shadow-md" />
</div>

<h4 class="text-lg font-semibold mt-8 mb-4 text-foreground uppercase">PÁGINA DE DETALHES DE PROCESSO</h4>
<p class="text-muted-foreground leading-relaxed mb-6">A seguir, apresentamos a nova interface de usuário e as funcionalidades adicionadas. Para promover o acesso rápido e eficaz à informação, dividimos as funcionalidades em duas páginas: a página de Detalhes do Processo e a página de Detalhes da Minuta.</p>

<p class="text-muted-foreground leading-relaxed mb-6">As duas páginas compartilham a mesma appbar, que exibe o número do processo e um ícone de três pontinhos na horizontal, o qual referencia mais funcionalidades. Ao clicarmos nesse ícone, abre-se o menu, que permite executar as seguintes ações: assinar, conferir, favoritar, gerenciar etiquetas e gerenciar lembretes.</p>

<p class="text-muted-foreground leading-relaxed mb-6">Na página de Detalhes do Processo, agrupamos todas as informações pertinentes, combinando as abas de detalhes e documentos em uma única página, centralizando todas as informações em um só lugar. Vale destacar a adição de ícones de status na parte superior direita e a área de etiquetas na nova interface. Adicionalmente, criamos um botão na área inferior direita que direciona à área da minuta.</p>

<p class="text-muted-foreground leading-relaxed mb-6">Na página de Edição de Minuta, mantivemos a área de edição de minuta, modificando o estado no qual a página se apresenta inicialmente e o botão de ações. Agora, a minuta é exibida inicialmente apenas em modo de visualização, diferenciando-se do modo de edição pela cor de fundo cinza. Para habilitar a edição, é necessário clicar no botão de ações na parte inferior da tela. Ao acioná-lo, a cor de fundo da minuta muda para branco, permitindo a edição, e o botão passa a ter a funcionalidade de salvar. Removemos o diálogo de confirmação de salvamento, uma vez que não é necessário, e mantivemos apenas a mensagem de confirmação do salvamento.</p>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
  <img src="/projects/pje2-mobile/28.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/29.jpg" alt="" class="w-full rounded-lg shadow-md" />
  <img src="/projects/pje2-mobile/30.jpg" alt="" class="w-full rounded-lg shadow-md" />
</div>

<h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">CONCLUSÃO</h2>
<p class="text-muted-foreground leading-relaxed mb-6">A remodelagem da UI/UX do PJe2x Mobile trouxe ganhos claros em usabilidade e eficiência: a nova navegação e organização das páginas (lista de processos, detalhes e edição de minuta) tornam tarefas recorrentes, localizar, ler e assinar documentos, mais rápidas e menos cognitivamente exigentes, reduzindo passos e fricção para o magistrado. As escolhas de apresentação (ícones de status, codificação por cores, visibilidade seletiva de metadados, agrupamento de informações relevantes) melhoraram a scannability das telas e a priorização de tarefas, resultando em fluxos mais transparentes e acionáveis.</p>

<h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">SUGESTÕES</h2>
<p class="text-muted-foreground leading-relaxed mb-6">Realizar testes de usabilidade com usuários reais (magistrados e servidores) para validar heurísticas adotadas, medir eficiência (tempo por tarefa, erros) e ajustar microinterações; aplicar métricas UX (SUS, NPS, taxa de sucesso em tarefas) e testes A/B em componentes críticos (menu de filtros, ativação de seleção) antes de promover em produção; e documentar padrões de interface e comportamentos esperados para manter consistência em futuras expansões.</p>

<h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">O QUE APRENDI</h2>
<p class="text-muted-foreground leading-relaxed mb-6">Alterações relativamente pequenas de interação e visualização (modo de seleção por gesto/long press, ocultação de checkboxes, contêineres coloridos, centralização de ações na appbar) têm grande impacto na percepção de eficiência e controle do usuário; priorizar informação significativa e reduzir ruído melhora a tomada de decisão; e a separação clara entre visualização e edição (minuta em modo leitura por padrão) reduz erros e confere segurança ao fluxo de trabalho.</p>

<h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">CONSIDERAÇÕES FINAIS</h2>
<p class="text-muted-foreground leading-relaxed mb-6">Para consolidar os ganhos UX, recomenda-se integrar um ciclo contínuo de pesquisa com usuários, instrumentação de uso (telemetria anônima de interações) e validação iterativa das soluções propostas; assim, a interface evoluirá alinhada às reais necessidades dos magistrados, garantindo maior adoção, satisfação e produtividade.</p>

<div class="grid grid-cols-2 md:grid-cols-5 gap-4 my-8">
  ${[...Array(15)].map((_, i) => `<img src="/projects/pje2-mobile/${i + 31}.jpg" alt="" class="w-full rounded-lg shadow-sm hover:shadow-md transition-shadow" />`).join('')}
</div>
`
          } as ProjectDetails;
        }

        // Local override for Nexus Imobiliária
        if (slug === 'nexus-imobiliaria') {
          projectData = {
            id: 'nexus-manual',
            slug: 'nexus-imobiliaria',
            title: "Nexus Imobiliária",
            category: "Desenvolvimento",
            year: "2026",
            client: "Nexus Imobiliária",
            industry: "Imobiliária",
            services: ["UX/UI Design", "User Research", "Design System", "Desenvolvimento"],
            tools: ["Figma", "Photoshop", "Next.js", "Supabase", "Tailwind CSS", "Framer Motion", "HeroUI", "Lucide React", "Sonner", "Leaflet", "Recharts"],
            main_image: "/projects/nexus-imobiliaria/hero.png",
            description: `<p class="font-bold text-primary mb-2">ECOSSISTEMA IMOBILIÁRIO COM DASHBOARD ADMINISTRATIVO</p>
<p>Desenvolver uma plataforma para gerenciamento imobiliário para que agências possam administrar os imóveis ofertados e, também, ter informações analíticas dos imóveis mais procurados.</p>`,
            challenge: `<p>Fornecer ferramentas necessárias para que o gerenciamento imobiliário seja feito com facilidade e intuitivo para corretores de todas as idades.</p>
<ul class="list-disc pl-5 text-muted-foreground leading-relaxed space-y-2 mt-4">
  <li>Dispor informações de cada imóvel, junto de sua localização, sem sobrecarga de informações</li>
  <li>Adotar um sistema de busca de fácil compreensão para usuários de todas as idades</li>
</ul>`,
            solution: `
              <p>Para os usuários, o desenvolvimento de um mapa interativo de tecnologia própria e que forneça mais informações sobre os arredores; Para os corretores, a elaboração de uma plataforma de gerenciamento junto de uma página para edição do site a partir do dashboard, dando mais liberdade às imobiliárias sem precisar de um profissional da tecnologia para fazer correções, ajustes e administração de forma autônoma.</p>

              <h3 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">Processo de Trabalho</h3>
              <img src="/projects/nexus-imobiliaria/image11.png" alt="Processo de Trabalho" class="w-full rounded-lg shadow-md my-6" />

              <h4 class="text-xl font-semibold mt-10 mb-4 text-primary uppercase tracking-wider">Pesquisa</h4>
              <h5 class="text-lg font-semibold mb-2 text-foreground uppercase">Conhecendo o Problema</h5>
              <p class="text-muted-foreground leading-relaxed mb-8">Para iniciarmos uma plataforma que pudesse receber e divulgar imóveis, devemos entender as necessidades daqueles que irão consumir os imóveis, seja alugando ou comprando-os, como também até onde os corretores e as próprias agências imobiliárias possam ter seu trabalho facilitado ou aprimorado. O que foi almejado partia de facilidade e compreensão multi-tela, que dá ao usuário, ora comprador ora corretor, inteiro controle sob a plataforma. Ao fazermos isso passamos primeiro pela jornada do usuário para, então posteriormente, prototiparmos o que então seria utilizado e pelo fluxograma de cada interface e como elas interariam entre si.</p>

              <h5 class="text-lg font-semibold mt-8 mb-2 text-foreground uppercase">Jornada de Usuário</h5>
              <img src="/projects/nexus-imobiliaria/image26.png" alt="Jornada de Usuário" class="w-full rounded-lg shadow-md my-4" />

              <h5 class="text-lg font-semibold mt-8 mb-2 text-foreground uppercase">Protótipo do Usuário</h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <img src="/projects/nexus-imobiliaria/image9.png" alt="Protótipo do Usuário" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image3.png" alt="Protótipo do Usuário 2" class="w-full rounded-lg shadow-md" />
              </div>

              <h5 class="text-lg font-semibold mt-8 mb-2 text-foreground uppercase">Fluxograma</h5>
              <img src="/projects/nexus-imobiliaria/image21.png" alt="Fluxograma" class="w-full rounded-lg shadow-md my-4" />

              <h4 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Solucionando o Problema</h4>
              <h5 class="text-lg font-semibold mb-2 text-foreground uppercase">Usabilidade, Testes e Ferramentas</h5>
              <p class="text-muted-foreground leading-relaxed mb-6">Para o estudo mais apropriado, criamos personas que serviram de referência para nos guiar pelo design e desenvolvimento do sistema.</p>
              <p class="text-muted-foreground leading-relaxed italic mb-8">Márcia, corretora; Pablo, proprietário de um imóvel; Karla, interessada em adquirir um imóvel. Como Pablo e Karla só conseguiriam seguir com seus interesses se Márcia tiver sua plataforma, então iniciemos pela mesma.</p>

              <h5 class="text-lg font-semibold mt-10 mb-4 text-foreground uppercase tracking-wider text-primary">Márcia</h5>
              <p class="text-muted-foreground leading-relaxed mb-6">Como corretora, o objetivo de Márcia é anunciar seus imóveis para o público geral. Ela possui algumas rotas iniciais que definem suas ações e que, posteriormente, fazem parte da construção do site.</p>
              
              <ul class="list-disc pl-5 text-muted-foreground leading-relaxed space-y-2 mb-8">
                <li>Gerenciar Propriedades</li>
                <li>Anunciar Imóvel</li>
              </ul>

              <h6 class="text-base font-semibold mb-2 text-primary uppercase">Anunciar Imóvel</h6>
              <p class="text-muted-foreground leading-relaxed mb-6">Márcia recebeu, de um conhecido, o pedido de gerir a venda de seu imóvel, um apartamento localizado na Av. Prudente de Morais 1345. Ao fazer login na plataforma, Márcia pressiona o botão de “Novo Imóvel” para seguir seus passos. O botão, por ser a ação principal da plataforma e motor de seu comércio, se destaca visualmente de outras interações do menu lateral.</p>
              <img src="/projects/nexus-imobiliaria/image31.png" alt="Dashboard" class="w-full rounded-lg shadow-md my-6" />

              <p class="text-muted-foreground leading-relaxed mb-6">Márcia se depara com a ficha cadastral do imóvel onde ela poderá inserir os dados do imóvel fornecido por seu conhecido.</p>
              <img src="/projects/nexus-imobiliaria/image20.png" alt="Cadastro de Imóvel" class="w-full rounded-lg shadow-md my-6" />

              <p class="text-muted-foreground leading-relaxed mb-6">Após conclusão do preenchimento de dados, Márcia tem como observar uma prévia do anúncio como miniatura assim como também tem a opção de publicar o imóvel que acabou de descrever.</p>
              <img src="/projects/nexus-imobiliaria/image23.png" alt="Preview" class="w-full rounded-lg shadow-md my-6" />

              <p class="text-muted-foreground leading-relaxed mb-6">Posteriormente, se marcado como ativo, o imóvel já irá aparecer no site. Permitindo que os futuros clientes de Márcia possam conferir a propriedade anunciada.</p>

              <h6 class="text-base font-semibold mt-10 mb-2 text-primary uppercase">Editar Anúncio</h6>
              <p class="text-muted-foreground leading-relaxed mb-6">Após alguns anúncios criados, Márcia percebeu que esqueceu alguns detalhes de outro imóvel. Logo, ela retoma ao Dashboard administrativo e procura a propriedade que ela possui interesse em modificar.</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <img src="/projects/nexus-imobiliaria/image5.png" alt="Edit 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image8.png" alt="Edit 2" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image28.png" alt="Edit 3" class="w-full rounded-lg shadow-md" />
              </div>
              <p class="text-muted-foreground leading-relaxed mb-8">As modificações feitas por Márcia, ao Salvar, já entram no ar, reduzindo o tempo de espera que normalmente se aplicaria em plataformas tradicionais.</p>

              <h6 class="text-base font-semibold mt-10 mb-2 text-primary uppercase">Conferir Desempenho</h6>
              <p class="text-muted-foreground leading-relaxed mb-6">Após uns dias de suas publicações, Márcia resolve conferir o desempenho de suas publicações. Para isso, ela se direciona a página de Analytics localizada no menu lateral para ter acesso à informações extras.</p>
              <img src="/projects/nexus-imobiliaria/image14.png" alt="Analytics" class="w-full rounded-lg shadow-md my-6" />
              <p class="text-muted-foreground leading-relaxed mb-6">Nessa página, Márcia tem a possibilidade de ver tantos os horários de acesso, dispositivos e imóveis mais vistos, tudo seguindo as normas da LGPD.</p>
              <img src="/projects/nexus-imobiliaria/image1.png" alt="Analytics Detail" class="w-full rounded-lg shadow-md my-6" />

              <p class="text-muted-foreground leading-relaxed mb-6">Com essas informações, Márcia agora tem a possibilidade de ajustar suas listagens de acordo com o que o público mais pesquisa. Os interessados nos anúncios podem contatar Márcia diretamente em seu WhatsApp fornecido na página do imóvel.</p>
              <img src="/projects/nexus-imobiliaria/image15.png" alt="Contato" class="w-full rounded-lg shadow-md my-6" />

              <h5 class="text-lg font-semibold mt-12 mb-4 text-foreground uppercase tracking-wider text-primary">Administrativo</h5>
              <h6 class="text-base font-semibold mb-2 text-primary uppercase">Adicionar Colaboradores</h6>
              <p class="text-muted-foreground leading-relaxed mb-6">Com o sucesso de vendas, sua corretora agora precisa de mais colaboradores. Para isso, Márcia se direciona ao dashboard e entra na página de equipes onde, de lá, poderá dar acesso aos seus colaboradores.</p>
              <img src="/projects/nexus-imobiliaria/image19.png" alt="Equipe" class="w-full rounded-lg shadow-md my-6" />
              <p class="text-muted-foreground leading-relaxed mb-6">Na inserção do Colaborador, Márcia poderá decidir suas permissões e definir outras informações.</p>
              <img src="/projects/nexus-imobiliaria/image6.png" alt="Permissões" class="w-full rounded-lg shadow-md my-6" />
              
              <div class="space-y-4 mb-10">
                <p class="text-muted-foreground"><strong>Equipe (Staff)</strong> - Pode conferir o desempenho dos imóveis em Analytics e sugerir edições.</p>
                <p class="text-muted-foreground"><strong>Corretor</strong> - Herda permissões da Staff e também pode fazer o gerenciamento de Imóveis.</p>
                <p class="text-muted-foreground"><strong>Gerente</strong> - Herda permissões anteriores e pode inserir outros colaboradores.</p>
              </div>

              <h6 class="text-base font-semibold mt-10 mb-2 text-primary uppercase">Conferir Histórico</h6>
              <p class="text-muted-foreground leading-relaxed mb-6">Agora, com novos funcionários, Márcia pode conferir as últimas atividades e interações feitas por eles. Dessa forma, ela pode gerenciar melhor sua agência.</p>
              <img src="/projects/nexus-imobiliaria/image13.png" alt="Histórico" class="w-full rounded-lg shadow-md my-6" />

              <h3 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider text-primary">Karla</h3>
              <p class="text-muted-foreground leading-relaxed mb-6">Recém chegada na cidade do Natal, no Rio Grande do Norte, possui um interesse ávido de morar em um apartamento em Lagoa Nova. Buscando em mecanismos de pesquisa, Karla encontra o site da Athaydes Imóveis que utiliza o sistema da Nexus Imobiliária.</p>
              <h5 class="text-lg font-semibold mb-2 text-foreground uppercase">Buscando o Imóvel dos Sonhos</h5>
              <p class="text-muted-foreground leading-relaxed mb-6">Assim que Karla entra no site, a mesma percebe que já se depara com os campos de pesquisa de imóveis e digita as informações que deseja.</p>
              <img src="/projects/nexus-imobiliaria/image7.png" alt="Busca" class="w-full rounded-lg shadow-md my-6" />
              <p class="text-muted-foreground leading-relaxed mb-6">Ao clicar em Buscar Imóveis, para felicidade de Karla, os resultados aparecem junto de um Mapa que mostra a localização exata dos imóveis.</p>
              <img src="/projects/nexus-imobiliaria/image18.png" alt="Mapa" class="w-full rounded-lg shadow-md my-6" />
              <p class="text-muted-foreground leading-relaxed mb-6">Ao clicar no resultado, Karla encontra as informações que achou necessárias na página de descrição do imóvel.</p>
              <img src="/projects/nexus-imobiliaria/image30.png" alt="Descrição" class="w-full rounded-lg shadow-md my-6" />
              <img src="/projects/nexus-imobiliaria/image33.png" alt="Mensageiro" class="w-full rounded-lg shadow-md my-6" />

              <h3 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider text-primary">Pablo</h3>
              <p class="text-muted-foreground leading-relaxed mb-6">Proprietário de uma casa, Pablo decidiu que quer fazer uma viagem para o exterior e achou ideal anunciar seu imóvel para alugar.</p>
              <img src="/projects/nexus-imobiliaria/image24.png" alt="Anunciar" class="w-full rounded-lg shadow-md my-6" />
              <p class="text-muted-foreground leading-relaxed mb-6">Para satisfação de Pablo, ele pôde economizar tempo pois se deparou com um preenchimento de uma ficha que já permitiu que ele enviasse informações do imóvel.</p>
              <div class="grid grid-cols-2 gap-4 my-6">
                <img src="/projects/nexus-imobiliaria/image12.png" alt="Ficha 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image27.png" alt="Ficha 2" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image2.png" alt="Ficha 3" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image10.png" alt="Ficha 4" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image29.png" alt="Ficha 5" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image25.png" alt="Ficha 6" class="w-full rounded-lg shadow-md" />
              </div>

              <h4 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Criando o Produto Final</h4>
              <h5 class="text-lg font-semibold mb-2 text-foreground uppercase">Tech Stack & Decisões Arquiteturais</h5>
              <div class="space-y-6 my-8">
                <div>
                  <h6 class="text-primary font-bold text-sm">Core Framework & Linguagem</h6>
                  <p class="text-muted-foreground text-sm">Next.js 16 (App Router), React 19, TypeScript.</p>
                </div>
                <div>
                  <h6 class="text-primary font-bold text-sm">Backend as a Service (BaaS)</h6>
                  <p class="text-muted-foreground text-sm">Supabase (PostgreSQL, Auth, Storage).</p>
                </div>
                <div>
                  <h6 class="text-primary font-bold text-sm">UI/UX, Estilização & Experiência</h6>
                  <p class="text-muted-foreground text-sm">Tailwind CSS v4, Framer Motion, HeroUI, Lucide React, Sonner.</p>
                </div>
                <div>
                  <h6 class="text-primary font-bold text-sm">Mapas e Analytics</h6>
                  <p class="text-muted-foreground text-sm">Leaflet & React-Leaflet, Recharts.</p>
                </div>
                <div>
                  <h6 class="text-primary font-bold text-sm">Experiência Mobile Híbrida</h6>
                  <p class="text-muted-foreground text-sm">Web Haptics para feedback tátil.</p>
                </div>
              </div>

              <h4 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Galeria</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <img src="/projects/nexus-imobiliaria/image17.png" alt="Gallery 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image22.png" alt="Gallery 2" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image4.png" alt="Gallery 3" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image32.png" alt="Gallery 4" class="w-full rounded-lg shadow-md" />
                <img src="/projects/nexus-imobiliaria/image16.png" alt="Gallery 5" class="w-full rounded-lg shadow-md" />
              </div>

              <h4 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Conclusão</h4>
              <p class="text-muted-foreground leading-relaxed mb-8">O usuário sempre precisa ter ao seu alcance quantas ferramentas ele puder se facilitarem suas ações, mas é responsabilidade do Designer garantir que elas sejam distribuídas de forma equilibrada para nunca sobrecarregar mas que dê mais poder ao usuário e a sensação de pertencimento e familiaridade.</p>
            `
          } as ProjectDetails;
        }

        // Local override for Jovem Potiguar
        if (slug === 'jovem-potiguar') {
          projectData = {
            ...projectData,
            title: "Jovem Potiguar",
            category: "Pesquisa - Caso de Estudo",
            industry: "Educação / Governo",
            client: "IFRN / SETHAS",
            services: ["UX/UI Design", "User Research"],
            tools: ["Photoshop", "Figma", "Adobe XD"],
            live_url: "https://funcern.br/projetos/programa-jovem-potiguar/",
            news_url: "https://portal.ifrn.edu.br/campus/reitoria/noticias/jovem-potiguar-abertas-as-inscricoes-para-840-vagas-em-cursos-de-qualificacao-no-rn/",
            description: `<p class="font-bold text-primary mb-2">EXPANDINDO E REESTRUTURANDO AS BARREIRAS EDUCACIONAIS</p>
<p>Desenvolver uma plataforma para ofertar vagas educacionais do Instituto Federal do Rio Grande do Norte a estudantes cadastrados no CadÚnico e possibilitar que estudantes de baixa renda possam ter acesso a cursos técnicos de qualidade, expandindo as barreiras multidisciplinares dos cadastrados.</p>`,
            challenge: `<p>Desenvolver protótipos, telas e fluxos para múltiplos usuários reduzindo possíveis dificuldades e para que o usuário não se depare com barreiras que possam impossibilitar seu cadastro no sistema.</p>
<ul class="list-disc pl-5 text-muted-foreground leading-relaxed space-y-2 mt-4">
  <li>Responsividade em telas pequenas sem excesso de conteúdo</li>
  <li>Fornecer todas informações necessárias sem sobrecarregar o usuário</li>
  <li>Interface familiar para usuários do CadÚnico e outros sistemas governamentais</li>
</ul>`,
            solution: `
              <p>Dividir as jornadas do usuário em passos pequenos, compreensíveis e guiando o usuário visualmente para a conclusão do seu cadastro, fornecendo o maior número de informações possíveis para sanar dúvidas que foram obtidas através de pesquisas elaboradas em outros projetos realizados pela mesma instituição.</p>

              <h3 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">Processo de Trabalho</h3>
              <img src="/projects/jovem-potiguar/image9.png" alt="Processo de Trabalho" class="w-full rounded-lg shadow-md my-6" />

              <h4 class="text-xl font-semibold mt-10 mb-4 text-primary uppercase tracking-wider">Pesquisa</h4>
              <h5 class="text-lg font-semibold mb-2 text-foreground uppercase">Conhecendo o Problema</h5>
              <p class="text-muted-foreground leading-relaxed mb-8">Para encontrar o problema, devemos primeiro entender o produto e o que ele está tentando alcançar. Fazemos isso passando primeiro pela jornada do usuário, pelo protótipo do usuário e pelo fluxograma das interfaces cadastrais e como elas interagem entre si. Podemos, então, analisar essa experiência tela a tela junto da experiência do usuário e começar a identificar o que está funcionando e onde há áreas de melhoria.</p>

              <h5 class="text-lg font-semibold mt-8 mb-2 text-foreground uppercase">Jornada do Usuário</h5>
              <img src="/projects/jovem-potiguar/image1.png" alt="Jornada do Usuário" class="w-full rounded-lg shadow-md my-4" />

              <h5 class="text-lg font-semibold mt-8 mb-2 text-foreground uppercase">Protótipo do Usuário</h5>
              <img src="/projects/jovem-potiguar/image16.png" alt="Protótipo do Usuário" class="w-full rounded-lg shadow-md my-4" />

              <h5 class="text-lg font-semibold mt-8 mb-2 text-foreground uppercase">Fluxograma</h5>
              <img src="/projects/jovem-potiguar/image13.png" alt="Fluxograma" class="w-full rounded-lg shadow-md my-4" />

              <h4 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Solucionando o Problema</h4>
              <h5 class="text-lg font-semibold mb-2 text-foreground uppercase">Wireframing</h5>
              <p class="text-muted-foreground leading-relaxed mb-6">Agora que os problemas foram identificados, podemos começar a criar nossos wireframes iniciais e a desenvolver soluções para esses problemas.</p>
              <div class="grid grid-cols-2 gap-4 my-6">
                <img src="/projects/jovem-potiguar/image4.png" alt="Wireframe 1" class="w-full rounded-lg shadow-md aspect-auto" />
                <img src="/projects/jovem-potiguar/image14.png" alt="Wireframe 2" class="w-full rounded-lg shadow-md aspect-auto" />
                <img src="/projects/jovem-potiguar/image8.png" alt="Wireframe 3" class="w-full rounded-lg shadow-md aspect-auto" />
                <img src="/projects/jovem-potiguar/image6.png" alt="Wireframe 4" class="w-full rounded-lg shadow-md aspect-auto" />
              </div>

              <h5 class="text-lg font-semibold mt-10 mb-2 text-foreground uppercase">Teste de Usabilidade</h5>
              <p class="text-muted-foreground leading-relaxed mb-6">Nosso teste de usabilidade foi dividido em duas etapas. A primeira, a Secretaria de Estado do Trabalho, da Habitação e da Assistência Social tinha desenvolvido um projeto anteriormente ao Jovem Potiguar que, em dado momento, possuía relatórios de usabilidade de telas e interações similares às utilizadas no projeto em questão. Entender o comportamento de um certo grupo de usuários é vital para o desenvolvimento de usabilidade. Posteriormente, fizemos testes internos com participantes que não interagiram com o protótipo inicial e que nos permitissem testar todos os gatilhos e cenários possíveis dentro da plataforma utilizando de cadastros-teste. Nesses testes, chegamos à conclusão de que as alterações feitas foram super fáceis e claras para os usuários entenderem. Todos conseguiram finalizar os cadastros muito mais rápido e fácil, sem confusão, principalmente quando comparado a outros sistemas de cadastros públicos. O sistema, agora, estava um passo mais próximo para receber e enviar cadastros ao IFRN.</p>
              <img src="/projects/jovem-potiguar/image15.png" alt="Teste de Usabilidade" class="w-full rounded-lg shadow-md my-6" />

              <h4 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Criando o Produto Final</h4>
              <h5 class="text-lg font-semibold mb-2 text-foreground uppercase">Mood Board &gt; Guia de Estilo &gt; Mockups</h5>
              <p class="text-muted-foreground leading-relaxed mb-6">Com os nossos wireframes aprovados na fase de Teste de Usuário, temos agora luz verde para começar a criar os nossos mockups finais e renderizações destas telas. Ao fazer isso, procuramos manter-nos fiéis ao estilo artístico e à atmosfera (mood) que já tinham sido estabelecidos dentro da plataforma.</p>
              <img src="/projects/jovem-potiguar/image10.png" alt="Mood Board" class="w-full rounded-lg shadow-md my-6" />

              <h5 class="text-lg font-semibold mt-10 mb-4 text-foreground uppercase">Guia Visual</h5>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <img src="/projects/jovem-potiguar/image5.png" alt="Guia Visual 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/jovem-potiguar/image2.png" alt="Guia Visual 2" class="w-full rounded-lg shadow-md" />
                <img src="/projects/jovem-potiguar/image7.png" alt="Guia Visual 3" class="w-full rounded-lg shadow-md" />
              </div>

              <h5 class="text-lg font-semibold mt-10 mb-4 text-foreground uppercase">Mockups</h5>

              <h6 class="text-base font-semibold mb-2 text-primary uppercase">Tela de Início</h6>
              <img src="/projects/jovem-potiguar/image11.png" alt="Tela de Início" class="w-full rounded-lg shadow-md mb-8" />

              <h6 class="text-base font-semibold mb-2 text-primary uppercase">Informações do Curso + Pré-Cadastro</h6>
              <img src="/projects/jovem-potiguar/image17.png" alt="Informações do Curso" class="w-full rounded-lg shadow-md mb-8" />

              <h6 class="text-base font-semibold mb-2 text-primary uppercase">Tela com Resultados</h6>
              <img src="/projects/jovem-potiguar/image3.png" alt="Tela com Resultados" class="w-full rounded-lg shadow-md mb-8" />

              <h4 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Passos Finais</h4>
              <h5 class="text-lg font-semibold mb-2 text-foreground uppercase">Teste de Acessibilidade</h5>
              <p class="text-muted-foreground leading-relaxed mb-6">Com todos os mockups finalizados, todas as telas precisam passar por uma revisão final para garantir que sejam acessíveis a todos os nossos usuários. Após cada uma de nossas telas passar pelo teste de daltonismo/deficiência visual, elas podem ser aprovadas e estarão prontas para irem ao ar.</p>
              <img src="/projects/jovem-potiguar/image12.png" alt="Teste de Acessibilidade" class="w-full rounded-lg shadow-md my-6" />

              <h4 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Conclusão</h4>
              <h5 class="text-lg font-semibold mb-2 text-foreground uppercase">O Que Aprendi</h5>
              <p class="text-muted-foreground leading-relaxed mb-8">Ao longo do projeto, aprendi como usar UX/UI para aproximar as intenções de instituições dos compromissos do público-geral. Também aprimorei configurações e condução de Testes de Usabilidade/Entrevistas para compreender melhor as necessidades dos usuários e corrigir problemas de UX de forma antecipada. Por último, ganhei um melhor entendimento de como os desafios de acessibilidade podem ser abordados em plataformas, por mais simples que elas possam parecer.</p>

              <h4 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Resultados</h4>
              <ul class="list-disc pl-5 text-muted-foreground leading-relaxed space-y-2">
                <li>O projeto já atendeu mais de 4000 alunos no estado do Rio Grande do Norte</li>
                <li>O site teve um sucesso de usabilidade, recebendo inúmeros cadastros desde o dia 1.</li>
                <li>Com um estudo e protótipo future-proof, a plataforma foi usada em 2023, 2024 e também 2025 sem alterações necessárias em UI/UX</li>
              </ul>
            `
          };
        }

        // Local override for Spillfabrikken
        if (slug === 'spillfabrikken') {
          projectData = {
            ...projectData,
            show_gallery: true,
            gallery: [
              "/projects/spillfabrikken/1.jpg",
              "/projects/spillfabrikken/2.jpg",
              "/projects/spillfabrikken/3.jpg",
              "/projects/spillfabrikken/4.jpg",
              "/projects/spillfabrikken/5.jpg",
              "/projects/spillfabrikken/6.jpg",
              "/projects/spillfabrikken/7.jpg",
              "/projects/spillfabrikken/8.png",
              "/projects/spillfabrikken/9.png",
              "/projects/spillfabrikken/10.png",
              "/projects/spillfabrikken/11.png",
              "/projects/spillfabrikken/12.png",
              "/projects/spillfabrikken/13.png",
              "/projects/spillfabrikken/14.png",
              "/projects/spillfabrikken/15.png",
              "/projects/spillfabrikken/16.png",
              "/projects/spillfabrikken/17.png",
              "/projects/spillfabrikken/18.png",
              "/projects/spillfabrikken/19.png",
              "/projects/spillfabrikken/20.png",
              "/projects/spillfabrikken/21.png",
              "/projects/spillfabrikken/22.png",
              "/projects/spillfabrikken/23.png",
              "/projects/spillfabrikken/24.png",
              "/projects/spillfabrikken/25.gif",
              "/projects/spillfabrikken/26.jpg",
              "/projects/spillfabrikken/27.jpg",
              "/projects/spillfabrikken/28.jpg",
              "/projects/spillfabrikken/29.jpg",
              "/projects/spillfabrikken/30.png",
              "/projects/spillfabrikken/31.png",
              "/projects/spillfabrikken/32.png",
              "/projects/spillfabrikken/33.png",
              "/projects/spillfabrikken/34.jpg",
              "/projects/spillfabrikken/35.jpg",
              "/projects/spillfabrikken/36.png",
              "/projects/spillfabrikken/37.png",
              "/projects/spillfabrikken/38.png",
              "/projects/spillfabrikken/39.png",
              "/projects/spillfabrikken/40.png",
              "/projects/spillfabrikken/41.png",
              "/projects/spillfabrikken/42.png",
              "/projects/spillfabrikken/43.png",
              "/projects/spillfabrikken/44.png",
              "/projects/spillfabrikken/45.png",
              "/projects/spillfabrikken/46.png",
              "/projects/spillfabrikken/47.png",
              "/projects/spillfabrikken/48.png",
              "/projects/spillfabrikken/49.png",
              "/projects/spillfabrikken/50.png",
              "/projects/spillfabrikken/51.png",
              "/projects/spillfabrikken/52.png",
              "/projects/spillfabrikken/53.png",
              "/projects/spillfabrikken/54.png",
              "/projects/spillfabrikken/55.png",
              "/projects/spillfabrikken/56.png",
              "/projects/spillfabrikken/57.png",
              "/projects/spillfabrikken/58.png",
              "/projects/spillfabrikken/59.png",
              "/projects/spillfabrikken/60.png",
              "/projects/spillfabrikken/61.png",
              "/projects/spillfabrikken/62.png",
              "/projects/spillfabrikken/63.png",
              "/projects/spillfabrikken/64.png",
              "/projects/spillfabrikken/65.png",
              "/projects/spillfabrikken/66.png",
              "/projects/spillfabrikken/67.png",
              "/projects/spillfabrikken/68.gif",
              "/projects/spillfabrikken/69.png",
              "/projects/spillfabrikken/70.png",
              "/projects/spillfabrikken/71.png",
              "/projects/spillfabrikken/72.png",
              "/projects/spillfabrikken/73.png",
              "/projects/spillfabrikken/74.gif",
              "/projects/spillfabrikken/75.png",
              "/projects/spillfabrikken/76.png",
              "/projects/spillfabrikken/77.png",
              "/projects/spillfabrikken/78.png"
            ]
          };
        }

        setProject(projectData);
        updateSEO(projectData.title, projectData.description?.replace(/<[^>]*>?/gm, '').substring(0, 160), projectData.main_image);

        // Fetch prev and next for navigation (simple heuristic based on year/created_at sorting)
        // Because getting exact previous/next requires complex window functions,
        // we just fetch all slugs and titles sorted, then find current index.
        const { data: dbProjects } = await supabase
          .from("projects")
          .select("slug, title")
          .order("year", { ascending: false })
          .order("created_at", { ascending: false });

        let allProjects = dbProjects || [];
        
        // Inject manual projects if not in DB for navigation
        if (!allProjects.some(p => p.slug === 'nexus-imobiliaria')) {
          allProjects = [{ slug: 'nexus-imobiliaria', title: 'Nexus Imobiliária' }, ...allProjects];
        }

        if (allProjects.length > 0) {
          const currentIndex = allProjects.findIndex(p => p.slug === slug);
          setAdjacentProjects({
            prev: currentIndex > 0 ? allProjects[currentIndex - 1] : null,
            next: currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null,
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        navigate("/projects", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndAdjacents();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading || !project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const { prev: prevProject, next: nextProject } = adjacentProjects;

  return (
    <div className="min-h-screen bg-background project-content-area">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Projetos
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">
                  {project.category.toUpperCase()}
                </p>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
                  {project.title}
                </h1>
              </div>
              <span className="font-display text-6xl md:text-8xl font-bold text-muted/30">
                {project.year}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      {project.main_image && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pb-20"
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="relative overflow-hidden rounded-3xl aspect-[16/9] bg-card border border-white/5">
              <img
                src={project.main_image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.section>
      )}

      {/* Project Details */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Info Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {project.client && (
                <div>
                  <h3 className="font-body text-sm tracking-[0.2em] text-muted-foreground mb-3">CLIENTE</h3>
                  <p className="font-display text-xl text-foreground">{project.client}</p>
                </div>
              )}
              {project.services && project.services.length > 0 && (
                <div>
                  <h3 className="font-body text-sm tracking-[0.2em] text-muted-foreground mb-3">SERVIÇOS</h3>
                  <ul className="space-y-2">
                    {project.services.map((service, idx) => (
                      <li key={idx} className="font-body text-foreground">{service}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.industry && (
                <div>
                  <h3 className="font-body text-sm tracking-[0.2em] text-muted-foreground mb-3">INDÚSTRIA</h3>
                  <p className="font-display text-xl text-foreground">{project.industry}</p>
                </div>
              )}
              {project.tools && project.tools.length > 0 && (
                <div>
                  <h3 className="font-body text-sm tracking-[0.2em] text-muted-foreground mb-3">FERRAMENTAS</h3>
                  <ul className="space-y-2">
                    {project.tools.map((tool, idx) => (
                      <li key={idx} className="font-body text-foreground">{tool}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-4">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-medium rounded-full hover:glow-accent transition-all duration-300 w-full sm:w-auto"
                  >
                    {project.slug === 'jovem-potiguar' ? 'Ver mais' : 'Ver Site'}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.news_url && (
                  <a
                    href={project.news_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-body text-sm font-medium rounded-full hover:bg-secondary transition-all duration-300 w-full sm:w-auto"
                  >
                    Ver Notícia
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.case_study_url && (
                  <a
                    href={project.case_study_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary font-body text-sm font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full sm:w-auto"
                  >
                    Ler Estudo de Caso
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Description Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-12"
            >
              {project.description && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">Visão Geral</h3>
                  <div
                    className="prose prose-invert prose-p:font-body prose-p:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </div>
              )}
              {project.challenge && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">O Desafio</h3>
                  <div
                    className="prose prose-invert prose-p:font-body prose-p:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.challenge }}
                  />
                </div>
              )}
              {project.solution && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">A Solução</h3>
                  <div
                    className="prose prose-invert prose-p:font-body prose-p:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.solution }}
                  />
                </div>
              )}

              {project.stats && project.stats.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-border/50">
                  {project.stats.map((stat, index) => (
                    <div key={index}>
                      <div className="font-display text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.show_gallery && project.gallery && project.gallery.length > 0 && (
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold text-foreground mb-12"
            >
              Galeria do Projeto
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="overflow-hidden rounded-2xl bg-background border border-white/5 aspect-video flex-col"
                >
                  <img
                    src={img}
                    alt={`${project.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Anterior</p>
                  <p className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-4 md:flex-row-reverse md:text-right"
              >
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Próximo</p>
                  <p className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {nextProject.title}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedImage} 
              alt="Expanded view" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
