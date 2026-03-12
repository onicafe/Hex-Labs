import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Trash2, ImagePlus, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmModal from '@/components/admin/ConfirmModal';

interface Brand {
    id: string;
    name: string;
    logo_url: string;
}

const BrandsList = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deleteId, setDeleteId] = useState<{ id: string, name: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const { data, error } = await supabase
                .from('trusted_brands')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBrands(data || []);
        } catch (error) {
            console.error('Error fetching brands:', error);
            toast.error('Erro ao buscar clientes parceiros.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Prompt for brand name
        const brandName = window.prompt("Digite o nome da empresa/marca:");
        if (!brandName) {
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        setUploading(true);
        try {
            const ext = file.type.split('/')[1] || 'png';
            const fileName = `brand_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

            // Upload to storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('media')
                .upload(fileName, file, { contentType: file.type });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: publicUrlData } = supabase.storage
                .from('media')
                .getPublicUrl(uploadData.path);

            // Insert to database
            const payload = {
                name: brandName,
                logo_url: publicUrlData.publicUrl
            };

            const { error: insertError } = await supabase.from('trusted_brands').insert([payload]);
            if (insertError) throw insertError;

            toast.success("Marca adicionada com sucesso!");
            fetchBrands();
        } catch (error) {
            console.error("Error uploading brand:", error);
            toast.error("Falha ao adicionar marca.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const { id } = deleteId;
        setDeleteId(null);
        try {
            const { error } = await supabase.from('trusted_brands').delete().eq('id', id);
            if (error) throw error;
            toast.success("Marca apagada.");
            fetchBrands();
        } catch (error) {
            console.error("Error deleting brand:", error);
            toast.error("Falha ao apagar marca.");
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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-foreground">Aprovação Social (Logos)</h1>
                    <p className="font-body text-sm text-muted-foreground mt-1">Gerencie os clientes e parceiros do carrossel TrustedBy</p>
                </div>

                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleUpload}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
                    >
                        {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImagePlus className="w-4 h-4 mr-2" />}
                        Adicionar Nova Logo
                    </button>
                    <p className="text-xs text-muted-foreground mt-2 text-right">Extensões: PNG ou SVG</p>
                </div>
            </div>

            {brands.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-white/10 bg-card/30">
                    <ShieldCheck className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="font-body text-lg text-foreground mb-2">Nenhuma logo cadastrada</p>
                    <p className="font-body text-sm text-muted-foreground text-center">
                        Adicione clientes reais para reforçar sua prova social na home.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {brands.map(brand => (
                        <div key={brand.id} className="relative group p-4 border border-white/5 bg-card/50 rounded-2xl flex flex-col items-center gap-4 hover:border-primary/30 transition-colors">
                            <div className="flex-1 w-full flex items-center justify-center">
                                <img src={brand.logo_url} alt={brand.name} className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all" />
                            </div>
                            <div className="w-full text-center">
                                <p className="text-xs font-bold text-foreground truncate">{brand.name}</p>
                            </div>

                            <button
                                onClick={() => setDeleteId({ id: brand.id, name: brand.name })}
                                className="absolute -top-2 -right-2 p-1.5 bg-destructive border-2 border-background text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg"
                                title="Apagar"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmModal
                isOpen={!!deleteId}
                title="Apagar Logo"
                description={`Tem certeza que deseja apagar a logo da empresa "${deleteId?.name}"?`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
};

export default BrandsList;
