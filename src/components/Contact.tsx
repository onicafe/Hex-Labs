import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/profile";

const Contact = () => {
  const links = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "WhatsApp", href: profile.phoneHref },
    { label: "Behance", href: profile.behance },
    { label: "GitHub", href: profile.github },
  ];

  return (
    <section id="contact" className="bg-ink text-paper scroll-mt-16">
      <div className="container mx-auto px-6 lg:px-12 py-24 md:py-32">
        <p className="font-mono text-xs text-paper/60 mb-4">
          <span className="text-primary">04</span> / Contato
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6 max-w-3xl">Vamos conversar?</h2>
        <p className="font-body text-lg text-paper/70 max-w-2xl mb-12">
          Estou buscando uma vaga como Product Designer ou Game Designer, de preferência em estúdios de jogos ou produtos
          digitais. Remoto ou híbrido em Natal.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex items-center gap-3 font-display text-2xl sm:text-4xl md:text-5xl font-semibold text-paper hover:text-primary transition-colors break-all"
        >
          {profile.email}
          <ArrowUpRight className="w-7 h-7 md:w-10 md:h-10 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>

        <div className="flex flex-wrap items-center gap-3 mt-12">
          <a
            href={profile.cvPdfUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper text-foreground font-body text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Download className="w-4 h-4" /> Baixar CV
          </a>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-5 py-3 rounded-full border border-paper/20 font-body text-sm text-paper hover:border-paper transition-colors"
            >
              {l.label} <ArrowUpRight className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
