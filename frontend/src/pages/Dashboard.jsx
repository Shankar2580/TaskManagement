import TaskList from '../components/tasks/TaskList';
import Navbar from '../components/layout/Navbar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4 sm:p-6">
        <TaskList />
      </main>
    </div>
  );
}