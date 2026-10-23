import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

const Projects = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />

    <main className="flex-1 pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">ESTUDOS DE CASO</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground">Projetos</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {featured.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.article>
          ))}
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-32 mb-12">Outros trabalhos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {others.map((project) => (
            <article key={project.slug}>
              <ProjectCard project={project} showSummary={false} />
            </article>
          ))}
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default Projects;
