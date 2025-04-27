import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';
import FilterDropdown from './FilterDropdown';
import { 
  MagnifyingGlassIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      const params = {
        status: filterStatus,
        search: searchQuery
      };
      const res = await api.get('/tasks', { params });
      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, searchQuery, filterStatus]);

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTask = await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task =>
        task._id === taskId ? updatedTask.data : task
      ));
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Tasks</h1>
        <div className="flex gap-4">
          <div className="flex gap-4 mb-4">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks by title..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <FilterDropdown
              currentStatus={filterStatus}
              onStatusChange={setFilterStatus}
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Add New Task
          </button>
        </div>
      </div>

      {showForm && (
        <TaskForm
          onClose={() => {
            setShowForm(false);
            setEditTask(null);
          }}
          onSuccess={() => {
            fetchTasks();
            setShowForm(false);
          }}
          task={editTask}
        />
      )}

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500">No tasks found</div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={() => {
                setEditTask(task);
                setShowForm(true);
              }}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
