import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Layout/Sidebar';
import WorkoutView from './components/Workout/WorkoutView';
import DashboardView from './components/Dashboard/DashboardView';
import WorkoutSelectionView from './components/Workout/WorkoutSelectionView';
import { WORKOUT_DATA } from './data/workoutData';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('selection'); // 'selection', 'dashboard', or 'workout'
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSelectWorkout = (workoutId) => {
    setCurrentWorkoutId(workoutId);
    setCurrentView('workout');
    setIsSidebarOpen(false);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen relative bg-[var(--color-bg)] text-white font-[family-name:var(--font-primary)]">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 p-4 bg-[var(--color-bg)] z-50 flex items-center border-b border-[var(--color-border)] h-[60px]">
        <button onClick={toggleSidebar} className="bg-none border-none text-white">
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl text-[var(--color-primary)] font-[family-name:var(--font-display)] tracking-wide">
          Ironwarg Protocol
        </h1>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentWorkoutId={currentView === 'workout' ? currentWorkoutId : null}
        currentView={currentView}
        onSelectWorkout={handleSelectWorkout}
        onNavigate={handleNavigate}
      />

      <main className="pt-[60px] lg:pt-0 lg:pl-[280px] min-h-screen">
        <div className="max-w-[800px] mx-auto p-4">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'selection' && <WorkoutSelectionView onSelectWorkout={handleSelectWorkout} />}
          {currentView === 'workout' && currentWorkoutId && (
            <WorkoutView
              workoutId={currentWorkoutId}
              data={WORKOUT_DATA}
              onBack={() => handleNavigate('selection')}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
