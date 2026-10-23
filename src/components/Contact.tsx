import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "@/data/profile";

const BehanceIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 95.802 95.802" fill="currentColor"><path d="M38.664,44.689c0,0,9.065-0.673,9.065-11.306c0-10.632-7.417-15.819-16.813-15.819H13.622h-0.508H0v59.414h13.114h0.508 h17.294c0,0,18.873,0.597,18.873-17.536C49.790,59.442,50.613,44.689,38.664,44.689z M13.622,28.125h15.069h2.226 c0,0,4.203,0,4.203,6.181c0,6.181-2.473,7.077-5.275,7.077H13.622V28.125z M30.119,66.42H13.622V50.541h17.294 c0,0,6.264-0.08,6.264,8.16C37.18,65.572,32.599,66.351,30.119,66.42z" /><rect x="62.18" y="21.064" width="24.514" height="7.317" /><path d="M74.961,32.682c-22.848,0-22.828,22.826-22.828,22.826s-1.566,22.713,22.829,22.713c0,0,20.331,1.162,20.331-15.801 H84.837c0,0,0.349,6.391-9.526,6.391c0,0-10.455,0.699-10.455-10.340h30.785C95.641,58.471,99.009,32.682,74.961,32.682z M84.255,50.541H64.738c0,0,1.277-9.158,10.455-9.158C84.372,41.382,84.255,50.541,84.255,50.541z" /></svg>
);

const inputClass =
  "w-full px-0 py-4 bg-transparent border-b border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato pelo portfólio — ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n${formData.name} (${formData.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const socials = [
    { name: "LinkedIn", href: profile.linkedin, icon: <Linkedin className="w-5 h-5" /> },
    { name: "GitHub", href: profile.github, icon: <Github className="w-5 h-5" /> },
    { name: "Behance", href: profile.behance, icon: <BehanceIcon /> },
  ];

  return (
    <section id="contact" className="py-32 bg-card" ref={containerRef}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">CONTATO</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">Vamos conversar?</h2>
            <p className="font-body text-lg text-muted-foreground mb-12">
              Estou buscando uma vaga como Product Designer, UX Engineer ou em produtos com IA. Se você recruta para uma posição
              assim, me escreva.
            </p>

            <div className="space-y-6">
              <div>
                <p className="font-body text-sm text-muted-foreground mb-1">E-mail</p>
                <a href={`mailto:${profile.email}`} className="font-display text-xl text-foreground hover:text-primary transition-colors break-all">
                  {profile.email}
                </a>
              </div>
              <div>
                <p className="font-body text-sm text-muted-foreground mb-1">WhatsApp</p>
                <a
                  href={profile.phoneHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl text-foreground hover:text-primary transition-colors"
                >
                  {profile.phoneLabel}
                </a>
              </div>
              <div>
                <p className="font-body text-sm text-muted-foreground mb-1">Currículo</p>
                <Link to="/curriculo" className="font-display text-xl text-foreground hover:text-primary transition-colors">
                  Ver e baixar o CV
                </Link>
              </div>
              <div className="flex gap-4 pt-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors hover:bg-white/5"
                    title={s.name}
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-body text-sm text-muted-foreground mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-sm text-muted-foreground mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    placeholder="voce@empresa.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-body text-sm text-muted-foreground mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Conte sobre a vaga ou o projeto"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-primary text-primary-foreground font-body text-base font-bold tracking-wide rounded-sm hover:glow-accent transition-all duration-300 mt-8 uppercase"
              >
                Enviar mensagem
              </motion.button>
              <p className="font-body text-xs text-muted-foreground">O botão abre o seu programa de e-mail com a mensagem pronta.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
