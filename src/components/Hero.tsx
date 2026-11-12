import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { sf } from "@/data/spillfabrikken";

const Hero = () => (
  <section className="pt-32 pb-16 md:pt-40 md:pb-24">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
        <motion.div
          className="lg:col-span-7 min-w-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {profile.availability} · {profile.location}
          </p>
          <h1 className="font-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl font-semibold text-foreground mb-8">
            Desenho jogos e produtos, do conceito à produção.
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Sou {profile.name}, {profile.title}. Fui o único designer da SpillFabrikken, a editora do Kryptert, que segundo ela
            é o jogo de cartas mais vendido da Noruega há três anos. Também desenhei produtos para clientes no Japão, em Portugal
            e no Brasil.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-body text-sm font-medium hover:bg-primary transition-colors"
            >
              Ver trabalhos <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href={profile.cvPdfUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 text-foreground font-body text-sm font-medium hover:border-foreground transition-colors"
            >
              Baixar CV
            </a>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Link to="/projects/spillfabrikken/kryptert" className="group block">
            <div className="relative rounded-3xl overflow-hidden bg-card border border-border aspect-[4/5]">
              <img src={sf(49)} alt="Caixa do Kryptert, jogo de cartas da SpillFabrikken" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="font-mono text-xs text-muted-foreground">Kryptert · SpillFabrikken · 2020</p>
              <span className="inline-flex items-center gap-1 font-body text-sm text-foreground group-hover:text-primary transition-colors">
                Ver case <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>

      <dl className="grid grid-cols-2 lg:grid-cols-4 mt-16 md:mt-24 border-t border-border">
        {profile.highlights.map((h, i) => (
          <div key={h.label} className={`pt-6 pb-2 pr-6 ${i > 0 ? "lg:pl-6 lg:border-l lg:border-border" : ""} ${i % 2 === 1 ? "pl-6 border-l border-border lg:border-l" : ""}`}>
            <dt className="font-display text-3xl md:text-4xl font-semibold text-foreground">{h.value}</dt>
            <dd className="font-body text-sm text-muted-foreground mt-1">{h.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Hero;
