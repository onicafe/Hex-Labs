import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n";

const Services = () => {
  const { lp, tr } = useI18n();
  const skills = [
    {
      title: tr("Game design", "Game design"),
      description: tr(
        "Mecânicas, cartas, regras e embalagens, da ideia à arte final que vai para a fábrica. No digital, design de sistemas, economia e direção de arte em Godot.",
        "Mechanics, cards, rules and packaging, from idea to the print-ready artwork that goes to the factory. In digital, systems design, economy and art direction in Godot.",
      ),
      tags: tr("Cartas e regras|Embalagem|Sistemas e economia|Produção", "Cards and rules|Packaging|Systems and economy|Production").split("|"),
      proofs: [
        { label: "SpillFabrikken", to: "/projects/spillfabrikken" },
        { label: "Lan House Simulator", to: "/projects/lan-house-simulator" },
      ],
    },
    {
      title: tr("Product design e UX", "Product design and UX"),
      description: tr(
        "Pesquisa, fluxos e interfaces para produtos complexos, de app de magistrados a plataforma pública de inscrição.",
        "Research, flows and interfaces for complex products, from a judges' app to a public registration platform.",
      ),
      tags: tr("Jornadas e fluxos|Testes de usabilidade|Acessibilidade|Protótipos", "Journeys and flows|Usability testing|Accessibility|Prototypes").split("|"),
      proofs: [
        { label: "PJe2 Mobile", to: "/projects/pje" },
        { label: "Jovem Potiguar", to: "/projects/jovem-potiguar" },
      ],
    },
    {
      title: tr("UI e front-end", "UI and front-end"),
      description: tr(
        "Prototipo e implemento interfaces em React e TypeScript, e uso agentes de IA no fluxo de trabalho, do protótipo ao código.",
        "I prototype and build interfaces in React and TypeScript, and use AI agents in my workflow, from prototype to code.",
      ),
      tags: tr("React|TypeScript|Flutter|Componentes", "React|TypeScript|Flutter|Components").split("|"),
      proofs: [{ label: "Nexus Imobiliária", to: "/projects/nexus-imobiliaria" }],
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/60 border-y border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <p className="font-mono text-xs text-muted-foreground mb-4">
          <span className="text-primary">02</span> / {tr("O que eu faço", "What I do")}
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground max-w-2xl mb-14">
          {tr("Design de jogos, de produto e de interface.", "Game, product and interface design.")}
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {skills.map((s, i) => (
            <div key={s.title} className="bg-background p-7 md:p-8 flex flex-col">
              <p className="font-mono text-xs text-primary mb-6">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="font-body text-[15px] text-muted-foreground leading-relaxed mb-6">{s.description}</p>
              <ul className="flex flex-wrap gap-2 mb-8">
                {s.tags.map((t) => (
                  <li key={t} className="px-2.5 py-1 rounded-full bg-secondary font-mono text-xs text-foreground">{t}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2">
                {s.proofs.map((p) => (
                  <Link key={p.to} to={lp(p.to)} className="inline-flex items-center gap-1 font-body text-sm font-medium text-foreground hover:text-primary">
                    {tr("Ver em", "See")} {p.label} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
