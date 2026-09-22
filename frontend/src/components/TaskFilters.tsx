import type { TaskFilter } from '../types/task';

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

function TaskFilters({
  filter,
  onFilterChange,
}: TaskFiltersProps) {
  return (
    <div className="tasks-filters">
      <button
        type="button"
        className={filter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>

      <button
        type="button"
        className={filter === 'open' ? 'active' : ''}
        onClick={() => onFilterChange('open')}
      >
        Open
      </button>

      <button
        type="button"
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>
    </div>
  );
}

export default TaskFilters;