import { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDownIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const [showDetails, setShowDetails] = useState(false);
  const statusColors = {
    'To Do': 'bg-gray-200',
    'In Progress': 'bg-blue-200',
    'Done': 'bg-green-200'
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium text-lg">{task.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-1 rounded-full text-sm ${statusColors[task.status]}`}>
              {task.status}
            </span>
            <span className="text-sm text-gray-500">
              Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className="bg-white border rounded-md px-2 py-1 text-sm"
          >
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronDownIcon className={`h-5 w-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-gray-600">{task.description}</p>
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={onEdit}
              className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}