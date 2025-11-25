import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { supabase, getExerciseHistory } from '../../lib/supabase';

const ExerciseCard = ({ exerciseString, index, isActive, onComplete }) => {
    // Parse exercise string
    // Format: "Name – SetsxReps (Notes)"
    const [name, rest] = exerciseString.split(' – ');
    const [setsReps, notes] = rest ? rest.split(' (') : ['', ''];
    const cleanNotes = notes ? notes.replace(')', '') : '';

    // Extract number of sets (e.g., "3x4-6" -> 3)
    // Handle both 'x' and '×'
    const numSets = parseInt(setsReps.split(/[x×]/)[0]) || 1;

    const [equipment, setEquipment] = useState('Barra'); // 'Barra', 'Máquina', 'Halter'

    const [sets, setSets] = useState(
        Array(numSets).fill().map((_, i) => ({
            id: i,
            weight: '',
            reps: '',
            isCompleted: false,
            prevWeight: null,
            prevReps: null
        }))
    );

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const exerciseNameWithEquipment = `${name} (${equipment})`;
            const data = await getExerciseHistory(exerciseNameWithEquipment);

            // If no data found for specific equipment, try falling back to just name for 'Barra' 
            // to preserve legacy history, OR just start fresh. 
            // Given the requirement "store weight for (maquina)... (halter)", 
            // it implies segmentation. I will stick to strict segmentation.

            if (data) {
                setHistory(data);
                const lastSessionLogs = data.slice(0, numSets).reverse();

                // Re-initialize sets to ensure correct length and data
                setSets(Array(numSets).fill().map((_, i) => {
                    const log = lastSessionLogs[i];
                    return {
                        id: i,
                        weight: '',
                        reps: '',
                        isCompleted: false,
                        prevWeight: log ? log.weight : null,
                        prevReps: log ? log.actual_reps : null
                    };
                }));
            } else {
                // Reset if no history found for this equipment variant
                setSets(Array(numSets).fill().map((_, i) => ({
                    id: i,
                    weight: '',
                    reps: '',
                    isCompleted: false,
                    prevWeight: null,
                    prevReps: null
                })));
            }
        };
        fetchHistory();
    }, [name, numSets, equipment]);

    const handleWeightChange = (setIndex, value) => {
        setSets(prev => prev.map((set, i) =>
            i === setIndex ? { ...set, weight: value } : set
        ));
    };

    const handleRepsChange = (setIndex, value) => {
        setSets(prev => prev.map((set, i) =>
            i === setIndex ? { ...set, reps: value } : set
        ));
    };

    const handleCheckSet = async (setIndex) => {
        const set = sets[setIndex];

        // Toggle Logic
        if (set.isCompleted) {
            // Undo: Set isCompleted to false
            setSets(prev => prev.map((s, i) =>
                i === setIndex ? { ...s, isCompleted: false } : s
            ));
            return;
        }

        // Save to DB
        try {
            const { error } = await supabase
                .from('workout_logs')
                .insert([
                    {
                        exercise_name: `${name} (${equipment})`,
                        weight: parseFloat(set.weight),
                        actual_reps: parseInt(set.reps),
                        reps: setsReps, // Storing target reps
                        set_number: setIndex + 1,
                        notes: cleanNotes
                    }
                ]);

            if (error) throw error;

            // Update local state
            setSets(prev => prev.map((s, i) =>
                i === setIndex ? { ...s, isCompleted: true } : s
            ));

            // Check if all sets are complete
            const allComplete = sets.every((s, i) => i === setIndex ? true : s.isCompleted);
            if (allComplete) {
                onComplete();
            }

        } catch (err) {
            console.error('Error logging set:', err);
        }
    };

    return (
        <div className={`mb-8 transition-all duration-500 ease-out ${isActive
            ? 'opacity-100 translate-y-0'
            : 'opacity-40 translate-y-2 pointer-events-none grayscale'
            }`}>
            <div className="mb-4 pl-2">
                <div className="flex flex-col gap-2 mb-2">
                    <div className="flex items-baseline justify-between">
                        <h4 className="text-xl font-medium text-white tracking-tight">
                            {name}
                        </h4>
                        <span className="text-sm font-medium text-[var(--color-primary)] bg-[rgba(225,29,72,0.1)] px-2 py-0.5 rounded-full">
                            {setsReps}
                        </span>
                    </div>

                    {/* Equipment Selector */}
                    <div className="flex bg-white/5 p-1 rounded-lg w-fit">
                        {['Barra', 'Máquina', 'Halter'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setEquipment(type)}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${equipment === type
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-text-muted hover:text-white'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {cleanNotes && (
                    <div className="text-sm text-text-muted flex items-center gap-2">
                        {cleanNotes}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3">
                {sets.map((set, i) => (
                    <div key={i} className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${set.isCompleted
                        ? 'bg-white/5'
                        : 'bg-[var(--color-surface)] border border-[var(--color-border)]'
                        }`}>
                        <span className={`w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full transition-colors ${set.isCompleted ? 'text-green-500 bg-green-500/10' : 'text-[var(--color-text-muted)] bg-white/5'
                            }`}>
                            {i + 1}
                        </span>

                        {/* Weight Input */}
                        <div className="flex-1 flex flex-col">
                            <div className="relative">
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    step="0.5"
                                    placeholder={set.prevWeight || '-'}
                                    className={`w-full bg-transparent border-none p-0 text-lg font-medium focus:ring-0 placeholder:text-[var(--color-text-muted)]/30 ${(set.prevWeight && parseFloat(set.weight) > set.prevWeight)
                                        ? 'text-green-400'
                                        : 'text-white'
                                        }`}
                                    value={set.weight}
                                    onChange={(e) => handleWeightChange(i, e.target.value)}
                                    disabled={set.isCompleted}
                                />
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider pointer-events-none">
                                    kg
                                </span>
                            </div>
                        </div>

                        {/* Reps Input */}
                        <div className="flex-1 flex flex-col">
                            <div className="relative">
                                <input
                                    type="number"
                                    inputMode="numeric"
                                    placeholder={set.prevReps || '-'}
                                    className={`w-full bg-transparent border-none p-0 text-lg font-medium focus:ring-0 placeholder:text-[var(--color-text-muted)]/30 ${(set.prevReps && parseInt(set.reps) > set.prevReps)
                                        ? 'text-green-400'
                                        : 'text-white'
                                        }`}
                                    value={set.reps || ''}
                                    onChange={(e) => handleRepsChange(i, e.target.value)}
                                    disabled={set.isCompleted}
                                />
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider pointer-events-none">
                                    reps
                                </span>
                            </div>
                        </div>

                        <button
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${set.isCompleted
                                ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                                : 'bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10 hover:text-white'
                                }`}
                            onClick={() => handleCheckSet(i)}
                            disabled={!set.isCompleted && (!set.weight || !set.reps)}
                        >
                            <CheckCircle size={20} className={set.isCompleted ? 'stroke-[3px]' : ''} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseCard;
