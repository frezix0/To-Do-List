<template>
    <div class="stats-container">
        <div class="stat-card total">
            <h3>{{ stats.total }}</h3>
            <p>Total Tasks</p>
        </div>
        <div class="stat-card completed">
            <h3>{{ stats.completed }}</h3>
            <p>Completed Tasks</p>
        </div>
        <div class="stat-card pending">
            <h3>{{ stats.pending }}</h3>
            <p>Pending Tasks</p>
        </div>
        <div class="stat-card storage">
            <h3>{{ stats.storage }}</h3>
            <p>Storage Used (KB)</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Stats as StatsType } from '@/types/todo'

defineProps<{
    stats: StatsType
}>()
</script>