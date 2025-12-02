import { create } from "zustand";
import type { USE_TOAST } from "./types";


export const useToast = create<USE_TOAST>((set) => ({
    toasts: [],

    addToast: (type: string, title: string, message: string, duration = 5000) => {
        const newToast = { id: Date.now() + Math.random(), type, title, message, duration };
        set((state) => ({
            toasts: [...state.toasts, newToast]
        }))
    },

    removeToast: (id: number) => {
        set((state)=>({
            toasts: state.toasts.filter(toast => toast.id !== id)
        }))
    }
}))