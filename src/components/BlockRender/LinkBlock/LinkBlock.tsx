import { useState, useEffect } from 'react';
import classes from './LinkBlock.module.css';
import type { LINK_BLOCK } from '../types';


export default function LinkBlock(params: LINK_BLOCK) {
    const [isEditing, setIsEditing] = useState(!params.block.url);
    const [url, setUrl] = useState(params.block.content || params.block.url || '');
    const [isYouTube, setIsYouTube] = useState(false);
    const [youtubeId, setYoutubeId] = useState<string | null>(null);
    

    // Check if URL is a YouTube video
    useEffect(() => {
        if (url) {
            const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
            const isYoutube = youtubeRegex.test(url);
            setIsYouTube(isYoutube);

            if (isYoutube) {
                const videoId = extractYouTubeId(url);
                setYoutubeId(videoId);
            }
        }
    }, [url]);

    const extractYouTubeId = (url: string): string | null => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (params.onUpdate && url.trim()) {
            params.onUpdate(params.block.id, {
                content: url,
                url: url
            });
            setIsEditing(false);
        }
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const value = e.target.value;
        console.log(value)
        setUrl(value);
        params.onInput(value, e as React.FormEvent<HTMLInputElement>);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        params.onKeyDown(e);
    };


    if (isEditing) {
        return (
            <form onSubmit={handleUrlSubmit} className={classes.linkForm}>
                <input
                    type="url"
                    value={url}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={params.onFocus}
                    placeholder={params.block.placeholder}
                    className={classes.urlInput}
                    autoFocus
                />
                <button type="submit" className={classes.submitButton}>
                    Embed
                </button>
            </form>
        );
    }

    if (isYouTube && youtubeId) {
        return (
            <div className={classes.youtubeWrapper}>
                <div className={classes.youtubeContainer}>
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={classes.youtubeIframe}
                    />
                </div>
                <div className={classes.linkActions}>
                    <button onClick={handleEditClick} className={classes.editButton}>
                        Edit link
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.linkWrapper}>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
            >
                {url}
            </a>
            <div className={classes.linkActions}>
                <button onClick={handleEditClick} className={classes.editButton}>
                    Edit
                </button>
            </div>
        </div>
    );
}

