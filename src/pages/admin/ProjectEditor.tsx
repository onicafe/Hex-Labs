import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ArrowLeft, Save, Loader2, Plus, X, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

const ProjectEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Core
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [year, setYear] = useState('');
    const [client, setClient] = useState('');
    const [industry, setIndustry] = useState('');

    // Content (TipTap)
    const [description, setDescription] = useState('');
    const [challenge, setChallenge] = useState('');
    const [solution, setSolution] = useState('');

    // Arrays
    const [services, setServices] = useState<string>(''); // Comma separated for ease
    const [stats, setStats] = useState<{ label: string, value: string }[]>([]);

    // Toggles & Links
    const [showGallery, setShowGallery] = useState(false);
    const [liveUrl, setLiveUrl] = useState('');
    const [newsUrl, setNewsUrl] = useState('');
    const [caseStudyUrl, setCaseStudyUrl] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [galleryUrls, setGalleryUrls] = useState<string>(''); // Comma separated

    useEffect(() => {
        if (!isNew) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setTitle(data.title);
                setSlug(data.slug);
                setCategory(data.category);
                setYear(data.year);
                setClient(data.client || '');
                setIndustry(data.industry || '');
                setDescription(data.description || '');
                setChallenge(data.challenge || '');
                setSolution(data.solution || '');
                setServices(Array.isArray(data.services) ? data.services.join(', ') : '');
                setStats(Array.isArray(data.stats) ? data.stats : []);
                setShowGallery(data.show_gallery || false);
                setLiveUrl(data.live_url || '');
                setNewsUrl(data.news_url || '');
                setCaseStudyUrl(data.case_study_url || '');
                setMainImage(data.main_image || '');
                setGalleryUrls(Array.isArray(data.gallery) ? data.gallery.join(',\\n') : '');
            }
        } catch (error) {
            console.error('Error fetching project:', error);
            toast.error('Erro ao carregar o projeto');
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

    const addStat = () => {
        setStats([...stats, { label: '', value: '' }]);
    };

    const updateStat = (index: number, field: 'label' | 'value', val: string) => {
        const newStats = [...stats];
        newStats[index][field] = val;
        setStats(newStats);
    };

    const removeStat = (index: number) => {
        setStats(stats.filter((_, i) => i !== index));
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'gallery') => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setUploadingImage(true);
        try {
            const uploadedUrls: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const ext = file.type.split('/')[1] || 'png';
                const fileName = `portfolio_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

                const { data, error } = await supabase.storage.from('media').upload(fileName, file, { contentType: file.type });
                if (error) throw error;

                const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(data.path);
                uploadedUrls.push(publicUrlData.publicUrl);
            }

            if (type === 'main') {
                setMainImage(uploadedUrls[0]);
            } else {
                const currentGallery = galleryUrls ? galleryUrls.split(/,|\\n/).map(s => s.trim()).filter(Boolean) : [];
                const newGallery = [...currentGallery, ...uploadedUrls];
                setGalleryUrls(newGallery.join('\\n'));

                if (newGallery.length > 1 && !showGallery) {
                    setShowGallery(true);
                    toast.success('Galeria ativada automaticamente!');
                }
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            toast.error('Erro ao fazer upload da imagem.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSave = async () => {
        if (!title || !slug || !category || !year || !description) {
            toast.error('Preencha os campos obrigatórios (Título, Slug, Categoria, Ano, Descrição)');
            return;
        }

        setSaving(true);
        try {
            // Process Arrays
            const parsedServices = services.split(',').map(s => s.trim()).filter(Boolean);
            const parsedGallery = galleryUrls.split(/,|\\n/).map(s => s.trim()).filter(Boolean);

            const payload = {
                title,
                slug,
                category,
                year,
                client,
                industry,
                description,
                challenge,
                solution,
                services: parsedServices,
                stats,
                show_gallery: showGallery,
                gallery: parsedGallery,
                main_image: mainImage,
                live_url: liveUrl,
                news_url: newsUrl,
                case_study_url: caseStudyUrl
            };

            if (isNew) {
                const { error } = await supabase.from('projects').insert([payload]);
                if (error) throw error;
                toast.success('Case criado com sucesso!');
                navigate('/admin/projects');
            } else {
                const { error } = await supabase.from('projects').update(payload).eq('id', id);
                if (error) throw error;
                toast.success('Case atualizado com sucesso!');
            }
        } catch (error: any) {
            console.error('Error saving project:', error);
            toast.error(error.message || 'Erro ao salvar o projeto');
        } finally {
            setSaving(false);
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
        <div className="max-w-5xl mx-auto space-y-6 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/projects')}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            {isNew ? 'Novo Case de Portfolio' : 'Editar Case'}
                        </h1>
                    </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                        <h2 className="font-display text-lg font-bold">Informações Principais</h2>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Título do Case *</label>
                            <input type="text" value={title} onChange={handleTitleChange} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary text-lg font-medium" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-1 block">Categoria *</label>
                                <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Ex: App Mobile" className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-1 block">Ano *</label>
                                <input type="text" value={year} onChange={e => setYear(e.target.value)} placeholder="Ex: 2024" className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-1 block">Cliente</label>
                                <input type="text" value={client} onChange={e => setClient(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-1 block">Setor/Indústria</label>
                                <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Serviços (Separados por vírgula)</label>
                            <input type="text" value={services} onChange={e => setServices(e.target.value)} placeholder="Design UI/UX, Backend, App Mobile..." className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-lg font-bold pl-2">Visão Geral (Overview) *</h2>
                        <RichTextEditor content={description} onChange={setDescription} />
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-lg font-bold pl-2">O Desafio</h2>
                        <RichTextEditor content={challenge} onChange={setChallenge} />
                    </div>

                    <div className="space-y-4">
                        <h2 className="font-display text-lg font-bold pl-2">A Solução</h2>
                        <RichTextEditor content={solution} onChange={setSolution} />
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                        <h2 className="font-display text-lg font-bold">Mídia & URL</h2>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Slug (URL)</label>
                            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm font-mono text-muted-foreground" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Imagem Principal</label>
                            <div className="flex gap-2">
                                <input type="text" value={mainImage} onChange={e => setMainImage(e.target.value)} placeholder="https://..." className="flex-1 bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                                <label className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 cursor-pointer transition-colors w-10 shrink-0">
                                    {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                                    <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'main')} disabled={uploadingImage} />
                                </label>
                            </div>
                            {mainImage && (
                                <div className="mt-2 relative rounded-lg overflow-hidden border border-white/10 h-32 bg-background/50">
                                    <img src={mainImage} alt="Main Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={showGallery} onChange={e => setShowGallery(e.target.checked)} className="w-5 h-5 rounded border-white/10 bg-background text-primary focus:ring-primary/20" />
                                <span className="text-sm font-medium text-foreground">Habilitar Galeria</span>
                            </label>
                        </div>

                        {showGallery && (
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="text-sm font-medium text-muted-foreground block">URLs da Galeria</label>
                                    <label className="text-xs font-medium text-primary hover:underline cursor-pointer flex items-center gap-1">
                                        {uploadingImage ? <Loader2 className="w-3 h-3 animate-spin" /> : <ImagePlus className="w-3 h-3" />}
                                        Fazer Upload
                                        <input type="file" multiple className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'gallery')} disabled={uploadingImage} />
                                    </label>
                                </div>
                                <textarea value={galleryUrls} onChange={e => setGalleryUrls(e.target.value)} placeholder="Uma URL por linha" className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-xs font-mono h-24" />

                                {/* Simple gallery preview */}
                                {galleryUrls && galleryUrls.split(/,|\\n/).map(s => s.trim()).filter(Boolean).length > 0 && (
                                    <div className="grid grid-cols-4 gap-2 mt-2">
                                        {galleryUrls.split(/,|\\n/).map(s => s.trim()).filter(Boolean).slice(0, 8).map((url, i) => (
                                            <div key={i} className="aspect-square rounded border border-white/10 overflow-hidden bg-background/50">
                                                <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display text-lg font-bold">Métricas Customizadas</h2>
                            <button type="button" onClick={addStat} className="p-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex gap-2 items-start bg-background p-3 rounded-xl border border-border">
                                    <div className="flex-1 space-y-2">
                                        <input type="text" value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="Valor (ex: 347)" className="w-full bg-transparent border-b border-white/10 px-2 py-1 focus:outline-none focus:border-primary text-sm font-bold text-foreground" />
                                        <input type="text" value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Rótulo (ex: Issues Corrigidas)" className="w-full bg-transparent border-b border-white/10 px-2 py-1 focus:outline-none focus:border-primary text-xs text-muted-foreground" />
                                    </div>
                                    <button type="button" onClick={() => removeStat(i)} className="p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {stats.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">Nenhuma métrica estruturada.</p>}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                        <h2 className="font-display text-lg font-bold">Links Externos</h2>

                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Ver Site (Live URL)</label>
                            <input type="url" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} placeholder="https://..." className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Ver Notícia (News URL)</label>
                            <input type="url" value={newsUrl} onChange={e => setNewsUrl(e.target.value)} placeholder="https://..." className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-1 block">Estudo de Caso (Case Study)</label>
                            <input type="url" value={caseStudyUrl} onChange={e => setCaseStudyUrl(e.target.value)} placeholder="https://..." className="w-full bg-background border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectEditor;
