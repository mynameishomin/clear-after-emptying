interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    return (
        <button className="w-full h-8 px-3 rounded-sm text-sm bg-gray-700 text-white hover:bg-gray-600 transition-all">
            {text}
        </button>
    );
}
