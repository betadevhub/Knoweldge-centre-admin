export interface LAST_SYNC {
    fetch: () => void;
    lastFetched: Date | string;
    loading: boolean
}