export const numberFormat = Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
});

export const compactFormat = Intl.NumberFormat('en-Ng', {
    notation: 'compact',
    maximumFractionDigits: 0
})