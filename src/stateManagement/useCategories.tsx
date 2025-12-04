import { create } from "zustand";
import type { USE_CATEGORIES } from "./types";
import { useError } from "./useError";
import axios from "axios";
import { URL, withCredentials } from "../constants/utils";

export const useCategories = create<USE_CATEGORIES>((set) => ({
    categoriesResult: null,
    firstFiveCategoriesResult: null,
    loadingFirstFiveCategoriesResult: false,
    categoriesFilter: {},
    showCategoryCreationDialog: false,

    toggleCategoryCreationDialog: () => {
        set((state) => ({
            showCategoryCreationDialog: !state.showCategoryCreationDialog
        }))
    },

    getFirstFiveCategoriesResult: async () => {
        try {
            set({ loadingFirstFiveCategoriesResult: true });
            const { data } = await axios.get(`${URL}/category?limit=${5}`, withCredentials);
            set({
                firstFiveCategoriesResult: data.data
            })

        } catch (error) {
            useError.getState().handleAPIError(error)
        } finally{
            set({ loadingFirstFiveCategoriesResult: false })
        }
    },

    getCategoriesResult: async () => {
        try {
            const { data } = await axios.get(`${URL}/category`, withCredentials);
            set({
                categoriesResult: data.data
            })

        } catch (error) {
            useError.getState().handleAPIError(error)
        }
    }
}))