import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects } from "@/data/projects";

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-32 bg-card" ref={containerRef}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">ESTUDOS DE CASO</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">Projetos em destaque</h2>
            <p className="font-body text-muted-foreground mt-4 max-w-2xl">
              Em cada projeto, conto qual foi o meu papel, o problema, o processo e o resultado. Os trabalhos voluntários estão marcados.
            </p>
          </div>
          <Link
            to="/projects"
            className="font-body text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group shrink-0"
          >
            Ver todos os projetos
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
