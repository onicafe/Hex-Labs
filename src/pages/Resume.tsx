import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Download, Mail, Linkedin, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { profile } from "@/data/profile";

// Conteúdo alinhado ao CV de Produto/UX (out/2026).
const tools = [
    { group: "Design", items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Design systems", "Prototipagem"] },
    { group: "Desenvolvimento", items: ["React", "TypeScript", "Tailwind CSS", "Flutter", "Supabase"] },
    { group: "Pesquisa e processo", items: ["Discovery", "Pesquisa com usuários", "Jornadas e fluxos", "Testes de usabilidade", "Acessibilidade"] },
    { group: "IA e automação", items: ["Agentes de IA", "n8n", "LLMs (Ollama, OpenRouter)", "FFmpeg", "Google APIs"] },
];

type Experience = {
    role: string;
    company: string;
    period: string;
    bullets: string[];
    volunteer?: boolean;
    link?: string;
};

const experience: Experience[] = [
    {
        role: "Fundador",
        company: "Hex Labs · Natal, RN",
        period: "Mar 2026 – atual",
        bullets: [
            "Fundei um estúdio de produtos digitais com IA e conduzo design, desenvolvimento e prospecção de clientes.",
            "Construí o site e o CMS da empresa (React, TypeScript, Tailwind, Supabase), com blog e painel administrativo.",
            "Desenvolvo a Rede Imobiliária, SaaS white-label com descrições de imóveis geradas por IA, e o Lexus System, gestão para escritórios de advocacia.",
        ],
        link: "/projects/hex-labs",
    },
    {
        role: "Customer Experience",
        company: "AIESEC no Brasil · Curitiba, PR (remoto)",
        period: "Mar 2025 – Dez 2025",
        bullets: [
            "Conduzi a experiência de voluntários internacionais em projetos com empresas parceiras, do onboarding à conclusão.",
            "Resolvi demandas de participantes de diferentes países e culturas, em português e inglês.",
        ],
        volunteer: true,
    },
    {
        role: "UI/UX Designer",
        company: "PJe2 Mobile, TRF5 · Remoto",
        period: "2024",
        bullets: [
            "Contribuí com o redesign de UX do app oficial de magistrados da Justiça Federal, integrado à base do CNJ, ajudando um amigo que integrava a equipe oficial. Trabalho citado em TCC.",
            "Resultados do projeto como um todo: migração do app para Flutter (Clean Architecture, BLoC), correção de 347 inconformidades de código e redução de mais de 50% nos cliques.",
        ],
        volunteer: true,
        link: "/projects/pje",
    },
    {
        role: "UI/UX Designer",
        company: "Jovem Potiguar, Governo do RN / IFRN · Natal, RN",
        period: "2024",
        bullets: [
            "Desenhei o fluxo de inscrição de jovens do CadÚnico em cursos técnicos do IFRN, em etapas acessíveis em qualquer dispositivo.",
            "O programa, parceria entre a SETHAS e o IFRN, foi noticiado pelo G1.",
        ],
        volunteer: true,
        link: "/projects/jovem-potiguar",
    },
    {
        role: "Communications Specialist",
        company: "TAP Air Portugal · Lisboa, Portugal",
        period: "Fev 2023 – Ago 2023",
        bullets: [
            "Gerenciei o CMS da companhia para rastreamento de dados e automação de processos.",
            "Dei suporte e manutenção aos sistemas, garantindo a integridade das informações operacionais.",
        ],
    },
    {
        role: "Designer de Produto (freelancer)",
        company: "Oni · Remoto",
        period: "Jun 2018 – Jun 2023",
        bullets: ["Projetos de UI/UX, design gráfico e identidade visual para clientes no Brasil e no exterior."],
    },
    {
        role: "Product Designer",
        company: "Dione Solutions · Tóquio, Japão (remoto)",
        period: "Fev 2022 – Mai 2023",
        bullets: [
            "Desenhei o dashboard de gestão de uma rede de 12 hotéis (reservas, limpeza, cozinha e estoque), com ganho de 30% em eficiência.",
            "Projetei o MyTreasure, rede social para colecionadores publicada na Google Play, com posts configuráveis e módulo de lances.",
            "Produzi materiais de apresentação e gerenciei redes sociais.",
        ],
        link: "/projects/my-treasure",
    },
    {
        role: "Product e Game Designer",
        company: "SpillFabrikken · Trondheim, Noruega (remoto)",
        period: "Abr 2020 – Set 2021",
        bullets: [
            "Desenvolvi jogos de tabuleiro e cartas do conceito e protótipo até a produção.",
            "Criei identidade visual, embalagens e material de divulgação, reduzindo componentes para baixar peso e custo.",
        ],
        link: "/projects/spillfabrikken",
    },
    {
        role: "Designer Gráfico",
        company: "SESAP-RN · Natal, RN",
        period: "Abr 2019 – Jul 2019",
        bullets: ["Criei campanhas de saúde pública, newsletters e identidades de eventos."],
    },
];

const education = [
    { course: "Bacharelado em Ciência da Computação", inst: "Universidade Potiguar", year: "2024 – 2026 (trancado para reingresso)" },
    { course: "Pós-graduação em Desenvolvimento de Metaverso", inst: "Centro Universitário UNA", year: "2023" },
    { course: "Game Design e Desenvolvimento de Jogos (curso)", inst: "EBAC — Escola Britânica de Artes Criativas e Tecnologia", year: "2022" },
    { course: "Pós-graduação em Marketing Digital", inst: "Faculdade Metropolitana", year: "2020" },
    { course: "Bacharelado em Design Gráfico", inst: "Universidade Potiguar", year: "2017 – 2019" },
];

const certifications = [
    "Microsoft Certified: Azure Fundamentals",
    "Análise Avançada de Imagens e Texto com IA na AWS (NEXA)",
    "Explorando uma Carreira em Design de Experiência do Usuário",
];

const languages = ["Português (nativo)", "Inglês (bilíngue)"];

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
                                    <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" />{profile.location} · {profile.availability}</span>
                                    <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-primary"><Mail className="w-4 h-4" />{profile.email}</a>
                                    <a href={profile.linkedin} className="inline-flex items-center gap-2 hover:text-primary"><Linkedin className="w-4 h-4" />linkedin.com/in/iesujafe</a>
                                </div>
                            </div>
                        </div>

                        <p className="font-body text-lg text-muted-foreground leading-relaxed">
                            Product Designer com mais de 7 anos de experiência que também escreve código. Desenhei e entreguei produtos
                            para o TRF5 e o Governo do RN, além de clientes no Japão, na Noruega e em Portugal. Uno UI/UX, design systems e
                            front-end (React, TypeScript, Flutter) com automação e IA (agentes, n8n). Atuo do discovery ao produto
                            publicado. Inglês bilíngue.
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
                                        <ul className="space-y-2 print:space-y-1">
                                            {xp.bullets.map((b) => (
                                                <li key={b} className="flex gap-3 font-body text-base text-muted-foreground leading-relaxed">
                                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
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

                    {/* Certifications & languages */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-24 grid md:grid-cols-2 gap-12 print:mt-8 print:grid-cols-2 print:gap-6 print:break-inside-avoid"
                    >
                        <div>
                            <h2 className={sectionTitle}>Certificações</h2>
                            <ul className="space-y-2">
                                {certifications.map((c) => (
                                    <li key={c} className="font-body text-muted-foreground">{c}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className={sectionTitle}>Idiomas</h2>
                            <ul className="space-y-2">
                                {languages.map((l) => (
                                    <li key={l} className="font-body text-muted-foreground">{l}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Resume;
