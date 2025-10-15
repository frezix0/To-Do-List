import { ref, onMounted, onBeforeUnmount } from 'vue'
import { formatTime, formatDate } from '@/utils/dateUtils'

export const useDatetime = () => {
    const currentTime = ref(formatTime(new Date()))
    const currentDate = ref(formatDate(new Date()))
    let intervalId: ReturnType<typeof setInterval> | null = null

    const updateTime = () => {
        const now = new Date()
        currentTime.value = formatTime(now)
        currentDate.value = formatDate(now)
    }

    onMounted(() => {
        intervalId = setInterval(updateTime, 1000)
    })

    onBeforeUnmount(() => {
        if (intervalId)
            clearInterval(intervalId)
    })

    return { 
        currentTime, 
        currentDate 
    }
}