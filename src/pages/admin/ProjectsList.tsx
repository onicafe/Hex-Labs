import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Briefcase, Eye, EyeOff, LayoutTemplate } from 'lucide-react';
import ConfirmModal from '@/components/admin/ConfirmModal';

interface Project {
    id: string;
    title: string;
    slug: string;
    category: string;
    year: string;
    show_gallery: boolean;
    is_hidden: boolean;
}

const AdminProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('id, title, slug, category, year, show_gallery, is_hidden')
                .order('year', { ascending: false })
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async () => {
        if (!deleteId) return;
        const id = deleteId;
        setDeleteId(null);
        try {
            setProjects(projects.filter(p => p.id !== id));
            await supabase.from('projects').delete().eq('id', id);
        } catch (error) {
            console.error('Error deleting project:', error);
            fetchProjects();
        }
    };

    const toggleVisibility = async (project: Project) => {
        try {
            const newStatus = !project.is_hidden;
            setProjects(projects.map(p => p.id === project.id ? { ...p, is_hidden: newStatus } : p));
            await supabase.from('projects').update({ is_hidden: newStatus }).eq('id', project.id);
        } catch (error) {
            console.error('Error updating project visibility:', error);
            fetchProjects();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-3xl font-bold text-foreground">Portfolio</h1>
                    <p className="font-body text-sm text-muted-foreground mt-1">Gerencie os cases e produtos apresentados</p>
                </div>
                <Link
                    to="/admin/projects/new"
                    className="flex items-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Case
                </Link>
            </div>

            <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-muted-foreground">Carregando...</div>
                ) : projects.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">Nenhum projeto cadastrado. Adicione o primeiro!</div>
                ) : (
                    <table className="w-full text-left font-body text-sm">
                        <thead className="text-muted-foreground border-b border-white/5 bg-white/5">
                            <tr>
                                <th className="px-6 py-4 font-medium">Case</th>
                                <th className="px-6 py-4 font-medium">Categoria</th>
                                <th className="px-6 py-4 font-medium">Ano</th>
                                <th className="px-6 py-4 font-medium text-center">Galeria</th>
                                <th className="px-6 py-4 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-foreground flex items-center">
                                            <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
                                            {project.title}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">/{project.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {project.category}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {project.year}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            {project.show_gallery ? (
                                                <span className="p-1.5 bg-primary/10 text-primary rounded-md" title="Galeria Ativa">
                                                    <LayoutTemplate className="w-4 h-4" />
                                                </span>
                                            ) : (
                                                <span className="p-1.5 bg-white/5 text-muted-foreground rounded-md" title="Galeria Inativa">
                                                    <LayoutTemplate className="w-4 h-4 opacity-50" />
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => toggleVisibility(project)}
                                                className={`p-2 transition-colors rounded-lg flex items-center ${project.is_hidden
                                                    ? 'text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20'
                                                    : 'text-muted-foreground bg-white/5 hover:bg-white/10 hover:text-primary'}`}
                                                title={project.is_hidden ? "Projeto Oculto (Clique para mostrar)" : "Projeto Visível (Clique para ocultar)"}
                                            >
                                                {project.is_hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                            <Link
                                                to={`/admin/projects/${project.id}`}
                                                className="p-2 text-muted-foreground hover:text-primary transition-colors bg-white/5 hover:bg-white/10 rounded-lg"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteId(project.id)}
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
                title="Excluir Projeto"
                description="Tem certeza que deseja excluir este case do portfolio de forma irreversível?"
                onConfirm={deleteProject}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
};

export default AdminProjects;
