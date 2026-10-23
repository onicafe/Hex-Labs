import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Download, Mail, Linkedin, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { profile } from "@/data/profile";

const tools = [
    { group: "Design", items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Prototipagem", "Design systems"] },
    { group: "Desenvolvimento", items: ["React", "TypeScript", "Next.js", "Angular", "Tailwind CSS", "Framer Motion", "Supabase", "Git"] },
    { group: "Pesquisa e processo", items: ["Pesquisa com usuários", "Jornadas e fluxos", "Testes de usabilidade", "Acessibilidade", "Design Thinking"] },
    { group: "IA", items: ["LLMs aplicados a produto", "Automação de processos"] },
];

type Experience = {
    role: string;
    company: string;
    period: string;
    description: string;
    volunteer?: boolean;
    link?: string;
};

const experience: Experience[] = [
    {
        role: "Fundador",
        company: "Hex Labs (Natal, Brasil)",
        period: "Mar 2026 – presente",
        description:
            "Fundei uma empresa de design e desenvolvimento de software. Para atrair os primeiros clientes, criei dois produtos próprios: a Rede Imobiliária (Nexus Imobiliária) e o EcoLaw, para escritórios de advocacia.",
        link: "/projects/hex-labs",
    },
    {
        role: "Customer Experience (voluntário)",
        company: "AIESEC no Brasil (Curitiba)",
        period: "Mar 2025 – Dez 2025",
        description:
            "Trabalho voluntário em Customer Experience, apoiando a integração de voluntários internacionais.",
        volunteer: true,
    },
    {
        role: "UX/UI Designer (voluntário)",
        company: "Jovem Potiguar — IFRN e SETHAS / Governo do RN",
        period: "2024",
        description:
            "Pesquisa, fluxos, wireframes, testes de usabilidade e telas da plataforma de inscrição que leva jovens do CadÚnico a cursos de qualificação do IFRN.",
        volunteer: true,
        link: "/projects/jovem-potiguar",
    },
    {
        role: "Colaborador em UI/UX (voluntário)",
        company: "PJe2 Mobile — TRF5",
        period: "2024",
        description:
            "Ajudei um amigo que integrava a equipe oficial do projeto no TRF5 com a interface do novo app para magistrados. Minha colaboração foi registrada no TCC dele.",
        volunteer: true,
        link: "/projects/pje",
    },
    {
        role: "Communications Expert",
        company: "TAP Air Portugal (Lisboa, Portugal)",
        period: "Fev 2023 – Ago 2023",
        description: "Apoio às operações com gestão de conteúdo em sistemas internos (CMS) e automações.",
    },
    {
        role: "Product Designer",
        company: "Dione (Tóquio, Japão)",
        period: "Fev 2022 – Mai 2023",
        description:
            "Design de produto para sistemas de parceiros, entre eles o app MyTreasure e o dashboard de gestão hoteleira Hosuto.",
        link: "/projects/my-treasure",
    },
    {
        role: "Product & Game Designer",
        company: "SpillFabrikken (Trondheim, Noruega)",
        period: "Abr 2020 – Set 2021",
        description: "Concepção, protótipos interativos e produção visual de jogos e experiências para mídias físicas e digitais.",
        link: "/projects/spillfabrikken",
    },
    {
        role: "Product Designer e desenvolvedor freelance",
        company: "Oni",
        period: "Jun 2018 – Jun 2023",
        description: "Design de produto, sites e desenvolvimento front-end para clientes diversos, como freelancer.",
    },
];

const education = [
    { course: "Ciência da Computação (bacharelado)", inst: "Universidade Potiguar", year: "Jan 2024" },
    { course: "Desenvolvimento para Metaverso (pós-graduação)", inst: "Centro Universitário UNA", year: "Mai 2023" },
    { course: "Game Design & Development", inst: "EBAC — Escola Britânica de Artes Criativas e Tecnologia", year: "Out 2022" },
    { course: "Design Gráfico", inst: "Universidade Potiguar", year: "2017 – 2019" },
];

const sectionTitle =
    "font-display font-bold text-foreground mb-10 pb-4 border-b border-white/10 uppercase tracking-widest text-sm print:mb-4 print:border-black/20";

const Resume = () => {
    useEffect(() => {
        updateSEO("Currículo", `${profile.name}: ${profile.title}. Experiência, projetos e ferramentas.`);
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20 print:pt-0 print:pb-0">
                <div className="container mx-auto px-6 lg:px-12 max-w-4xl">

                    {/* Hero Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-20 print:mb-8"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 print:hidden">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar ao início
                            </Link>
                            {profile.cvPdfUrl ? (
                                <a
                                    href={profile.cvPdfUrl}
                                    download
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-medium rounded-full hover:glow-accent transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    Baixar CV em PDF
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-medium rounded-full hover:glow-accent transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    Salvar CV em PDF
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
                            <div className="w-32 h-32 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-lg shadow-primary/5 print:hidden">
                                <span className="font-display text-5xl font-bold text-primary">IJ</span>
                            </div>
                            <div>
                                <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4 print:text-4xl print:mb-2">
                                    {profile.name}
                                </h1>
                                <p className="font-body text-xl md:text-2xl text-primary font-medium">{profile.title}</p>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 font-body text-sm text-muted-foreground">
                                    <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" />{profile.location}</span>
                                    <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-primary"><Mail className="w-4 h-4" />{profile.email}</a>
                                    <a href={profile.linkedin} className="inline-flex items-center gap-2 hover:text-primary"><Linkedin className="w-4 h-4" />linkedin.com/in/iesujafe</a>
                                </div>
                            </div>
                        </div>

                        <p className="font-body text-lg text-muted-foreground leading-relaxed">
                            Sou Product Designer e UX Engineer. Trabalho do entendimento do problema com quem usa até a interface pronta em
                            código. Já atuei em projetos no Brasil, no Japão, na Noruega e em Portugal, de sistemas da UFRN e do software
                            UCR da Intelbras a apps para clientes da Dione. Também colaborei como voluntário em projetos públicos, como o
                            PJe2 Mobile do TRF5 e a plataforma do Jovem Potiguar.
                        </p>
                    </motion.div>

                    {/* Tools */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-24 print:mb-8"
                    >
                        <h2 className={sectionTitle}>Ferramentas e habilidades</h2>
                        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 print:gap-y-3">
                            {tools.map((t) => (
                                <div key={t.group}>
                                    <h3 className="font-body font-bold text-foreground mb-3 print:mb-1">{t.group}</h3>
                                    <p className="font-body text-muted-foreground leading-relaxed">{t.items.join(" · ")}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className={sectionTitle}>Experiência</h2>

                        <div className="space-y-12 print:space-y-4">
                            {experience.map((xp) => (
                                <div key={xp.company + xp.role} className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 print:grid-cols-[150px_1fr] print:break-inside-avoid">
                                    <div className="md:text-right pt-1">
                                        <span className="font-mono text-sm px-3 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10 print:p-0 print:border-0">
                                            {xp.period}
                                        </span>
                                    </div>
                                    <div className="relative md:pl-8 md:border-l border-white/10 print:border-0 print:pl-0">
                                        <div className="hidden md:block print:hidden absolute w-4 h-4 rounded-full bg-background border-2 border-primary -left-[9px] top-1"></div>
                                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1 print:text-lg">
                                            {xp.role}
                                            {xp.volunteer && (
                                                <span className="ml-3 align-middle inline-block px-2 py-0.5 rounded-full border border-primary/40 font-body text-xs font-normal text-primary">
                                                    Voluntário
                                                </span>
                                            )}
                                        </h3>
                                        <h4 className="font-body text-lg text-primary mb-3 print:mb-1 print:text-base">{xp.company}</h4>
                                        <p className="font-body text-base text-muted-foreground leading-relaxed">{xp.description}</p>
                                        {xp.link && (
                                            <Link to={xp.link} className="inline-block mt-3 font-body text-sm text-foreground hover:text-primary transition-colors print:hidden">
                                                Ver estudo de caso →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-24 print:mt-8 print:break-inside-avoid"
                    >
                        <h2 className={sectionTitle}>Formação</h2>

                        <div className="grid md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-3">
                            {education.map((edu) => (
                                <div key={edu.course} className="p-6 bg-card border border-white/5 rounded-2xl flex flex-col justify-between print:p-0 print:border-0">
                                    <div>
                                        <h3 className="font-display text-lg font-bold text-foreground mb-1">{edu.course}</h3>
                                        <p className="font-body text-sm text-primary mb-4 print:mb-1">{edu.inst}</p>
                                    </div>
                                    <span className="self-start font-mono text-xs text-muted-foreground">{edu.year}</span>
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
