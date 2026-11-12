import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects } from "@/data/projects";
import { brand, games } from "@/data/spillfabrikken";

const SectionLabel = ({ index, children }: { index: string; children: React.ReactNode }) => (
  <p className="font-mono text-xs text-muted-foreground mb-4">
    <span className="text-primary">{index}</span> / {children}
  </p>
);

const Work = () => {
  const others = featuredProjects.filter((p) => p.slug !== "spillfabrikken");
  const covers = [games[0], games[3], games[2], games[4]];

  return (
    <section id="work" className="py-24 md:py-32 scroll-mt-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel index="01">Trabalhos selecionados</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground max-w-2xl">
              Estudos de caso com papel, processo e resultado.
            </h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground shrink-0">
            Todos os projetos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Destaque: SpillFabrikken */}
        <Link
          to="/projects/spillfabrikken"
          className="group grid lg:grid-cols-12 gap-8 lg:gap-12 rounded-3xl border border-border bg-card p-5 md:p-8 lg:p-10 mb-16 hover:border-foreground/30 transition-colors"
        >
          <div className="lg:col-span-5 flex flex-col min-w-0">
            <p className="font-mono text-[11px] text-muted-foreground mb-3">
              {brand.name} · {brand.location} · 2020–2021
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
              Oito jogos, do briefing à fábrica
            </h3>
            <p className="font-body text-[15px] md:text-base text-muted-foreground leading-relaxed mb-8">
              Único designer da editora norueguesa: cartas, caixas, regras, arte final para a fábrica na China, loja online e
              campanhas. Inclui o Kryptert e suas quatro edições.
            </p>
            <dl className="grid grid-cols-3 gap-4 mt-auto mb-8">
              {brand.impact.map((m) => (
                <div key={m.label}>
                  <dt className="font-display text-2xl font-semibold text-foreground">{m.value}</dt>
                  <dd className="font-body text-xs text-muted-foreground leading-snug mt-1">{m.label}</dd>
                </div>
              ))}
            </dl>
            <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              Ver estudo de caso <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-3">
            {covers.map((g) => (
              <div key={g.slug} className="aspect-square rounded-2xl overflow-hidden bg-background">
                <img src={g.cover} alt={g.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
            ))}
          </div>
        </Link>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-14">
          {others.map((project) => (
            <article key={project.slug}>
              <ProjectCard project={project} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
