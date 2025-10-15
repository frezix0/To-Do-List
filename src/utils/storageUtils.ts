import type { Todo } from '@/types/todo';

const STORAGE_KEY = 'todos';

export const saveTodos = (todos: Todo[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.error('Error saving todos to localStorage:', error);
    }
}

export const loadTodos = (): Todo[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading todos from localStorage:', error);
        return [];
    }
}

export const clearTodos = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing todos from localStorage:', error);
    }
}

export const getStorageSize = (): number => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? Math.round(stored.length / 1024 * 100) / 100 : 0;
    } catch {
        return 0;
    }
}