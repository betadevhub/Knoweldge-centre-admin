import { useEffect, useRef } from "react";
import type { USE_TEXT_AREA } from "./types";

export default function useTextArea(params: USE_TEXT_AREA) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            // Reset height to auto to get the correct scrollHeight
            textareaRef.current.style.height = 'auto';
            // Set height to scrollHeight
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [params.block.content]);


    return { textareaRef }

}