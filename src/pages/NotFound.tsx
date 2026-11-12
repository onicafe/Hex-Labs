import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n";

const NotFound = () => {
  const { lp, tr } = useI18n();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 grid place-items-center px-6 py-32">
        <div className="max-w-xl text-center">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-primary mb-5">404</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">{tr("Página não encontrada", "Page not found")}</h1>
          <p className="font-body text-lg text-muted-foreground mb-10">
            {tr("O endereço mudou ou não existe. Os trabalhos estão a um clique.", "This address has moved or doesn't exist. The work is one click away.")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to={lp("/")} className="px-6 py-3 rounded-full bg-foreground text-background font-body text-sm font-medium hover:bg-primary transition-colors">
              {tr("Voltar ao início", "Back to home")}
            </Link>
            <Link to={lp("/projects")} className="px-6 py-3 rounded-full border border-foreground/20 text-foreground font-body text-sm font-medium hover:border-foreground transition-colors">
              {tr("Ver projetos", "See projects")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
