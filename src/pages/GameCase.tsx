import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Anatomy,
  FigureGrid,
  LogoBoard,
  MetaStrip,
  PaletteRow,
  SectionHeading,
  SpecSheet,
  StatusBadge,
  textAccent,
  useLightbox,
} from "@/components/case/CaseKit";
import CardBlueprint from "@/components/case/CardBlueprint";
import { useI18n } from "@/i18n";
import { useData } from "@/i18n/data";

const GameCase = () => {
  const { game: slug } = useParams<{ game: string }>();
  const { lp, tr } = useI18n();
  const { brand, games } = useData();
  const game = games.find((g) => g.slug === slug);
  const { open, lightbox } = useLightbox();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!game) return <Navigate to={lp("/projects/spillfabrikken")} replace />;

  const index = games.findIndex((g) => g.slug === game.slug);
  const prev = games[(index - 1 + games.length) % games.length];
  const next = games[(index + 1) % games.length];
  let section = 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Abertura */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="font-mono text-xs tracking-wide text-muted-foreground mb-10 flex flex-wrap gap-2">
            <Link to={lp("/projects")} className="hover:text-foreground">{tr("Projetos", "Projects")}</Link>
            <span>/</span>
            <Link to={lp("/projects/spillfabrikken")} className="hover:text-foreground">SpillFabrikken</Link>
            <span>/</span>
            <span className="text-foreground">{game.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="min-w-0" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <p className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: textAccent(game.accent) }}>
                  {game.category}
                </p>
                {game.status && <StatusBadge status={game.status} />}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[0.95] mb-3 break-words">{game.name}</h1>
              <p className="font-body text-muted-foreground mb-8">{game.meaning}</p>
              <blockquote className="border-l-2 pl-5 mb-8" style={{ borderColor: game.accent }}>
                <p className="font-display text-xl md:text-2xl text-foreground">“{game.tagline}”</p>
                <p className="font-body text-sm text-muted-foreground mt-1">{game.taglinePt}</p>
              </blockquote>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">{game.summary}</p>
              {game.storeUrl && (
                <a
                  href={game.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full border border-border font-body text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  {tr("Ver na loja da SpillFabrikken", "See it in the SpillFabrikken store")} <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
            <motion.button
              type="button"
              onClick={() => open(game.cover)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="block rounded-3xl overflow-hidden border border-border bg-card cursor-zoom-in"
            >
              <img src={game.cover} alt={`${game.name}: ${tr("imagem principal", "main image")}`} className="w-full h-auto" />
            </motion.button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-12">
        <MetaStrip
          items={[
            { label: tr("Cliente", "Client"), value: `${brand.name}, ${brand.location}` },
            { label: tr("Meu papel", "My role"), value: game.role },
            { label: tr("Meu período na editora", "My time at the publisher"), value: brand.period },
            { label: tr("Ferramentas", "Tools"), value: tr("Photoshop e Illustrator", "Photoshop and Illustrator") },
          ]}
        />
      </div>

      <main className="container mx-auto px-6 lg:px-12 py-24 space-y-28">
        <section>
          <SectionHeading index={++section} label={tr("O jogo", "The game")} title={tr("Como se joga", "How to play")} accent={game.accent} />
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
            <ol className="space-y-8">
              {game.howToPlay.map((step, i) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="font-display text-3xl font-bold" style={{ color: textAccent(game.accent) }}>
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

        {(game.story || game.credits) && (
          <section>
            <SectionHeading index={++section} label={tr("Bastidores", "Behind the scenes")} title={tr("Contexto e decisões", "Context and decisions")} accent={game.accent} />
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
              <ul className="space-y-5">
                {(game.story ?? []).map((line) => (
                  <li key={line} className="flex gap-4">
                    <span className="mt-2.5 w-2 h-2 rounded-full shrink-0" style={{ background: game.accent }} />
                    <p className="font-body text-lg text-muted-foreground leading-relaxed">{line}</p>
                  </li>
                ))}
              </ul>
              {game.credits && (
                <div className="rounded-2xl border border-border p-6 self-start">
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">{tr("Créditos", "Credits")}</p>
                  <ul className="space-y-3">
                    {game.credits.map((c) => (
                      <li key={c} className="font-body text-sm text-foreground leading-relaxed">{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {game.logoMask && (
          <section>
            <SectionHeading index={++section} label={tr("Marca", "Brand")} title={tr("Logotipo em positivo e negativo", "Logo in positive and negative")} accent={game.accent} />
            <LogoBoard mask={game.logoMask} name={game.name} accent={game.accent} />
          </section>
        )}

        {game.anatomy && (
          <section>
            <SectionHeading index={++section} label={tr("Sistema", "System")} title={tr("Anatomia da carta", "Anatomy of a card")} accent={game.accent} />
            <Anatomy image={game.anatomy.image} points={game.anatomy.points} accent={game.accent} alt={tr("Anatomia da carta", "Anatomy of a card")} />
          </section>
        )}

        {game.blueprint && (
          <section>
            <SectionHeading index={++section} label="Wireframe" title={tr("A carta em medidas", "The card, measured")} accent={game.accent} />
            <CardBlueprint accent={game.accent} />
          </section>
        )}

        {game.boards.map((board) => (
          <section key={board.title}>
            <SectionHeading index={++section} label={board.label ?? tr("Prancha", "Board")} title={board.title} accent={game.accent} />
            {board.text && <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl -mt-4 mb-10">{board.text}</p>}
            <FigureGrid figures={board.figures} columns={board.columns} uniform={board.uniform} paper={board.paper} onOpen={open} />
          </section>
        ))}

        {game.variants && (
          <section>
            <SectionHeading index={++section} label={tr("Família", "Family")} title={tr("Uma carta, quatro edições", "One card, four editions")} accent={game.accent} />
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl -mt-4 mb-10">
              {tr(
                "A estrutura da carta e da caixa se mantém. Mudam a cor, o padrão e o tom das frases, o que permite lançar novas edições sem redesenhar o produto do zero.",
                "The card and box structure stays the same. The color, pattern and tone of the phrases change, which makes it possible to launch new editions without redesigning the product from scratch.",
              )}
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
                    <p className="font-mono text-xs tracking-wide uppercase text-muted-foreground mb-3">{v.meaning}</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {game.gallery && game.gallery.length > 0 && (
          <section>
            <SectionHeading index={++section} label={tr("Arquivo", "Archive")} title={tr("Galeria", "Gallery")} accent={game.accent} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {game.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => open(src)}
                  className="overflow-hidden rounded-xl bg-card border border-border aspect-[4/3] cursor-zoom-in"
                >
                  <img
                    src={src}
                    alt={`${game.name}, ${tr("imagem", "image")} ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Navegação entre jogos */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between gap-8">
          <Link to={lp(`/projects/spillfabrikken/${prev.slug}`)} className="group flex items-center gap-4">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{tr("Jogo anterior", "Previous game")}</p>
              <p className="font-display text-lg font-bold text-foreground group-hover:text-primary">{prev.name}</p>
            </div>
          </Link>
          <Link to={lp("/projects/spillfabrikken")} className="self-center font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary">
            {tr("Todos os jogos da SpillFabrikken", "All SpillFabrikken games")}
          </Link>
          <Link to={lp(`/projects/spillfabrikken/${next.slug}`)} className="group flex items-center gap-4 md:flex-row-reverse md:text-right">
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">{tr("Próximo jogo", "Next game")}</p>
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
