import axios from "axios";
import { create } from "zustand";
import { useToast } from "./useToast";
import type { USE_ERROR } from "./types";
import { useUser } from "./useUser";

export const useError = create<USE_ERROR>(() => ({
    handleAPIError: (error: unknown) => {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                useUser.getState().logOut()
            } else {
                const msg = error?.response?.data?.message || "unexpected error";
                useToast.getState().addToast('error', 'Error', msg)
            }
        } else {
            useToast.getState().addToast('error', 'Error', 'Unexpected error')
        }
    },
}))