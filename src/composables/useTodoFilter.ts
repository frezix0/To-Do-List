import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { Todo, FilterType } from '@/types/todo'

export const useTodoFilter = (todos: Ref<Todo[]>) => {
    const currentFilter = ref<FilterType>('all')

    const filteredTodos = computed(() => {
        switch (currentFilter.value) {
            case 'pending':
                return todos.value.filter(todo => !todo.completed)
            case 'completed':
                return todos.value.filter(todo => todo.completed)
            default:
                return todos.value
        }
    })

    return {
        currentFilter,
        filteredTodos
    }
}