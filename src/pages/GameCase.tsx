import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { updateSEO } from "@/lib/seo";
import { brand, games, getGame } from "@/data/spillfabrikken";
import { Anatomy, FigureGrid, MetaStrip, PaletteRow, SectionHeading, SpecSheet, useLightbox } from "@/components/case/CaseKit";

const GameCase = () => {
  const { game: slug } = useParams<{ game: string }>();
  const game = getGame(slug);
  const { open, lightbox } = useLightbox();

  useEffect(() => {
    if (game) updateSEO(`${game.name} · SpillFabrikken`, game.summary, game.cover);
    window.scrollTo(0, 0);
  }, [game]);

  if (!game) return <Navigate to="/projects/spillfabrikken" replace />;

  const index = games.findIndex((g) => g.slug === game.slug);
  const prev = games[(index - 1 + games.length) % games.length];
  const next = games[(index + 1) % games.length];
  let section = 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="font-mono text-xs tracking-wide text-muted-foreground mb-10 flex flex-wrap gap-2">
            <Link to="/projects" className="hover:text-foreground">Projetos</Link>
            <span>/</span>
            <Link to="/projects/spillfabrikken" className="hover:text-foreground">SpillFabrikken</Link>
            <span>/</span>
            <span className="text-foreground">{game.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="min-w-0" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="font-mono text-xs tracking-[0.25em] uppercase mb-5" style={{ color: game.accent }}>
                {game.category}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[0.95] mb-3 break-words">{game.name}</h1>
              <p className="font-body text-muted-foreground mb-8">{game.meaning}</p>
              <blockquote className="border-l-2 pl-5 mb-8" style={{ borderColor: game.accent }}>
                <p className="font-display text-xl md:text-2xl text-foreground">“{game.tagline}”</p>
                <p className="font-body text-sm text-muted-foreground mt-1">{game.taglinePt}</p>
              </blockquote>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">{game.summary}</p>
            </motion.div>
            <motion.button
              type="button"
              onClick={() => open(game.cover)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="block rounded-3xl overflow-hidden border border-white/5 bg-card cursor-zoom-in"
            >
              <img src={game.cover} alt={`${game.name}: imagem principal`} className="w-full h-auto" />
            </motion.button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-12">
        <MetaStrip
          items={[
            { label: "Cliente", value: `${brand.name}, ${brand.location}` },
            { label: "Meu papel", value: brand.role },
            { label: "Período", value: brand.period },
            { label: "Entregáveis", value: "Game design, cartas, embalagem e renders" },
          ]}
        />
      </div>

      <main className="container mx-auto px-6 lg:px-12 py-24 space-y-28">
        {/* Como se joga + ficha técnica */}
        <section>
          <SectionHeading index={++section} label="O jogo" title="Como se joga" accent={game.accent} />
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
            <ol className="space-y-8">
              {game.howToPlay.map((step, i) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="font-display text-3xl font-bold" style={{ color: game.accent }}>
                    {i + 1}
                  </span>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
            <div className="space-y-10">
              <SpecSheet specs={game.specs} accent={game.accent} />
              <PaletteRow colors={game.palette} />
            </div>
          </div>
        </section>

        {game.anatomy && (
          <section>
            <SectionHeading index={++section} label="Sistema" title="Anatomia da carta" accent={game.accent} />
            <Anatomy image={game.anatomy.image} points={game.anatomy.points} accent={game.accent} />
          </section>
        )}

        {game.boards.map((board) => (
          <section key={board.title}>
            <SectionHeading index={++section} label="Prancha" title={board.title} accent={game.accent} />
            {board.text && <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl -mt-4 mb-10">{board.text}</p>}
            <FigureGrid figures={board.figures} columns={board.columns} onOpen={open} />
          </section>
        ))}

        {game.variants && (
          <section>
            <SectionHeading index={++section} label="Família" title="Uma carta, quatro edições" accent={game.accent} />
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl -mt-4 mb-10">
              A estrutura da carta e da caixa se mantém. Mudam a cor, o padrão e o tom das frases, o que permite lançar novas edições
              sem redesenhar o produto do zero.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {game.variants.map((v) => (
                <article key={v.name} className="rounded-2xl border border-border overflow-hidden bg-card">
                  <button type="button" onClick={() => open(v.image)} className="block w-full aspect-square overflow-hidden cursor-zoom-in">
                    <img src={v.image} alt={v.name} loading="lazy" className="w-full h-full object-cover" />
                  </button>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: v.color }} />
                      <h3 className="font-display font-bold text-foreground">{v.name}</h3>
                    </div>
                    <p className="font-mono text-[11px] tracking-wide uppercase text-muted-foreground mb-3">{v.meaning}</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {game.gallery && game.gallery.length > 0 && (
          <section>
            <SectionHeading index={++section} label="Arquivo" title="Galeria" accent={game.accent} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {game.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => open(src)}
                  className="overflow-hidden rounded-xl bg-card border border-white/5 aspect-[4/3] cursor-zoom-in"
                >
                  <img src={src} alt={`${game.name}, imagem ${i + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Navigation */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between gap-8">
          <Link to={`/projects/spillfabrikken/${prev.slug}`} className="group flex items-center gap-4">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Jogo anterior</p>
              <p className="font-display text-lg font-bold text-foreground group-hover:text-primary">{prev.name}</p>
            </div>
          </Link>
          <Link to="/projects/spillfabrikken" className="self-center font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary">
            Todos os jogos da SpillFabrikken
          </Link>
          <Link to={`/projects/spillfabrikken/${next.slug}`} className="group flex items-center gap-4 md:flex-row-reverse md:text-right">
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Próximo jogo</p>
              <p className="font-display text-lg font-bold text-foreground group-hover:text-primary">{next.name}</p>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
      {lightbox}
    </div>
  );
};

export default GameCase;
