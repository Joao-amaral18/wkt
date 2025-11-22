import { useState, useEffect } from 'react';
import { CheckCircle, Save, History } from 'lucide-react';
import { supabase, getExerciseHistory } from '../../lib/supabase';

const ExerciseCard = ({ exerciseString, index, isActive, onComplete, onSetComplete }) => {
    // Parse exercise string
    // Format: "Name – SetsxReps (Notes)"
    const [name, rest] = exerciseString.split(' – ');
    const [setsReps, notes] = rest ? rest.split(' (') : ['', ''];
    const cleanNotes = notes ? notes.replace(')', '') : '';

    // Extract number of sets (e.g., "3x4-6" -> 3)
    // Handle both 'x' and '×'
    const numSets = parseInt(setsReps.split(/[x×]/)[0]) || 1;

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
            const data = await getExerciseHistory(name);
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
            }
        };
        fetchHistory();
    }, [name, numSets]);

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
        if (set.isCompleted) return;

        // Save to DB
        try {
            const { error } = await supabase
                .from('workout_logs')
                .insert([
                    {
                        exercise_name: name,
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

            // Trigger global timer and progress
            onSetComplete();

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
        <div className={`card ${isActive ? 'active-card' : ''}`} style={{
            opacity: isActive ? 1 : 0.5,
            transform: isActive ? 'scale(1.02)' : 'scale(1)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            borderLeft: isActive ? '4px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.05)',
            pointerEvents: isActive ? 'auto' : 'none',
            marginBottom: '1.5rem',
            background: isActive ? 'linear-gradient(145deg, rgba(30,30,30,0.9) 0%, rgba(20,20,20,0.95) 100%)' : 'rgba(18,18,18,0.6)',
            boxShadow: isActive ? '0 8px 32px rgba(0,0,0,0.5)' : 'none'
        }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                    fontSize: '1.4rem',
                    marginBottom: '0.5rem',
                    color: isActive ? 'white' : 'var(--color-text-muted)',
                    transition: 'color 0.3s'
                }}>
                    {name}
                </h4>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '1rem', color: 'var(--color-text-muted)' }}>
                    <span style={{
                        color: 'var(--color-primary)',
                        fontWeight: 'bold',
                        background: 'rgba(184, 29, 36, 0.1)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '1px'
                    }}>
                        {setsReps}
                    </span>
                </div>
                {cleanNotes && (
                    <div style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        marginTop: '0.75rem',
                        fontStyle: 'italic',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ opacity: 0.7 }}>💡</span> {cleanNotes}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sets.map((set, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        opacity: set.isCompleted ? 0.5 : 1,
                        transition: 'opacity 0.3s'
                    }}>
                        <span style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-muted)',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '50%'
                        }}>
                            {i + 1}
                        </span>

                        {/* Weight Input */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    step="0.5"
                                    placeholder={set.prevWeight ? `${set.prevWeight}` : '-'}
                                    className="input-field"
                                    value={set.weight}
                                    onChange={(e) => handleWeightChange(i, e.target.value)}
                                    disabled={set.isCompleted}
                                    style={{
                                        paddingRight: '1.5rem',
                                        fontSize: '1.1rem',
                                        borderColor: (set.prevWeight && parseFloat(set.weight) > set.prevWeight) ? '#4ade80' : 'var(--color-border)',
                                        color: (set.prevWeight && parseFloat(set.weight) > set.prevWeight) ? '#4ade80' : 'white',
                                        fontWeight: '500'
                                    }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-muted)',
                                    fontSize: '0.75rem',
                                    pointerEvents: 'none'
                                }}>
                                    kg
                                </span>
                            </div>
                            {set.prevWeight && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px', paddingLeft: '4px' }}>
                                    Last: {set.prevWeight}
                                </span>
                            )}
                        </div>

                        {/* Reps Input */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    inputMode="numeric"
                                    placeholder={set.prevReps ? `${set.prevReps}` : '-'}
                                    className="input-field"
                                    value={set.reps || ''}
                                    onChange={(e) => handleRepsChange(i, e.target.value)}
                                    disabled={set.isCompleted}
                                    style={{
                                        paddingRight: '1.5rem',
                                        fontSize: '1.1rem',
                                        borderColor: (set.prevReps && parseInt(set.reps) > set.prevReps) ? '#4ade80' : 'var(--color-border)',
                                        color: (set.prevReps && parseInt(set.reps) > set.prevReps) ? '#4ade80' : 'white',
                                        fontWeight: '500'
                                    }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-muted)',
                                    fontSize: '0.75rem',
                                    pointerEvents: 'none'
                                }}>
                                    reps
                                </span>
                            </div>
                            {set.prevReps && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px', paddingLeft: '4px' }}>
                                    Last: {set.prevReps}
                                </span>
                            )}
                        </div>

                        <button
                            className="btn-outline"
                            onClick={() => handleCheckSet(i)}
                            disabled={set.isCompleted || !set.weight || !set.reps}
                            style={{
                                padding: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: set.isCompleted ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                                borderColor: set.isCompleted ? 'var(--color-primary)' : 'transparent',
                                color: set.isCompleted ? 'white' : 'var(--color-text-muted)',
                                borderRadius: '8px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <CheckCircle size={24} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseCard;
