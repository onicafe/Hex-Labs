import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  main_image: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("slug, title, category, year, main_image")
          .neq("is_hidden", true)
          .order("year", { ascending: false })
          .order("created_at", { ascending: false });

        if (error) throw error;
        
        const manualProjects: Project[] = [
          {
            slug: "nexus-imobiliaria",
            title: "Nexus Imobiliária",
            category: "Desenvolvimento",
            year: "2026",
            main_image: "/projects/nexus-imobiliaria/hero.png"
          },
          {
            slug: "pje2-mobile",
            title: "PJe2 Mobile",
            category: "UI/UX Design",
            year: "2025",
            main_image: "/projects/pje2-mobile/3.jpg"
          }
        ];

        setProjects([...manualProjects, ...(data || [])]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
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
            <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">
              CASOS DE ESTUDO
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground">
              Portfolio
            </h1>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse flex flex-col h-full rounded-2xl">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-white/5 border border-white/5"></div>
                  <div className="mt-6 flex items-start justify-between">
                    <div className="w-full">
                      <div className="h-6 w-3/4 bg-white/5 rounded-lg mb-2"></div>
                      <div className="h-4 w-1/4 bg-white/5 rounded-lg"></div>
                    </div>
                    <div className="h-4 w-12 bg-white/5 rounded-lg ml-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-32 text-muted-foreground">
              Nenhum projeto encontrado.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Link to={`/projects/${project.slug}`} className="group block h-full">
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-white/5">
                      {project.main_image ? (
                        <img
                          src={project.main_image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                          <span className="text-muted-foreground font-display text-lg opacity-50">{project.title}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground mt-1">
                          {project.category}
                        </p>
                      </div>
                      <span className="font-body text-sm text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
