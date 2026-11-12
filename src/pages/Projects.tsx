import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { useI18n } from "@/i18n";
import { useData } from "@/i18n/data";

const Projects = () => {
  const { tr } = useI18n();
  const { projects } = useData();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 max-w-3xl">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-primary mb-5">{tr("Estudos de caso", "Case studies")}</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[0.95] mb-6">{tr("Projetos", "Projects")}</h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              {tr(
                "Cada estudo de caso mostra o meu papel, o processo e o resultado, e diz o que foi meu e o que foi da equipe.",
                "Each case study shows my role, the process and the outcome, and makes clear what was mine and what was the team's.",
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
            {featured.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.article>
            ))}
          </div>

          {others.length > 0 && (
            <>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-32 mb-12">{tr("Outros trabalhos", "More work")}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {others.map((project) => (
                  <article key={project.slug}>
                    <ProjectCard project={project} showSummary={false} />
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
