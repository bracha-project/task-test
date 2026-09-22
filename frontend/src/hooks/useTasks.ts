import axios from 'axios';
import {
    useEffect,
    useState,
} from 'react';

import {
    getTasks,
    createTask as createTaskRequest,
    updateTask,
} from '../services/taskService';

import type { Task } from '../types/task';

interface UseTasksResult {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    retry: () => void;
    toggleTask: (
        id: number,
        isCompleted: boolean
    ) => Promise<void>;
    createTask: (
        title: string
    ) => Promise<void>;
    updatingTaskId: number | null;
}

export function useTasks(): UseTasksResult {
    const [tasks, setTasks] =
        useState<Task[]>([]);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [retryCount, setRetryCount] =
        useState(0);

    const [updatingTaskId, setUpdatingTaskId] =
        useState<number | null>(null);

    useEffect(() => {
        const controller =
            new AbortController();

        const fetchTasks = async () => {
            try {
                const data = await getTasks(
                    controller.signal
                );

                setTasks(data);
                setError(null);
            } catch (error) {
                if (axios.isCancel(error)) {
                    return;
                }

                setError(
                    'Failed to load tasks'
                );
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        void fetchTasks();

        return () => {
            controller.abort();
        };
    }, [retryCount]);

    const retry = () => {
        setError(null);
        setIsLoading(true);

        setRetryCount(
            (count) => count + 1
        );
    };

    const toggleTask = async (
        id: number,
        isCompleted: boolean
    ) => {
        setUpdatingTaskId(id);

        try {
            const updatedTask =
                await updateTask(
                    id,
                    isCompleted
                );

            setTasks(
                (currentTasks) =>
                    currentTasks.map(
                        (task) =>
                            task.id ===
                            updatedTask.id
                                ? updatedTask
                                : task
                    )
            );
        } finally {
            setUpdatingTaskId(null);
        }
    };

    const createTask = async (
        title: string
    ) => {
        const newTask =
            await createTaskRequest(title);

        setTasks(
            (currentTasks) => [
                ...currentTasks,
                newTask,
            ]
        );
    };

    return {
        tasks,
        isLoading,
        error,
        retry,
        toggleTask,
        createTask,
        updatingTaskId,
    };
}