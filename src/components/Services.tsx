import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    number: "01",
    title: "Product Design & UX",
    description:
      "Pesquisa com usuários, jornadas, fluxos, wireframes e protótipos. Testo cedo para achar problemas antes que virem código.",
    tags: ["Pesquisa", "Fluxos", "Prototipagem", "Testes de usabilidade", "Acessibilidade"],
  },
  {
    number: "02",
    title: "UX Engineering",
    description:
      "Levo o design até a tela real. Construo interfaces em React, Flutter e Angular e converso com o time de engenharia na mesma língua.",
    tags: ["React", "TypeScript", "Flutter", "Angular", "Tailwind", "Design systems"],
  },
  {
    number: "03",
    title: "IA aplicada",
    description:
      "Uso agentes, LLMs e automações (n8n) no meu processo e em funcionalidades de produto, como as descrições de imóveis geradas por IA na Rede Imobiliária.",
    tags: ["Agentes", "LLMs", "n8n", "Automação"],
  },
];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 bg-background" ref={containerRef}>
      <div className="container mx-auto px-4 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">O QUE EU FAÇO</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">Do problema ao produto</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative p-6 sm:p-8 card-gradient border border-border rounded-2xl hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute top-6 right-6 font-display text-5xl font-bold text-muted/30 group-hover:text-primary/20 transition-colors duration-500">
                {skill.number}
              </div>

              <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 pr-8">
                {skill.title}
              </h3>

              <p className="font-body text-sm text-muted-foreground mb-6">{skill.description}</p>

              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-[10px] font-body text-muted-foreground bg-secondary rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
