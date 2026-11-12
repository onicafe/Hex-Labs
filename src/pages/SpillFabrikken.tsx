import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { updateSEO } from "@/lib/seo";
import { brand, extras, games, sf, STORE_URL } from "@/data/spillfabrikken";
import {
  FigureGrid,
  ImpactStrip,
  LogoTile,
  MetaStrip,
  PaletteRow,
  ProcessSteps,
  SectionHeading,
  StatusBadge,
  useLightbox,
} from "@/components/case/CaseKit";

const ACCENT = brand.palette[0];

const SpillFabrikken = () => {
  const { open, lightbox } = useLightbox();

  useEffect(() => {
    updateSEO("SpillFabrikken", brand.summary, sf(49));
    window.scrollTo(0, 0);
  }, []);

  const collage = [games[0], games[3], games[2], games[4]];
  const withLogo = games.filter((g) => g.logoMask);
  let section = 0;

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
              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full border border-border font-body text-sm text-foreground hover:bg-secondary transition-colors"
              >
                spillfabrikken.no <ExternalLink className="w-4 h-4" />
              </a>
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

      <div className="container mx-auto px-6 lg:px-12 space-y-12">
        <MetaStrip
          items={[
            { label: "Cliente", value: `${brand.name}, ${brand.location}` },
            { label: "Meu papel", value: brand.role },
            { label: "Período", value: brand.period },
            { label: "Ferramentas", value: "Photoshop e Illustrator" },
          ]}
        />
        <ImpactStrip items={brand.impact} note={brand.impactNote} accent={ACCENT} />
      </div>

      <main className="container mx-auto px-6 lg:px-12 py-24 space-y-28">
        <section>
          <SectionHeading index={++section} label="Papel" title="O único designer da editora" accent={ACCENT} />
          <ul className="grid md:grid-cols-2 gap-6">
            {brand.myRole.map((line) => (
              <li key={line} className="flex gap-4 rounded-2xl border border-border p-6">
                <span className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ background: ACCENT }} />
                <p className="font-body text-base text-muted-foreground leading-relaxed">{line}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading index={++section} label="Processo" title="Do briefing à fábrica" accent={ACCENT} />
          <ProcessSteps steps={brand.process} accent={ACCENT} />
          <p className="font-body text-muted-foreground mt-6">{brand.pace}</p>
          <div className="mt-12">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Arquivos enviados à fábrica</p>
            <FigureGrid figures={brand.production} columns={1} paper onOpen={open} />
          </div>
        </section>

        <section>
          <SectionHeading index={++section} label="Marca" title="Identidade visual" accent={ACCENT} />
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 -mt-4 mb-10">
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              O símbolo nasce do naipe de ouros dos baralhos: um losango vermelho que guarda as iniciais SP·FK. Ao lado do nome, ele
              funciona como o ponto de um i, e sozinho vira o selo que aparece nas caixas e nas cartas. A apresentação inclui a
              construção, as variações e o teste de redução até 10% do tamanho.
            </p>
            <PaletteRow colors={brand.palette} />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {brand.logoFiles.light.map((f) => (
              <figure key={f.src}>
                <div className="aspect-square rounded-2xl bg-white border border-white/10 overflow-hidden">
                  <img src={f.src} alt={f.caption} loading="lazy" className="w-full h-full object-contain" />
                </div>
                <figcaption className="font-mono text-[11px] text-muted-foreground mt-3">{f.caption}</figcaption>
              </figure>
            ))}
            {brand.logoFiles.dark.map((f) => (
              <figure key={f.src}>
                <div className="aspect-square rounded-2xl bg-[#111] border border-white/10 overflow-hidden">
                  <img src={f.src} alt={f.caption} loading="lazy" className="w-full h-full object-contain" />
                </div>
                <figcaption className="font-mono text-[11px] text-muted-foreground mt-3">{f.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-4">
            <FigureGrid figures={brand.identity} columns={3} onOpen={open} />
          </div>
        </section>

        <section>
          <SectionHeading index={++section} label="Catálogo" title="A linha de jogos" accent={ACCENT} />
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl -mt-4 mb-10">
            Cada jogo tem nome, logotipo, cartas e caixa próprios, mas todos seguem o mesmo sistema de embalagem. Clique em um jogo
            para ver o estudo de caso completo.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((g) => (
              <Link key={g.slug} to={`/projects/spillfabrikken/${g.slug}`} className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img src={g.cover} alt={g.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: g.accent }} />
                    <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{g.name}</h3>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mb-4">{g.meaning}</p>
                  {g.status && (
                    <div className="mt-auto">
                      <StatusBadge status={g.status} />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading index={++section} label="Marcas" title="Logotipos da linha" accent={ACCENT} />
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl -mt-4 mb-10">
            Cada jogo ganhou um logotipo com personalidade própria. Aqui eles aparecem isolados das caixas, em positivo e em negativo.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-10">
            {withLogo.map((g) => (
              <div key={g.slug} className="grid grid-cols-2 gap-3">
                <LogoTile mask={g.logoMask!} bg="#f2f2f0" fg="#111111" label={`${g.name}: positivo`} />
                <LogoTile mask={g.logoMask!} bg="#0f0f0f" fg="#ffffff" label={`${g.name}: negativo`} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading index={++section} label="Sistema" title="Um sistema de embalagem para a linha toda" accent={ACCENT} />
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
          <div className="mt-12">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Modelos de carta</p>
            <FigureGrid figures={brand.cardSystem} columns={2} onOpen={open} />
          </div>
        </section>

        <section>
          <SectionHeading index={++section} label="Além da caixa" title="Loja online e campanhas" accent={ACCENT} />
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl -mt-4 mb-10">
            Também desenhei as peças da loja online (banners, página de produto no celular, regras e checkout) e as campanhas
            sazonais em vários formatos: Páscoa, Dia dos Namorados e promoções de jogos específicos.
          </p>
          <FigureGrid figures={brand.web} columns={3} uniform contain onOpen={open} />
          <div className="mt-10">
            <FigureGrid figures={brand.campaigns} columns={3} uniform onOpen={open} />
          </div>
          <div className="mt-4">
            <FigureGrid figures={brand.campaignBanners} columns={2} onOpen={open} />
          </div>
        </section>

        <section>
          <SectionHeading index={++section} label="Extras" title="Outros produtos e embalagens" accent={ACCENT} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {extras.map((x) => (
              <article key={x.src} className="rounded-2xl border border-border overflow-hidden bg-card">
                <button type="button" onClick={() => open(x.src)} className="block w-full aspect-[4/3] overflow-hidden cursor-zoom-in">
                  <img src={x.src} alt={x.caption} loading="lazy" className="w-full h-full object-cover" />
                </button>
                <div className="p-5">
                  <h3 className="font-display font-bold text-foreground mb-2">{x.caption}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{x.text}</p>
                </div>
              </article>
            ))}
          </div>
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
