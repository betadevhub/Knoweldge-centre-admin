import type { BUILD_FILTER } from "../types";

export const numberFormat = Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
});

export const compactFormat = Intl.NumberFormat('en-Ng', {
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 3
});


export const buildFilter = (filter?: BUILD_FILTER) => {
    if (!filter) return ''
    const entries = Object.entries(filter)
    const string = entries.map(a => (`${a[0]}=${a[1]}`)).join('&')
    return string
}

export const dateFormat = (dateStr: string, includeTime = false) => {
    const inputDate = new Date(dateStr);
    const now = new Date();

    // Get dates in YYYY-MM-DD format for comparison
    const inputDateString = inputDate.toISOString().split('T')[0];
    const todayString = now.toISOString().split('T')[0];

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    if (inputDateString === todayString) {
        return 'Today';
    } else if (inputDateString === yesterdayString) {
        return 'Yesterday';
    } else {
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(inputDate);

        if (includeTime) {
            const time = inputDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            return `${formattedDate}, ${time}`;
        }

        return formattedDate;
    }
};

export const hoursFormat = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0h:00m';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}h:${formattedMinutes}m`;
};