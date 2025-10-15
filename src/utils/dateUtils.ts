export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
};

export const formatDate = (date: Date): string => {
    return date.toISOString().slice(0, 10);
}

export const formatDateTime = (isoString: string): string => {
    return new Date(isoString).toLocaleString('id-ID') 
}

export const capitalize = (str: string): string => {
    return str? str.charAt(0).toUpperCase() + str.slice(1) : ''
}