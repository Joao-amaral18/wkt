import { Dumbbell, ArrowRight } from 'lucide-react';
import { WORKOUT_DATA } from '../../data/workoutData';

const WorkoutSelectionView = ({ onSelectWorkout }) => {
    const workouts = Object.keys(WORKOUT_DATA.workouts).map(id => ({
        id,
        label: id.replace(/_/g, ' '),
        exercises: WORKOUT_DATA.workouts[id].length
    }));

    return (
        <div className="pb-32 pt-8 px-4">
            <header className="mb-12 text-center">
                <h2 className="text-4xl text-white mb-3 font-[family-name:var(--font-display)] tracking-wide">
                    Select Workout
                </h2>
                <p className="text-[var(--color-text-muted)]">
                    Choose your session for today
                </p>
            </header>

            <div className="grid gap-4">
                {workouts.map((workout) => (
                    <button
                        key={workout.id}
                        onClick={() => onSelectWorkout(workout.id)}
                        className="group relative overflow-hidden bg-zinc-900/50 border border-white/5 p-6 rounded-2xl text-left transition-all duration-300 hover:bg-white/5 hover:border-[var(--color-primary)] hover:shadow-[0_0_30px_rgba(225,29,72,0.15)]"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[var(--color-primary)]">
                            <ArrowRight size={24} />
                        </div>

                        <div className="flex items-start gap-4 mb-2">
                            <div className="p-3 bg-white/5 rounded-xl text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                                <Dumbbell size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1 font-[family-name:var(--font-display)] tracking-wide">
                                    {workout.label}
                                </h3>
                                <p className="text-sm text-[var(--color-text-muted)]">
                                    {workout.exercises} Exercises
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WorkoutSelectionView;
