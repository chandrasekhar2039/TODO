export interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
