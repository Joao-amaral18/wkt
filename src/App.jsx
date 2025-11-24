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
    <div className="flex min-h-screen relative">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 p-4 bg-[var(--color-bg)] z-50 flex items-center border-b border-[var(--color-border)] h-[60px] lg:hidden">
        <button onClick={toggleSidebar} className="bg-none border-none text-white cursor-pointer">
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-[1.2rem] text-[var(--color-primary)]">Ironwarg Protocol</h1>
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

      <main className="flex-1 p-4 mt-[60px] w-full lg:ml-0 lg:mt-0">
        <div className="max-w-[800px] mx-auto px-4">
          <WorkoutView workoutId={currentWorkoutId} data={WORKOUT_DATA} />
        </div>
      </main>
    </div>
  );
}

export default App;
