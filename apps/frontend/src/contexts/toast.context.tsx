import { createContext, useEffect, useState } from "react";
import type { IMessage, IToastContext } from "../types/toast.type";
import Toast from "../components/Toast";

const ToastContext = createContext<IToastContext | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState<IMessage | null>(null);

    const showSuccess = (content: string) => {
        setMessage({ type: "success", content });
    };

    const showError = (content: string) => {
        setMessage({ type: "error", content });
    };

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [message]);

    return (
        <ToastContext.Provider
            value={{
                message,
                showSuccess,
                showError,
            }}
        >
            {message && <Toast />}
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContext;