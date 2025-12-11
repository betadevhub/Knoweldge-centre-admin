import { useState } from "react";
import type { BUILD_FILTER } from "../types";
import type { USE_FILTER } from "./types";

export default function useFilter(params: USE_FILTER) {
    const [filter, setFilter] = useState<BUILD_FILTER>(params.fil);
    const [filterDialogState, setFilterDialogState] = useState(false);


    const handleFilterChange = (name: string, value: string) => {
        setFilter((prev) => ({ ...prev, [name]: value }));
    }

    const handleMultiFilterChange = (values: BUILD_FILTER) => {
        setFilter(values);
    }


    const toggleFilterDialog = () => {
        setFilterDialogState(prev => !prev)
    }

    return { filter, filterDialogState, handleFilterChange, handleMultiFilterChange, toggleFilterDialog }
}