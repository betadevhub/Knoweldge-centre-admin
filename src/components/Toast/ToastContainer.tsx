
import { useToast } from '../../stateManagement/useToast';
import Toast from './Toast';
import classes from './toast.module.css'

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className={classes.container}>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onClose={removeToast}
                />
            ))}
        </div>
    );
};