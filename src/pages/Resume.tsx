import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Linkedin, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ResumeEntry } from "@/data/resume";
import { useI18n } from "@/i18n";
import { useData } from "@/i18n/data";

const sectionTitle =
  "font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground mb-10 pb-4 border-b border-border print:mb-4 print:border-black/20";

const Entry = ({ xp }: { xp: ResumeEntry }) => {
  const { lp, tr } = useI18n();
  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-8 print:grid-cols-[150px_1fr] print:break-inside-avoid">
      <p className="font-mono text-sm text-muted-foreground md:text-right pt-1">{xp.period}</p>
      <div className="md:pl-8 md:border-l border-border print:border-0 print:pl-0">
        <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-1 print:text-lg">{xp.role}</h3>
        <p className="font-body text-base text-foreground/70 mb-3 print:mb-1">{xp.company}</p>
        <ul className="space-y-2 print:space-y-1">
          {xp.bullets.map((b) => (
            <li key={b} className="flex gap-3 font-body text-base text-muted-foreground leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        {xp.link && (
          <Link to={lp(xp.link)} className="inline-block mt-3 font-body text-sm font-medium text-foreground hover:text-primary transition-colors print:hidden">
            {tr("Ver estudo de caso →", "View case study →")}
          </Link>
        )}
      </div>
    </div>
  );
};

const Resume = () => {
  const { lp, tr } = useI18n();
  const { profile, resume } = useData();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 print:pt-0 print:pb-0">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-20 print:mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12 print:hidden">
              <Link to={lp("/")} className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                {tr("Voltar ao início", "Back to home")}
              </Link>
              <div className="flex flex-wrap gap-3">
                <a
                  href={profile.cvPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-body text-sm font-medium rounded-full hover:bg-primary transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {tr("CV de produto (PDF)", "Product CV (PDF)")}
                </a>
                <a
                  href={profile.cvGamesPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-foreground/20 text-foreground font-body text-sm font-medium rounded-full hover:border-foreground transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {tr("CV de jogos (PDF)", "Games CV (PDF)")}
                </a>
              </div>
            </div>

            <p className="font-mono text-xs tracking-[0.25em] uppercase text-primary mb-5">{tr("Currículo", "Résumé")}</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4 print:text-4xl print:mb-2">{profile.name}</h1>
            <p className="font-body text-xl md:text-2xl text-foreground/80 font-medium">{profile.title}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 font-body text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" />{profile.location} · {profile.availability}</span>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-foreground"><Mail className="w-4 h-4" />{profile.email}</a>
              <a href={profile.linkedin} className="inline-flex items-center gap-2 hover:text-foreground"><Linkedin className="w-4 h-4" />linkedin.com/in/iesujafe</a>
            </div>

            <p className="font-body text-lg text-muted-foreground leading-relaxed mt-10">{resume.summary}</p>
          </motion.div>

          <section className="mb-24 print:mb-8">
            <h2 className={sectionTitle}>{tr("Ferramentas e habilidades", "Tools and skills")}</h2>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 print:gap-y-3">
              {resume.tools.map((t) => (
                <div key={t.group}>
                  <h3 className="font-body font-semibold text-foreground mb-2 print:mb-1">{t.group}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">{t.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24 print:mb-8">
            <h2 className={sectionTitle}>{tr("Experiência", "Experience")}</h2>
            <div className="space-y-12 print:space-y-4">
              {resume.experience.map((xp) => (
                <Entry key={xp.company + xp.role} xp={xp} />
              ))}
            </div>
          </section>

          <section className="mb-24 print:mb-8">
            <h2 className={sectionTitle}>{tr("Projetos autorais e voluntariado", "Personal projects and volunteering")}</h2>
            <div className="space-y-12 print:space-y-4">
              {resume.side.map((xp) => (
                <Entry key={xp.company + xp.role} xp={xp} />
              ))}
            </div>
          </section>

          <section className="mb-24 print:mb-8 print:break-inside-avoid">
            <h2 className={sectionTitle}>{tr("Formação", "Education")}</h2>
            <div className="grid md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-3">
              {resume.education.map((edu) => (
                <div key={edu.course} className="p-6 bg-card border border-border rounded-2xl flex flex-col justify-between print:p-0 print:border-0">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{edu.course}</h3>
                    <p className="font-body text-sm text-foreground/70 mb-4 print:mb-1">{edu.inst}</p>
                  </div>
                  <span className="self-start font-mono text-xs text-muted-foreground">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-12 print:grid-cols-2 print:gap-6 print:break-inside-avoid">
            <div>
              <h2 className={sectionTitle}>{tr("Certificações", "Certifications")}</h2>
              <ul className="space-y-2">
                {resume.certifications.map((c) => (
                  <li key={c} className="font-body text-muted-foreground">{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={sectionTitle}>{tr("Idiomas", "Languages")}</h2>
              <ul className="space-y-2">
                {resume.languages.map((l) => (
                  <li key={l} className="font-body text-muted-foreground">{l}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
