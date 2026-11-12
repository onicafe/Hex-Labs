import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const facts = [
  { label: "Base", value: profile.location },
  { label: "Formato", value: "Remoto ou híbrido em Natal" },
  { label: "Idiomas", value: "Português (nativo) e inglês (bilíngue)" },
  { label: "Ferramentas", value: "Figma, Illustrator, Photoshop, React, Flutter" },
  { label: "Formação", value: "Design Gráfico (UnP), pós em Desenvolvimento de Metaverso (UNA)" },
];

const About = () => (
  <section id="about" className="py-24 md:py-32 scroll-mt-16">
    <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-7">
        <p className="font-mono text-xs text-muted-foreground mb-4">
          <span className="text-primary">03</span> / Sobre
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-8">
          Designer que também escreve código.
        </h2>
        <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
          <p>
            Comecei no design gráfico, passei pelo game design e cheguei ao design de produto e ao front-end. Hoje trabalho entre
            os dois: entendo o problema com quem usa, desenho a solução e ajudo a colocá-la de pé.
          </p>
          <p>
            Trabalhei com organizações do Brasil, do Japão, da Noruega e de Portugal, sempre de forma remota. Fui o único designer
            de uma editora norueguesa de jogos e desenhei produtos digitais para a Dione Solutions, de Tóquio. Como voluntário,
            colaborei em projetos públicos do TRF5 e do Governo do RN.
          </p>
          <p>
            Em 2026 fundei a Hex Labs, um estúdio de produtos digitais com IA, onde construo produtos próprios do design ao código.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 mt-10">
          <Link to="/curriculo" className="inline-flex items-center gap-1 font-body text-sm font-medium text-foreground hover:text-primary">
            Currículo completo <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link to="/projects/hex-labs" className="inline-flex items-center gap-1 font-body text-sm font-medium text-foreground hover:text-primary">
            Hex Labs <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <dl className="lg:col-span-5 self-start rounded-3xl border border-border bg-card divide-y divide-border">
        {facts.map((f) => (
          <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-4 px-6 py-5">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground pt-0.5">{f.label}</dt>
            <dd className="font-body text-[15px] text-foreground">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default About;
