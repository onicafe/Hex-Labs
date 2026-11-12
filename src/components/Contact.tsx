import { ArrowUpRight, FileText } from "lucide-react";
import { useI18n } from "@/i18n";
import { useData } from "@/i18n/data";

const Contact = () => {
  const { tr } = useI18n();
  const { profile } = useData();

  const offers = [
    {
      kicker: tr("Para empresas e estúdios", "For companies and studios"),
      title: tr("Vagas", "Full-time roles"),
      items: tr(
        "Product Designer ou Game Designer|Estúdios de jogos e times de produto digital|Remoto, ou híbrido em Natal (RN)|Trabalho em português e inglês",
        "Product Designer or Game Designer|Game studios and digital product teams|Remote, or hybrid in Natal, Brazil|Comfortable working in English and Portuguese",
      ).split("|"),
    },
    {
      kicker: tr("Para quem tem uma ideia", "For people with an idea"),
      title: tr("Projetos", "Projects"),
      items: tr(
        "Jogo de cartas ou de tabuleiro: regras, cartas, caixa e arte final|Embalagem e arquivos para a gráfica: faca, sangria e gabaritos|UX/UI de app ou sistema: fluxos, protótipo e telas para o desenvolvimento|Protótipo navegável para testar uma ideia antes de investir no código",
        "Card or board game: rules, cards, box and print-ready artwork|Packaging and print files: dielines, bleed and templates|App or system UX/UI: flows, prototype and developer-ready screens|Clickable prototype to test an idea before investing in code",
      ).split("|"),
    },
  ];

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
          <span className="text-primary">04</span> / {tr("Contato", "Contact")}
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6 max-w-3xl">{tr("Vamos conversar?", "Let's talk.")}</h2>
        <p className="font-body text-lg text-paper/70 max-w-2xl mb-12">
          {tr(
            "Estou aberto a vagas de Product Designer ou Game Designer e a projetos pontuais. Escreva com o contexto do trabalho e eu respondo.",
            "I'm open to Product Designer or Game Designer roles and to freelance projects. Send me some context about the work and I'll get back to you.",
          )}
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-paper/15 rounded-2xl overflow-hidden border border-paper/15 mb-14 max-w-5xl">
          {offers.map((o) => (
            <div key={o.title} className="bg-ink p-6 lg:p-8">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-3">{o.kicker}</p>
              <h3 className="font-display text-2xl font-semibold mb-4">{o.title}</h3>
              <ul className="space-y-2">
                {o.items.map((item) => (
                  <li key={item} className="flex gap-3 font-body text-[15px] text-paper/75 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-paper/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

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
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper text-foreground font-body text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <FileText className="w-4 h-4" /> {tr("CV em PDF", "CV (PDF)")}
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
