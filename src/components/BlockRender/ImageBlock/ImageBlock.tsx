// components/BlockRenderer/ImageBlock.tsx
import React, { useState } from 'react';
import classes from './ImageBlock.module.css';
import type { LINK_BLOCK } from '../types';



export default function ImageBlock(params: LINK_BLOCK) {
    const [isEditing, setIsEditing] = useState(!params.block.url);
    const [url, setUrl] = useState(params.block.content || params.block.url || '');
    const [alt, setAlt] = useState(params.block.alt || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (params.onUpdate && url.trim()) {
            params.onUpdate(params.block.id, {
                content: url,
                url: url,
                alt: alt || undefined
            });
            setIsEditing(false);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUrl(value);
        params.onInput(value, e as React.FormEvent<HTMLInputElement>);
    };

    const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAlt(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        params.onKeyDown(e);
    };

    if (isEditing) {
        return (
            <form onSubmit={handleSubmit} className={classes.imageForm}>
                <input
                    type="url"
                    value={url}
                    onChange={handleUrlChange}
                    onKeyDown={handleKeyDown}
                    onFocus={params.onFocus}
                    placeholder={params.block.placeholder}
                    className={classes.urlInput}
                    autoFocus
                />
                <input
                    type="text"
                    value={alt}
                    onChange={handleAltChange}
                    placeholder="Alt text (optional)"
                    className={classes.altInput}
                />
                <div className={classes.formActions}>
                    <button type="submit" className={classes.submitButton}>
                        Embed Image
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className={classes.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    if (!url) {
        return null;
    }

    return (
        <div className={classes.imageWrapper}>
            <img
                src={url}
                alt={alt || 'Embedded image'}
                className={classes.image}
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove(classes.hidden);
                }}
            />
            <div className={`${classes.imageError} ${classes.hidden}`}>
                Failed to load image
            </div>
            {alt && <div className={classes.imageCaption}>{alt}</div>}
            <div className={classes.imageActions}>
                <button onClick={handleEditClick} className={classes.editButton}>
                    Edit
                </button>
            </div>
        </div>
    );
};

