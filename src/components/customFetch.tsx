"use client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Alert, AlertProps } from "./alert";
import { Toast, ToastsProps } from "./toast";

export async function customFetch(
    url: string,
    options?: RequestInit
): Promise<any> {
    try {
        const response = await fetch(url, options);
        const cloneResponse = response.clone();
        const data = await response.json();

        if (Object.hasOwn(data, "action")) {
            window.dispatchEvent(
                new CustomEvent(data.action.type, {
                    detail: { ...data.action },
                })
            );
        }

        return cloneResponse;
    } catch (error) {
        const event = new CustomEvent("error", { detail: "Network error" });
        window.dispatchEvent(event);
        throw error;
    }
}

export const FetchDataEventListenerComponent = () => {
    const [alert, setAlert] = useState<AlertProps | null>(null);
    const [toasts, setToast] = useState<ToastsProps[]>([]);
    const closeAlert = () => {
        setAlert(null);
    };
    useEffect(() => {
        const alertHandler = (event: CustomEvent<AlertProps>) => {
            setAlert({ title: event.detail.title, text: event.detail.text });
        };
        const toastHandler = (event: CustomEvent<ToastsProps>) => {
            setToast((prev) => {
                prev.push({
                    text: event.detail.text,
                    id: String(Date.now()),
                });
                return [...prev];
            });

            setTimeout(() => {
                setToast((prev) => {
                    prev.shift();
                    return [...prev];
                });
            }, 3000);
        };

        window.addEventListener("alert", alertHandler as EventListener);
        window.addEventListener("toast", toastHandler as EventListener);

        return () => {
            window.removeEventListener("alert", alertHandler as EventListener);
            window.removeEventListener("toast", alertHandler as EventListener);
        };
    }, []);
    return (
        <div className="relative z-50">
            <Toast toasts={toasts} />
            <AnimatePresence>
                {alert && (
                    <Alert
                        title={alert.title}
                        text={alert.text}
                        onClose={closeAlert}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
