import { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import classes from './toast.module.css'
import type { TOAST } from './types';



export default function Toast({ toast, onClose }: TOAST) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (toast.duration) {
            const timer = setTimeout(() => {
                handleClose();
            }, toast.duration);
            return () => clearTimeout(timer);
        }
    }, [toast.duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(toast.id);
        }, 300);
    };

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <FiCheckCircle className={classes.icon} />;
            case 'error':
                return <FiAlertCircle className={classes.icon} />;
            case 'warning':
                return <FiAlertTriangle className={classes.icon} />;
            case 'info':
                return <FiInfo className={classes.icon} />;
            default:
                return <FiX className={classes.icon} />;
        }
    };

    const getTypeClass = () => {
        switch (toast.type) {
            case 'success':
                return classes.toastSuccess;
            case 'error':
                return classes.toastError;
            case 'warning':
                return classes.toastWarning;
            case 'info':
                return classes.toastInfo;
            default:
                return classes.toastInfo;
        }
    };

    return (
        <div
            className={`${classes.toast} ${getTypeClass()} ${isVisible && !isExiting ? classes.toastVisible : ''
                } ${isExiting ? classes.toastExiting : ''}`}
        >
            <div className={classes.iconContainer}>
                {getIcon()}
            </div>
            <div className={classes.content}>
                {toast.title && (
                    <div className={classes.title}>{toast.title}</div>
                )}
                <div className={classes.message}>{toast.message}</div>
            </div>
            <button
                className={classes.closeButton}
                onClick={handleClose}
                aria-label="Close notification"
            >
                <FiX className={classes.closeIcon} />
            </button>
            {toast.duration && (
                <div
                    className={classes.progressBar}
                    style={{
                        ['--duration' as string]: `${toast.duration}ms`,
                    }}
                />
            )}
        </div>
    );
};


