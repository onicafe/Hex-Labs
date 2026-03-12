import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Code2, Palette, Database, Layers, BrainCircuit, TerminalSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";

const Resume = () => {
    useEffect(() => {
        updateSEO("Iésu Jafé", "Engenheiro de Software & Designer de Produto. Especialista em entregar interfaces rápidas, bonitas e ecossistemas resilientes em React e Tailwind.");
    }, []);

    const skills = [
        { name: "Product & UI/UX Design", level: 98, icon: Palette },
        { name: "Software / Web Development", level: 90, icon: Code2 },
        { name: "Design Thinking & Prototyping", level: 95, icon: Layers },
        { name: "Automation & AI Engineering", level: 85, icon: BrainCircuit },
        { name: "CMS & Database Management", level: 88, icon: Database },
        { name: "Game & Metaverse Dev", level: 82, icon: TerminalSquare }
    ];

    const experience = [
        {
            role: "Head of Product",
            company: "Hex Labs (Brazil)",
            period: "Mar 2026 - Presente",
            description: "Liderança atuando na interseção de Engenharia de Automação (AI), UI/UX avançado e Design de Produto para construir ecossistemas digitais de alta escalabilidade."
        },
        {
            role: "Customer Experience",
            company: "AIESEC no Brasil (Curitiba)",
            period: "Mar 2025 - Dez 2025",
            description: "Operações em Customer Success integrando voluntários internacionais corporativos, exigindo alta inteligência emocional, adaptabilidade global e resolução ágil de problemas."
        },
        {
            role: "Communications Expert",
            company: "TAP Air Portugal (Lisboa, Portugal)",
            period: "Fev 2023 - Ago 2023",
            description: "Apoio direto às operações logísticas da aviação, lidando com a integridade crítica dos dados da companhia através da gestão de sistemas fechados (CMS) e automações."
        },
        {
            role: "Product Designer",
            company: "Dione (Tokyo, Japão)",
            period: "Fev 2022 - Mai 2023",
            description: "Desenho de UI/UX moderno para sistemas de parceiros internacionais, melhorando sistematicamente as métricas de usabilidade e elevando o nível estético B2B."
        },
        {
            role: "Product Designer e Engenheiro Freelance",
            company: "Oni",
            period: "Jun 2018 - Jun 2023",
            description: "Oito anos coordenando e desenhando fluxos digitais para iniciativas internacionais diversas em parceria com hubs tecnológicos pelo globo inteiro."
        },
        {
            role: "Product & Game Designer",
            company: "Spillfabrikken (Trondheim, Noruega)",
            period: "Abr 2020 - Set 2021",
            description: "Participação direta da concepção, protótipo interativo e produção visual de dinâmicas imersivas com escopo voltado à experiência narrativa do usuário em mídias físicas e digitais."
        }
    ];

    const education = [
        { course: "Computer Science (Bachelor of Science)", inst: "Universidade Potiguar", year: "Jan 2024" },
        { course: "Metaverse Development (Postgraduate)", inst: "Centro Universitário UNA", year: "Mai 2023" },
        { course: "Game Design & Developer (Degree)", inst: "EBAC - Escola Britânica de Artes Criativas e Tecnologia", year: "Out 2022" },
        { course: "Graphic Design (Bachelor)", inst: "Universidade Potiguar", year: "2017 - 2019" },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-6 lg:px-12 max-w-4xl">

                    {/* Hero Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-12"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar ao Início
                        </Link>

                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
                            <div className="w-32 h-32 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-lg shadow-primary/5">
                                <span className="font-display text-5xl font-bold text-primary">IJ</span>
                            </div>
                            <div>
                                <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4">
                                    Iésu Jafé
                                </h1>
                                <p className="font-body text-xl md:text-2xl text-primary font-medium">
                                    Senior Product Designer & Engenheiro de Software
                                </p>
                            </div>
                        </div>

                        <p className="font-body text-lg text-muted-foreground leading-relaxed">
                            Transformar desafios complexos em ecossistemas digitais intuitivos é a paixão que estrutura o meu dia a dia de trabalho. Sou um Especialista em UI/UX e Engenheiro Criativo com mais de sete anos de vasta experiência arquitetando desde grandes portais corporativos até ecossistemas Web de ponta. A minha jornada em tecnologia me levou a atuar para clientes no Japão, Brasil, Noruega e Portugal, consolidando uma vasta percepção multinacional de design. Unindo o rigor estrutural da Engenharia da Computação com a brutalidade limpa do código e metodologias ágeis, desenho sistemas fáceis de usar e escaláveis na nuvem.
                        </p>
                    </motion.div>

                    {/* Skills Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-24"
                    >
                        <h2 className="font-display text-3xl font-bold text-foreground mb-8 pb-4 border-b border-white/10 uppercase tracking-widest text-sm">
                            Habilidades Técnicas
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {skills.map((skill, i) => {
                                const Icon = skill.icon;
                                return (
                                    <div key={i} className="bg-card border border-white/5 p-6 rounded-2xl flex items-center gap-6 group hover:border-primary/20 transition-all">
                                        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-end mb-2">
                                                <h3 className="font-body font-bold text-foreground">{skill.name}</h3>
                                                <span className="font-mono text-xs text-primary">{skill.level}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="font-display text-3xl font-bold text-foreground mb-12 pb-4 border-b border-white/10 uppercase tracking-widest text-sm">
                            Experiência Principal
                        </h2>

                        <div className="space-y-12">
                            {experience.map((xp, i) => (
                                <div key={i} className="relative pl-8 md:pl-0">
                                    {/* Desktop Layout */}
                                    <div className="hidden md:grid grid-cols-[200px_1fr] gap-8">
                                        <div className="text-right pt-1">
                                            <span className="font-mono text-sm px-3 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                                                {xp.period}
                                            </span>
                                        </div>
                                        <div className="relative pl-8 pb-12 border-l border-white/10 last:pb-0">
                                            <div className="absolute w-4 h-4 rounded-full bg-background border-2 border-primary -left-[9px] top-1"></div>
                                            <h3 className="font-display text-2xl font-bold text-foreground mb-1">{xp.role}</h3>
                                            <h4 className="font-body text-lg text-primary mb-4">{xp.company}</h4>
                                            <p className="font-body text-base text-muted-foreground leading-relaxed">{xp.description}</p>
                                        </div>
                                    </div>

                                    {/* Mobile Layout */}
                                    <div className="md:hidden relative pb-12 border-l border-white/10 last:pb-0">
                                        <div className="absolute w-4 h-4 rounded-full bg-background border-2 border-primary -left-[9px] top-1"></div>
                                        <div className="mb-4">
                                            <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                                                {xp.period}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-xl font-bold text-foreground mb-1">{xp.role}</h3>
                                        <h4 className="font-body text-base text-primary mb-4">{xp.company}</h4>
                                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{xp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="mt-24"
                    >
                        <h2 className="font-display text-3xl font-bold text-foreground mb-12 pb-4 border-b border-white/10 uppercase tracking-widest text-sm">
                            Background Acadêmico
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {education.map((edu, i) => (
                                <div key={i} className="p-6 bg-card border border-white/5 rounded-2xl flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-foreground mb-1">{edu.course}</h3>
                                        <p className="font-body text-sm text-primary mb-4">{edu.inst}</p>
                                    </div>
                                    <span className="self-end font-mono text-xs px-3 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                                        {edu.year}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Resume;
