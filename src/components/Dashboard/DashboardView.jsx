import { useState, useEffect } from 'react';
import { Activity, BarChart3, Calendar, TrendingUp } from 'lucide-react';
import { getRecentActivity, getWeeklyStats } from '../../lib/supabase';

const DashboardView = () => {
    const [stats, setStats] = useState({ sets: 0, volume: 0 });
    const [recentLogs, setRecentLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [statsData, activityData] = await Promise.all([
                    getWeeklyStats(),
                    getRecentActivity()
                ]);
                setStats(statsData);
                setRecentLogs(activityData);
            } catch (error) {
                console.error('Failed to load dashboard data', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-[var(--color-text-muted)]">
                Loading stats...
            </div>
        );
    }

    return (
        <div className="pb-32 pt-8 px-4">
            <header className="mb-8">
                <h2 className="text-4xl text-white mb-2 font-[family-name:var(--font-display)] tracking-wide">
                    Dashboard
                </h2>
                <p className="text-[var(--color-text-muted)]">
                    Your weekly progress overview
                </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-zinc-900/50 border border-white/5 p-5 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
                        <Activity size={20} />
                        <span className="text-xs font-bold uppercase tracking-wider">Weekly Sets</span>
                    </div>
                    <div className="text-3xl font-bold text-white font-[family-name:var(--font-display)]">
                        {stats.sets}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-1">
                        sets completed
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 p-5 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
                        <TrendingUp size={20} />
                        <span className="text-xs font-bold uppercase tracking-wider">Volume</span>
                    </div>
                    <div className="text-3xl font-bold text-white font-[family-name:var(--font-display)]">
                        {(stats.volume / 1000).toFixed(1)}k
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-1">
                        kg lifted
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <section>
                <div className="flex items-center gap-2 mb-4 text-white">
                    <Calendar size={20} className="text-[var(--color-primary)]" />
                    <h3 className="font-semibold text-lg">Recent Activity</h3>
                </div>

                <div className="flex flex-col gap-3">
                    {recentLogs.length === 0 ? (
                        <div className="text-center py-8 text-[var(--color-text-muted)] bg-white/5 rounded-xl">
                            No recent activity found.
                        </div>
                    ) : (
                        recentLogs.map((log) => (
                            <div key={log.id} className="bg-zinc-900/30 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                                <div>
                                    <h4 className="text-white font-medium text-sm mb-1">{log.exercise_name}</h4>
                                    <div className="text-xs text-[var(--color-text-muted)] flex gap-3">
                                        <span>{log.weight}kg × {log.actual_reps}</span>
                                        <span className="opacity-50">•</span>
                                        <span>Set {log.set_number}</span>
                                    </div>
                                </div>
                                <div className="text-[10px] text-[var(--color-text-muted)] font-medium bg-white/5 px-2 py-1 rounded">
                                    {formatDate(log.created_at)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default DashboardView;
