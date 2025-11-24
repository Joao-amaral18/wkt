import { X, Dumbbell } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, currentWorkoutId, onSelectWorkout }) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-90"
                />
            )}

            <aside className={`fixed top-0 left-0 bottom-0 w-[280px] bg-zinc-900 border-r border-white/5 z-[100] transition-transform duration-300 ease-in-out p-6 flex flex-col gap-8 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center">
                    <h2 className="text-white text-3xl font-[family-name:var(--font-display)] tracking-wide">Ironwarg</h2>
                    <button onClick={onClose} className="bg-none border-none text-[var(--color-text-muted)] cursor-pointer hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex flex-col gap-1">
                    <div className="text-[var(--color-text-muted)] text-[10px] font-bold mb-3 uppercase tracking-widest pl-3">
                        Workouts
                    </div>

                    {[
                        { id: 'A1_Upper1_PeitoOmbros', label: 'A1 - Upper (Peito/Ombros)' },
                        { id: 'B1_Lower1', label: 'B1 - Lower 1' },
                        { id: 'A2_Upper2_PeitoOmbros', label: 'A2 - Upper (Peito/Ombros)' },
                        { id: 'B2_Lower2', label: 'B2 - Lower 2' }
                    ].map((workout) => (
                        <button
                            key={workout.id}
                            onClick={() => onSelectWorkout(workout.id)}
                            className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all cursor-pointer border-none text-sm font-medium ${currentWorkoutId === workout.id
                                    ? 'bg-white/10 text-white shadow-inner'
                                    : 'bg-transparent text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Dumbbell size={16} className={currentWorkoutId === workout.id ? 'text-[var(--color-primary)]' : 'opacity-50'} />
                            {workout.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <h4 className="text-sm mb-1 font-semibold text-white">Athlete</h4>
                        <p className="text-xs text-[var(--color-text-muted)]">Joao Vitor Lima</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
