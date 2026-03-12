import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Loader2, TrendingUp, Monitor, Globe } from 'lucide-react';

interface PageView {
    id: string;
    path: string;
    ip_geo: string;
    device_type: string;
    user_agent: string;
    created_at: string;
}

const COLORS = ['#d9f95d', '#8B9B3C', '#ffffff', '#888888'];

const Analytics = () => {
    const [loading, setLoading] = useState(true);
    const [views, setViews] = useState<PageView[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [deviceData, setDeviceData] = useState<any[]>([]);
    const [topPaths, setTopPaths] = useState<any[]>([]);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            // Fetch last 7 days of data
            const sevenDaysAgo = subDays(new Date(), 7);

            const { data, error } = await supabase
                .from('page_views')
                .select('*')
                .gte('created_at', sevenDaysAgo.toISOString())
                .order('created_at', { ascending: true });

            if (error) throw error;

            setViews(data || []);
            processData(data || []);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const processData = (data: PageView[]) => {
        // 1. Process Chart Data (Views per day)
        const last7Days = Array.from({ length: 7 }).map((_, i) => {
            const d = subDays(new Date(), 6 - i);
            return {
                dateStr: format(d, 'yyyy-MM-dd'),
                displayDate: format(d, 'MMM dd'),
                views: 0
            };
        });

        data.forEach(view => {
            const dateStr = format(new Date(view.created_at), 'yyyy-MM-dd');
            const dayIndex = last7Days.findIndex(d => d.dateStr === dateStr);
            if (dayIndex !== -1) {
                last7Days[dayIndex].views += 1;
            }
        });
        setChartData(last7Days);

        // 2. Process Device Types
        const devices = data.reduce((acc: any, curr) => {
            acc[curr.device_type] = (acc[curr.device_type] || 0) + 1;
            return acc;
        }, {});
        setDeviceData(Object.keys(devices).map(key => ({ name: key, value: devices[key] })));

        // 3. Process Top Paths
        const paths = data.reduce((acc: any, curr) => {
            acc[curr.path] = (acc[curr.path] || 0) + 1;
            return acc;
        }, {});

        // Sort and get top 5
        const sortedPaths = Object.keys(paths)
            .map(key => ({ path: key, views: paths[key] }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);

        setTopPaths(sortedPaths);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const totalViews = views.length;
    const todayViews = views.filter(v => new Date(v.created_at) >= startOfDay(new Date())).length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-3xl font-bold text-foreground">Analytics</h1>
                <p className="font-body text-sm text-muted-foreground mt-1">Visão geral do tráfego dos últimos 7 dias</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                    <div className="flex items-center text-muted-foreground">
                        <TrendingUp className="w-5 h-5 mr-3" />
                        <span className="font-body text-sm font-medium uppercase tracking-wider">Total Views (7d)</span>
                    </div>
                    <p className="font-display text-5xl font-bold text-foreground">{totalViews}</p>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                    <div className="flex items-center text-muted-foreground">
                        <TrendingUp className="w-5 h-5 mr-3" />
                        <span className="font-body text-sm font-medium uppercase tracking-wider">Views Hoje</span>
                    </div>
                    <p className="font-display text-5xl font-bold text-foreground">{todayViews}</p>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                    <div className="flex items-center text-muted-foreground">
                        <Globe className="w-5 h-5 mr-3" />
                        <span className="font-body text-sm font-medium uppercase tracking-wider">Páginas Únicas</span>
                    </div>
                    <p className="font-display text-5xl font-bold text-foreground">{new Set(views.map(v => v.path)).size}</p>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Area Chart */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-white/5">
                    <h3 className="font-display text-xl font-bold text-foreground mb-6">Tráfego Diário</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#d9f95d" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#d9f95d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="displayDate" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#d9f95d' }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#d9f95d" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Device Pie Chart */}
                <div className="p-6 rounded-2xl bg-card border border-white/5">
                    <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center">
                        <Monitor className="w-5 h-5 mr-2 text-primary" /> Dispositivos
                    </h3>
                    <div className="h-[300px] w-full flex flex-col justify-center">
                        {deviceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={deviceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {deviceData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-center text-muted-foreground">Sem dados suficientes</div>
                        )}

                        {/* Custom Legend */}
                        <div className="flex justify-center gap-4 mt-4">
                            {deviceData.map((entry, index) => (
                                <div key={entry.name} className="flex items-center text-sm text-muted-foreground">
                                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    {entry.name}: {entry.value}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Pages Table */}
            <div className="p-6 rounded-2xl bg-card border border-white/5">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Páginas Mais Acessadas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-body text-sm">
                        <thead className="text-muted-foreground border-b border-white/10">
                            <tr>
                                <th className="pb-3 font-medium">Path</th>
                                <th className="pb-3 font-medium text-right">Views</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {topPaths.length > 0 ? (
                                topPaths.map((path, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 text-foreground truncate max-w-[200px] md:max-w-md">{path.path}</td>
                                        <td className="py-4 text-foreground font-semibold text-right">{path.views}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="py-8 text-center text-muted-foreground">Nenhum dado registrado ainda.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Analytics;
