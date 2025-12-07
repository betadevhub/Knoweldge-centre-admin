import type { TOAST_OBJECT, TOAST_TYPE } from "../components/Toast/types";
import type { BUILD_FILTER, CATEGORIES_RESULT } from "../types";

export interface USER {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface USE_TOAST {
    toasts: TOAST_OBJECT[];
    addToast: (type: TOAST_TYPE, title: string, message: string, duration?: number) => void
    removeToast: (id: number) => void;
}

export interface USE_ERROR {
    handleAPIError: (error: unknown) => void;
}

export interface USE_USER {
    user: USER | null;
    navigationRouteValue: string;
    triggerNavigation: boolean;
    navigate: (destination: string) => void
    logOut: () => void;
    getUser: () => void
}

export interface USE_CATEGORIES {
    categoriesResult: CATEGORIES_RESULT | null;
    loadingFirstFiveCategoriesResult: boolean;
    loadingCategoriesResult: boolean;
    firstFiveCategoriesResult: CATEGORIES_RESULT | null;
    showCategoryCreationDialog: boolean;
    categoriesLastFetchedTimeStamp: Date | string;
    toggleCategoryCreationDialog: () => void;
    getCategoriesResult: (filter: BUILD_FILTER) => void;
    getFirstFiveCategoriesResult: () => void;

}