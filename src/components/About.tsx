import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

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
                <img src={aboutImage} alt="Mesa de trabalho com código na tela" className="w-full aspect-square object-cover" />
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
            <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">SOBRE MIM</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Designer que também escreve código
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
              Sou o Iésu, de Natal (RN). Comecei no design gráfico, passei por game design e cheguei ao design de produto e ao
              desenvolvimento front-end. Hoje trabalho na interseção dos dois: entendo o problema com quem usa, desenho a solução e
              ajudo a colocá-la de pé.
            </p>
            <p className="font-body text-muted-foreground mb-12 leading-relaxed">
              Já trabalhei com organizações do Brasil, do Japão e da Noruega, e fiz trabalho voluntário em projetos públicos que me
              ensinaram muito sobre acessibilidade e sobre desenhar para quem tem pouca familiaridade com tecnologia.{" "}
              <Link to="/curriculo" className="text-primary hover:underline">
                Veja o currículo completo
              </Link>
              .
            </p>

            {/* Hex Labs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-2xl bg-card/50 border border-white/5 backdrop-blur-sm"
            >
              <p className="font-body text-xs tracking-[0.2em] text-primary mb-2">EMPRESA QUE FUNDEI</p>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Hex Labs</h3>
              <p className="font-body text-sm text-muted-foreground mb-4">
                Fundei a Hex Labs para oferecer design e desenvolvimento de software. Para conquistar os primeiros clientes, criei dois
                produtos próprios: a Rede Imobiliária e o EcoLaw.
              </p>
              <Link
                to="/projects/hex-labs"
                className="inline-flex items-center gap-2 font-body text-sm text-foreground hover:text-primary transition-colors"
              >
                Conhecer a Hex Labs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
