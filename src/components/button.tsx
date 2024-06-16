interface ButtonProps {
    text: string;
    onClick: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
    return (
        <button
            className="w-full h-8 px-3 rounded-sm text-sm bg-gray-700 text-white hover:bg-gray-600 transition-all"
            onClick={onClick}
        >
            {text}
        </button>
    );
}
