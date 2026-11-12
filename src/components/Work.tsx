import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { LoopVideo } from "@/components/case/CaseKit";
import { useI18n } from "@/i18n";
import { useData } from "@/i18n/data";

const SectionLabel = ({ index, children }: { index: string; children: React.ReactNode }) => (
  <p className="font-mono text-xs text-muted-foreground mb-4">
    <span className="text-primary">{index}</span> / {children}
  </p>
);

const Work = () => {
  const { lp, tr } = useI18n();
  const { projects, brand, games } = useData();
  const others = projects.filter((p) => p.featured && p.slug !== "spillfabrikken" && p.slug !== "lan-house-simulator");
  const lan = projects.find((p) => p.slug === "lan-house-simulator");
  const covers = [games[0], games[3], games[2], games[4]];

  return (
    <section id="work" className="py-24 md:py-32 scroll-mt-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel index="01">{tr("Trabalhos selecionados", "Selected work")}</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground max-w-2xl">
              {tr("Jogos físicos e digitais, e produtos de software.", "Tabletop and digital games, and software products.")}
            </h2>
          </div>
          <Link to={lp("/projects")} className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground shrink-0">
            {tr("Todos os projetos", "All projects")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Destaque: SpillFabrikken */}
        <Link
          to={lp("/projects/spillfabrikken")}
          className="group grid lg:grid-cols-12 gap-8 lg:gap-12 rounded-3xl border border-border bg-card p-5 md:p-8 lg:p-10 mb-8 hover:border-foreground/30 transition-colors"
        >
          <div className="lg:col-span-5 flex flex-col min-w-0">
            <p className="font-mono text-xs text-muted-foreground mb-3">
              {brand.name} · {tr("Trondheim, Noruega", "Trondheim, Norway")} · 2020–2021
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
              {tr("Oito projetos de jogo para uma editora norueguesa", "Eight game projects for a Norwegian publisher")}
            </h3>
            <p className="font-body text-[15px] md:text-base text-muted-foreground leading-relaxed mb-8">
              {tr(
                "Único designer da editora: projetei cartas, caixas e manuais, entreguei a arte final para a fábrica na China e fiz as peças da loja online e das campanhas. Inclui o Kryptert e suas quatro edições.",
                "Sole designer at the publisher: I designed cards, boxes and rulebooks, delivered print-ready artwork to the factory in China and made the online store and campaign assets. Includes Kryptert and its four editions.",
              )}
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
              {tr("Ver estudo de caso", "View case study")} <ArrowUpRight className="w-4 h-4" />
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

        {/* Destaque: jogo digital em desenvolvimento */}
        {lan && (
          <Link
            to={lp(`/projects/${lan.slug}`)}
            className="group grid lg:grid-cols-12 gap-8 lg:gap-12 rounded-3xl border border-border bg-card p-5 md:p-8 lg:p-10 mb-16 hover:border-foreground/30 transition-colors"
          >
            <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-black aspect-video lg:order-2">
              {lan.loop ? (
                <LoopVideo src={lan.loop.src} poster={lan.loop.poster} label={lan.title} className="transition-transform duration-700 group-hover:scale-[1.02]" />
              ) : (
                <img src={lan.image} alt={lan.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              )}
            </div>
            <div className="lg:col-span-5 flex flex-col min-w-0 lg:order-1">
              <p className="font-mono text-xs text-muted-foreground mb-3">
                {tr("Projeto autoral · Godot 4 · Em desenvolvimento", "Personal project · Godot 4 · In development")}
              </p>
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                {lan.title}
              </h3>
              <p className="font-body text-[15px] md:text-base text-muted-foreground leading-relaxed mb-8">
                {tr(
                  "A lan house de bairro em primeira pessoa, na rua da minha antiga lan em Pedro Velho (RN), como ela era em 2012. No monitor do caixa roda um segundo jogo, de gerenciamento, em pixel art.",
                  "A neighborhood LAN house in first person, on the street where I ran mine in Pedro Velho, Brazil, as it looked in 2012. A second game, a pixel-art management sim, runs on the front desk monitor.",
                )}
              </p>
              {lan.metrics && (
                <dl className="grid grid-cols-3 gap-4 mt-auto mb-8">
                  {lan.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="font-display text-2xl font-semibold text-foreground">{m.value}</dt>
                      <dd className="font-body text-xs text-muted-foreground leading-snug mt-1">{m.label.split(":")[0]}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {tr("Ver estudo de caso", "View case study")} <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        )}

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
