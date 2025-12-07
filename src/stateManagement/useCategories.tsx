import { create } from "zustand";
import type { USE_CATEGORIES } from "./types";
import { useError } from "./useError";
import axios from "axios";
import { URL, withCredentials } from "../constants/utils";
import { buildFilter } from "../helpers/util";
import type { BUILD_FILTER } from "../types";

export const useCategories = create<USE_CATEGORIES>((set) => ({
    categoriesResult: null,
    firstFiveCategoriesResult: null,
    loadingFirstFiveCategoriesResult: false,
    loadingCategoriesResult: false,
    categoriesFilter: {},
    showCategoryCreationDialog: false,
    categoriesLastFetchedTimeStamp: '',

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
        } finally {
            set({ loadingFirstFiveCategoriesResult: false })
        }
    },

    getCategoriesResult: async (filter: BUILD_FILTER) => {
        try {
            set({ loadingCategoriesResult: true });
            const { data } = await axios.get(`${URL}/category?${buildFilter(filter)}`, withCredentials);
            set({
                categoriesResult: data.data
            })
            set({ categoriesLastFetchedTimeStamp: new Date() })

        } catch (error) {
            useError.getState().handleAPIError(error)
        } finally {
            set({ loadingCategoriesResult: false })
        }
    }
}))