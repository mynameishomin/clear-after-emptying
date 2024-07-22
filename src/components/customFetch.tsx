"use client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Alert, AlertProps } from "./alert";

export async function customFetch(
    url: string,
    options?: RequestInit
): Promise<any> {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        switch (data.action.type) {
            case "Alert":
                const event = new CustomEvent("alert", {
                    detail: { ...data.action },
                });
                window.dispatchEvent(event);
        }

        if (data.success) {
            const event = new CustomEvent("alert", {
                detail: data.message,
            });
            window.dispatchEvent(event);
        } else {
            const event = new CustomEvent("toast", { detail: data.message });
            window.dispatchEvent(event);
        }

        return data;
    } catch (error) {
        const event = new CustomEvent("error", { detail: "Network error" });
        window.dispatchEvent(event);
        throw error;
    }
}

export const FetchDataEventListenerComponent = () => {
    const [alert, setAlert] = useState<AlertProps | null>(null);
    const closeAlert = () => {
        setAlert(null);
    };
    useEffect(() => {
        const handleApiSuccess = (event: CustomEvent) => {
            // alert(`Success: ${event.detail}`);
        };

        const handleApiError = (event: CustomEvent) => {
            // alert(`Error: ${event.detail}`);
        };

        const alertHandler = (event: CustomEvent<AlertProps>) => {
            setAlert({ title: event.detail.title, text: event.detail.text });
        };

        window.addEventListener("alert", alertHandler as EventListener);
        window.addEventListener("toast", handleApiError as EventListener);

        return () => {
            window.removeEventListener(
                "alert",
                handleApiSuccess as EventListener
            );
            window.removeEventListener(
                "toast",
                handleApiError as EventListener
            );
        };
    }, []);
    console.log(alert);
    return (
        <div>
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
