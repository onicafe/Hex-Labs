import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCover from "@/components/ProjectCover";
import type { Board, CaseSection, Project } from "@/data/projects";
import { useI18n } from "@/i18n";
import { useData } from "@/i18n/data";
import {
  Anatomy,
  CompareBoard,
  FigureGrid,
  ImpactStrip,
  LoopVideo,
  MetaStrip,
  OverviewGrid,
  PaletteRow,
  PhoneBoard,
  ProcessSteps,
  SectionHeading,
  textAccent,
  useLightbox,
  VideoBoard,
} from "@/components/case/CaseKit";

const DEFAULT_ACCENT = "#c2410c";

/** Projetos no formato simples (só `process`) viram seções do formato completo. */
const sectionsOf = (project: Project, tr: (pt: string, en: string) => string): CaseSection[] => {
  if (project.sections) return project.sections;
  return [
    { label: tr("Contexto", "Context"), title: tr("O problema", "The problem"), text: [project.problem] },
    ...(project.process ?? []).map((step) => ({
      label: tr("Processo", "Process"),
      title: step.title,
      text: step.text ? [step.text] : undefined,
      boards: step.images?.length
        ? [{ kind: "grid" as const, columns: (step.images.length > 1 ? 2 : 1) as 1 | 2, figures: step.images }]
        : undefined,
    })),
  ];
};

