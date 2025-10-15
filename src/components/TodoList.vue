<template>
    <section class="todo-section">
        <div class="todo-header">
            <h2 class="section-title">Task(s)</h2>
            <div class="todo-filters">
                <button
                    v-for="filter in filters"
                    :key="filter"
                    class="filter-tab"
                    :class="[{ active: currentFilter === filter }, filter]"
                    @click="$emit('filter-change', filter)"
                >
                    {{ capitalize(filter) }}
                </button>
            </div>
        </div>

        <div class="todo-list">
            <div v-if="todos.length === 0" class="empty-state">
                <h3>No task yet</h3>
                <p>Add your first task to get started!</p>
            </div>

            <TodoItem
                v-for="todo in todos"
                :key="todo.id"
                :todo="todo"
                @toggle="$emit('toggle-complete', todo.id)"
                @edit="$emit('edit', todo)"
                @delete="$emit('delete', todo.id)"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Todo, FilterType } from '@/types/todo'
import { capitalize } from '@/utils/dateUtils'
import TodoItem from './TodoItem.vue'

const filters: FilterType[] = ['all', 'pending','completed']
defineProps<{
    todos: Todo[]
    currentFilter: FilterType
}>()

defineEmits<{
    (e: 'filter-change', filter: FilterType): void
    (e: 'toggle-complete', id: number): void
    (e: 'edit', todo: Todo): void
    (e: 'delete', id: number): void
}>()
</script>