interface ButtonProps {
    className?: string;
    children: React.ReactNode;
    onClick: () => void;
}

export const BUTTON_CLASSNAME =
    "flex items-center gap-2 py-1 px-2 rounded-lg border-2 border-point bg-sub transition hover:text-white hover:bg-point";

export default function Button({ onClick, children, className }: ButtonProps) {
    return (
        <button
            className={`flex items-center gap-2 py-1 px-2 rounded-lg border-2 border-point bg-sub transition hover:text-white hover:bg-point ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
