import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Loader2 } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  main_image: string;
}

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

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
          .order("created_at", { ascending: false })
          .limit(6); // Show latest 6 on home

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects for work section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
            <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">
              EXPERIÊNCIA PROFISSIONAL
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">
              Projetos Selecionados
            </h2>
          </div>
          <Link
            to="/projects"
            className="font-body text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
          >
            Ver Todos os Projetos
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            Nenhum projeto encontrado.
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {projects.map((project, index) => (
                <CarouselItem key={project.slug} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <motion.article
                    initial={{ opacity: 0, y: 80 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className="group relative h-full"
                  >
                    <Link to={`/projects/${project.slug}`} className="block h-full">
                      <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-background border border-white/5">
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Work;
