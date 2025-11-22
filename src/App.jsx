import { useState } from 'react';
import { WORKOUT_DATA } from './data/workoutData';
import Sidebar from './components/Layout/Sidebar';
import WorkoutView from './components/Workout/WorkoutView';
import { Menu } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentWorkoutId, setCurrentWorkoutId] = useState(Object.keys(WORKOUT_DATA.workouts)[0]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      {/* Mobile Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1rem',
        background: 'var(--color-bg)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--color-border)',
        height: '60px'
      }} className="mobile-header lg:hidden">
        <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: 'white' }}>
          <Menu size={24} />
        </button>
        <h1 style={{ marginLeft: '1rem', fontSize: '1.2rem', color: 'var(--color-primary)' }}>Ironwarg Protocol</h1>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentWorkoutId={currentWorkoutId}
        onSelectWorkout={(id) => {
          setCurrentWorkoutId(id);
          setIsSidebarOpen(false);
        }}
      />

      <main style={{
        flex: 1,
        padding: '1rem',
        marginTop: '60px',
        marginLeft: isSidebarOpen ? '0' : '0', // Adjust based on responsive needs
        width: '100%'
      }}>
        <div className="container">
          <WorkoutView workoutId={currentWorkoutId} data={WORKOUT_DATA} />
        </div>
      </main>
    </div>
  );
}

export default App;
