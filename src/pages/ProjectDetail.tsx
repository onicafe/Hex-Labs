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
            tools: ["Photoshop", "Figma", "Adobe XD"],
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
        
        // Inject manual project if not in DB for navigation
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
