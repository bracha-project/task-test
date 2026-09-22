import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  isUpdating: boolean;
  onToggle: (isCompleted: boolean) => void;
}

function TaskItem({
  task,
  isUpdating,
  onToggle,
}: TaskItemProps) {
  return (
    <li
      className={`task-item ${
        task.isCompleted ? 'completed' : ''
      }`}
    >
      <label>
        <input
          type="checkbox"
          checked={task.isCompleted}
          disabled={isUpdating}
          onChange={(event) =>
            onToggle(event.target.checked)
          }
        />

        <span className="task-title">
          {task.title}
        </span>
      </label>
    </li>
  );
}

export default TaskItem;