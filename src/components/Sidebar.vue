<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <h2>📝 Todo List</h2>
        </div>

        <div class="sidebar-datetime">
            <div class="time">{{ currentTime }}</div>
            <div class="date">{{ currentDate }}</div>
        </div>

        <div class="nav-section">
            <h3>Date & Calendar</h3>
            <div
                class="nav-item"
                :class="{ active: currentView === 'today' }"
                @click="$emit('view-change', 'today')"
            >
                <span class="icon">📅</span>
                Today
            </div>
            <div
                class="nav-item"
                :class="{ active: currentView === 'calendar' }"
                @click="$emit('view-change', 'calendar')"
            >
                <span class="icon">🗓️</span>
                Calendar View
            </div>
        </div>

        <div class="nav-section">
            <h3>Data Management</h3>
            <div class="nav-item" @click="$emit('export')">
                <span class="icon">💾</span>
                Export Data
            </div>
            <div class="nav-item danger" @click="$emit('clear-all')">
                <span class="icon">🗑️</span>
                Clear All Data
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import type { ViewType } from '@/types/todo'
import { useDatetime } from '@/composables/useDatetime'

defineProps<{
    currentView: ViewType
}>()

defineEmits<{
    (e: 'view-change', view: ViewType): void
    (e: 'export'): void
    (e: 'clear-all'): void
}>()

const { currentTime, currentDate } = useDatetime()
</script>