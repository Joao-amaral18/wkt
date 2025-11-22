import { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';
import RestOverlay from './RestOverlay';
import { CheckCircle, Trophy, ArrowLeft } from 'lucide-react';

const WorkoutView = ({ workoutId, data }) => {
    const exercises = data.workouts[workoutId];
    const title = workoutId.replace(/_/g, ' ');

    const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
    const [completedExercises, setCompletedExercises] = useState([]);

    // Timer State
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(90);
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        let interval;
        if (isTimerRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerRunning(false);
            // Play sound?
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timeLeft]);

    const handleSetComplete = () => {
        setTimeLeft(90);
        setIsTimerRunning(true);
    };

    const handleExerciseComplete = (index) => {
        if (!completedExercises.includes(index)) {
            setCompletedExercises(prev => [...prev, index]);
        }

        // Move to next exercise if available
        if (index < exercises.length - 1) {
            setActiveExerciseIndex(index + 1);
        }
    };

    const handleFinishWorkout = () => {
        setShowSummary(true);
    };

    const progress = Math.round((completedExercises.length / exercises.length) * 100);

    if (showSummary) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'radial-gradient(circle at center, #1a0505 0%, #000000 100%)'
            }}>
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    padding: '3rem 2rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                }}>
                    <Trophy size={80} color="var(--color-primary)" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(184, 29, 36, 0.5))' }} />
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>Workout<br />Complete</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                        {title} session crushed.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        marginBottom: '2.5rem'
                    }}>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Duration</div>
                            <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>45m</div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Volume</div>
                            <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>4.2t</div>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary"
                        style={{ width: '100%' }}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: '8rem' }}>
            {/* Progress Bar */}
            <div style={{
                position: 'fixed',
                top: '0',
                left: 0,
                right: 0,
                height: '4px',
                background: 'rgba(255,255,255,0.05)',
                zIndex: 40,
                backdropFilter: 'blur(4px)'
            }}>
                <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, var(--color-primary) 0%, #ff4d55 100%)',
                    boxShadow: '0 0 10px rgba(184, 29, 36, 0.5)',
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
            </div>

            <header style={{ marginBottom: '3rem', marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <button className="btn-outline" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.05)' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ color: 'var(--color-primary)', fontWeight: '600', letterSpacing: '1px', fontSize: '0.9rem' }}>
                        {data.training_split.frequency.split(' ')[0]}
                    </span>
                </div>
                <h2 style={{
                    fontSize: '3rem',
                    color: 'white',
                    marginBottom: '0.5rem',
                    lineHeight: '0.9',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    {title}
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                    {data.training_split.frequency}
                </p>
            </header>

            <section style={{ marginBottom: '2rem' }}>
                <div style={{
                    background: 'linear-gradient(145deg, rgba(184, 29, 36, 0.1) 0%, rgba(0,0,0,0) 100%)',
                    border: '1px solid rgba(184, 29, 36, 0.2)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    marginBottom: '3rem',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.75rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>🔥</span> Warmup Protocol
                    </h3>
                    <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>
                        {data.progression_rules.warmup}
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {exercises.map((exerciseString, index) => (
                        <ExerciseCard
                            key={`${workoutId}-${index}`}
                            exerciseString={exerciseString}
                            index={index}
                            isActive={index === activeExerciseIndex}
                            onComplete={() => handleExerciseComplete(index)}
                            onSetComplete={handleSetComplete}
                        />
                    ))}
                </div>

                {completedExercises.length === exercises.length && (
                    <div style={{
                        position: 'fixed',
                        bottom: '2rem',
                        left: '1rem',
                        right: '1rem',
                        zIndex: 50
                    }}>
                        <button
                            className="btn-primary"
                            onClick={handleFinishWorkout}
                            style={{
                                width: '100%',
                                padding: '1.2rem',
                                fontSize: '1.4rem',
                                boxShadow: '0 10px 30px rgba(184, 29, 36, 0.4)'
                            }}
                        >
                            Finish Workout
                        </button>
                    </div>
                )}
            </section>

            <RestOverlay
                isVisible={isTimerRunning}
                timeLeft={timeLeft}
                onAdd30s={() => setTimeLeft(prev => prev + 30)}
                onSkip={() => setIsTimerRunning(false)}
            />
        </div>
    );
};

export default WorkoutView;
