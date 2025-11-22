import { X, Dumbbell, Calendar, Utensils, Info } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, currentWorkoutId, onSelectWorkout }) => {
    const sidebarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '280px',
        backgroundColor: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        zIndex: 100,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    };

    // Desktop override (simplistic for now, can be improved with media queries in CSS)
    // For now, we'll rely on the parent to control visibility or add a class for desktop

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        zIndex: 90
                    }}
                />
            )}

            <aside style={sidebarStyle} className={isOpen ? 'open' : ''}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}>Ironwarg</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                        Workouts
                    </div>

                    <button
                        className={`btn-nav ${currentWorkoutId === 'A1_Upper1_PeitoOmbros' ? 'active' : ''}`}
                        onClick={() => onSelectWorkout('A1_Upper1_PeitoOmbros')}
                        style={{
                            textAlign: 'left',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            backgroundColor: currentWorkoutId === 'A1_Upper1_PeitoOmbros' ? 'var(--color-primary)' : 'transparent',
                            color: 'white',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                    >
                        <Dumbbell size={18} />
                        A1 - Upper (Peito/Ombros)
                    </button>

                    <button
                        className={`btn-nav ${currentWorkoutId === 'B1_Lower1' ? 'active' : ''}`}
                        onClick={() => onSelectWorkout('B1_Lower1')}
                        style={{
                            textAlign: 'left',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            backgroundColor: currentWorkoutId === 'B1_Lower1' ? 'var(--color-primary)' : 'transparent',
                            color: 'white',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                    >
                        <Dumbbell size={18} />
                        B1 - Lower 1
                    </button>

                    <button
                        className={`btn-nav ${currentWorkoutId === 'A2_Upper2_PeitoOmbros' ? 'active' : ''}`}
                        onClick={() => onSelectWorkout('A2_Upper2_PeitoOmbros')}
                        style={{
                            textAlign: 'left',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            backgroundColor: currentWorkoutId === 'A2_Upper2_PeitoOmbros' ? 'var(--color-primary)' : 'transparent',
                            color: 'white',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                    >
                        <Dumbbell size={18} />
                        A2 - Upper (Peito/Ombros)
                    </button>

                    <button
                        className={`btn-nav ${currentWorkoutId === 'B2_Lower2' ? 'active' : ''}`}
                        onClick={() => onSelectWorkout('B2_Lower2')}
                        style={{
                            textAlign: 'left',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            backgroundColor: currentWorkoutId === 'B2_Lower2' ? 'var(--color-primary)' : 'transparent',
                            color: 'white',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                    >
                        <Dumbbell size={18} />
                        B2 - Lower 2
                    </button>
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface-light)', borderRadius: '8px' }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Athlete</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Joao Vitor Lima</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Team Ironwarg</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
