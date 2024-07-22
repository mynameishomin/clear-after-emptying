export const isEqual = <T>(a: T, b: T): boolean => {
    return a === b;
};

export async function customFetch(
    url: string,
    options?: RequestInit
): Promise<any> {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

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
