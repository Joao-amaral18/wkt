import { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';
import RestOverlay from './RestOverlay';
import { Trophy, ArrowLeft, Flame } from 'lucide-react';

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
            <div className="text-center p-8 min-h-screen flex flex-col justify-center items-center bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.15)_0%,transparent_70%)]">
                <div className="bg-zinc-900/50 backdrop-blur-xl p-12 rounded-3xl border border-white/5 w-full max-w-[400px]">
                    <Trophy size={64} className="text-[var(--color-primary)] mb-6 mx-auto drop-shadow-[0_0_15px_rgba(225,29,72,0.4)]" />
                    <h2 className="text-4xl mb-2 leading-tight">Workout<br />Complete</h2>
                    <p className="text-[var(--color-text-muted)] mb-10 text-lg">
                        {title} session crushed.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-white/5 p-4 rounded-2xl">
                            <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Duration</div>
                            <div className="text-2xl font-[family-name:var(--font-display)]">45m</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl">
                            <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Volume</div>
                            <div className="text-2xl font-[family-name:var(--font-display)]">4.2t</div>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary w-full"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-32">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-40">
                <div
                    className="h-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(225,29,72,0.5)] transition-[width] duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <header className="mb-10 mt-6">
                <div className="flex items-center gap-4 mb-6">
                    <button className="p-2 rounded-full hover:bg-white/5 transition-colors text-[var(--color-text-muted)] hover:text-white">
                        <ArrowLeft size={20} />
                    </button>
                    <span className="text-[var(--color-primary)] font-medium tracking-wider text-xs uppercase bg-[rgba(225,29,72,0.1)] px-3 py-1 rounded-full">
                        {data.training_split.frequency.split(' ')[0]}
                    </span>
                </div>
                <h2 className="text-4xl text-white mb-2 leading-none tracking-tight">
                    {title}
                </h2>
                <p className="text-[var(--color-text-muted)] text-lg">
                    {data.training_split.frequency}
                </p>
            </header>

            <section className="mb-8">
                <div className="flex items-start gap-4 mb-12 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="p-2 bg-[rgba(225,29,72,0.1)] rounded-full text-[var(--color-primary)]">
                        <Flame size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-medium mb-1">Warmup Protocol</h3>
                        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                            {data.progression_rules.warmup}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col">
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
                    <div className="fixed bottom-8 left-4 right-4 z-50 max-w-[800px] mx-auto">
                        <button
                            className="btn-primary w-full py-4 text-xl shadow-[0_10px_40px_rgba(225,29,72,0.3)]"
                            onClick={handleFinishWorkout}
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
