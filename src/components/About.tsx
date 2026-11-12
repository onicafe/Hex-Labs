import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n";
import { useData } from "@/i18n/data";

const About = () => {
  const { lp, tr } = useI18n();
  const { profile } = useData();

  const facts = [
    { label: tr("Base", "Based in"), value: profile.location },
    { label: tr("Formato", "Work"), value: tr("Remoto, ou híbrido em Natal", "Remote, or hybrid in Natal") },
    { label: tr("Idiomas", "Languages"), value: tr("Português (nativo) e inglês (bilíngue)", "Portuguese (native) and English (bilingual)") },
    { label: tr("Ferramentas", "Tools"), value: "Figma, Illustrator, Photoshop, React, Flutter, Godot" },
    {
      label: tr("Formação", "Education"),
      value: tr(
        "Design Gráfico (UnP) · Game Design e Desenvolvimento de Jogos (EBAC) · Pós em Desenvolvimento de Metaverso (UNA) · Ciência da Computação (UnP, em pausa)",
        "Graphic Design (UnP) · Game Design and Development (EBAC) · Postgraduate degree in Metaverse Development (UNA) · Computer Science (UnP, on hold)",
      ),
    },
  ];

  const principles = [
    {
      title: tr("Arquivo pronto para produzir", "Production-ready files"),
      text: tr(
        "O trabalho só termina quando sai do papel: arte final com faca e sangria para a gráfica, ou telas e componentes prontos para o desenvolvimento.",
        "The work is done when it ships: print-ready artwork with dielines and bleed, or screens and components ready for development.",
      ),
    },
    {
      title: tr("Sistema antes da peça", "Systems before pieces"),
      text: tr(
        "Uma linha de oito jogos só parece da mesma editora porque tem um sistema por trás: grade de carta, faixa de informações e regras de embalagem.",
        "Eight games only look like one publisher's line because there is a system behind them: a card grid, an info strip and packaging rules.",
      ),
    },
    {
      title: tr("Testar com quem usa", "Test with real users"),
      text: tr(
        "Jornada, fluxo e teste de usabilidade antes das telas finais; no jogo, robôs que jogam o dia inteiro e prints comparados com a referência.",
        "Journey, flow and usability testing before final screens; in my game, bots that play a full day and screenshots checked against references.",
      ),
    },
    {
      title: tr("Honestidade sobre o meu papel", "Clear about my role"),
      text: tr(
        "Cada estudo de caso diz o que foi meu, o que foi da equipe e de onde vêm os números.",
        "Every case study states what was mine, what was the team's and where the numbers come from.",
      ),
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 scroll-mt-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-muted-foreground mb-4">
              <span className="text-primary">03</span> / {tr("Sobre", "About")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-8">
              {tr("Designer que também escreve código.", "A designer who also writes code.")}
            </h2>
            <div className="space-y-5 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                {tr(
                  "Comecei no design gráfico, passei pelo game design e cheguei ao design de produto e ao front-end. Hoje atuo entre design e código: entendo o problema com quem usa, desenho a solução e acompanho a implementação até a entrega.",
                  "I started in graphic design, moved into game design and then into product design and front-end. Today I work between design and code: I understand the problem with the people who have it, design the solution and follow the implementation through to delivery.",
                )}
              </p>
              <p>
                {tr(
                  "Trabalhei com organizações do Brasil, do Japão, da Noruega e de Portugal, quase sempre de forma remota. Fui o único designer de uma editora norueguesa de jogos e desenhei produtos digitais para a Dione Solutions, de Tóquio. Como voluntário, colaborei em projetos públicos do TRF5 e do Governo do RN.",
                  "I've worked with organizations in Brazil, Japan, Norway and Portugal, almost always remotely. I was the sole designer at a Norwegian game publisher and designed digital products for Dione Solutions in Tokyo. As a volunteer, I contributed to public-sector projects for Brazil's Federal Regional Court (TRF5) and the State of Rio Grande do Norte.",
                )}
              </p>
              <p>
                {tr(
                  "Em 2026 fundei a Hex Labs, um estúdio de produtos digitais com IA. Em paralelo, desenvolvo o Lan House Simulator, um jogo 3D em Godot sobre a lan house que eu tive.",
                  "In 2026 I founded Hex Labs, an AI-driven digital product studio. On the side, I'm making Lan House Simulator, a 3D game in Godot about the LAN house I used to run.",
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-6 mt-10">
              <Link to={lp("/curriculo")} className="inline-flex items-center gap-1 font-body text-sm font-medium text-foreground hover:text-primary">
                {tr("Currículo completo", "Full résumé")} <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link to={lp("/projects/lan-house-simulator")} className="inline-flex items-center gap-1 font-body text-sm font-medium text-foreground hover:text-primary">
                Lan House Simulator <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link to={lp("/projects/hex-labs")} className="inline-flex items-center gap-1 font-body text-sm font-medium text-foreground hover:text-primary">
                Hex Labs <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <dl className="lg:col-span-5 self-start rounded-3xl border border-border bg-card divide-y divide-border">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-4 px-6 py-5">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground pt-0.5">{f.label}</dt>
                <dd className="font-body text-[15px] text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20">
          <p className="font-mono text-xs text-muted-foreground mb-6">{tr("Como eu trabalho", "How I work")}</p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-background p-6">
                <p className="font-mono text-xs text-primary mb-4">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
