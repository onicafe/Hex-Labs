import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Globe, FileKey } from 'lucide-react';
import ConfirmModal from '@/components/admin/ConfirmModal';

interface Post {
    id: string;
    title: string;
    slug: string;
    status: string;
    published_at: string;
}

const AdminPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('id, title, slug, status, published_at')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async () => {
        if (!deleteId) return;
        const id = deleteId;
        setDeleteId(null);
        try {
            setPosts(posts.filter(p => p.id !== id));
            await supabase.from('posts').delete().eq('id', id);
        } catch (error) {
            console.error('Error deleting post:', error);
            fetchPosts(); // Refetch if error
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-3xl font-bold text-foreground">Blog Posts</h1>
                    <p className="font-body text-sm text-muted-foreground mt-1">Gerencie suas postagens do blog</p>
                </div>
                <Link
                    to="/admin/posts/new"
                    className="flex items-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Post
                </Link>
            </div>

            <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-muted-foreground">Carregando...</div>
                ) : posts.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">Nenhum post encontrado. Crie o primeiro!</div>
                ) : (
                    <table className="w-full text-left font-body text-sm">
                        <thead className="text-muted-foreground border-b border-white/5 bg-white/5">
                            <tr>
                                <th className="px-6 py-4 font-medium">Título</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Data</th>
                                <th className="px-6 py-4 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-foreground">{post.title}</div>
                                        <div className="text-xs text-muted-foreground mt-1">/{post.slug}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-white/10 text-muted-foreground'
                                            }`}>
                                            {post.status === 'published' ? <Globe className="w-3 h-3 mr-1" /> : <FileKey className="w-3 h-3 mr-1" />}
                                            {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {post.published_at ? format(new Date(post.published_at), 'dd/MM/yyyy') : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/admin/posts/${post.id}`}
                                                className="p-2 text-muted-foreground hover:text-primary transition-colors bg-white/5 hover:bg-white/10 rounded-lg"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteId(post.id)}
                                                className="p-2 text-muted-foreground hover:text-destructive transition-colors bg-white/5 hover:bg-white/10 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <ConfirmModal
                isOpen={!!deleteId}
                title="Excluir Postagem"
                description="Tem certeza que deseja excluir esta postagem do blog?"
                onConfirm={deletePost}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
};

export default AdminPosts;
