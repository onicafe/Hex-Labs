import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    number: "01",
    title: "Engenharia de Produto",
    description: "Sistemas complexos, arquitetura escalável e aplicativos de alta performance, focados em estabilidade e segurança.",
    tags: ["Sistemas Críticos", "Arquitetura", "Alta Performance", "React/Node"],
  },
  {
    number: "02",
    title: "Inteligência Artificial & Chatbots",
    description: "Chatbots inteligentes com LLM para atendimento e automação de processos internos.",
    tags: ["LLMs", "Chatbots", "IA Generativa"],
  },
  {
    number: "03",
    title: "Automação de Processos",
    description: "Otimização de fluxos de trabalho e integração de ferramentas para aumentar a produtividade.",
    tags: ["Automação", "Integrações", "Eficiência"],
  },
  {
    number: "04",
    title: "Design de Produto & UI/UX",
    description: "Criação de interfaces intuitivas e experiências de usuário memoráveis.",
    tags: ["UI Design", "UX Research", "Prototipagem"],
  },
  {
    number: "05",
    title: "Dashboards & Dados",
    description: "Dashboards avançados com métricas em tempo real para tomada de decisão estratégica.",
    tags: ["Analytics", "Business Intelligence", "KPIs"],
  },
  {
    number: "06",
    title: "Agentes Autônomos (IA)",
    description: "Força de trabalho digital que executa operações 24/7: de postagens sociais automáticas a conciliação financeira.",
    tags: ["Automação", "Agentes", "Operações"],
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
          <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">
            NOSSAS SOLUÇÕES
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">
            Como podemos ajudar
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative p-6 sm:p-8 card-gradient border border-border rounded-2xl hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute top-6 right-6 font-display text-5xl font-bold text-muted/30 group-hover:text-primary/20 transition-colors duration-500">
                {service.number}
              </div>

              <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 pr-8">
                {service.title}
              </h3>

              <p className="font-body text-sm text-muted-foreground mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-[10px] font-body text-muted-foreground bg-secondary rounded-full"
                  >
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
