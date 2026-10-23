import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "@/data/profile";

const Footer = () => {
  const socialLinks = [
    { name: "LinkedIn", href: profile.linkedin, icon: <Linkedin className="w-5 h-5" /> },
    { name: "GitHub", href: profile.github, icon: <Github className="w-5 h-5" /> },
    { name: "Behance", href: profile.behance, icon: <svg className="w-5 h-5" viewBox="0 0 95.802 95.802" fill="currentColor"><path d="M38.664,44.689c0,0,9.065-0.673,9.065-11.306c0-10.632-7.417-15.819-16.813-15.819H13.622h-0.508H0v59.414h13.114h0.508 h17.294c0,0,18.873,0.597,18.873-17.536C49.79,59.442,50.613,44.689,38.664,44.689z M13.622,28.125h15.069h2.226 c0,0,4.203,0,4.203,6.181c0,6.181-2.473,7.077-5.275,7.077H13.622V28.125z M30.119,66.42H13.622V50.541h17.294 c0,0,6.264-0.08,6.264,8.16C37.18,65.572,32.599,66.351,30.119,66.42z" /><rect x="62.18" y="21.064" width="24.514" height="7.317" /><path d="M74.961,32.682c-22.848,0-22.828,22.826-22.828,22.826s-1.566,22.713,22.829,22.713c0,0,20.331,1.162,20.331-15.801 H84.837c0,0,0.349,6.391-9.526,6.391c0,0-10.455,0.699-10.455-10.34h30.785C95.641,58.471,99.009,32.682,74.961,32.682z M84.255,50.541H64.738c0,0,1.277-9.158,10.455-9.158C84.372,41.382,84.255,50.541,84.255,50.541z" /></svg> }
  ];

  return (
    <footer className="py-16 bg-background border-t border-border print:hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:grid md:grid-cols-3 items-center gap-8">
          <div className="flex w-full justify-center md:justify-start">
            <Link to="/" className="font-display text-2xl font-bold text-foreground">
              IÉSU JAFÉ<span className="text-primary">.</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 w-full">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors bg-white/5 hover:bg-white/10"
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <div className="flex w-full justify-center md:justify-end">
            <p className="font-body text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} {profile.name} · {profile.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
