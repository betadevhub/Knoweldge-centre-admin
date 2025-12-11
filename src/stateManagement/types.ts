import type { CATEGORIES } from "../components/SidePane/types";
import type { TOAST_OBJECT, TOAST_TYPE } from "../components/Toast/types";
import type { POSTS, POSTS_RESULT } from "../pages/space/types";
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
    loadingFirstFiveCategoriesResult: boolean;
    loadingCategoriesResult: boolean;
    showCategoryCreationDialog: boolean;
    loadingCategoriesByIdResult: boolean;
    categoriesByIdResult: CATEGORIES | null;
    firstFiveCategoriesResult: CATEGORIES_RESULT | null;
    categoriesResult: CATEGORIES_RESULT | null;
    categoriesByIdLastFetchedTimeStamp: Date | string;
    categoriesLastFetchedTimeStamp: Date | string;
    toggleCategoryCreationDialog: () => void;
    getCategoriesResult: (filter: BUILD_FILTER) => void;
    getFirstFiveCategoriesResult: () => void;
    getCategoriesByIdResult: (id: string) => void;
}



export interface USE_POSTS {
    postsResult: POSTS_RESULT | null;
    postByIdResult: POSTS | null;
    loadingPostsResult: boolean;
    loadingPostsByIdResult: boolean;
    postsLastFetchedTimeStamp: Date | string;
    postsByIdLastFetchedTimeStamp: Date | string;
    getPostsResult: (filter: BUILD_FILTER) => void;
    getPostsByIdResult: (id: string) => void;
}