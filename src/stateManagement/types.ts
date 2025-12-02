import type { TOAST_OBJECT, TOAST_TYPE } from "../components/Toast/types";

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