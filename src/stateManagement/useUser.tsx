import { create } from "zustand";
import { routes, URL, withCredentials } from "../constants/utils";
import type { USE_USER } from "./types";
import { useError } from "./useError";
import axios from "axios";

export const useUser = create<USE_USER>((set, get) => ({
    user: null,
    navigationRouteValue: '',
    triggerNavigation: false,


    navigate: (destination: string) => {
        set({ navigationRouteValue: destination })
        set({ triggerNavigation: !get().triggerNavigation })
    },

    logOut: () => {
        set({ user: null });
        get().navigate(routes.signin);
    },

    getUser: async () => {
        try {
            const res = await axios.get(`${URL}/user`, withCredentials);
            const user = res.data.data.user;
            set({ user })

        } catch (error) {
            useError.getState().handleAPIError(error)
        }
    }
}))