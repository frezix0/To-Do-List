<template>
    <div class="todo-item" :class="{ completed: todo.completed }">
        <div class="todo-content">
            <div class="todo-item-header">
                <div
                    class="todo-checkbox"
                    :class="{ checked: todo.completed }"
                    @click="$emit('toggle')"
                ></div>
                <div class="todo-text">{{ todo.title }}</div>
                <div class="todo-meta">
                    <span class="priority-badge" :class="todo.priority">{{ capitalize(todo.priority) }}</span>
                    <span class="difficult-badge" :class="todo.difficulty">{{ capitalize(todo.difficulty) }}</span>
                    <span v-if="todo.time">⏰ {{ todo.time }}</span>
                </div>
                <div class="todo-actions">
                    <button class="action-btn edit-btn" @click="$emit('edit')">✏️</button>
                    <button class="action-btn delete-btn" @click="$emit('delete')">🗑️</button>
                </div>
            </div>
            <div v-if="todo.description" class="todo-details">
                <div class="todo-description">{{ todo.description }}</div>
            </div>
            <div class="todo-timestamp">
                Created: {{ formatDateTime(todo.createdAt) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Todo } from '@/types/todo'
import { capitalize, formatDateTime } from '@/utils/dateUtils'

defineProps<{
    todo: Todo
}>()

defineEmits<{
    (e: 'toggle'): void
    (e: 'edit'): void
    (e: 'delete'): void
}>()
</script>