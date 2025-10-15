import { ref, computed, watch } from 'vue'
import type { Todo, FilterType } from '@/types/todo'
import { saveTodos, loadTodos, clearTodos, getStorageSize } from '@/utils/storageUtils'
import { formatDate } from '@/utils/dateUtils'

export const useTodoStorage = () => {
    const todos = ref<Todo[]>([])
    const currentFilter = ref<FilterType>('all')
    const editingId = ref<number | null>(null)

    // Load todos from localStorage on initialization
    const initTodos = () => {
        todos.value = loadTodos()
    }

    // Watch for changes in todos and save to localStorage
    watch(todos, (newTodos) => {
        saveTodos(newTodos)
    }, { deep: true })

    // CRUD Operations
    const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'date' | 'completed'>) => {
        const newTodo: Todo = {
            ...todo,
            id: Date.now(),
            completed: false,
            createdAt: new Date().toISOString(),
            date: formatDate(new Date())
        }
        todos.value.push(newTodo)
        return newTodo
    }

    const updateTodo = (id: number, updates: Partial<Todo>) => {
        const idx = todos.value.findIndex(t => t.id === id)
        if (idx !== -1) {
            todos.value[idx] = { ...todos.value[idx], ...updates }
        }
    }

    const deleteTodo = (id: number) => {
        todos.value = todos.value.filter(t => t.id !== id)
    }

    const toggleComplete = (id: number) => {
        const todo = todos.value.find(t => t.id === id)
        if (todo) 
            todo.completed = !todo.completed
    }

    const clearAll = () => {
        if (confirm('Are you sure you want to clear all todos?')) {
            todos.value = []
            clearTodos()
            return true
        }
        return false
    }

    // Stats
    const stats = computed(() => ({
        total: todos.value.length,
        completed: todos.value.filter(t => t.completed).length,
        pending: todos.value.filter(t => !t.completed).length,
        storage: getStorageSize()
    }))

    // Filtering
    const filteredTodos = computed(() => {
        switch (currentFilter.value) {
            case 'pending':
                return todos.value.filter(t => !t.completed)
            case 'completed':
                return todos.value.filter(t => t.completed)
            default:
                return todos.value
        }
    })

    return {
        todos,
        currentFilter,
        editingId,
        initTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        clearAll,
        stats,
        filteredTodos
    }
}