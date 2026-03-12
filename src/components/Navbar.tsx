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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Projetos", href: "/projects" },
    { label: "Produtos", href: "/products" },
    { label: "Serviços", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Sobre", href: isHomePage ? "#about" : "/#about" },
    { label: "Contato", href: isHomePage ? "#contact" : "/#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : ""
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="/"
            className="font-display text-2xl font-bold text-foreground"
            whileHover={{ scale: 1.02 }}
          >
            HEX LABS<span className="text-primary">.</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item, index) => {
              const isExternal = item.href.startsWith("#") || item.href.includes("/#");

              if (isExternal) {
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="font-body text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    to={item.href}
                    className="font-body text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.a
            href={isHomePage ? "#contact" : "/#contact"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="hidden md:block px-6 py-2.5 bg-primary text-primary-foreground font-body text-sm font-medium rounded-full hover:glow-accent transition-all duration-300 hover:scale-105"
          >
            Agendar Sessão
          </motion.a>

          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden text-foreground">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-left font-display text-2xl font-bold">
                  HEX LABS<span className="text-primary">.</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="font-body text-lg text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
