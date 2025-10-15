<template>
  <div class="app-container">
    <Sidebar
      :current-view="currentView"
      @view-change="currentView = $event"
      @export="handleExport"
      @clear-all="handleClearAll"
    />

    <main class="main-content">
      <!-- TODAY VIEW -->
      <template v-if="currentView === 'today'">
        <header class="main-header">
          <div>
            <h1>Today Activities</h1>
            <p>Organize your day efficiently</p>
          </div>
          <button class="add-activity-btn" @click="isFormOpen = true">
            <span>+</span>
            Add Task
          </button>
        </header>

        <Stats :stats="stats" />

        <TodoForm
          :is-open="isFormOpen"
          :editing-todo="editingTodo"
          @submit="handleTodoSubmit"
          @cancel="handleFormCancel"
        />

        <TodoList
          :todos="filteredTodos"
          :current-filter="currentFilter"
          @filter-change="currentFilter = $event"
          @toggle-complete="toggleComplete"
          @edit="startEditTodo"
          @delete="deleteTodo"
        />
      </template>

      <!-- CALENDAR VIEW -->
      <template v-else-if="currentView === 'calendar'">
        <Calendar :todos="todos" />
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Todo, ViewType } from '@/types/todo'
import { useTodoStorage } from '@/composables/useTodoStorage'

// Components
import Sidebar from '@/components/Sidebar.vue'
import Stats from '@/components/Stats.vue'
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
import Calendar from '@/components/Calendar.vue'

// State
const currentView = ref<ViewType>('today')
const isFormOpen = ref(false)
const editingTodo = ref<Todo | null>(null)

// Composables
const {
  todos,
  currentFilter,
  initTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
  clearAll,
  stats,
  filteredTodos
} = useTodoStorage()

// Initialize
onMounted(() => {
  initTodos()
})

// Form Handlers
const handleTodoSubmit = (formData: Omit<Todo, 'id' | 'createdAt' | 'date' | 'completed'>) => {
  if (editingTodo.value) {
    // Update existing todo
    updateTodo(editingTodo.value.id, {
      ...formData,
      date: new Date().toISOString().slice(0, 10)
    })
    editingTodo.value = null
  } else {
    // Add new todo
    addTodo(formData)
  }
  isFormOpen.value = false
}

const handleFormCancel = () => {
  isFormOpen.value = false
  editingTodo.value = null
}

const startEditTodo = (todo: Todo) => {
  editingTodo.value = todo
  isFormOpen.value = true
}

// Export Handler
const handleExport = () => {
  try {
    const dataStr = JSON.stringify(todos.value, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `todos-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    alert('Data exported successfully!')
  } catch (error) {
    console.error('Error exporting todos:', error)
    alert('Error exporting data. Please try again.')
  }
}

// Clear All Handler
const handleClearAll = () => {
  clearAll()
}
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 40px;
  background: white;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.main-header h1 {
  color: #333;
  font-size: 2.2em;
  font-weight: 600;
  margin-bottom: 5px;
}

.main-header p {
  color: #666;
  font-size: 1em;
}

.add-activity-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 0.95em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  font-weight: 500;
}

.add-activity-btn:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a5acd 100%);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
    margin: 10px;
  }

  .main-content {
    padding: 20px;
  }
}
</style>