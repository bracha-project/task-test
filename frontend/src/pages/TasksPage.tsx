import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import type { TaskFilter } from '../types/task';
import DailyGoal from '../components/DailyGoal';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../components/CreateTaskForm';
import './TasksPage.scss';

function TasksPage() {
    const { user } = useAuth();

    const {
        tasks,
        isLoading,
        error,
        retry,
        toggleTask,
        createTask,
        updatingTaskId
    } = useTasks();

    const [filter, setFilter] = useState<TaskFilter>('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const dailyGoal = 5;

    const completedTasks = tasks.filter(
        (task) => task.isCompleted
    ).length;

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'open') {
            return !task.isCompleted;
        }

        if (filter === 'completed') {
            return task.isCompleted;
        }

        return true;
    });

    if (isLoading) {
        return (
            <div className="tasks-page">
                <div className="tasks-container">
                    <div className="tasks-card tasks-loading">
                        Loading tasks...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="tasks-page">
                <div className="tasks-container">
                    <div className="tasks-card tasks-error">
                        <p>{error}</p>

                        <button
                            type="button"
                            className="retry-button"
                            onClick={retry}
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="tasks-page">
                <div className="tasks-container">
                    <div className="tasks-card tasks-empty">
                        No tasks found.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="tasks-page">
            <div className="tasks-container">
                <header className="tasks-header">
                    <h1 className="tasks-title">
                        Tasks
                    </h1>

                    <div className="tasks-user">
                        Hello, {user?.username}
                    </div>
                </header>

                <main className="tasks-card">
                    <DailyGoal
                        completedTasks={completedTasks}
                        dailyGoal={dailyGoal}
                    />
                    <div className="add-task-container">
                        <button
                            type="button"
                            className="add-task-button"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            + Add Task
                        </button>
                    </div>
                    <TaskFilters
                        filter={filter}
                        onFilterChange={setFilter}
                    />

                    <TaskList
                        tasks={filteredTasks}
                        updatingTaskId={updatingTaskId}
                        onToggle={toggleTask}
                    />
                    {isCreateModalOpen && (
                        <div className="create-task-modal-overlay">
                            <div className="create-task-modal">
                                <div className="create-task-modal-header">
                                    <h2>Add New Task</h2>

                                    <button
                                        type="button"
                                        className="create-task-modal-close"
                                        onClick={() =>
                                            setIsCreateModalOpen(false)
                                        }
                                    >
                                        ×
                                    </button>
                                </div>

                                <CreateTaskForm
                                    onCreate={createTask}
                                    onClose={() =>
                                        setIsCreateModalOpen(false)
                                    }
                                />
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default TasksPage;