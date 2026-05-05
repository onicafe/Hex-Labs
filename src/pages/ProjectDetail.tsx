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

        let projectData = data as ProjectDetails;

        // Local override for Jovem Potiguar
        if (slug === 'jovem-potiguar') {
          projectData = {
            ...projectData,
            title: "Jovem Potiguar",
            category: "Pesquisa - Caso de Estudo",
            industry: "Educação / Governo",
            client: "IFRN / SETHAS",
            services: ["UX/UI Design", "User Research"],
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
        const { data: allProjects } = await supabase
          .from("projects")
          .select("slug, title")
          .order("year", { ascending: false })
          .order("created_at", { ascending: false });

        if (allProjects) {
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
