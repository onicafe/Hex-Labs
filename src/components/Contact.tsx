import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    window.location.href = `mailto:jafe.iesu@gmail.com?subject=Contato via Site Hex Labs&body=${formData.message} - de ${formData.name} (${formData.email})`;
  };

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
            <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">
              PRONTO PARA ESCALAR?
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Engenharia de Elite para sua Visão
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-12">
              Não somos apenas uma agência. Somos o braço de tecnologia que faltava na sua operação.
              Discuta seu projeto com especialistas que entendem de negócio.
            </p>

            <div className="space-y-6">
              <div>
                <p className="font-body text-sm text-muted-foreground mb-1">Email Direto</p>
                <a href="mailto:jafe.iesu@gmail.com" className="font-display text-xl text-foreground hover:text-primary transition-colors">
                  jafe.iesu@gmail.com
                </a>
              </div>
              <div>
                <p className="font-body text-sm text-muted-foreground mb-1">WhatsApp Comercial</p>
                <a href="tel:+5584999034089" className="font-display text-xl text-foreground hover:text-primary transition-colors">
                  (84) 999-034-089
                </a>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="https://www.linkedin.com/in/iesujafe/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors hover:bg-white/5" title="LinkedIn">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://github.com/onicafe/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors hover:bg-white/5" title="GitHub">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://behance.net/iesujafe" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors hover:bg-white/5" title="Behance">
                  <svg className="w-5 h-5" viewBox="0 0 95.802 95.802" fill="currentColor"><path d="M38.664,44.689c0,0,9.065-0.673,9.065-11.306c0-10.632-7.417-15.819-16.813-15.819H13.622h-0.508H0v59.414h13.114h0.508 h17.294c0,0,18.873,0.597,18.873-17.536C49.79,59.442,50.613,44.689,38.664,44.689z M13.622,28.125h15.069h2.226 c0,0,4.203,0,4.203,6.181c0,6.181-2.473,7.077-5.275,7.077H13.622V28.125z M30.119,66.42H13.622V50.541h17.294 c0,0,6.264-0.08,6.264,8.16C37.18,65.572,32.599,66.351,30.119,66.42z" /><rect x="62.18" y="21.064" width="24.514" height="7.317" /><path d="M74.961,32.682c-22.848,0-22.828,22.826-22.828,22.826s-1.566,22.713,22.829,22.713c0,0,20.331,1.162,20.331-15.801 H84.837c0,0,0.349,6.391-9.526,6.391c0,0-10.455,0.699-10.455-10.34h30.785C95.641,58.471,99.009,32.682,74.961,32.682z M84.255,50.541H64.738c0,0,1.277-9.158,10.455-9.158C84.372,41.382,84.255,50.541,84.255,50.541z" /></svg>
                </a>
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
                    className="w-full px-0 py-4 bg-transparent border-b border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="João Silva"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-sm text-muted-foreground mb-2">
                    Email Corporativo
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-0 py-4 bg-transparent border-b border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="joao@empresa.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="budget" className="block font-body text-sm text-muted-foreground mb-2">
                  Investimento Previsto
                </label>
                <select
                  id="budget"
                  className="w-full px-0 py-4 bg-transparent border-b border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors [&>option]:bg-card"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Selecione um intervalo</option>
                  <option value="20-50k">R$ 20k - R$ 50k</option>
                  <option value="50-100k">R$ 50k - R$ 100k</option>
                  <option value="100-300k">R$ 100k - R$ 300k</option>
                  <option value="300k+">R$ 300k+</option>
                  <option value="enterprise">Enterprise / Contínuo</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-body text-sm text-muted-foreground mb-2">
                  Sobre o Desafio
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-0 py-4 bg-transparent border-b border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Breve descrição do projeto ou problema a resolver..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-primary text-primary-foreground font-body text-base font-bold tracking-wide rounded-sm hover:glow-accent transition-all duration-300 mt-8 uppercase"
              >
                Agendar Sessão Estratégica
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
