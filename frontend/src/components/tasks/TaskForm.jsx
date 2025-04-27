import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import toast from 'react-hot-toast';
import {
    XMarkIcon,
    CalendarDaysIcon,
    DocumentTextIcon,
    ListBulletIcon
} from '@heroicons/react/24/outline';

export default function TaskForm({ onClose, onSuccess, task }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'to_do',
        dueDate: format(new Date(), 'yyyy-MM-dd')
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        if (!formData.dueDate) {
            newErrors.dueDate = 'Due date is required';
            isValid = false;
        } else if (new Date(formData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
            newErrors.dueDate = 'Due date cannot be in the past';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                status: task.status,
                dueDate: format(parseISO(task.dueDate), 'yyyy-MM-dd')
            });
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            if (task) {
                await api.put(`/tasks/${task._id}`, formData);
                toast.success('Task updated successfully');
            } else {
                await api.post('/tasks', formData);
                toast.success('Task created successfully');
            }
            onSuccess();
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Operation failed');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {task ? 'Edit Task' : 'New Task'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            required
                            className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-indigo-500`}
                            value={formData.title}
                            onChange={(e) => {
                                setFormData({ ...formData, title: e.target.value });
                                setErrors({ ...errors, title: '' });
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'
                                } focus:ring-2 focus:ring-indigo-500`}
                            rows="3"
                            value={formData.description}
                            onChange={(e) => {
                                setFormData({ ...formData, description: e.target.value });
                                setErrors({ ...errors, description: '' });
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                className={`w-full px-3 py-2 border rounded-md ${errors.status ? 'border-red-500' : 'border-gray-300'
                                    } focus:ring-2 focus:ring-indigo-500`}
                                value={formData.status}
                                onChange={(e) => {
                                    setFormData({ ...formData, status: e.target.value });
                                    setErrors({ ...errors, status: '' });
                                }}
                            >
                                <option value="to_do">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Due Date</label>
                            <input
                                type="date"
                                required
                                className={`w-full px-3 py-2 border rounded-md ${errors.dueDate ? 'border-red-500' : 'border-gray-300'
                                    } focus:ring-2 focus:ring-indigo-500`}
                                value={formData.dueDate}
                                onChange={(e) => {
                                    setFormData({ ...formData, dueDate: e.target.value });
                                    setErrors({ ...errors, dueDate: '' });
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            {task ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}