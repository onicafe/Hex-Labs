import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { useData } from "@/i18n/data";

const Footer = () => {
  const { lp, tr } = useI18n();
  const { profile } = useData();
  return (
    <footer className="border-t border-border print:hidden">
      <div className="container mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link to={lp("/")} className="font-display text-lg font-semibold text-foreground">{profile.name}</Link>
          <p className="font-mono text-xs text-muted-foreground mt-1">
            {profile.title} · {profile.location}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-muted-foreground">
          <Link to={lp("/projects")} className="hover:text-foreground">{tr("Projetos", "Projects")}</Link>
          <Link to={lp("/curriculo")} className="hover:text-foreground">{tr("Currículo", "Résumé")}</Link>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href={profile.behance} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Behance</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">E-mail</a>
        </nav>
        <p className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
};

export default Footer;
