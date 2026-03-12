import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const AdminOverview = () => {
    const [stats, setStats] = useState({
        views: 0,
        projects: 0,
        posts: 0,
        products: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [viewsReq, projectsReq, postsReq, productsReq] = await Promise.all([
                supabase.from('page_views').select('*', { count: 'exact', head: true }),
                supabase.from('projects').select('*', { count: 'exact', head: true }),
                supabase.from('posts').select('*', { count: 'exact', head: true }),
                supabase.from('products').select('*', { count: 'exact', head: true }),
            ]);

            setStats({
                views: viewsReq.count || 0,
                projects: projectsReq.count || 0,
                posts: postsReq.count || 0,
                products: productsReq.count || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-display text-3xl font-bold text-foreground">
                    Dashboard Overview
                </h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total Views', value: loading ? '...' : stats.views },
                    { label: 'Projetos', value: loading ? '...' : stats.projects },
                    { label: 'Posts (Blog)', value: loading ? '...' : stats.posts },
                    { label: 'Produtos (SaaS)', value: loading ? '...' : stats.products },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-card border border-white/5 space-y-2">
                        <p className="font-body text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                        <p className="font-display text-4xl font-bold text-foreground">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOverview;
