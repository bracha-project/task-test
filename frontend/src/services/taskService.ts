import apiClient from './apiClient';
import type { Task } from '../types/task';

export async function getTasks(
    signal?: AbortSignal
): Promise<Task[]> {
    const response = await apiClient.get<Task[]>(
        '/tasks',
        {
            signal,
        }
    );

    return response.data;
}

export async function createTask(
    title: string
): Promise<Task> {
    const response = await apiClient.post<Task>(
        '/tasks',
        {
            title,
        });
    return response.data;
}

export async function updateTask(
    id: number,
    isCompleted: boolean
): Promise<Task> {
    const response = await apiClient.patch<Task>(
        `/tasks/${id}`,
        {
            isCompleted,
        }
    );

    return response.data;
}