import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { switchLangPath, useI18n } from "@/i18n";
import { useData } from "@/i18n/data";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, lp, tr } = useI18n();
  const { profile } = useData();
  const home = lp("/");
  const isHomePage = location.pathname.replace(/\/+$/, "") === home.replace(/\/+$/, "") || location.pathname === home;
  // Âncoras fora do router precisam do caminho base quando o site está numa subpasta.
  const homeAnchor = (id: string) => (isHomePage ? `#${id}` : `${import.meta.env.BASE_URL}${home.replace(/^\//, "")}#${id}`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: tr("Trabalhos", "Work"), href: homeAnchor("work"), anchor: true },
    { label: tr("Sobre", "About"), href: homeAnchor("about"), anchor: true },
    { label: tr("Currículo", "Résumé"), href: lp("/curriculo") },
    { label: tr("Contato", "Contact"), href: homeAnchor("contact"), anchor: true },
  ];

  const linkClass = "font-body text-sm text-muted-foreground hover:text-foreground transition-colors";
  const langSwitch = (
    <Link
      to={switchLangPath(location.pathname)}
      hrefLang={lang === "en" ? "pt-BR" : "en"}
      className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
      aria-label={lang === "en" ? "Ver em português" : "View in English"}
    >
      <span className={lang === "pt" ? "text-foreground" : ""}>PT</span>
      <span className="mx-1 opacity-50">/</span>
      <span className={lang === "en" ? "text-foreground" : ""}>EN</span>
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to={home} className="flex items-baseline gap-3 group">
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">{profile.name}</span>
            <span className="hidden sm:inline font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {profile.title}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) =>
              "anchor" in item ? (
                <a key={item.label} href={item.href} className={linkClass}>{item.label}</a>
              ) : (
                <Link key={item.label} to={item.href} className={linkClass}>{item.label}</Link>
              ),
            )}
            {langSwitch}
            <a
              href={profile.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-foreground text-background font-body text-sm font-medium hover:bg-primary transition-colors"
            >
              {tr("CV em PDF", "CV (PDF)")}
            </a>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            {langSwitch}
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 -mr-2 text-foreground" aria-label={tr("Abrir menu", "Open menu")}>
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-left font-display text-xl font-semibold">{profile.name}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-10">
                  {navItems.map((item) =>
                    "anchor" in item ? (
                      <a key={item.label} href={item.href} className="font-display text-2xl text-foreground hover:text-primary">{item.label}</a>
                    ) : (
                      <Link key={item.label} to={item.href} className="font-display text-2xl text-foreground hover:text-primary">{item.label}</Link>
                    ),
                  )}
                  <a href={profile.cvPdfUrl} target="_blank" rel="noopener noreferrer" className="font-display text-2xl text-primary">
                    {tr("CV em PDF", "CV (PDF)")}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
