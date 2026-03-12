import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { updateSEO } from "@/lib/seo";

interface PostDetails {
    id: string;
    slug: string;
    title: string;
    content: string;
    published_at: string;
    main_image: string;
}

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<PostDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("posts")
                    .select("id, slug, title, content, published_at, main_image")
                    .eq("slug", slug)
                    .eq("status", "published")
                    .single();

                if (error || !data) {
                    navigate("/blog", { replace: true });
                    return;
                }

                setPost(data as PostDetails);
                updateSEO(data.title, data.content?.replace(/<[^>]*>?/gm, '').substring(0, 160), data.main_image);
            } catch (error) {
                console.error("Error fetching post:", error);
                navigate("/blog", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
        window.scrollTo(0, 0);
    }, [slug, navigate]);

    if (loading || !post) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex justify-center items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 border-b border-white/5 bg-card/30">
                <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar para o Blog
                        </Link>

                        <time className="font-body text-sm text-primary uppercase tracking-wider block mb-4">
                            {post.published_at ? format(new Date(post.published_at), "dd 'de' MMMM, yyyy", { locale: ptBR }) : ''}
                        </time>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                            {post.title}
                        </h1>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                IJ
                            </div>
                            <div>
                                <div className="font-medium text-foreground text-sm">Iésu Jafé</div>
                                <div className="text-muted-foreground text-xs">Hex Labs</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {post.main_image && (
                <div className="container mx-auto px-6 lg:px-12 max-w-4xl mt-12 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        <img src={post.main_image} alt={post.title} className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            )}

            {/* Post Content */}
            <motion.article
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="py-16 pb-32"
            >
                <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
                    {/* TipTap content rendering */}
                    <div
                        className="prose prose-invert prose-lg md:prose-xl prose-p:font-body prose-headings:font-display prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </motion.article>

            <Footer />
        </div>
    );
};

export default BlogPost;
