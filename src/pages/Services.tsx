import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    number: "01",
    title: "Engenharia de Produto",
    description: "Criamos soluções digitais robustas e escaláveis, desde sites institucionais até sistemas web complexos e aplicativos móveis de alta performance.",
    features: ["Arquitetura de Software", "Sistemas de Alta Escala", "Apps Nativos", "React & Next.js", "Engenharia de Performance"],
  },
  {
    number: "02",
    title: "Inteligência Artificial & Chatbots",
    description: "Revolucione seu atendimento e operações com IA. Desenvolvemos chatbots inteligentes e integramos modelos de linguagem (LLMs) ao seu negócio.",
    features: ["Chatbots com LLM", "IA Generativa", "Automação de Atendimento", "Personalização com IA", "RAG & Fine-tuning"],
  },
  {
    number: "03",
    title: "Automação de Processos",
    description: "Elimine tarefas repetitivas e aumente a eficiência da sua equipe. Automatizamos fluxos de trabalho conectando suas ferramentas favoritas.",
    features: ["Integração de APIs", "Automação de Workflow", "Otimização de Processos", "Redução de Custos", "Ferramentas No-Code/Low-Code"],
  },
  {
    number: "04",
    title: "Design de Produto & UI/UX",
    description: "Design que encanta e converte. Criamos interfaces intuitivas e experiências de usuário memoráveis, baseadas em pesquisa e testes.",
    features: ["UI Design", "UX Research", "Prototipagem Alta Fidelidade", "Design Systems", "Testes de Usabilidade"],
  },
  {
    number: "05",
    title: "Dashboards & Dados",
    description: "Transforme dados em insights. Construímos dashboards interativos para você monitorar seus KPIs e tomar decisões baseadas em fatos.",
    features: ["Business Intelligence", "Google Analytics 4", "Dashboards Personalizados", "Análise de KPIs", "Visualização de Dados"],
  },
  {
    number: "06",
    title: "Agentes Autônomos (IA)",
    description: "Força de trabalho digital que executa operações 24/7: de postagens sociais automáticas a conciliação financeira.",
    features: ["Agentes de Vendas", "Automação Financeira", "Suporte 24/7", "Prospecção Automática", "Integração Multi-Canal"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">
              O QUE FAZEMOS
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">
              Nossas Soluções
            </h1>
            <p className="font-body text-xl text-muted-foreground leading-relaxed">
              Oferecemos um conjunto completo de serviços criativos e técnicos projetados para elevar sua marca e gerar resultados significativos. Cada projeto é abordado com pensamento estratégico e atenção meticulosa aos detalhes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-0">
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border-t border-border py-12 lg:py-16"
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  <div className="lg:col-span-1">
                    <span className="font-display text-sm text-primary">{service.number}</span>
                  </div>
                  <div className="lg:col-span-4">
                    <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="font-body text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="px-3 py-1 bg-card rounded-full font-body text-sm text-muted-foreground"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-2 flex lg:justify-end items-start">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Pronto para iniciar um projeto?
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Vamos discutir como podemos ajudar a dar vida à sua visão. Entre em contato e vamos criar algo extraordinário juntos.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body font-medium rounded-full hover:glow-accent transition-all duration-300"
            >
              Entre em Contato
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
