export interface TOAST_OBJECT {
    id: number
    type: string
    title: string
    message: string
    duration: number | null
}

export type TOAST_TYPE = 'success' | 'error' | 'warning'


export interface TOAST {
    toast: TOAST_OBJECT
    onClose: (id: number) => void
}