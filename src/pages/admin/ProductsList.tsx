import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2, PackageSearch } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmModal from '@/components/admin/ConfirmModal';

interface Product {
    id: string;
    title: string;
    status: string;
    slug: string;
}

const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<{ id: string, name: string } | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('id, title, status, slug')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Erro ao listar produtos');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const { id } = deleteId;
        setDeleteId(null);

        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            toast.success('Produto apagado com sucesso');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Erro ao apagar produto');
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
                    <h1 className="font-display text-3xl font-bold text-foreground">SaaS & Produtos</h1>
                    <p className="font-body text-sm text-muted-foreground mt-1">Gerencie os produtos oferecidos pela Hex Labs</p>
                </div>
                <Link
                    to="/admin/products/new"
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Produto
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-white/10 bg-card/30">
                    <PackageSearch className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="font-body text-lg text-foreground mb-2">Nenhum produto cadastrado</p>
                    <p className="font-body text-sm text-muted-foreground text-center max-w-sm mb-6">
                        Adicione ecossistemas e produtos SaaS para que clientes possam pedir demonstrações diretamente pela plataforma.
                    </p>
                    <Link
                        to="/admin/products/new"
                        className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary font-medium rounded-xl hover:bg-primary/20 transition-colors"
                    >
                        Criar Primeiro Produto
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-card border border-white/5 hover:border-white/10 transition-colors gap-4"
                        >
                            <div>
                                <h3 className="font-display text-lg font-bold text-foreground">{product.title}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="font-mono text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded">/{product.slug}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${product.status === 'disponível' ? 'bg-primary/20 text-primary border border-primary/30' :
                                        product.status === 'planejamento' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                            'bg-white/10 text-white border border-white/20'
                                        }`}>
                                        {product.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    to={`/admin/products/${product.id}`}
                                    className="p-2 text-muted-foreground hover:text-primary bg-background rounded-lg border border-border transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => setDeleteId({ id: product.id, name: product.title })}
                                    className="p-2 text-muted-foreground hover:text-destructive bg-background rounded-lg border border-border transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmModal
                isOpen={!!deleteId}
                title="Apagar Produto"
                description={`Tem certeza que deseja apagar o produto "${deleteId?.name}"? Esta ação não pode ser desfeita.`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
};

export default ProductsList;
