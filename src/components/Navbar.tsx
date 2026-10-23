import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Logo = () => (
  <>
    IÉSU JAFÉ<span className="text-primary">.</span>
  </>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  // Anchors outside the router need the base path when the site lives in a subfolder.
  const homeAnchor = (id: string) => (isHomePage ? `#${id}` : `${import.meta.env.BASE_URL}#${id}`);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Projetos", href: "/projects" },
    { label: "Currículo", href: "/curriculo" },
    { label: "Sobre", href: homeAnchor("about"), anchor: true },
    { label: "Contato", href: homeAnchor("contact"), anchor: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 print:hidden ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : ""
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="font-display text-2xl font-bold text-foreground hover:opacity-90 transition-opacity">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item, index) => {
              const isAnchor = "anchor" in item;
              const className =
                "font-body text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors relative group";
              const underline = (
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              );

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {isAnchor ? (
                    <a href={item.href} className={className}>
                      {item.label}
                      {underline}
                    </a>
                  ) : (
                    <Link to={item.href} className={className}>
                      {item.label}
                      {underline}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.a
            href={homeAnchor("contact")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="hidden md:block px-6 py-2.5 bg-primary text-primary-foreground font-body text-sm font-medium rounded-full hover:glow-accent transition-all duration-300 hover:scale-105"
          >
            Fale comigo
          </motion.a>

          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden text-foreground" aria-label="Abrir menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-left font-display text-2xl font-bold">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-10">
                {navItems.map((item) =>
                  "anchor" in item ? (
                    <a key={item.label} href={item.href} className="font-body text-lg text-foreground/80 hover:text-primary transition-colors">
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.label} to={item.href} className="font-body text-lg text-foreground/80 hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
