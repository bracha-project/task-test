export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

export type TaskFilter = 'all' | 'open' | 'completed';