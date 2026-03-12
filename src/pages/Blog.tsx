import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Post {
    slug: string;
    title: string;
    excerpt: string;
    published_at: string;
    main_image: string;
    // author_id we might not resolve to name for now, keep it simple
}

const Blog = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from("posts")
                    .select("slug, title, excerpt, published_at, main_image")
                    .eq("status", "published")
                    .order("published_at", { ascending: false });

                if (error) throw error;
                setPosts(data || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <p className="font-body text-sm tracking-[0.3em] text-primary mb-4">
                            PENSAMENTOS & INSIGHTS
                        </p>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground">
                            Blog Hex Labs
                        </h1>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center py-32">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-32 text-muted-foreground">
                            Nenhum artigo publicado ainda. Volte em breve!
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post.slug}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <Link to={`/blog/${post.slug}`} className="block">
                                        <div className="p-8 rounded-3xl bg-card border border-white/5 hover:border-white/10 transition-all duration-300">
                                            {post.main_image && (
                                                <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden mb-6 border border-white/10">
                                                    <img src={post.main_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                </div>
                                            )}
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                <time className="font-body text-sm text-primary uppercase tracking-wider">
                                                    {post.published_at ? format(new Date(post.published_at), "dd 'de' MMMM, yyyy", { locale: ptBR }) : ''}
                                                </time>
                                            </div>
                                            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors mb-4 line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="font-body text-lg text-muted-foreground line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-8 flex items-center text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                                Ler artigo completo
                                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
