<template>
    <div class="todo-section calendar-section">
        <div class="todo-header">
            <h2 class="section-title">Calendar View</h2>
            <div class="calendar-controls">
                <button class="calendar-nav-btn" @click="previousMonth">‹</button>
                <span class="current-month-year">{{ monthNames[currentMonth] }} {{ currentYear }}</span>
                <button class="calendar-nav-btn" @click="nextMonth">›</button>
            </div>
        </div>

        <div class="calendar-container">
            <div class="calendar-header">
                <div v-for="day in weekDays" :key="day">{{ day }}</div>
            </div>
            <div class="calendar-grid">
                <template v-for="(cell, idx) in calendarCells" :key="idx">
                    <div :class="cell.dayClass">
                        <div class="calendar-day-number" v-if="cell.day">{{ cell.day }}</div>
                        <div class="calendar-todos" v-if="cell.day && cell.todos.length">
                            <div
                                v-for="(todo, i) in cell.todos.slice(0, 3)"
                                :key="todo.id"
                                class="calendar-todo-item">
                                {{ todo.title }}
                            </div>
                            <div v-if="cell.todos.length > 3" class="calendar-todo-item more">
                                +{{ cell.todos.length - 3 }} more
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Todo } from '@/types/todo'
import { useCalendar } from '@/composables/useCalendar';
import { MONTH_NAMES as monthNames } from '@/utils/constants';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const props = defineProps<{
    todos: Todo[]
}>()

const { currentMonth, currentYear, previousMonth, nextMonth, calendarCells } = useCalendar(
    computed(() => props.todos)
)
</script>