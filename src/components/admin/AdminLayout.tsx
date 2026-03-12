import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, LogOut, FileText, Briefcase, BarChart, PackageSearch, ShieldCheck, Box, Globe, Terminal, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AdminLayout = () => {
    const { signOut, user } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Blog Posts', href: '/admin/posts', icon: BookOpen }, // Changed icon from FileText to BookOpen
        { name: 'Portfolio', href: '/admin/projects', icon: Terminal }, // Changed icon from Briefcase to Terminal
        { name: 'Produtos SaaS', href: '/admin/products', icon: Box }, // Changed icon from PackageSearch to Box
        { name: 'Marcas & Logos', href: '/admin/brands', icon: ShieldCheck },
        { name: 'SEO Global', href: '/admin/seo', icon: Globe }, // Added new SEO link
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
    ];

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-card/30 backdrop-blur-xl flex flex-col">
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <Link to="/" className="font-display text-2xl font-bold text-foreground">
                        HEX <span className="text-primary">LABS</span>
                        <span className="text-xs text-muted-foreground ml-2 uppercase tracking-wide">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
                                {user?.email}
                            </span>
                            <span className="text-xs text-muted-foreground">Admin</span>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
