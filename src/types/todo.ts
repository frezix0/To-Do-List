export interface Todo {
    id: number;
    title: string;
    time?: string;
    priority: 'low' | 'medium' | 'high';
    difficulty: 'easy' | 'medium' | 'hard';
    description?: string;
    completed: boolean;
    createdAt: string;
    date: string;
}

export type ViewType = 'today' | 'calendar'
export type FilterType = 'all' | 'pending' | 'completed'

export interface Stats {
    total: number
    completed: number
    pending: number
    storage: number
}