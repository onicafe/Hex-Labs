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

        if (error && slug !== 'nexus-imobiliaria' && slug !== 'pje2-mobile') {
          throw error;
        }

        let projectData = data as ProjectDetails;

        // Local override for PJe2 Mobile
        if (slug === 'pje2-mobile') {
          projectData = {
            id: 'pje2-manual',
            slug: 'pje2-mobile',
            title: "PJe2 Mobile",
            category: "UI/UX Design",
            year: "2025",
            client: "Justiça Federal / TRF5",
            industry: "Jurídica",
            services: ["Experiência de Usuário", "Interface de Usuário", "Design System", "Testes A/B"],
            tools: ["Adobe XD", "Figma", "Illustrator", "Photoshop"],
            main_image: "/projects/pje2-mobile/3.jpg",
            description: `<p class="font-bold text-primary mb-2">PLATAFORMA DE ELABORAÇÃO, CONSULTA E AJUSTES PROCESSUAIS</p>
<p>O PJe (Processo Judicial Eletrônico) é uma das ferramentas mais importantes no sistema jurídico atual e parte do processo de modernização da Justiça Federal.</p>`,
            challenge: `<h3 class="text-xl font-semibold mb-4 text-primary uppercase tracking-wider">O Problema</h3>
<p>Mesmo sendo uma plataforma moderna, havia a necessidade de uma versão mobile que oferecesse uma compatibilidade para os sistemas atuais, para expandir seus alcances além de sua versão web 2.0.</p>
<h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">Desafios</h3>
<ul class="space-y-4 mt-4">
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
    <span class="text-muted-foreground leading-relaxed">Necessidade de atualização do Sistema de Autenticação com intuito de facilitar a utilização do aplicativo por magistrados e reduzir as barreiras que, muitas vezes, consomem tempo útil do usuário, sem fragilizar a segurança do sistema.</span>
  </li>
  <li class="flex items-start gap-3">
    <span class="text-green-500 font-bold">•</span>
    <span class="text-muted-foreground leading-relaxed">Carência de pesquisas de uso que possam auxiliar na modularização de etapas baseado em uso de determinados setores, cargos e outros usos mais comuns da plataforma.</span>
  </li>
</ul>`,
            solution: `
              <h3 class="text-xl font-semibold mb-4 text-primary uppercase tracking-wider">O Objetivo</h3>
              <p>A elaboração de tal aplicativo com interfaces e fluxos mais modernizados, utilizando de sistemas e técnicas mais elaboradas e compreensíveis para o público utilizando de metodologias de UI/UX.</p>

              <h3 class="text-xl font-semibold mt-8 mb-4 text-primary uppercase tracking-wider">Solução</h3>
              <p>A elaboração de uma pesquisa que auxiliasse no desenvolvimento nos permitiu fazer um teste A/B com usuários existentes da plataforma onde testamos novas modificações e, com tais dados, aplicamos novas telas ao design final de nosso projeto. Refizemos os fluxos baseado nos principais usuários da plataforma e separamos os itens com baixo uso no intuito de reduzir o número de cliques/toques e facilitar a interação Usuário > Sistema.</p>

              <h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">Metodologia de Pesquisa</h2>
              <div class="space-y-6">
                <p>Primeiramente, realizamos a análise inicial para compreender o estado atual do aplicativo e identificar problemas e áreas de melhoria. Isso envolveu o estudo detalhado da documentação existente e a revisão do código-fonte e da arquitetura do aplicativo, resultando na criação de um documento de análise técnica.</p>
                <p>Em seguida, identificamos soluções viáveis para os problemas encontrados. Realizamos uma revisão de literatura, estudamos casos similares para identificar boas práticas e abordagens bem-sucedidas, e promovemos discussões colaborativas para explorar possíveis soluções tecnológicas e de design.</p>
                <p>Na etapa seguinte, realizamos o desenvolvimento do design e planejamento da nova versão do aplicativo incluindo o desenvolvimento de mockups alinhados à identidade visual da PDPJ-Br (DOCUMENTO, 2022) e UIKit.PJe.JUS (MANUAL, 2019), além do desenho de uma nova arquitetura utilizando padrões de projeto service e repository e o gerenciamento de estado com o package bloc.</p>
                <p>Durante a implementação, aplicamos boas práticas de programação com effective dart (EFFECTIVE, 2011), integrando os diferentes módulos e componentes do sistema e utilizando o package bloc (PUB, 2018) para garantir uma boa separação de responsabilidades e modularização.</p>
                <p>Por fim, realizamos uma análise comparativa entre a nova proposta e a versão antiga do aplicativo. Avaliamos as melhorias propostas em relação à versão antiga, comparando funcionalidades.</p>
              </div>
              <img src="/projects/pje2-mobile/1.jpg" alt="Metodologia" class="w-full rounded-lg shadow-md my-8" />

              <h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">Organização do Projeto</h2>
              <p>Tendo como objetivo principal entregar uma nova implementação do sistema, utilizando-se dos princípios das boas práticas de programação e padrões de projeto, almejando uma melhor manutenibilidade, bem como uma nova interface de usuário, para melhoria da usabilidade, particionamos este trabalho em 4 seções, sendo elas:</p>
              <ul class="space-y-4 mt-6">
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

              <h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">Materiais e Metodologias</h2>
              <div class="space-y-10">
                <div>
                  <h3 class="text-xl font-semibold mb-4 text-primary uppercase tracking-wider">Effective Dart</h3>
                  <p>O Effective Dart (2011) oferece quatro guias: estilização, documentação, uso e design, com recomendações "Faça/Não Faça/Prefira/Evite/Considere" para escrever código Dart consistente, bem documentado e de alto desempenho.</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-4 text-primary uppercase tracking-wider">Model-View-Controller (MVC)</h3>
                  <p>MVC (Model-View-Controller) é um padrão em design de software comumente usado para implementar interfaces de usuário, dados e lógica de controle. O padrão enfatiza a separação entre a lógica de negócios do software e a exibição.</p>
                  <ul class="list-disc pl-5 space-y-2 mt-4 text-muted-foreground">
                    <li><strong>Modelo (Model):</strong> Manipula os dados e a lógica de negócio.</li>
                    <li><strong>Visualização (View):</strong> Camada de apresentação que os usuários enxergam.</li>
                    <li><strong>Controlador (Controller):</strong> Intermediário que processa inputs e atualiza Views.</li>
                  </ul>
                </div>
              </div>
              <img src="/projects/pje2-mobile/2.jpg" alt="Estrutura" class="w-full rounded-lg shadow-md my-8" />

              <div class="space-y-10">
                <div>
                  <h3 class="text-xl font-semibold mb-4 text-primary uppercase tracking-wider">Padrão Repository - Repository Pattern</h3>
                  <p>O padrão Repository cria uma camada de abstração entre domínio e persistência que expõe uma interface tipo coleção para acessar objetos, centralizando a lógica de consultas e melhorando separação de responsabilidades, reutilização e testabilidade.</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-4 text-primary uppercase tracking-wider">Gerenciamento de estado - Package Bloc</h3>
                  <p>O padrão Service encapsula a lógica de negócio numa camada intermediária entre UI/controladores e persistência, realizando validações e processamento para promover reutilização, manutenção e clara separação de responsabilidades.</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-4 text-primary uppercase tracking-wider">Framework Flutter</h3>
                  <p>Conforme a documentação do Flutter (2017), o Flutter é um kit de ferramentas de UI da Google de código aberto para criação de aplicativos compilados nativamente para dispositivos móveis, web, desktop e incorporados a partir de uma única base de código.</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-4 text-primary uppercase tracking-wider">Android Studio</h3>
                  <p>O Android Studio é uma IDE para desenvolvimento Android que oferece emuladores rápidos, ferramentas de teste abrangentes e Lint para identificar problemas de desempenho/usabilidade/compatibilidade, além de suportar projetos Flutter.</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-4 text-primary uppercase tracking-wider">Adobe XD</h3>
                  <p>Adobe XD é uma ferramenta de design de experiência do usuário para aplicativos web e móveis. Permite criar wireframes, protótipos interativos e designs de alta fidelidade dentro de um único aplicativo.</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-4 text-primary uppercase tracking-wider">Figma</h3>
                  <p>Similar ao XD, é focado em experiência e interface de usuário, mas com tecnologia mais moderna voltada para maior integração multisistêmica. Nossos materiais foram exportados do XD para o Figma para melhor compatibilidade.</p>
                </div>
              </div>

              <h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">Documento de Análise Técnica</h2>
              <p>Com o estudo da documentação do PJe 2.x mobile, elaboramos um documento de análise técnica onde encontram-se os diagramas de Caso de Uso, requisitos funcionais e não funcionais, a arquitetura, sua interface, como também uma análise detalhada do código recebido.</p>
              <ul class="space-y-4 mt-6">
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Edição e assinatura de minutas;</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Assinatura de processos em lote;</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Visualização de documentos;</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Copiar minuta;</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Alterar localização;</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Pareamento de dispositivos;</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Autenticação do magistrado;</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Filtragem de processos;</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Listagem de processos no perfil de magistrado.</span>
                </li>
              </ul>

              <blockquote class="border-l-4 border-primary pl-6 py-4 my-10 bg-secondary/30 rounded-r-lg italic text-muted-foreground">
                "Foram identificados trechos de código inativo, duplicações (entidades e bancos), salvamento indevido de variáveis voláteis e loops que causam atualizações contínuas, indicando necessidade de refinamento. Há incongruências de nomenclatura e mistura de responsabilidades (serviços/estado acessados diretamente nas views), falta de modularização e documentação de endpoints críticos, e baixa legibilidade por funções mal nomeadas. Uma análise com Dart Analysis revelou 67 warnings e 280 hints, principalmente variáveis não usadas e nomes fora do padrão lowerCamelCase."
              </blockquote>

              <h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">Implementação e Desenvolvimento</h2>
              <div class="space-y-8">
                <div>
                  <h3 class="text-xl font-semibold mb-3 text-primary uppercase tracking-wider">Estrutura de Pastas</h3>
                  <p>Optou-se pela abordagem layer-first para organizar o projeto: app (UI), config (injeção), models (domínio), providers (estado), repositories (dados) e services (lógica), promovendo modularidade e separação de responsabilidades.</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-3 text-primary uppercase tracking-wider">Armazenamento de Dados Local</h3>
                  <p>Reduziu-se a quantidade de variáveis persistidas para evitar reescritas frequentes; apenas campos críticos são salvos localmente, enquanto demais são mantidos em cache para melhor desempenho.</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-3 text-primary uppercase tracking-wider">Models</h3>
                  <p>Refatoradas para imutabilidade: atributos finais, remoção de getters/setters, uso de equatable e implementação de copyWith.</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-3 text-primary uppercase tracking-wider">Services e Repositories</h3>
                  <p>Repositórios cuidam de requisições e acesso a dados com tratamento de erros, enquanto serviços executam a lógica de negócio, resultando em código mais modular e seguro.</p>
                </div>
              </div>

              <h2 class="text-2xl font-bold mt-16 mb-8 text-foreground uppercase tracking-wider">Interface de Usuário</h2>
              <p>Utilizamos essa oportunidade para desenvolver uma nova interface de usuário com base nas cores da PDPJ-Br e a tipografia e ícones da UIKit.PJe.JUS, implementando novas funcionalidades ao longo do processo.</p>

              <h3 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Autenticação de Usuário</h3>
              <p>Realizamos a incorporação de tecnologias como a autenticação por biometria ou Face ID, visando fortalecer a segurança e a experiência do usuário. Adicionalmente, implementamos funcionalidades como o ocultamento de senha e validação de CPF em tempo real.</p>
              
              <h4 class="text-lg font-semibold mt-8 mb-4 text-foreground uppercase">Novo Fluxo de Login</h4>
              <img src="/projects/pje2-mobile/3.jpg" alt="Fluxo de Login" class="w-full rounded-lg shadow-md my-6" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <img src="/projects/pje2-mobile/4.jpg" alt="Auth 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/5.jpg" alt="Auth 2" class="w-full rounded-lg shadow-md" />
              </div>
              <p class="text-center text-sm text-muted-foreground italic mb-10">Nova Interface de autenticação.</p>

              <h3 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Pareamento de Dispositivos</h3>
              <p>Desenvolvemos novas telas com foco na melhoria da experiência do usuário, introduzindo um carrossel com gifs e instruções passo a passo para facilitar a geração do QR Code.</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <img src="/projects/pje2-mobile/6.jpg" alt="Pareamento 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/7.jpg" alt="Pareamento 2" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/8.jpg" alt="Pareamento 3" class="w-full rounded-lg shadow-md" />
              </div>
              <p class="text-center text-sm text-muted-foreground italic mb-10">TELAS PARA PAREAMENTO DE DISPOSITIVO</p>

              <h3 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Localização, Logout e Sobre</h3>
              <p>Removemos o antigo "drawer menu" e incorporamos suas funcionalidades diretamente à nova tela. O campo de Localização agora permanece visível, melhorando a identificação do perfil em uso.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <img src="/projects/pje2-mobile/9.jpg" alt="Home 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/10.jpg" alt="Home 2" class="w-full rounded-lg shadow-md" />
              </div>
              <p class="text-center text-sm text-muted-foreground italic mb-10">NOVA PÁGINA INICIAL</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <img src="/projects/pje2-mobile/11.jpg" alt="Ajustes 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/12.jpg" alt="Ajustes 2" class="w-full rounded-lg shadow-md" />
              </div>
              <p class="text-center text-sm text-muted-foreground italic mb-10">MENU DE AJUSTES E MODAL DE CONFIRMAÇÃO</p>

              <h4 class="text-lg font-semibold mt-12 mb-4 text-foreground uppercase">Sobre, Ajuda, Termos de Uso e FAQ</h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                <img src="/projects/pje2-mobile/13.jpg" alt="FAQ 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/14.jpg" alt="FAQ 2" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/15.jpg" alt="FAQ 3" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/16.jpg" alt="FAQ 4" class="w-full rounded-lg shadow-md" />
              </div>

              <h3 class="text-xl font-semibold mt-12 mb-4 text-primary uppercase tracking-wider">Ato de Magistrado</h3>
              <p>O ato de magistrado envolve funcionalidades essenciais como editar e assinar minutas, assinatura em lote e visualização de documentos.</p>
              <ul class="space-y-4 my-6">
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Editar e assinar minutas</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Assinar processos em lote</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Visualização de documentos</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Copiar minuta</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">•</span>
                  <span class="text-muted-foreground leading-relaxed">Listagem e filtragem de processos</span>
                </li>
              </ul>

              <h4 class="text-lg font-semibold mt-12 mb-4 text-foreground uppercase">Página de Ato de Magistrado</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <img src="/projects/pje2-mobile/17.jpg" alt="Magistrado 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/18.jpg" alt="Magistrado 2" class="w-full rounded-lg shadow-md" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <img src="/projects/pje2-mobile/19.jpg" alt="Magistrado 3" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/20.jpg" alt="Magistrado 4" class="w-full rounded-lg shadow-md" />
              </div>
              <p>Implementamos um sistema de codificação por cores: processos urgentes (vermelho) e normais (verde), facilitando a priorização.</p>
              <img src="/projects/pje2-mobile/21.jpg" alt="Filtros" class="w-full rounded-lg shadow-md my-8" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <img src="/projects/pje2-mobile/22.jpg" alt="Filtros 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/23.jpg" alt="Filtros 2" class="w-full rounded-lg shadow-md" />
              </div>
              <img src="/projects/pje2-mobile/24.jpg" alt="Processos" class="w-full rounded-lg shadow-md my-8" />
              <img src="/projects/pje2-mobile/25.jpg" alt="Seleção" class="w-full rounded-lg shadow-md my-8" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <img src="/projects/pje2-mobile/26.jpg" alt="Confirmação 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/27.jpg" alt="Confirmação 2" class="w-full rounded-lg shadow-md" />
              </div>

              <h4 class="text-lg font-semibold mt-12 mb-4 text-foreground uppercase">Página de Detalhes de Processo</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <img src="/projects/pje2-mobile/28.jpg" alt="Detalhes 1" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/29.jpg" alt="Detalhes 2" class="w-full rounded-lg shadow-md" />
                <img src="/projects/pje2-mobile/30.jpg" alt="Detalhes 3" class="w-full rounded-lg shadow-md" />
              </div>

              <h2 class="text-2xl font-bold mt-16 mb-6 text-foreground uppercase tracking-wider">Conclusão</h2>
              <p>A remodelagem da UI/UX do PJe2x Mobile trouxe ganhos claros em usabilidade e eficiência. As escolhas de apresentação melhoraram a scannability das telas e a priorização de tarefas.</p>

              <h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">Sugestões</h2>
              <p>Realizar testes de usabilidade com usuários reais para validar heurísticas e ajustar microinterações; aplicar métricas UX e documentar padrões de interface para consistência futura.</p>

              <h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">O que Aprendi</h2>
              <p>Alterações relativamente pequenas de interação e visualização têm grande impacto na percepção de eficiência. Priorizar informação significativa e reduzir ruído melhora a tomada de decisão.</p>

              <h2 class="text-2xl font-bold mt-12 mb-6 text-foreground uppercase tracking-wider">Considerações Finais</h2>
              <p>Para consolidar os ganhos UX, recomenda-se integrar um ciclo contínuo de pesquisa com usuários e instrumentação de uso.</p>

              <h4 class="text-xl font-semibold mt-12 mb-6 text-primary uppercase tracking-wider">Galeria de Telas</h4>
              <div class="grid grid-cols-2 md:grid-cols-5 gap-4 my-8">
                ${[...Array(15)].map((_, i) => `<img src="/projects/pje2-mobile/${i + 31}.jpg" alt="Tela ${i + 31}" class="w-full rounded-lg shadow-sm hover:shadow-md transition-shadow" />`).join('')}
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
        if (!allProjects.some(p => p.slug === 'pje2-mobile')) {
          allProjects = [...allProjects.slice(0, 1), { slug: 'pje2-mobile', title: 'PJe2 Mobile' }, ...allProjects.slice(1)];
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
