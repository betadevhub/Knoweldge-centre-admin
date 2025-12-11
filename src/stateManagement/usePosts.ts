import { create } from "zustand";
import type { USE_POSTS } from "./types";
import type { BUILD_FILTER } from "../types";
import axios from "axios";
import { URL, withCredentials } from "../constants/utils";
import { buildFilter } from "../helpers/util";
import { useError } from "./useError";


export const usePosts = create<USE_POSTS>((set) => ({
    postsResult: null,
    postByIdResult: null,
    loadingPostsResult: false,
    loadingPostsByIdResult: false,
    postsLastFetchedTimeStamp: '',
    postsByIdLastFetchedTimeStamp: '',

    getPostsResult: async (filter: BUILD_FILTER) => {
        try {
            set({ loadingPostsResult: true });
            const { data } = await axios.get(`${URL}/post?${buildFilter(filter)}`, withCredentials);
            set({
                postsResult: data.data
            })
            set({ postsLastFetchedTimeStamp: new Date() })

        } catch (error) {
            useError.getState().handleAPIError(error)
        } finally {
            set({ loadingPostsResult: false })
        }
    },

    getPostsByIdResult: async (id: string) => {
        try {
            set({ loadingPostsByIdResult: true });
            const { data } = await axios.get(`${URL}/post/${id}`, withCredentials);
            set({
                postByIdResult: data.data
            })
            set({ postsByIdLastFetchedTimeStamp: new Date() })

        } catch (error) {
            useError.getState().handleAPIError(error)
        } finally {
            set({ loadingPostsByIdResult: false })
        }
    }
}))