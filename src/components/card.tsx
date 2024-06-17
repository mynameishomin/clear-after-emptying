export const Card = ({ children }: { children: React.ReactElement }) => {
    return (
        <div className="w-full h-full p-4 rounded-sm bg-white shadow-lg max-w-52">
            {children}
        </div>
    );
};
