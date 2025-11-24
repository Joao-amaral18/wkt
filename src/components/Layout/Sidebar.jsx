import { X, Dumbbell, LayoutDashboard } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, currentWorkoutId, currentView, onSelectWorkout, onNavigate }) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-90 lg:hidden"
                />
            )}

            <aside className={`fixed top-0 left-0 bottom-0 w-[280px] bg-zinc-900/95 backdrop-blur-xl border-r border-white/10 z-[100] transition-transform duration-300 ease-in-out p-6 flex flex-col gap-6 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h2 className="text-white text-2xl font-[family-name:var(--font-display)] tracking-wide">Ironwarg</h2>
                    <button onClick={onClose} className="bg-none border-none text-[var(--color-text-muted)] cursor-pointer hover:text-white transition-colors lg:hidden">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex flex-col gap-2 flex-1">
                    <button
                        onClick={() => onNavigate('selection')}
                        className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer border-none text-sm font-medium ${currentView === 'selection'
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-transparent text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Dumbbell size={18} className={currentView === 'selection' ? 'text-white' : 'opacity-70'} />
                        Workouts
                    </button>

                    <button
                        onClick={() => onNavigate('dashboard')}
                        className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer border-none text-sm font-medium ${currentView === 'dashboard'
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-transparent text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <LayoutDashboard size={18} className={currentView === 'dashboard' ? 'text-white' : 'opacity-70'} />
                        Dashboard
                    </button>

                    <div className="h-px bg-white/5 my-2"></div>

                    <div className="text-[var(--color-text-muted)] text-[10px] font-bold mb-1 uppercase tracking-widest pl-3">
                        Recent
                    </div>

                    {[
                        { id: 'A1_Upper1', label: 'A1 - Upper' },
                        { id: 'B1_Lower1', label: 'B1 - Lower' },
                        { id: 'A2_Upper2', label: 'A2 - Upper' },
                        { id: 'B2_Lower2', label: 'B2 - Lower' }
                    ].map((workout) => (
                        <button
                            key={workout.id}
                            onClick={() => onSelectWorkout(workout.id)}
                            className={`w-full text-left p-2.5 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer border-none text-xs font-medium ${currentWorkoutId === workout.id
                                    ? 'bg-white/10 text-white'
                                    : 'bg-transparent text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full ${currentWorkoutId === workout.id ? 'bg-[var(--color-primary)]' : 'bg-white/20'}`}></div>
                            {workout.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="p-3 bg-white/5 rounded-xl">
                        <h4 className="text-xs mb-0.5 font-semibold text-white">Athlete</h4>
                        <p className="text-[10px] text-[var(--color-text-muted)]">Joao Vitor Lima</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