const BoardView = ({ board, accent, onOpen }: { board: Board; accent: string; onOpen: (src: string) => void }) => {
  switch (board.kind) {
    case "phones":
      return <PhoneBoard figures={board.figures} steps={board.steps} accent={accent} onOpen={onOpen} />;
    case "compare":
      return <CompareBoard before={board.before} after={board.after} labels={board.labels} phone={board.phone} accent={accent} onOpen={onOpen} />;
    case "anatomy":
      return <Anatomy image={board.image} alt={board.alt} points={board.points} accent={accent} narrow />;
    case "steps":
      return <ProcessSteps steps={board.steps} accent={accent} />;
    case "palette":
      return <PaletteRow colors={board.colors} />;
    case "video":
      return <VideoBoard src={board.src} poster={board.poster} caption={board.caption} />;
    case "grid":
      return (
        <FigureGrid
          figures={board.figures}
          columns={board.columns}
          paper={board.paper}
          ink={board.ink}
          uniform={board.uniform}
          contain={board.contain}
          onOpen={onOpen}
        />
      );
  }
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lp, tr } = useI18n();
  const { projects } = useData();
  const project = projects.find((p) => p.slug === slug);
  const { open, lightbox } = useLightbox();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to={lp("/projects")} replace />;

  const accent = project.accent ?? DEFAULT_ACCENT;
  const sections = sectionsOf(project, tr);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const nextHref = lp(`/projects/${next.slug}`);

  const meta = [
    { label: tr("Meu papel", "My role"), value: project.role },
    { label: tr("Organização", "Organization"), value: project.client },
    { label: project.platform ? tr("Plataforma", "Platform") : tr("Categoria", "Category"), value: project.platform ?? project.category },
    { label: tr("Ano", "Year"), value: project.year ?? "—" },
  ];

  let n = 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Abertura */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="font-mono text-xs tracking-wide text-muted-foreground mb-10 flex gap-2">
            <Link to={lp("/projects")} className="hover:text-foreground">{tr("Projetos", "Projects")}</Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>
          <motion.div className="max-w-4xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-5" style={{ color: textAccent(accent) }}>
              {tr("Estudo de caso", "Case study")} · {project.category}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[0.95] mb-6 break-words">
              {project.title}
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">{project.summary}</p>
            {project.engagement && (
              <span className="inline-flex items-center gap-2 mt-6 px-3 py-1 rounded-full border border-border font-mono text-xs tracking-wide text-foreground">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                {project.engagement === "Voluntário"
                  ? tr("Trabalho voluntário", "Volunteer work")
                  : project.engagement === "Projeto autoral"
                    ? tr("Projeto autoral", "Personal project")
                    : project.engagement === "Fundador"
                      ? tr("Fundador", "Founder")
                      : project.engagement}
              </span>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-12 space-y-12">
        <MetaStrip items={meta} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative overflow-hidden rounded-3xl aspect-[16/10] bg-card border border-border"
        >
          {project.loop ? (
            <LoopVideo src={project.loop.src} poster={project.loop.poster} label={project.title} />
          ) : (
            <ProjectCover project={project} />
          )}
        </motion.div>

        {project.overview && (
          <OverviewGrid
            accent={accent}
            items={[
              { label: tr("Desafio", "Challenge"), text: project.overview.challenge },
              { label: tr("O que eu fiz", "What I did"), text: project.overview.contribution },
              { label: tr("Resultado", "Outcome"), text: project.overview.outcome },
            ]}
          />
        )}

        {project.credits && (
          <aside className="rounded-2xl border border-border bg-secondary/60 p-6 lg:p-8">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">{tr("Quem fez o quê", "Who did what")}</p>
            <p className="font-body text-[15px] text-foreground/85 leading-relaxed max-w-4xl">{project.credits}</p>
          </aside>
        )}

        {project.metrics && <ImpactStrip items={project.metrics} note={project.metricsNote ?? ""} accent={accent} />}
      </div>

      <main className="container mx-auto px-6 lg:px-12 py-24 space-y-28">
        {sections.map((section) => (
          <section key={`${section.label}-${section.title}`}>
            <SectionHeading index={++n} label={section.label} title={section.title} accent={accent} />
            {section.text && (
              <div className="max-w-3xl space-y-4 -mt-2 mb-10">
                {section.text.map((paragraph) => (
                  <p key={paragraph} className="font-body text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            {section.boards && (
              <div className="space-y-8">
                {section.boards.map((board, i) => (
                  <BoardView key={i} board={board} accent={accent} onOpen={open} />
                ))}
              </div>
            )}
          </section>
        ))}

        <section>
          <SectionHeading index={++n} label={tr("Resultado", "Outcome")} title={tr("O que ficou", "Where it landed")} accent={accent} />
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
            <ul className="space-y-5">
              {project.result.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-2.5 w-2 h-2 rounded-full shrink-0" style={{ background: accent }} />
                  <span className="font-body text-lg text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-8">
              {project.learnings && (
                <div className="rounded-2xl border border-border p-6">
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">{tr("O que aprendi", "What I learned")}</p>
                  <ul className="space-y-3">
                    {project.learnings.map((l) => (
                      <li key={l} className="font-body text-[15px] text-foreground/85 leading-relaxed">{l}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.tools && project.tools.length > 0 && (
                <div>
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">{tr("Ferramentas", "Tools")}</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <li key={tool} className="px-3 py-1 rounded-full bg-secondary font-mono text-xs text-foreground">{tool}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-col items-start gap-3">
                  {project.links.map((link) =>
                    link.url.startsWith("/") ? (
                      <Link key={link.url} to={lp(link.url)} className="inline-flex items-center gap-2 font-body text-sm font-medium text-foreground hover:text-primary">
                        {link.label} <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-body text-sm font-medium text-foreground hover:text-primary"
                      >
                        {link.label} <ExternalLink className="w-4 h-4" />
                      </a>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {project.gallery && project.gallery.length > 0 && (
          <section>
            <SectionHeading index={++n} label={tr("Galeria", "Gallery")} title={tr("Outras telas", "More screens")} accent={accent} />
            {project.galleryPhones ? (
              <PhoneBoard figures={project.gallery.map((src) => ({ src }))} accent={accent} onOpen={open} />
            ) : (
              <FigureGrid figures={project.gallery.map((src) => ({ src }))} columns={3} uniform onOpen={open} />
            )}
          </section>
        )}
      </main>

      {/* Próximo projeto */}
      <section className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <Link to={nextHref} className="group grid grid-cols-[1fr_auto] items-center gap-6">
            <div className="min-w-0">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">{tr("Próximo estudo de caso", "Next case study")}</p>
              <p className="font-display text-3xl md:text-5xl font-bold text-foreground group-hover:text-primary transition-colors break-words">
                {next.title}
              </p>
              <p className="font-body text-muted-foreground mt-2">{next.category}</p>
            </div>
            <span className="w-14 h-14 rounded-full border border-border grid place-items-center group-hover:bg-foreground group-hover:text-background transition-colors">
              <ArrowUpRight className="w-6 h-6" />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
      {lightbox}
    </div>
  );
};

export default ProjectDetail;
