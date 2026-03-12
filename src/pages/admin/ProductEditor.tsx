import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Plus, X, ImagePlus, Building2, Scale, BarChart3, Users2, LayoutTemplate, ShieldCheck, Mail, Zap, Server, Code, Bot, Box } from 'lucide-react';
import { toast } from 'sonner';

const AVAILABLE_ICONS = [
    { name: 'Box', icon: Box, label: 'Pacote/Caixa' },
    { name: 'Building2', icon: Building2, label: 'Imóveis/Edifício' },
    { name: 'Scale', icon: Scale, label: 'Balança/Direito' },
    { name: 'BarChart3', icon: BarChart3, label: 'Analytics' },
    { name: 'Users2', icon: Users2, label: 'Usuários/CRM' },
    { name: 'LayoutTemplate', icon: LayoutTemplate, label: 'Agência/Design' },
    { name: 'ShieldCheck', icon: ShieldCheck, label: 'Segurança' },
    { name: 'Mail', icon: Mail, label: 'Email/Mkt' },
    { name: 'Zap', icon: Zap, label: 'Performance' },
    { name: 'Server', icon: Server, label: 'Infra/Hospedagem' },
    { name: 'Code', icon: Code, label: 'Dev/API' },
    { name: 'Bot', icon: Bot, label: 'AI/Bot' },
];

const ProductEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Fields
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('Box');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('disponível');
    const [siteUrl, setSiteUrl] = useState('');

    // Arrays
    const [features, setFeatures] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState('');
    const [metrics, setMetrics] = useState<{ label: string, value: string }[]>([]);

    useEffect(() => {
        if (!isNew) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setTitle(data.title);
                setSlug(data.slug);
                setTagline(data.tagline);
                setDescription(data.description);
                setIcon(data.icon);
                setImage(data.image);
                setStatus(data.status);
                setSiteUrl(data.site_url || '');
                setFeatures(Array.isArray(data.features) ? data.features : []);
                setMetrics(Array.isArray(data.metrics) ? data.metrics : []);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Erro ao carregar o produto');
            navigate('/admin/products');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (text: string) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (isNew) {
            setSlug(generateSlug(newTitle));
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const ext = file.type.split('/')[1] || 'jpg';
            const fileName = `product_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

            const { data, error } = await supabase.storage.from('media').upload(fileName, file, { contentType: file.type });
            if (error) throw error;

            const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(data.path);
            setImage(publicUrlData.publicUrl);
            toast.success('Imagem enviada com sucesso!');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Erro ao fazer upload da imagem.');
        } finally {
            setUploadingImage(false);
            event.target.value = '';
        }
    };

    const handleSave = async () => {
        if (!title || !slug || !tagline || !description || !image) {
            toast.error('Preencha os campos obrigatórios (Título, Slug, Tagline, Descrição e Imagem)');
            return;
        }

        setSaving(true);
        try {
            const payload = {
                title,
                slug,
                tagline,
                description,
                icon,
                image,
                status,
                site_url: siteUrl,
                features,
                metrics
            };

            if (isNew) {
                const { error } = await supabase.from('products').insert([payload]);
                if (error) throw error;
                toast.success('Produto criado com sucesso!');
                navigate('/admin/products');
            } else {
                const { error } = await supabase.from('products').update(payload).eq('id', id);
                if (error) throw error;
                toast.success('Produto atualizado com sucesso!');
            }
        } catch (error: any) {
            console.error('Error saving product:', error);
            toast.error(error.message || 'Erro ao salvar o produto');
        } finally {
            setSaving(false);
        }
    };

    // Feature array helpers
    const addFeature = (e: React.FormEvent) => {
        e.preventDefault();
        if (newFeature.trim()) {
            setFeatures([...features, newFeature.trim()]);
            setNewFeature('');
        }
    };
    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    // Metric array helpers
    const addMetric = () => {
        setMetrics([...metrics, { label: '', value: '' }]);
    };
    const updateMetric = (index: number, field: 'label' | 'value', val: string) => {
        const newMetrics = [...metrics];
        newMetrics[index][field] = val;
        setMetrics(newMetrics);
    };
    const removeMetric = (index: number) => {
        setMetrics(metrics.filter((_, i) => i !== index));
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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/products')} className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-display text-2xl font-bold text-foreground">
                        {isNew ? 'Novo Produto SaaS' : 'Editar Produto SaaS'}
                    </h1>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Salvar
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                        <h2 className="font-display text-lg font-bold">Informações Básicas</h2>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Nome do Produto *</label>
                            <input type="text" value={title} onChange={handleTitleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary text-lg font-bold" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Slug (URL) *</label>
                            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm font-mono text-muted-foreground" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Tagline (Subtítulo de Impacto) *</label>
                            <input type="text" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Ex: Ecossistema Completo para Corretores" className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm font-medium text-primary" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Descrição Longa *</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none"></textarea>
                        </div>
                    </div>

                    {/* Features Array */}
                    <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                        <h2 className="font-display text-lg font-bold">Funcionalidades (Features)</h2>

                        <form onSubmit={addFeature} className="flex gap-2">
                            <input type="text" value={newFeature} onChange={e => setNewFeature(e.target.value)} placeholder="CRM Inteligente..." className="flex-1 bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                            <button type="submit" disabled={!newFeature.trim()} className="px-4 py-2 bg-white/5 text-foreground hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"><Plus className="w-4 h-4" /></button>
                        </form>

                        <ul className="space-y-2">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center justify-between p-2 rounded-lg bg-background border border-white/5 text-sm">
                                    <span>{feature}</span>
                                    <button onClick={() => removeFeature(i)} className="p-1 text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Visual & Status */}
                    <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                        <h2 className="font-display text-lg font-bold">Visual & Configuração</h2>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Ícone Principal</label>
                            <select value={icon} onChange={e => setIcon(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm">
                                {AVAILABLE_ICONS.map(i => (
                                    <option key={i.name} value={i.name}>{i.label} ({i.name})</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Imagem Decorativa *</label>
                            <div className="flex gap-2 mb-2">
                                <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." className="flex-1 bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                                <label className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 cursor-pointer transition-colors w-10 shrink-0">
                                    {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploadingImage} />
                                </label>
                            </div>
                            {image && (
                                <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 relative group">
                                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-1 block">Status</label>
                                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm uppercase tracking-wider font-bold">
                                    <option value="disponível">Disponível</option>
                                    <option value="desenvolvimento">Em Desenvolvimento</option>
                                    <option value="planejamento">Em Planejamento</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-1 block">URL do Site (Ver Site)</label>
                                <input type="url" value={siteUrl} onChange={e => setSiteUrl(e.target.value)} placeholder="Opcional" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Metrics Array */}
                    <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-lg font-bold">Indicadores de Desempenho (Métricas)</h2>
                            <button type="button" onClick={addMetric} className="p-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-xs text-muted-foreground">Mostrados em cima da imagem do produto (Ex: Aumento em Vendas - 35%)</p>

                        <div className="space-y-3">
                            {metrics.map((metric, i) => (
                                <div key={i} className="flex gap-2 items-start bg-background p-3 rounded-xl border border-border">
                                    <div className="flex-1 space-y-2">
                                        <input type="text" value={metric.value} onChange={e => updateMetric(i, 'value', e.target.value)} placeholder="Valor (ex: 35%)" className="w-full bg-transparent border-b border-white/10 px-2 py-1 focus:outline-none focus:border-primary text-sm font-bold text-foreground" />
                                        <input type="text" value={metric.label} onChange={e => updateMetric(i, 'label', e.target.value)} placeholder="Rótulo (ex: Aumento de Vendas)" className="w-full bg-transparent border-b border-white/10 px-2 py-1 focus:outline-none focus:border-primary text-xs text-muted-foreground" />
                                    </div>
                                    <button type="button" onClick={() => removeMetric(i)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {metrics.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Nenhuma métrica adicionada.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditor;
