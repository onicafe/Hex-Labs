import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import aboutImage from "@/assets/about-image.jpg";

const stats = [
  { value: "5+", label: "Anos de Experiência" },
  { value: "10+", label: "Projetos Entregues" },
  { value: "100%", label: "Comprometimento" },
  { value: "24/7", label: "Suporte" },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" className="py-32 bg-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image with Parallax */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div style={{ y: imageY }} className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={aboutImage}
                  alt="Working on code"
                  className="w-full aspect-square object-cover"
                />
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-2xl -z-10 animate-pulse-glow" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">
              SOBRE NÓS
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Inovação através da tecnologia e design
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              A <strong className="text-foreground">Hex Labs</strong> é um laboratório de engenharia de software e inovação digital liderado por <Link to="/iesu-jafe" className="text-primary hover:underline font-bold transition-all">Iésu Jafé</Link>. Combinamos design estratégico e tecnologia de ponta para criar produtos complexos que escalam negócios globais.
            </p>
            <p className="font-body text-muted-foreground mb-12 leading-relaxed">
              Nossa missão é alinhar estética e funcionalidade, entregando desde interfaces intuitivas até sistemas complexos e inteligência artificial. Acreditamos que cada pixel e linha de código deve servir a um propósito maior: o sucesso do seu projeto.
            </p>

            {/* Team */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 rounded-2xl bg-card/50 border border-white/5 backdrop-blur-sm"
              >
                <div className="mb-2">
                  <Link to="/iesu-jafe" className="hover:opacity-80 transition-opacity">
                    <h3 className="font-display text-xl font-bold text-foreground hover:text-primary transition-colors inline-block">Iésu Jafé</h3>
                  </Link>
                  <p className="font-body text-sm text-primary">Founder & Head of Product</p>
                </div>
                <p className="font-body text-sm text-muted-foreground">
                  Engenharia de Automação (IA) | UI/UX Senior | Design de Produto
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
