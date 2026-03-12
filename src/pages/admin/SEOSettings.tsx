import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Save, ImagePlus, Globe } from 'lucide-react';
import { toast } from 'sonner';

const SEOSettings = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [seoId, setSeoId] = useState<string | null>(null);
    const [siteName, setSiteName] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [ogImage, setOgImage] = useState('');

    useEffect(() => {
        fetchSEO();
    }, []);

    const fetchSEO = async () => {
        try {
            const { data, error } = await supabase.from('seo_settings').select('*').limit(1).single();
            if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows

            if (data) {
                setSeoId(data.id);
                setSiteName(data.site_name || '');
                setMetaTitle(data.meta_title || '');
                setMetaDescription(data.meta_description || '');
                setKeywords(data.keywords || '');
                setOgImage(data.og_image || '');
            }
        } catch (error) {
            console.error('Error fetching SEO Settings:', error);
            toast.error('Erro ao carregar configurações de SEO.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!siteName || !metaTitle) {
            toast.error('Nome do site e Título são obrigatórios.');
            return;
        }

        setSaving(true);
        try {
            const payload = {
                site_name: siteName,
                meta_title: metaTitle,
                meta_description: metaDescription,
                keywords,
                og_image: ogImage,
                updated_at: new Date().toISOString()
            };

            if (seoId) {
                const { error } = await supabase.from('seo_settings').update(payload).eq('id', seoId);
                if (error) throw error;
            } else {
                const { data, error } = await supabase.from('seo_settings').insert([payload]).select().single();
                if (error) throw error;
                if (data) setSeoId(data.id);
            }

            toast.success('Configurações de SEO salvas com sucesso!');
        } catch (error: any) {
            console.error('Error saving SEO:', error);
            toast.error(error.message || 'Erro ao salvar SEO.');
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
            const fileName = `og_image_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

            const { data, error } = await supabase.storage.from('media').upload(fileName, file, { contentType: file.type });
            if (error) throw error;

            const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(data.path);
            setOgImage(publicUrlData.publicUrl);
            toast.success('Imagem enviada com sucesso!');
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
                <div>
                    <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
                        <Globe className="w-8 h-8 text-primary" />
                        SEO Global
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm font-body">
                        Otimize a indexação (Search Engine Optimization) e a maneira que links aparecem em redes sociais.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center px-6 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Salvar
                </button>
            </div>

            <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Nome do Site (Site Name)</label>
                        <input
                            type="text"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
                            placeholder="Hex Labs"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground text-primary">Título Principal (Meta Title)</label>
                        <p className="text-xs text-muted-foreground pb-1">Este é o título exibido na aba do navegador e nos resultados das pesquisas.</p>
                        <input
                            type="text"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm font-medium"
                            placeholder="Hex Labs | Engenharia de Software"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground text-primary">Descrição Global (Meta Description)</label>
                        <p className="text-xs text-muted-foreground pb-1">Aparece abaixo do título nas pesquisas (resumo do serviço).</p>
                        <textarea
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm min-h-[100px]"
                            placeholder="Desenvolvemos plataformas SaaS e soluções modernas de software."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground text-primary">Palavras-chave (Keywords)</label>
                        <p className="text-xs text-muted-foreground pb-1">Separadas por vírgula (ex: software, desenvolvimento, SaaS).</p>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm font-mono"
                        />
                    </div>

                    <div className="border-t border-border pt-6 mt-6 space-y-4">
                        <h3 className="font-display text-lg font-bold text-foreground">Open Graph & Redes Sociais</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Imagem de Compartilhamento (OG/Twitter Image)</label>
                            <p className="text-xs text-muted-foreground pb-1">Esta é a imagem que aparece quando alguém envia o link do site no WhatsApp, LinkedIn, etc (Recomendado 1200x630).</p>
                            <div className="flex gap-2">
                                <input type="text" value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://..." className="flex-1 bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm font-mono text-muted-foreground" />
                                <label className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 cursor-pointer transition-colors w-12 shrink-0">
                                    {uploadingImage ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-5 h-5" />}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploadingImage} />
                                </label>
                            </div>
                            {ogImage && (
                                <div className="mt-4 rounded-xl overflow-hidden border border-white/10 w-full max-w-[400px]">
                                    <img src={ogImage} alt="OG Preview" className="w-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SEOSettings;
