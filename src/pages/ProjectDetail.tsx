import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { updateSEO } from "@/lib/seo";
import { getProject, projects, type CaseImage } from "@/data/projects";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">{children}</h2>
);

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (project) updateSEO(project.title, project.summary, project.image);
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return <Navigate to="/projects" replace />;
  if (slug !== project.slug) return <Navigate to={`/projects/${project.slug}`} replace />;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;

  const renderImages = (images: CaseImage[]) => (
    <div className={`grid gap-4 mt-6 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {images.map((img) => (
        <figure key={img.src} className="space-y-2">
          <button
            type="button"
            onClick={() => setSelectedImage(img.src)}
            className="block w-full overflow-hidden rounded-xl border border-white/5 bg-card cursor-zoom-in"
          >
            <img src={img.src} alt={img.caption ?? project.title} loading="lazy" className="w-full h-auto hover:opacity-90 transition-opacity" />
          </button>
          {img.caption && <figcaption className="font-body text-xs text-muted-foreground">{img.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Projetos
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">{project.category.toUpperCase()}</p>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">{project.title}</h1>
              </div>
              <span className="font-display text-5xl md:text-7xl font-bold text-muted/40">{project.year}</span>
            </div>

            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">{project.summary}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pb-20"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl aspect-[16/9] bg-card border border-white/5">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.section>

      {/* Case study */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Info Column */}
            <aside className="space-y-8 lg:sticky lg:top-28 self-start">
              <div>
                <h3 className="font-body text-sm tracking-[0.2em] text-muted-foreground mb-3">MEU PAPEL</h3>
                <p className="font-display text-xl text-foreground">{project.role}</p>
                {project.engagement && (
                  <span className="inline-block mt-3 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 font-body text-xs text-primary">
                    {project.engagement === "Voluntário" ? "Trabalho voluntário" : project.engagement}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-body text-sm tracking-[0.2em] text-muted-foreground mb-3">ORGANIZAÇÃO</h3>
                <p className="font-display text-xl text-foreground">{project.client}</p>
              </div>
              {project.tools && project.tools.length > 0 && (
                <div>
                  <h3 className="font-body text-sm tracking-[0.2em] text-muted-foreground mb-3">FERRAMENTAS</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 font-body text-xs text-foreground bg-secondary rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-col gap-3">
                  {project.links.map((link, i) => {
                    const className = `inline-flex items-center justify-center gap-2 px-6 py-3 font-body text-sm font-medium rounded-full transition-all duration-300 ${
                      i === 0
                        ? "bg-primary text-primary-foreground hover:glow-accent"
                        : "border border-border text-foreground hover:bg-secondary"
                    }`;
                    return link.url.startsWith("/") ? (
                      <Link key={link.url} to={link.url} className={className}>
                        {link.label}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={className}>
                        {link.label}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              )}
            </aside>

            {/* Story Column */}
            <div className="lg:col-span-2 space-y-16">
              {project.credits && (
                <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                  <h3 className="font-body text-sm tracking-[0.2em] text-primary mb-3">QUEM FEZ O QUÊ</h3>
                  <p className="font-body text-base text-foreground/90 leading-relaxed">{project.credits}</p>
                </div>
              )}

              <div>
                <SectionTitle>O problema</SectionTitle>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>

              <div>
                <SectionTitle>O processo</SectionTitle>
                <ol className="space-y-12">
                  {project.process.map((step, i) => (
                    <li key={step.title}>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        <span className="text-primary mr-3">{String(i + 1).padStart(2, "0")}</span>
                        {step.title}
                      </h3>
                      {step.text && <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">{step.text}</p>}
                      {step.images && step.images.length > 0 && renderImages(step.images)}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <SectionTitle>O resultado</SectionTitle>
                <ul className="space-y-4">
                  {project.result.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-12">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className="overflow-hidden rounded-xl bg-background border border-white/5 aspect-square cursor-zoom-in"
                >
                  <img
                    src={img}
                    alt={`${project.title}, imagem ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </button>
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
              <Link to={`/projects/${prevProject.slug}`} className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Anterior</p>
                  <p className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">{prevProject.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link to={`/projects/${nextProject.slug}`} className="group flex items-center gap-4 md:flex-row-reverse md:text-right">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Próximo</p>
                  <p className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">{nextProject.title}</p>
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
          <button
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar imagem"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Imagem ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
