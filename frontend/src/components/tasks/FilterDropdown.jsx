export default function FilterDropdown({ currentStatus, onStatusChange }) {
    return (
      <select
        value={currentStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border rounded-md px-3 py-2"
      >
        <option value="all">All Tasks</option>
        <option value="to_do">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    );
  }