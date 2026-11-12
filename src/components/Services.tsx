import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const skills = [
  {
    title: "Game design",
    description: "Mecânicas, cartas, regras e embalagens, da ideia até a arte final que vai para a fábrica.",
    tags: ["Cartas e regras", "Embalagem", "Prototipagem", "Produção"],
    proof: { label: "SpillFabrikken", to: "/projects/spillfabrikken" },
  },
  {
    title: "Product design e UX",
    description: "Pesquisa, fluxos e interfaces para produtos complexos, de app jurídico a plataforma pública de inscrição.",
    tags: ["Pesquisa", "Fluxos", "Testes de usabilidade", "Acessibilidade"],
    proof: { label: "Jovem Potiguar", to: "/projects/jovem-potiguar" },
  },
  {
    title: "UI e front-end",
    description: "Levo o design até a tela em React, TypeScript e Flutter, e uso IA e automação (agentes, n8n) no processo.",
    tags: ["React", "TypeScript", "Flutter", "Design systems"],
    proof: { label: "Hex Labs", to: "/projects/hex-labs" },
  },
];

const Services = () => (
  <section id="services" className="py-24 md:py-32 bg-secondary/60 border-y border-border">
    <div className="container mx-auto px-6 lg:px-12">
      <p className="font-mono text-xs text-muted-foreground mb-4">
        <span className="text-primary">02</span> / O que eu faço
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground max-w-2xl mb-14">
        Três frentes, sempre com o trabalho como prova.
      </h2>

      <div className="grid md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
        {skills.map((s, i) => (
          <div key={s.title} className="bg-background p-7 md:p-8 flex flex-col">
            <p className="font-mono text-xs text-primary mb-6">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{s.title}</h3>
            <p className="font-body text-[15px] text-muted-foreground leading-relaxed mb-6">{s.description}</p>
            <ul className="flex flex-wrap gap-2 mb-8">
              {s.tags.map((t) => (
                <li key={t} className="px-2.5 py-1 rounded-full bg-secondary font-mono text-[11px] text-foreground">{t}</li>
              ))}
            </ul>
            <Link to={s.proof.to} className="mt-auto inline-flex items-center gap-1 font-body text-sm font-medium text-foreground hover:text-primary">
              Ver em {s.proof.label} <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
