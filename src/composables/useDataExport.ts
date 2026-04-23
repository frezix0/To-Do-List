import type { Todo } from '@/types/todo'
import { getTodayDateString } from '@/utils/dateUtils'
 
export const useDataExport = () => {
    const exportTodos = (todos: Todo[]) => {
        try {
            const dataStr = JSON.stringify(todos, null, 2)
            const dataBlob = new Blob([dataStr], { type: 'application/json' })
            const url = URL.createObjectURL(dataBlob)
            const link = document.createElement('a')
            link.href = url
            link.download = `todos-${getTodayDateString()}.json`
            link.click()
            URL.revokeObjectURL(url)
            alert('Data exported successfully!')
        } catch (error) {
            console.error('Error exporting todos:', error)
            alert('Error exporting data. Please try again.')
        }
    }
 
    return { exportTodos }
}