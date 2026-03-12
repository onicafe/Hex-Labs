import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ArrowLeft, Save, Loader2, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

const PostEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [status, setStatus] = useState('draft');
    const [mainImage, setMainImage] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        if (!isNew) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setTitle(data.title);
                setSlug(data.slug);
                setContent(data.content);
                setExcerpt(data.excerpt || '');
                setStatus(data.status);
                setMainImage(data.main_image || '');
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            toast.error('Erro ao carregar o post');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (text: string) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (isNew) {
            setSlug(generateSlug(newTitle));
        }
    };

    const handleSave = async () => {
        if (!title || !slug) {
            toast.error('Título e Slug são obrigatórios');
            return;
        }

        setSaving(true);
        try {
            const { data: userData } = await supabase.auth.getUser();
            const payload = {
                title,
                slug,
                content,
                excerpt,
                status,
                main_image: mainImage,
                author_id: userData.user?.id,
                updated_at: new Date().toISOString(),
                published_at: status === 'published' ? new Date().toISOString() : null, // Simplification for demo
            };

            if (isNew) {
                const { error } = await supabase.from('posts').insert([payload]);
                if (error) throw error;
                toast.success('Post criado com sucesso!');
                navigate('/admin/posts');
            } else {
                const { error } = await supabase.from('posts').update(payload).eq('id', id);
                if (error) throw error;
                toast.success('Post atualizado com sucesso!');
            }
        } catch (error: any) {
            console.error('Error saving post:', error);
            toast.error(error.message || 'Erro ao salvar o post');
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const ext = file.type.split('/')[1] || 'jpg';
            const fileName = `post_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

            const { data, error } = await supabase.storage.from('media').upload(fileName, file, { contentType: file.type });
            if (error) throw error;

            const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(data.path);
            setMainImage(publicUrlData.publicUrl);
            toast.success('Imagem envida com sucesso!');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Erro ao fazer upload da imagem.');
        } finally {
            setUploadingImage(false);
            event.target.value = '';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/posts')}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            {isNew ? 'Criar Novo Post' : 'Editar Post'}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="draft">Rascunho</option>
                        <option value="published">Publicado</option>
                    </select>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center px-6 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Salvar
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Título do Post</label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-lg font-medium"
                            placeholder="A Nova Era da Inteligência Artificial..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">URL Slug</label>
                        <div className="flex items-center">
                            <span className="text-muted-foreground bg-white/5 border border-r-0 border-white/10 rounded-l-xl px-4 py-3 text-sm">/blog/</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="flex-1 bg-background border border-border rounded-r-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm font-mono text-muted-foreground"
                                placeholder="a-nova-era"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Resumo (Excerpt)</label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm min-h-[80px]"
                            placeholder="Breve descrição que aparecerá nos cards da listagem..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Imagem Principal (Capa)</label>
                        <div className="flex gap-2">
                            <input type="text" value={mainImage} onChange={e => setMainImage(e.target.value)} placeholder="https://..." className="flex-1 bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                            <label className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 cursor-pointer transition-colors w-10 shrink-0">
                                {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploadingImage} />
                            </label>
                        </div>
                        {mainImage && (
                            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 mt-2">
                                <img src={mainImage} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground px-2">Conteúdo</label>
                    <RichTextEditor
                        content={content}
                        onChange={setContent}
                        placeholder="Comece a escrever a sua obra-prima..."
                    />
                </div>
            </div>
        </div>
    );
};

export default PostEditor;
