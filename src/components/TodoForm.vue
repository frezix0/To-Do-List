<template>
    <div class="todo-input-container" :class="{ show: isOpen }">
        <div class="todo-input-row">
            <div class="todo-input-group">
                <label>Title: <span class="required">*</span></label>
                <input
                    v-model="form.title"
                    class="todo-input"
                    maxlength="100"
                    placeholder="Enter task title"
                    required
                />
            </div>
            <div class="todo-input-group">
                <label>Time: <span class="optional">(Optional)</span></label>
                <input
                    v-model="form.time"
                    type="time"
                    class="time-input"
                />
            </div>
        </div>

        <div class="todo-input-row">
            <div class="todo-input-group">
                <label>Priority: <span class="required">*</span></label>
                <select v-model="form.priority" class="priority-select" required>
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div class="todo-input-group">
                    <label>Difficulty: <span class="required">*</span></label>
                    <select v-model="form.difficulty" class="difficulty-select" required>
                        <option value="">Select Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
        </div>
        <div class="todo-input-group">
            <label>Description: <span class="optional">(Optional)</span></label>
            <textarea
                v-model="form.description"
                class="description-input"
                placeholder="Enter task description"
            ></textarea>
        </div>

        <div class="form-buttons">
            <button class="cancel-btn" @click="handleCancel">Cancel</button>
            <button class="add-todo-btn" @click="handleSubmit" :disabled="!canAdd">
                {{ isEditing ? 'Update' : 'Add' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Todo } from '@/types/todo'

interface Props {
    isOpen: boolean
    editingTodo?: Todo | null
}

interface Emits {
    (e: 'submit', data: Omit<Todo, 'id' | 'createdAt' | 'date' | 'completed'>): void
    (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
    editingTodo: null
})

const emit = defineEmits<Emits>()

const form = ref({
    title: '',
    time: '',
    priority: '' as any,
    difficulty: '' as any,
    description: ''
})

const isEditing = computed(() => !!props.editingTodo)

const canAdd = computed(() =>
    form.value.title && form.value.priority && form.value.difficulty
)

// Populate form when editing
watch(() => props.editingTodo, (todo) => {
    if (todo) {
        form.value = {
            title: todo.title,
            time: todo.time || '',
            priority: todo.priority,
            difficulty: todo.difficulty,
            description: todo.description || ''
        }
    }
}, { immediate: true })

const handleSubmit = () => {
    if (!canAdd.value) return
        emit('submit', {
            title: form.value.title,
            time: form.value.time,
            priority: form.value.priority,
            difficulty: form.value.difficulty,
            description: form.value.description
    })
    resetForm()
}

const handleCancel = () => {
    resetForm()
    emit('cancel')
}

const resetForm = () => {
    form.value = { title: '', time: '', priority: '', difficulty: '', description: '' }
}
</script>