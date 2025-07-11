<template>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>ToDo List</h2>
      </div>
      <div class="nav-section">
        <h3>Date & Calendar</h3>
        <div
          class="nav-item"
          :class="{ active: currentView === 'today' }"
          @click="currentView = 'today'"
        >
        <span class="icon">📅</span>
          Today
        </div>
        <div
          class="nav-item"
          :class="{ active: currentView === 'calendar' }"
          @click="currentView = 'calendar'"
        >
        <span class="icon">📅</span>
          Calendar View
        </div>
      </div>
      
      <div class="nav-section">
        <h3>Data Management</h3>
        <div class="nav-item" @click="exportTodos">
          <span class="icon">📤</span>
          Export Data
        </div>
        <div class="nav-item danger" @click="clearAllTodos">
          <span class="icon">🗑️</span>
          Clear All Data
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <template v-if="currentView === 'today'">
        <header class="main-header">
          <div>
            <h1>Today Activities</h1>
            <p>Organize your day efficiently</p>
          </div>
          <button class="add-activity-btn" @click="showForm = true">
            <span>+</span>
            Add Task
          </button>
        </header>

        <!-- Stats -->
        <div class="stats-container">
          <div class="stat-card total">
            <h3>{{ stats.total }}</h3>
            <p>Total Tasks</p>
          </div>
          <div class="stat-card completed">
            <h3>{{ stats.completed }}</h3>
            <p>Completed</p>
          </div>
          <div class="stat-card pending">
            <h3>{{ stats.pending }}</h3>
            <p>Pending</p>
          </div>
          <div class="stat-card storage">
            <h3>{{ storageInfo.size }}</h3>
            <p>Storage (KB)</p>
          </div>
        </div>

        <!-- Input Form -->
        <div class="todo-input-container" :class="{ show: showForm }" v-if="showForm">
          <div class="todo-input-row">
            <div class="todo-input-group">
              <label>Title: <span class="required">*</span></label>
              <input v-model="form.title" class="todo-input" maxlength="100" required />
            </div>
            <div class="todo-input-group">
              <label>Time: <span class="optional">(Optional)</span></label>
              <input v-model="form.time" type="time" class="time-input" />
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
            <textarea v-model="form.description" class="description-input"></textarea>
          </div>
          <div class="form-buttons">
            <button class="cancel-btn" @click="resetForm">Cancel</button>
            <button class="add-todo-btn" @click="addTodo" :disabled="!canAdd">Add</button>
          </div>
        </div>

        <!-- Task List -->
        <section class="todo-section">
          <div class="todo-header">
            <h2 class="section-title">Task(s)</h2>
            <div class="todo-filters">
              <button
                class="filter-tab all"
                :class="{ active: currentFilter === 'all' }"
                @click="currentFilter = 'all'"
              >All</button>
              <button
                class="filter-tab pending"
                :class="{ active: currentFilter === 'pending' }"
                @click="currentFilter = 'pending'"
              >Pending</button>
              <button
                class="filter-tab completed"
                :class="{ active: currentFilter === 'completed' }"
                @click="currentFilter = 'completed'"
              >Completed</button>
            </div>
          </div>
          <div class="todo-list">
            <div v-if="filteredTodos.length === 0" class="empty-state">
              <h3>No tasks yet</h3>
              <p>Add your first task above to get started!</p>
            </div>
            <div
              v-for="todo in filteredTodos"
              :key="todo.id"
              class="todo-item"
              :class="{ completed: todo.completed }"
            >
              <div class="todo-content">
                <div class="todo-item-header">
                  <div
                    class="todo-checkbox"
                    :class="{ checked: todo.completed }"
                    @click="toggleComplete(todo)"
                  ></div>
                  <div class="todo-text">{{ todo.title }}</div>
                  <div class="todo-meta">
                    <span class="priority-badge" :class="todo.priority">{{ capitalize(todo.priority) }}</span>
                    <span class="difficulty-badge" :class="todo.difficulty">{{ capitalize(todo.difficulty) }}</span>
                    <span v-if="todo.time">⏰ {{ todo.time }}</span>
                  </div>
                  <div class="todo-actions">
                    <button class="action-btn edit-btn" @click="editTodo(todo)">✏️</button>
                    <button class="action-btn delete-btn" @click="deleteTodo(todo.id)">🗑️</button>
                  </div>
                </div>
                <div v-if="todo.description" class="todo-details">
                  <div class="todo-description">{{ todo.description }}</div>
                </div>
                <div style="font-size: 0.8em; color: #999; margin-left: 35px;">
                  Created: {{ todo.createdAt }}
                </div>
              </div>
            </div>
          </div>
        </section>

      <!-- Calendar View -->
      </template>
      <template v-else-if="currentView === 'calendar'">
        <div class="todo-section calendar-section">
          <div class="todo-header">
            <h2 class="section-title">Calendar View</h2>
            <div class="calendar-controls">
              <button class="calendar-nav-btn" @click="previousMonth">‹</button>
              <span id="currentMonthYear">{{ monthNames[currentMonth] }} {{ currentYear }}</span>
              <button class="calendar-nav-btn" @click="nextMonth">›</button>
            </div>
          </div>
          <div class="calendar-container">
            <div class="calendar-header">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div class="calendar-grid">
              <template v-for="(cell, idx) in calendarCells" :key="idx">
                <div :class="cell.dayClass">
                  <div class="calendar-day-number" v-if="cell.day">{{ cell.day }}</div>
                  <div class="calendar-todos" v-if="cell.day && cell.todos.length">
                    <div v-for="(todo, i) in cell.todos.slice(0, 3)" :key="todo.id" class="calendar-todo-item">{{ todo.title }}</div>
                    <div v-if="cell.todos.length > 3" class="calendar-todo-item">+{{ cell.todos.length - 3 }} more</div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Todo {
  id: number
  title: string
  time?: string
  priority: 'low' | 'medium' | 'high'
  difficulty: 'easy' | 'medium' | 'hard'
  description?: string
  completed: boolean
  createdAt: string
  date: string; // Calendar string
}

