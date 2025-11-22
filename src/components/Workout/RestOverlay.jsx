import { X, Plus } from 'lucide-react';

const RestOverlay = ({ isVisible, timeLeft, onAdd30s, onSkip }) => {
    if (!isVisible) return null;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            backdropFilter: 'blur(20px)'
        }}>
            <div style={{
                marginBottom: '3rem',
                textAlign: 'center',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(184, 29, 36, 0.2) 0%, transparent 70%)',
                    zIndex: -1,
                    borderRadius: '50%'
                }} />

                <h2 style={{
                    fontSize: '1.5rem',
                    color: 'var(--color-text-muted)',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    fontWeight: '500'
                }}>
                    Resting
                </h2>
                <div style={{
                    fontSize: '8rem',
                    fontWeight: 'bold',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1,
                    color: 'white',
                    textShadow: '0 0 30px rgba(184, 29, 36, 0.5)',
                    fontFamily: 'var(--font-display)'
                }}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
                <button
                    onClick={onAdd30s}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2rem',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50px',
                        color: 'white',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <Plus size={24} />
                    +30s
                </button>

                <button
                    onClick={onSkip}
                    className="btn-primary"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        boxShadow: '0 0 20px rgba(184, 29, 36, 0.4)'
                    }}
                >
                    Skip Rest
                    <X size={24} />
                </button>
            </div>
        </div>
    );
};

export default RestOverlay;
