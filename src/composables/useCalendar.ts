import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Todo } from '@/types/todo'
import { MONTH_NAMES } from '@/utils/constants'

export const useCalendar = (todos:Ref<Todo[]>) => {
    const currentMonth = ref(new Date().getMonth())
    const currentYear = ref(new Date().getFullYear())

    const previousMonth = () => {
        currentMonth.value--
        if (currentMonth.value < 0) {
            currentMonth.value = 11
            currentYear.value--
        }
    }

    const nextMonth = () => {
        currentMonth.value++
        if (currentMonth.value > 11) {
            currentMonth.value = 0
            currentYear.value++
        }
    }

    const calendarCells = computed(() => {
        const firstDay = new Date(currentYear.value, currentMonth.value, 1)
        const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDay = firstDay.getDay()
        const cells = []

        // Fill in blank cells before the first day
        for (let i = 0; i < startingDay; i++) {
            cells.push({ day: '', dayClass: 'calendar-day other-month', todos: [] })
        }

        // Fill in the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const dayTodos = todos.value.filter(todo => todo.date === dateString)
            const isToday = new Date().toDateString() === new Date(dateString).toDateString()

            let dayClass = 'calendar-day'
            if (isToday) dayClass += ' today'
            if (dayTodos.length > 0) dayClass += ' has-todos'

            cells.push({ day, dayClass, todos: dayTodos })
        }

        const totalCells = startingDay + daysInMonth
        const remainingCells = 42 - totalCells

        // Fill in blank cells after the last day
        for (let i = 0; i < remainingCells; i++) {
            cells.push({ day: '', dayClass: 'calendar-day other-month', todos: [] })
        }

        return cells
    })

    return {
        currentMonth,
        currentYear,
        previousMonth,
        nextMonth,
        calendarCells,
        monthNames: MONTH_NAMES
    }
}