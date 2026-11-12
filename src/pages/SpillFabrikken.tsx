import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { updateSEO } from "@/lib/seo";
import { brand, extras, games, sf } from "@/data/spillfabrikken";
import { FigureGrid, MetaStrip, PaletteRow, SectionHeading, useLightbox } from "@/components/case/CaseKit";

const ACCENT = brand.palette[0];

const SpillFabrikken = () => {
  const { open, lightbox } = useLightbox();

  useEffect(() => {
    updateSEO("SpillFabrikken", brand.summary, sf(49));
    window.scrollTo(0, 0);
  }, []);

  const collage = [games[0], games[1], games[3], games[4]];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="font-mono text-xs tracking-wide text-muted-foreground mb-10 flex gap-2">
            <Link to="/projects" className="hover:text-foreground">Projetos</Link>
            <span>/</span>
            <span className="text-foreground">SpillFabrikken</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="min-w-0" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="font-mono text-xs tracking-[0.25em] uppercase mb-5" style={{ color: ACCENT }}>
                Estudo de caso · Product e Game Design
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[0.95] mb-3 break-words">SpillFabrikken</h1>
              <p className="font-body text-muted-foreground mb-8">{brand.meaning}</p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">{brand.summary}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="grid grid-cols-2 gap-3"
            >
              {collage.map((g) => (
                <Link key={g.slug} to={`/projects/spillfabrikken/${g.slug}`} className="block rounded-2xl overflow-hidden border border-white/5 aspect-square">
                  <img src={g.cover} alt={g.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-12">
        <MetaStrip
          items={[
            { label: "Cliente", value: `${brand.name}, ${brand.location}` },
            { label: "Meu papel", value: brand.role },
            { label: "Período", value: brand.period },
            { label: "Jogos na linha", value: `${games.length} jogos, incluindo 4 edições do Kryptert` },
          ]}
        />
      </div>

      <main className="container mx-auto px-6 lg:px-12 py-24 space-y-28">
        <section>
          <SectionHeading index={1} label="Marca" title="Identidade visual" accent={ACCENT} />
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 -mt-4 mb-10">
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              O símbolo nasce do naipe de ouros dos baralhos: um losango vermelho que guarda as iniciais SP·FK. Ao lado do nome, ele
              funciona como o ponto de um i, e sozinho vira o selo que aparece nas caixas e nas cartas. A apresentação inclui a
              construção, as variações e o teste de redução até 10% do tamanho.
            </p>
            <div className="space-y-6">
              <PaletteRow colors={brand.palette} />
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">Entregáveis</p>
                <ul className="flex flex-wrap gap-2">
                  {brand.deliverables.map((d) => (
                    <li key={d} className="px-3 py-1 rounded-full bg-secondary font-body text-xs text-foreground">{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <FigureGrid figures={brand.identity.slice(0, 1)} columns={1} onOpen={open} />
          <div className="mt-4">
            <FigureGrid figures={brand.identity.slice(1)} columns={3} onOpen={open} />
          </div>
        </section>

        <section>
          <SectionHeading index={2} label="Catálogo" title="A linha de jogos" accent={ACCENT} />
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl -mt-4 mb-10">
            Cada jogo tem nome, logotipo, cartas e caixa próprios, mas todos seguem o mesmo sistema de embalagem. Clique em um jogo
            para ver o estudo de caso completo.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((g) => (
              <Link key={g.slug} to={`/projects/spillfabrikken/${g.slug}`} className="group block rounded-2xl border border-border bg-card overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img src={g.cover} alt={g.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: g.accent }} />
                    <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{g.name}</h3>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">{g.meaning}</p>
                  <p className="font-mono text-[11px] tracking-wide uppercase text-muted-foreground mt-3">
                    {[g.specs.age, g.specs.players && `${g.specs.players} jog.`, g.specs.time].filter(Boolean).join(" · ") || g.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading index={3} label="Sistema" title="Um sistema de embalagem para a linha toda" accent={ACCENT} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-4 mb-10">
            {brand.packagingSystem.map((item, i) => (
              <div key={item.label} className="rounded-2xl border border-border p-6">
                <p className="font-mono text-xs mb-3" style={{ color: ACCENT }}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display font-bold text-foreground mb-2">{item.label}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <FigureGrid figures={brand.packagingFigures} columns={3} uniform onOpen={open} />
        </section>

        <section>
          <SectionHeading index={4} label="Sistema" title="Modelos de carta" accent={ACCENT} />
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl -mt-4 mb-10">
            Um modelo de carta com faixa de cor por categoria, reaproveitado em vários jogos de perguntas e desafios.
          </p>
          <FigureGrid figures={brand.cardSystem} columns={2} onOpen={open} />
        </section>

        <section>
          <SectionHeading index={5} label="Extras" title="Outros produtos e embalagens" accent={ACCENT} />
          <FigureGrid figures={extras} columns={2} uniform onOpen={open} />
        </section>

        <div className="flex justify-end">
          <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary">
            Ver todos os projetos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
      {lightbox}
    </div>
  );
};

export default SpillFabrikken;
