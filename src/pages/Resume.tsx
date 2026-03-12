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
        { name: "React / Next.js", level: 95, icon: Code2 },
        { name: "UI/UX & Design Gráfico", level: 90, icon: Palette },
        { name: "Node.js & APIs", level: 85, icon: TerminalSquare },
        { name: "Supabase & Postgres", level: 80, icon: Database },
        { name: "Arquitetura Hexagonal", level: 85, icon: Layers },
        { name: "Geração por IA & LLMs", level: 90, icon: BrainCircuit }
    ];

    const experience = [
        {
            role: "Fundador / Engenheiro Principal",
            company: "Hex Labs",
            period: "2024 - Presente",
            description: "Liderança técnica e arquitetura de sistemas Full-Stack (SaaS, Dashboards e Aplicativos Web). Controle de ponta a ponta desde UI/UX (Figma) até o backend (Supabase/Node)."
        },
        {
            role: "Design de Produto Institucional",
            company: "Governo RN / IFRN / TRF5",
            period: "2022 - 2024",
            description: "Pesquisa, Wireframing e Refatoração PJeMobile. Migração de legado massivo reduzindo a dívida técnica a zero. Participação interina em portais públicos educacionais e institucionais, impactando +100 mil visualizações/ano."
        },
        {
            role: "Engenheiro Frontend",
            company: "UFRN Polare & SIGRH",
            period: "2020 - 2022",
            description: "Desenvolvimento de portais públicos acessíveis e modulares utilizando Angular e serviços em Java."
        }
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
                                    Engenheiro de Software & Designer de Produto
                                </p>
                            </div>
                        </div>

                        <p className="font-body text-lg text-muted-foreground leading-relaxed">
                            Com uma visão end-to-end do ciclo de produto, atuo desde o primeiro rabisco no Figma até a integração final com bancos de dados complexos. Especialista em entregar interfaces rápidas, bonitas e ecossistemas resilientes em React e Tailwind. Focado em alinhar design com performance bruta.
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

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Resume;
