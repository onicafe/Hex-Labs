import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2, Box, Building2, Scale, BarChart3, Users2, LayoutTemplate, ShieldCheck, Mail, Zap, Server, Code, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const iconMap: Record<string, any> = { Box, Building2, Scale, BarChart3, Users2, LayoutTemplate, ShieldCheck, Mail, Zap, Server, Code, Bot };

const Products = () => {
    const [dbProducts, setDbProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await supabase.from('products').select('*').order('created_at', { ascending: true });
                if (data && data.length > 0) {
                    setDbProducts(data);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const displayProducts = dbProducts;

    const renderSkeleton = () => (
        <div className="space-y-32">
            {[1, 2, 3].map((i) => (
                <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center animate-pulse`}>
                    <div className="w-full lg:w-1/2">
                        <div className="rounded-3xl aspect-square md:aspect-[4/3] bg-white/5 border border-white/10" />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div className="w-16 h-16 rounded-2xl bg-white/5" />
                        <div className="space-y-4">
                            <div className="h-12 bg-white/5 rounded-lg w-3/4" />
                            <div className="h-6 bg-white/5 rounded-lg w-1/3 mb-6" />
                            <div className="h-20 bg-white/5 rounded-lg w-full" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((j) => (
                                <div key={j} className="h-6 bg-white/5 rounded-lg w-5/6" />
                            ))}
                        </div>
                        <div className="pt-6">
                            <div className="h-14 w-48 bg-white/5 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-6 lg:px-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-24 max-w-3xl"
                    >
                        <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">
                            PRODUTOS SAAS
                        </p>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                            Soluções Prontas para Escalar.
                        </h1>
                        <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Descubra nossos ecossistemas modulares desenvolvidos para indústrias específicas. Implantação rápida, personalização deep-tech e foco absoluto na conversão.
                        </p>
                    </motion.div>

                    {/* Products List */}
                    {loading ? renderSkeleton() : (
                        <div className="space-y-32">
                            {displayProducts.map((product, index) => {
                                const Icon = typeof product.icon === 'string' ? (iconMap[product.icon] || Box) : product.icon;
                                const isEven = index % 2 === 0;

                                return (
                                    <motion.div
                                        key={product.slug}
                                        initial={{ opacity: 0, y: 80 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8 }}
                                        className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
                                    >
                                        {/* Image Side */}
                                        <div className="w-full lg:w-1/2">
                                            <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3] bg-card border border-white/5 group">
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10" />
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                                />

                                                {/* Status Badge */}
                                                <div className="absolute top-6 left-6 z-20">
                                                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${product.status === 'disponível'
                                                        ? 'bg-primary/20 text-primary border-primary/30'
                                                        : 'bg-white/10 text-white border-white/20'
                                                        }`}>
                                                        {product.status}
                                                    </span>
                                                </div>

                                                {/* Metrics Overlay */}
                                                {product.metrics && Object.keys(product.metrics).length > 0 && (
                                                    <div className="absolute bottom-6 left-6 right-6 z-20 grid grid-cols-2 gap-4">
                                                        {Array.isArray(product.metrics) ? product.metrics.map((metric: any, i: number) => (
                                                            <div key={i} className="bg-background/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                                                                <div className="font-display text-2xl font-bold text-primary mb-1">{metric.value}</div>
                                                                <div className="font-body text-xs text-muted-foreground uppercase">{metric.label}</div>
                                                            </div>
                                                        )) : Object.entries(product.metrics).map(([key, val]: any, i) => (
                                                            <div key={i} className="bg-background/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                                                                <div className="font-display text-2xl font-bold text-primary mb-1">{val}</div>
                                                                <div className="font-body text-xs text-muted-foreground uppercase">{key}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="w-full lg:w-1/2 space-y-8">
                                            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 text-primary mb-2">
                                                <Icon className="w-8 h-8" />
                                            </div>

                                            <div>
                                                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                                                    {product.title}
                                                </h2>
                                                <p className="font-body text-xl text-primary font-medium mb-6">
                                                    {product.tagline}
                                                </p>
                                                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                                                    {product.description}
                                                </p>
                                            </div>

                                            <ul className="space-y-4">
                                                {product.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-foreground font-body">
                                                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                                                        <span className="text-lg">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="pt-6 flex flex-wrap gap-4">
                                                <Link
                                                    to={`/contact?subject=Interesse em ${product.title}`}
                                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body font-medium rounded-full hover:glow-accent transition-all duration-300 w-full sm:w-auto group"
                                                >
                                                    Agendar Demonstração
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </Link>

                                                {product.site_url && (
                                                    <a
                                                        href={product.site_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-background border border-white/10 text-foreground font-body font-medium rounded-full hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
                                                    >
                                                        Ver site
                                                        <ArrowRight className="w-4 h-4 -rotate-45" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Products;
