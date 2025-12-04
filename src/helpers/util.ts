import type { BUILD_FILTER } from "../types";

export const numberFormat = Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
});

export const compactFormat = Intl.NumberFormat('en-Ng', {
    notation: 'compact',
    maximumFractionDigits: 0
});


export const buildFilter = (filter?: BUILD_FILTER) => {
    if (!filter) return ''
    const entries = Object.entries(filter)
    const string = entries.map(a => (`${a[0]}=${a[1]}`)).join('&')
    return string
}

