import { X, Plus } from 'lucide-react';

const RestOverlay = ({ isVisible, timeLeft, onAdd30s, onSkip }) => {
    if (!isVisible) return null;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-screen bg-black/95 z-[100] flex flex-col items-center justify-center text-white backdrop-blur-xl">
            <div className="mb-12 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(184,29,36,0.2)_0%,transparent_70%)] -z-10 rounded-full" />

                <h2 className="text-2xl text-[var(--color-text-muted)] mb-4 uppercase tracking-[4px] font-medium">
                    Resting
                </h2>
                <div className="text-[8rem] font-bold tabular-nums leading-none text-white drop-shadow-[0_0_30px_rgba(184,29,36,0.5)] font-[family-name:var(--font-display)]">
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="flex gap-6">
                <button
                    onClick={onAdd30s}
                    className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white text-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                    <Plus size={24} />
                    +30s
                </button>

                <button
                    onClick={onSkip}
                    className="btn-primary flex items-center gap-2 px-8 py-4 rounded-full text-lg shadow-[0_0_20px_rgba(184,29,36,0.4)]"
                >
                    Skip Rest
                    <X size={24} />
                </button>
            </div>
        </div>
    );
};

export default RestOverlay;