// localStorage
function saveTodosToStorage(todos: Todo[]) {
  try {
    localStorage.setItem('todos', JSON.stringify(todos))
  } catch (error) {
    console.error('Error saving todos to localStorage:', error)
  }
}

function loadTodosFromStorage(): Todo[] {
  try {
    const stored = localStorage.getItem('todos')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading todos from localStorage:', error)
  }
  return []
}

function clearAllTodos() {
  if (confirm('Are you sure you want to delete all todos? This action cannot be undone.')) {
    todos.value = []
    localStorage.removeItem('todos')
  }
}

function exportTodos() {
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



const todos = ref<Todo[]>([])
const currentFilter = ref<'all' | 'pending' | 'completed'>('all')
const currentView = ref<'today' | 'calendar'>('today')
const showForm = ref(false)
const editingId = ref<number | null>(null)

const form = ref({
  title: '',
  time: '',
  priority: '',
  difficulty: '',
  description: ''
})

// Load todos from localStorage
onMounted(() => {
  todos.value = loadTodosFromStorage()
})

// Watch for changes in todos and save to localStorage
watch(todos, (newTodos) => {
  saveTodosToStorage(newTodos)
}, { deep: true })

const canAdd = computed(() =>
  form.value.title && form.value.priority && form.value.difficulty
)

function addTodo() {
  if (!canAdd.value) return
  if (editingId.value !== null) {
    // Edit mode
    const idx = todos.value.findIndex(t => t.id === editingId.value)
    if (idx !== -1) {
      todos.value[idx] = {
        ...todos.value[idx],
        ...form.value,
        title: form.value.title,
        time: form.value.time,
        priority: form.value.priority as 'low' | 'medium' | 'high',
        difficulty: form.value.difficulty as 'easy' | 'medium' | 'hard',
        description: form.value.description,
        date: new Date().toISOString().slice(0, 10), 
      }
    }
    editingId.value = null
  } else {
    // Add mode
    todos.value.push({
      id: Date.now(),
      title: form.value.title,
      time: form.value.time,
      priority: form.value.priority as 'low' | 'medium' | 'high',
      difficulty: form.value.difficulty as 'easy' | 'medium' | 'hard',
      description: form.value.description,
      completed: false,
      createdAt: new Date().toISOString(), 
      date: new Date().toISOString().slice(0, 10), 
    })
  }
  resetForm()
}

function resetForm() {
  form.value = { title: '', time: '', priority: '', difficulty: '', description: '' }
  showForm.value = false
  editingId.value = null
}

function toggleComplete(todo: Todo) {
  todo.completed = !todo.completed
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function editTodo(todo: Todo) {
  form.value = {
    title: todo.title,
    time: todo.time || '',
    priority: todo.priority,
    difficulty: todo.difficulty,
    description: todo.description || ''
  }
  editingId.value = todo.id
  showForm.value = true
}

const filteredTodos = computed(() => {
  if (currentFilter.value === 'all') return todos.value
  if (currentFilter.value === 'pending') return todos.value.filter(t => !t.completed)
  if (currentFilter.value === 'completed') return todos.value.filter(t => t.completed)
  return todos.value
})

const stats = computed(() => ({
  total: todos.value.length,
  completed: todos.value.filter(t => t.completed).length,
  pending: todos.value.filter(t => !t.completed).length
}))

const storageInfo = computed(() => {
  try {
    const stored = localStorage.getItem('todos')
    const size = stored ? Math.round(stored.length / 1024 * 100) / 100 : 0
    return { size }
  } catch (error) {
    return { size: 0 }
  }
})

function capitalize(str: string) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Calendar View State
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function previousMonth() {
  currentMonth.value--;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
}
function nextMonth() {
  currentMonth.value++;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  }
}

const calendarCells = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  const cells = [];

  for (let i = 0; i < startingDay; i++) {
    cells.push({ day: '', dayClass: 'calendar-day other-month', todos: [] });
  }
  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayTodos = todos.value.filter(todo => todo.date === dateString);
    const isToday = new Date().toDateString() === new Date(dateString).toDateString();
    let dayClass = 'calendar-day';
    if (isToday) dayClass += ' today';
    if (dayTodos.length > 0) dayClass += ' has-todos';
    cells.push({ day, dayClass, todos: dayTodos });
  }
  
  const totalCells = startingDay + daysInMonth;
  const remainingCells = 42 - totalCells;
  for (let i = 0; i < remainingCells; i++) {
    cells.push({ day: '', dayClass: 'calendar-day other-month', todos: [] });
  }
  return cells;
});
</script>