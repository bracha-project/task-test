import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  updatingTaskId: number | null;
  onToggle: (
    id: number,
    isCompleted: boolean
  ) => Promise<void>;
}

function TaskList({
  tasks,
  updatingTaskId,
  onToggle,
}: TaskListProps) {
  return (
    <ul className="tasks-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isUpdating={updatingTaskId === task.id}
          onToggle={(isCompleted) =>
            onToggle(task.id, isCompleted)
          }
        />
      ))}
    </ul>
  );
}

export default TaskList;